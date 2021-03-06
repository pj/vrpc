import * as crypto from 'crypto';
import {
  fieldsToHash, 
  GroupChangeAction, 
  Action, 
  ChangeSet, 
  GroupAction,
  RenameFieldTypeAction,
  RequiredFieldTypeAction,
  OptionalFieldTypeAction,
  DeleteFieldTypeAction,
  SetDefaultFieldTypeAction,
  RemoveDefaultFieldTypeAction,
  AddFieldTypeAction,
  UpdateFieldDescriptionTypeAction,
  ReferenceFieldTypeAction,
  NewTypeAction,
  NewServiceAction,
  UpdateDescriptionServiceAction,
  AddVersionServiceAction,
  NewTypeChangeAction,
  NewServiceChangeAction,
  BaseChangeAction,
  BaseAction,
  changeActionToAction,
  TypeAction,
  DeleteMappingServiceAction
} from './action';
import assert from 'assert'; import { Service, Type, BaseGeneratable, Version, ScalarField, ReferenceField, ServiceVersion, ServiceMapping } from './generate';

export class ValidationError extends Error {

}

export function hashAction(
  logAction: BaseChangeAction | GroupChangeAction | Action | GroupAction,
  previous: string | null
): string {
  if (logAction instanceof GroupAction) {
    if (logAction.actions.length === 0) {
      throw new Error(`Can't hash group action because it has no sub actions`);
    }
    for (let subHashable of logAction.actions) {
      previous = hashAction(subHashable, previous);
    }
    // @ts-ignore
    return previous;
  }

  const hash = crypto.createHash('sha256');

  if (previous !== null) {
    hash.update(previous);
  }

  const hashFields = fieldsToHash(logAction);
  hash.update(hashFields);

  return hash.digest('hex');
}

function isNewAction(hashable: Action) {
  return (
    hashable instanceof NewTypeAction || 
    hashable instanceof NewServiceAction ||
    hashable instanceof NewTypeChangeAction || 
    hashable instanceof NewServiceChangeAction
  );
}

function updateServiceVersion(
  service: ServiceVersion,
  logAction: Action
  ): void {
  if (
    logAction instanceof AddVersionServiceAction
  ) {
    const inputKey = `${logAction.inputType}_${logAction.inputVersion}`;
    const outputKey = `${logAction.outputType}_${logAction.outputVersion}`;
    // check that input isn't mapped to another output.
    for (let [otherOutput, otherInputs] of service.mappings.entries()) {
      if (otherOutput !== outputKey && otherInputs.has(inputKey)) {
        throw new ValidationError(`Input type already mapped to a different output ${inputKey} -> ${otherOutput} for service ${service.name} version ${service.version}`)
      }
    }

    let inputs = service.mappings.get(outputKey);
    if (inputs && inputs.has(inputKey)) {
      throw new ValidationError(`Mapping already exists between ${inputKey} and ${outputKey} for service ${service.name} version ${service.version}`);
    } else {
      inputs = new Map();
    }
    inputs.set(
      inputKey, 
      new ServiceMapping(
        service.name,
        service.version,
        logAction.inputType,
        logAction.inputVersion,
        logAction.inputHash,
        logAction.outputType,
        logAction.outputVersion,
        logAction.outputHash
      )
    );
    service.mappings.set(outputKey, inputs);
  } else if (logAction instanceof DeleteMappingServiceAction) {
    const inputKey = `${logAction.inputType}_${logAction.inputVersion}`;
    const outputKey = `${logAction.outputType}_${logAction.outputVersion}`;

    if (!service.mappings.has(outputKey)) {
      throw new ValidationError(`Trying to delete service mapping that doesn't exist ${inputKey} -> ${outputKey} for service ${service.name} version ${service.version}`)
    }

    let inputs = service.mappings.get(outputKey);
    assert(inputs);
    
    if (!inputs.has(inputKey)) {
      throw new ValidationError(`Trying to delete service mapping that doesn't exist ${inputKey} -> ${outputKey} for service ${service.name} version ${service.version}`)
    }

    inputs.delete(inputKey);
    if (inputs.size === 0) {
      service.mappings.delete(outputKey);
    }
  } else {
    throw new Error('Should not happen');
  }
}

