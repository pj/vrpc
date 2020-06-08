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
  RenameFieldTypeChangeAction,
  RequiredFieldTypeChangeAction,
  OptionalFieldTypeChangeAction,
  DeleteFieldTypeChangeAction,
  SetDefaultFieldTypeChangeAction,
  RemoveDefaultFieldTypeChangeAction,
  AddFieldTypeChangeAction,
  UpdateFieldDescriptionTypeChangeAction,
  ReferenceFieldTypeChangeAction,
  NewTypeChangeAction,
  NewServiceChangeAction,
  UpdateDescriptionServiceChangeAction,
  AddVersionServiceChangeAction,
  BaseChangeAction,
  BaseAction,
  changeActionToAction,
  TypeAction
} from './action';
import assert from 'assert';
import { Service, Type, BaseGeneratable, Version, VersionType, ScalarField, ReferenceField } from './generate';

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

// export function getActionType(logAction: Action | BaseChangeAction): string {
//   if (
//     logAction instanceof RenameFieldTypeAction ||
//     logAction instanceof RequiredFieldTypeAction ||
//     logAction instanceof OptionalFieldTypeAction ||
//     logAction instanceof DeleteFieldTypeAction ||
//     logAction instanceof SetDefaultFieldTypeAction ||
//     logAction instanceof RemoveDefaultFieldTypeAction ||
//     logAction instanceof AddFieldTypeAction ||
//     logAction instanceof UpdateFieldDescriptionTypeAction ||
//     logAction instanceof ReferenceFieldTypeAction ||
//     logAction instanceof NewTypeAction ||
//     logAction instanceof RenameFieldTypeChangeAction ||
//     logAction instanceof RequiredFieldTypeChangeAction ||
//     logAction instanceof OptionalFieldTypeChangeAction ||
//     logAction instanceof DeleteFieldTypeChangeAction ||
//     logAction instanceof SetDefaultFieldTypeChangeAction ||
//     logAction instanceof RemoveDefaultFieldTypeChangeAction ||
//     logAction instanceof AddFieldTypeChangeAction ||
//     logAction instanceof UpdateFieldDescriptionTypeChangeAction ||
//     logAction instanceof ReferenceFieldTypeChangeAction ||
//     logAction instanceof NewTypeChangeAction
//   ) {
//     return logAction.typeName;
//   } else if (
//     logAction instanceof NewServiceAction ||
//     logAction instanceof UpdateDescriptionServiceAction ||
//     logAction instanceof AddVersionServiceAction ||

//     logAction instanceof NewServiceChangeAction ||
//     logAction instanceof UpdateDescriptionServiceChangeAction ||
//     logAction instanceof AddVersionServiceChangeAction
//   ) {
//     return logAction.serviceName;
//   }
//   throw new ValidationError(`Unknown log action ${logAction}`);
// }

function isNewAction(hashable: Action) {
  return (
    hashable instanceof NewTypeAction || 
    hashable instanceof NewServiceAction ||
    hashable instanceof NewTypeChangeAction || 
    hashable instanceof NewServiceChangeAction
  );
}


function updateServiceVersion(
  service: Service,
  logAction: Action
  ): void {
  if (
    logAction instanceof AddVersionServiceAction || 
    logAction instanceof AddVersionServiceChangeAction
  ) {
    const inputVersion = `${logAction.inputType}_${logAction.inputVersion}`;
    const outputVersion = `${logAction.outputType}_${logAction.outputVersion}`;

    if (service.seenInputVersions.has(inputVersion)) {
      throw new Error(`Input version ${inputVersion} used elsewhere`);
    }
    service.seenInputVersions.add(inputVersion);
    const existingVersion = service.versions[outputVersion];
    if (existingVersion) {
      existingVersion.inputs.push(
        new VersionType(logAction.inputType, logAction.inputHash, logAction.inputVersion),
      );
    } else {
      service.versions[outputVersion] = ({
        output: new VersionType(logAction.outputType, logAction.outputHash, logAction.outputVersion),
        inputs: [new VersionType(logAction.inputType, logAction.inputHash, logAction.inputVersion)],
      });
    }
  } else {
    throw new Error('Should not happen');
  }
}

function updateVersion(newVersion: Version, logAction: Action) {
  if (logAction instanceof RenameFieldTypeAction) {
    const currentField = newVersion.fields[logAction._from];
    const newField = currentField.copy();
    newField.name = logAction.to;
    newField.changeLog = logAction.changeLog;
    delete newVersion.fields[logAction._from];
    newVersion.fields[logAction.to] = newField;
  } else if (logAction instanceof RequiredFieldTypeAction) {
    const currentField = newVersion.fields[logAction.name];
    const newField = currentField.copy();
    newField.optional = false;
    newField.changeLog = logAction.changeLog;
    newVersion.fields[newField.name] = newField;
  } else if (logAction instanceof OptionalFieldTypeAction) {
    const currentField = newVersion.fields[logAction.name];
    const newField = currentField.copy();
    newField.optional = true;
    newField.changeLog = logAction.changeLog;
    newVersion.fields[newField.name] = newField;
  } else if (logAction instanceof DeleteFieldTypeAction) {
    const currentField = newVersion.fields[logAction.name];
    const newField = currentField.copy();
    delete newVersion.fields[currentField.name];
  } else if (logAction instanceof SetDefaultFieldTypeAction) {
    const currentField = newVersion.fields[logAction.name];
    const newField = currentField.copy();
    if (newField instanceof ScalarField) {
      newField._default = logAction._default;
    }
    newField.changeLog = logAction.changeLog;
    newVersion.fields[newField.name] = newField;
  } else if (logAction instanceof RemoveDefaultFieldTypeAction) {
    const currentField = newVersion.fields[logAction.name];
    const newField = currentField.copy();
    if (newField instanceof ScalarField) {
      newField._default = undefined;
    }
    newField.changeLog = logAction.changeLog;
    newVersion.fields[newField.name] = newField;
  } else if (logAction instanceof AddFieldTypeAction) {
    const currentField = newVersion.fields[logAction.name];
    const newField = new ScalarField(
      logAction.name,
      logAction.changeLog,
      logAction.description,
      logAction.optional,
      logAction._type,
      logAction._default = logAction._default
    );
    newVersion.fields[newField.name] = newField;
  } else if (logAction instanceof UpdateFieldDescriptionTypeAction) {
    const currentField = newVersion.fields[logAction.name];
    const newField = currentField.copy();
    newField.description = logAction.description;
    newField.changeLog = logAction.changeLog;
    newVersion.fields[newField.name] = newField;
  } else if (logAction instanceof ReferenceFieldTypeAction) {
    const currentField = newVersion.fields[logAction.name];
    const newField = new ReferenceField(
      logAction.name,
      logAction.changeLog,
      logAction.description,
      logAction.optional,
      logAction.referenceType,
      logAction.referenceHash,
      logAction.referenceVersion
    );
    newVersion.fields[newField.name] = newField;
  } else {
    throw new Error('Should not happen');
  }
}