function updateTypeVersion(newVersion: Version, logAction: Action) {
  if (logAction instanceof RenameFieldTypeAction) {
    const currentField = newVersion.fields[logAction._from];
    const newField = currentField.copy();
    newField.name = logAction.to;
    newField.changeLog = logAction.changeLog;
    delete newVersion.fields[logAction._from];
    newVersion.fields[logAction.to] = newField;
  } else if (logAction instanceof RequiredFieldTypeAction) {
    const currentField = newVersion.fields[logAction.fieldName];
    const newField = currentField.copy();
    newField.optional = false;
    newField.changeLog = logAction.changeLog;
    newVersion.fields[logAction.fieldName] = newField;
  } else if (logAction instanceof OptionalFieldTypeAction) {
    const currentField = newVersion.fields[logAction.fieldName];
    const newField = currentField.copy();
    newField.optional = true;
    newField.changeLog = logAction.changeLog;
    newVersion.fields[logAction.fieldName] = newField;
  } else if (logAction instanceof DeleteFieldTypeAction) {
    const currentField = newVersion.fields[logAction.fieldName];
    delete newVersion.fields[logAction.fieldName];
  } else if (logAction instanceof SetDefaultFieldTypeAction) {
    const currentField = newVersion.fields[logAction.fieldName];
    const newField = currentField.copy();
    if (newField instanceof ScalarField) {
      newField._default = logAction._default;
    }
    newField.changeLog = logAction.changeLog;
    newVersion.fields[logAction.fieldName] = newField;
  } else if (logAction instanceof RemoveDefaultFieldTypeAction) {
    const currentField = newVersion.fields[logAction.fieldName];
    const newField = currentField.copy();
    if (newField instanceof ScalarField) {
      newField._default = undefined;
    }
    newField.changeLog = logAction.changeLog;
    newVersion.fields[logAction.fieldName] = newField;
  } else if (logAction instanceof AddFieldTypeAction) {
    const currentField = newVersion.fields[logAction.fieldName];
    const newField = new ScalarField(
      logAction.fieldName,
      logAction.changeLog,
      logAction.description,
      logAction.optional,
      logAction._type,
      logAction._default = logAction._default
    );
    newVersion.fields[logAction.fieldName] = newField;
  } else if (logAction instanceof UpdateFieldDescriptionTypeAction) {
    const currentField = newVersion.fields[logAction.fieldName];
    const newField = currentField.copy();
    newField.description = logAction.description;
    newField.changeLog = logAction.changeLog;
    newVersion.fields[logAction.fieldName] = newField;
  } else if (logAction instanceof ReferenceFieldTypeAction) {
    const currentField = newVersion.fields[logAction.fieldName];
    const newField = new ReferenceField(
      logAction.fieldName,
      logAction.changeLog,
      logAction.description,
      logAction.optional,
      logAction.referenceType,
      logAction.referenceHash,
      logAction.referenceVersion
    );
    newVersion.fields[logAction.fieldName] = newField;
  } else {
    throw new Error('Should not happen');
  }
}

// Validation, commit and generation are all kind of part of the same process 
// and are hard to separate. This is basically the function of superLoop.
export class SuperLoopResult {
  newLog: GroupAction[];
  generatables: Map<string, BaseGeneratable>;
  previousHash: string | null = null;

  constructor() {
    this.newLog = [];
    this.generatables = new Map();
    this.previousHash = null;
  }
}

export function superLoop(
  log: GroupAction[], 
  changeSet: ChangeSet | null
): SuperLoopResult {
  const result = new SuperLoopResult();
  let commitLog;
  if (changeSet) {
    commitLog = [...log, new GroupChangeAction(changeSet.log)];
  } else {
    commitLog = [...log];
  }

  let afterHashed = false;

  // Current version number for a type.
  const currentVersionNumbers = new Map<string, number>();
  for (const commitGroup of commitLog) {
    const incrementedTypes = new Set();
    const newGroupActions = [];

    // Validate log and create 
    for (const commitAction of commitGroup.actions) {
      if (commitAction instanceof BaseChangeAction) {
        afterHashed = true;
      } else if (afterHashed && commitAction instanceof BaseAction) {
        throw new ValidationError(`Found hashed action after change action.`);
      }
      const expectedHash = hashAction(commitAction, result.previousHash);
      if (
        !(commitAction instanceof BaseChangeAction) && 
        expectedHash !== commitAction.hash
      ) {
        throw new ValidationError(
          `Invalid hash for item expected ${expectedHash} got ${commitAction.hash} object: ${JSON.stringify(commitAction, null, 4)}`
        );
      }
      result.previousHash = expectedHash;

      const existingVersionNumber = currentVersionNumbers.get(
        commitAction.name
      );
      let currentVersion;
      if (existingVersionNumber === undefined) {
        if (!isNewAction(commitAction)) {
          throw new ValidationError(
            `Action is for type or service ${commitAction.name}, but no type or service exists for that name`
          );
        } 
        currentVersionNumbers.set(commitAction.name, 0);
        currentVersion = 0;
        incrementedTypes.add(commitAction.name);
      } else {
        if (isNewAction(commitAction)) {
          throw new ValidationError(
            `Type or service ${commitAction.name} already exists.`
          );
        } 
        if (incrementedTypes.has(commitAction.name)) {
          currentVersion = currentVersionNumbers.get(commitAction.name);
          assert(currentVersion !== undefined);
        } else {
          currentVersion = existingVersionNumber + 1
          currentVersionNumbers.set(commitAction.name, currentVersion);
          incrementedTypes.add(commitAction.name);
        }
      }

      let newAction;
      if (commitAction instanceof BaseChangeAction) {
        newAction = changeActionToAction(
          commitAction, 
          expectedHash, 
          currentVersion
        );
      } else {
        newAction = commitAction;
        if (commitAction.version !== currentVersion) {
          throw new ValidationError(
            `Group Version doesn't match expected ${currentVersion} got ${commitAction.version} for type ${currentVersionNumbers} object: ${JSON.stringify(commitAction, null, 4)}`
          );
        }
      }

      newGroupActions.push(newAction);
    }

    // Create commit groups.
    let newCommitGroup;
    if (commitGroup instanceof GroupAction) {
      if (commitGroup.hash !== result.previousHash) {
        throw new ValidationError(
          `Invalid hash on group item expected ${commitGroup.hash} got ${result.previousHash} object: ${JSON.stringify(commitGroup, null, 4)}`
        );
      }
      result.newLog.push(commitGroup);
      newCommitGroup = commitGroup;
    } else {
      assert(result.previousHash !== null);
      newCommitGroup = new GroupAction(
          result.previousHash,
          newGroupActions
        );
      result.newLog.push(newCommitGroup);
    }

    // Generate Types and services
    const currentVersions = new Map<string, Version | ServiceVersion>();
    for (const newAction of newGroupActions) {
      if (newAction instanceof NewTypeAction) {
        const _type = new Type(newAction.name, newAction.description);
        _type.changeLog.push(newAction.changeLog);
        const newVersion = new Version(
          newAction.name, 
          newCommitGroup.hash, 
          0, 
          {}
        );
        currentVersions.set(newAction.name, newVersion);
        newVersion.fields = {};
        _type.versions.push(newVersion);
        result.generatables.set(newAction.name, _type);
      } else if (newAction instanceof NewServiceAction) {
        const service = new Service(newAction.name, newAction.description);
        service.changeLog.push(newAction.changeLog);
        const newVersion = new ServiceVersion(
          newAction.name, 
          0, 
          newCommitGroup.hash, 
          new Map()
        );
        currentVersions.set(newAction.name, newVersion);
        service.versions.push(newVersion);
        result.generatables.set(newAction.name, service);
      } else {
        if (newAction instanceof TypeAction) {
          const _type = result.generatables.get(newAction.name);
          assert(_type !== undefined);
          assert(_type instanceof Type);

          _type.changeLog.push(newAction.changeLog);
          const versionNumber = currentVersionNumbers.get(newAction.name);
          assert(versionNumber !== undefined);
          let newVersion = currentVersions.get(newAction.name);
          if (newVersion === undefined) {
            newVersion = new Version(newAction.name, newCommitGroup.hash, versionNumber, {});
            currentVersions.set(newAction.name, newVersion);
            if (_type.versions.length > 0) {
              newVersion.fields = {
                ..._type.versions[_type.versions.length-1].fields
              };
            }
            _type.versions.push(newVersion);
          }
          assert(newVersion instanceof Version);
          updateTypeVersion(newVersion, newAction);
        } else {
          const service = result.generatables.get(newAction.name);
          assert(service !== undefined);
          assert(service instanceof Service);

          service.changeLog.push(newAction.changeLog);
          const versionNumber = currentVersionNumbers.get(newAction.name);
          assert(versionNumber !== undefined);

          let newVersion = currentVersions.get(newAction.name);
          if (newVersion === undefined) {
            newVersion = new ServiceVersion(
              newAction.name, 
              versionNumber, 
              newCommitGroup.hash, new Map
            );
            currentVersions.set(newAction.name, newVersion);
            if (service.versions.length > 0) {
              const copiedMappings = new Map();
              for (let [outputKey, inputs] of newVersion.mappings.entries()) {
                const copiedInputs = new Map();
                for (let [inputKey, input] of inputs.entries()) {
                  copiedInputs.set(inputKey, input);
                }
                copiedMappings.set(outputKey, copiedInputs);
              }
              newVersion.mappings = copiedMappings;
            }
            service.versions.push(newVersion);
          }

          service.changeLog.push(newAction.changeLog);
          if (newAction instanceof UpdateDescriptionServiceAction) {
            service.description = newAction.description;
          }
          assert(newVersion instanceof ServiceVersion);
          updateServiceVersion(newVersion, newAction);
        }
      }
    }
  }

  return result;
}