// export function typeOrServiceName(
//   logAction: Action
// ): string {
//   if (
//     logAction instanceof RenameFieldTypeAction || 
//     logAction instanceof RequiredFieldTypeAction || 
//     logAction instanceof OptionalFieldTypeAction || 
//     logAction instanceof DeleteFieldTypeAction || 
//     logAction instanceof SetDefaultFieldTypeAction || 
//     logAction instanceof RemoveDefaultFieldTypeAction || 
//     logAction instanceof AddFieldTypeAction || 
//     logAction instanceof UpdateFieldDescriptionTypeAction || 
//     logAction instanceof ReferenceFieldTypeAction || 
//     logAction instanceof NewTypeAction ||
//     logAction instanceof RenameFieldTypeChangeAction || 
//     logAction instanceof RequiredFieldTypeChangeAction || 
//     logAction instanceof OptionalFieldTypeChangeAction || 
//     logAction instanceof DeleteFieldTypeChangeAction || 
//     logAction instanceof SetDefaultFieldTypeChangeAction || 
//     logAction instanceof RemoveDefaultFieldTypeChangeAction || 
//     logAction instanceof AddFieldTypeChangeAction || 
//     logAction instanceof UpdateFieldDescriptionTypeChangeAction || 
//     logAction instanceof ReferenceFieldTypeChangeAction || 
//     logAction instanceof NewTypeChangeAction
//   ) {
//     return logAction.typeName;
//   } else if (
//     logAction instanceof UpdateDescriptionServiceAction || 
//     logAction instanceof AddVersionServiceAction || 
//     logAction instanceof NewServiceAction ||
//     logAction instanceof UpdateDescriptionServiceChangeAction || 
//     logAction instanceof AddVersionServiceChangeAction || 
//     logAction instanceof NewServiceChangeAction
//   ) {
//     return logAction.serviceName;
//   }

//   throw new Error('Satisfying typescript');
// }

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

  for (const commitGroup of commitLog) {
    const generatablesIncremented = new Map<string, number>();
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

      const existingGeneratable = result.generatables.get(commitAction.name);
      let currentVersion;
      if (!existingGeneratable) {
        if (!isNewAction(commitAction)) {
          throw new ValidationError(
            `Action is for type or service ${commitAction.name}, but no type or service exists for that name`
          );
        } 
        generatablesIncremented.set(commitAction.name, 0);
        currentVersion = 0;
      } else {
        if (isNewAction(commitAction)) {
          throw new ValidationError(
            `Type or service ${commitAction.name} already exists.`
          );
        } 
        assert(existingGeneratable.currentVersion);
        if (generatablesIncremented.has(commitAction.name)) {
          currentVersion = generatablesIncremented.get(commitAction.name);
          assert(currentVersion);
        } else {
          currentVersion = existingGeneratable.currentVersion + 1
          generatablesIncremented.set(commitAction.name, currentVersion);
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
        const actionVersion = commitGroup.versions.get(commitAction.name);
        if (actionVersion !== currentVersion) {
          throw new ValidationError(
            `Group Version doesn't match expected ${currentVersion} got ${actionVersion} for type ${generatablesIncremented} object: ${JSON.stringify(commitAction, null, 4)}`
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
      assert(result.previousHash);
      newCommitGroup = new GroupAction(
          result.previousHash,
          newGroupActions,
          generatablesIncremented
        );
      result.newLog.push(newCommitGroup);
    }

    // Generate Types and services
    const currentVersions = new Map<string, Version>();
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
        result.generatables.set(newAction.name, service);
      } else {
        if (newAction instanceof TypeAction) {
          const _type = result.generatables.get(newAction.name);
          if (!_type || !(_type instanceof Type)) {
            throw new Error('Should not happen');
          }
          _type.changeLog.push(newAction.changeLog);
          const versionNumber = newCommitGroup.versions.get(newAction.name);
          assert(versionNumber);
          let newVersion = currentVersions.get(newAction.name);
          if (newVersion === undefined) {
            newVersion = new Version(newAction.name, newCommitGroup.hash, versionNumber, {});
            currentVersions.set(newAction.name, newVersion);
            if (_type.versions.length > 0) {
              newVersion.fields = {..._type.versions[_type.versions.length-1].fields};
            }
            _type.versions.push(newVersion);
          }
          updateVersion(newVersion, newAction);
        } else {
          const service = result.generatables.get(newAction.name);
          if (!service || !(service instanceof Service)) {
            throw new Error('Should not happen');
          }
          service.changeLog.push(newAction.changeLog);
          if (newAction instanceof UpdateDescriptionServiceAction) {
            service.description = newAction.description;
          }
          updateServiceVersion(service, newAction);
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
  for (let generatable of result.generatables) {
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
  for (let generatable of result.generatables) {
    if (generatable instanceof Type) {
      types.push(generatable);
    }
  }
  return types;
}