export function validate(
  log: GroupAction[]
): string | null {
  try {
    superLoop(log, null);
    return null;
  } catch (e) {
    if (e instanceof ValidationError) {
      return e.message;
    }

    throw e;
  }
}

export function validateWithChangeSet(
  log: GroupAction[], 
  changeSet: ChangeSet,
): string | null {
  try {
    superLoop(log, changeSet);
    return null;
  } catch (e) {
    if (e instanceof ValidationError) {
      return e.message;
    }

    throw e;
  }
}

export function commitChangeSet(
  log: GroupAction[], 
  changeSet: ChangeSet,
): GroupAction[] {
  const result = superLoop(log, changeSet);
  return result.newLog;
}

export function services(
  log: GroupAction[],
  changeSet: ChangeSet | null
): Service[] {
  const result = superLoop(log, changeSet);
  const services = [];
  for (let generatable of result.generatables.values()) {
    if (generatable instanceof Service) {
      services.push(generatable);
    }
  }
  return services;
}

export function types(
  log: GroupAction[],
  changeSet: ChangeSet | null
): Type[] {
  const result = superLoop(log, changeSet);
  const types = [];
  for (let generatable of result.generatables.values()) {
    if (generatable instanceof Type) {
      types.push(generatable);
    }
  }
  return types;
}