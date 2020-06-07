import * as crypto from 'crypto';
import {
  fieldsToHash, 
  ChangeAction, 
  GroupChangeAction, 
  Action, 
  ChangeSet, 
  GroupAction,
  GroupVersions,
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
  FieldTypeValues
} from './action';
import assert from 'assert';

type Hash = string | null;

class ValidationError extends Error {

}

export function hashAction(
  logAction: ChangeAction | GroupChangeAction | Action | GroupAction,
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

export function getActionType(logAction: Action | ChangeAction): string {
  if (
    logAction instanceof RenameFieldTypeAction ||
    logAction instanceof RequiredFieldTypeAction ||
    logAction instanceof OptionalFieldTypeAction ||
    logAction instanceof DeleteFieldTypeAction ||
    logAction instanceof SetDefaultFieldTypeAction ||
    logAction instanceof RemoveDefaultFieldTypeAction ||
    logAction instanceof AddFieldTypeAction ||
    logAction instanceof UpdateFieldDescriptionTypeAction ||
    logAction instanceof ReferenceFieldTypeAction ||
    logAction instanceof NewTypeAction ||
    logAction instanceof RenameFieldTypeChangeAction ||
    logAction instanceof RequiredFieldTypeChangeAction ||
    logAction instanceof OptionalFieldTypeChangeAction ||
    logAction instanceof DeleteFieldTypeChangeAction ||
    logAction instanceof SetDefaultFieldTypeChangeAction ||
    logAction instanceof RemoveDefaultFieldTypeChangeAction ||
    logAction instanceof AddFieldTypeChangeAction ||
    logAction instanceof UpdateFieldDescriptionTypeChangeAction ||
    logAction instanceof ReferenceFieldTypeChangeAction ||
    logAction instanceof NewTypeChangeAction
  ) {
    return logAction.typeName;
  } else if (
    logAction instanceof NewServiceAction ||
    logAction instanceof UpdateDescriptionServiceAction ||
    logAction instanceof AddVersionServiceAction ||

    logAction instanceof NewServiceChangeAction ||
    logAction instanceof UpdateDescriptionServiceChangeAction ||
    logAction instanceof AddVersionServiceChangeAction
  ) {
    return logAction.serviceName;
  }
  throw new ValidationError(`Unknown log action ${logAction}`);
}

function isNewAction(hashable: ChangeAction) {
  return (
    hashable instanceof NewTypeAction || 
    hashable instanceof NewServiceAction ||
    hashable instanceof NewTypeChangeAction || 
    hashable instanceof NewServiceChangeAction
  );
}

function stringNotNull(action: any, name: string): string {
  const field = action[name];

  if (field === null || field === undefined) {
    throw new ValidationError(`Field ${name} must not be null or undefined. ${action}`);
  }

  if (typeof field === 'string') {
    return field;
  }

  throw new ValidationError(`Field ${name} must be a string. ${action}`);
}

function integerNotNull(action: any, name: string): number {
  const field = action[name];

  if (field === null || field === undefined) {
    throw new ValidationError(`Field ${name} must not be null or undefined. ${action}`);
  }

  if (typeof field === 'number' && parseInt(field.toString())) {
    return field;
  }

  throw new ValidationError(`Field ${name} must be an integer. ${action}`);
}

function booleanNotNull(action: any, name: string): boolean {
  const field = action[name];

  if (field === null || field === undefined) {
    throw new ValidationError(`Field ${name} must not be null or undefined. ${action}`);
  }

  if (typeof field === 'boolean') {
    return field;
  }

  throw new ValidationError(`Field ${name} must be a boolean. ${action}`);
}

function loadAction(rawAction: any): Action {
  const commonFields = {
    changeLog: stringNotNull(rawAction, 'changeLog'),
    hash: stringNotNull(rawAction, 'hash'),
    version: integerNotNull(rawAction, 'version'),
  };
  switch(rawAction.actionType) {
  // Services
  case 'NewServiceAction':
    return ({
      serviceName: stringNotNull(rawAction, 'serviceName'),
      description: stringNotNull(rawAction, 'description'),
      ...commonFields
    });
  case 'UpdateDescriptionServiceAction':
    return ({
      serviceName: stringNotNull(rawAction, 'serviceName'),
      description: stringNotNull(rawAction, 'description'),
      ...commonFields
    });
  case 'AddVersionServiceAction':
    return ({
      serviceName: stringNotNull(rawAction, 'serviceName'),
      inputType: stringNotNull(rawAction, 'inputType'),
      outputType: stringNotNull(rawAction, 'outputType'),
      inputVersion: integerNotNull(rawAction, 'inputVersion'),
      inputHash: stringNotNull(rawAction, 'inputHash'),
      outputVersion: integerNotNull(rawAction, 'outputVersion'),
      outputHash: stringNotNull(rawAction, 'outputHash'),
      ...commonFields
    });
  // Types
  case 'RenameFieldTypeAction':
    return ({
      typeName: stringNotNull(rawAction, 'typeName'),
      _from: stringNotNull(rawAction, '_from'),
      to: stringNotNull(rawAction, 'to'),
      ...commonFields
    });
  case 'RequiredFieldTypeAction':
    return ({
      typeName: stringNotNull(rawAction, 'typeName'),
      name: stringNotNull(rawAction, 'name'),
      ...commonFields
    });
  case 'OptionalFieldTypeAction':
    return ({
      typeName: stringNotNull(rawAction, 'typeName'),
      name: stringNotNull(rawAction, 'name'),
      ...commonFields
    });
  case 'DeleteFieldTypeAction':
    return ({
      typeName: stringNotNull(rawAction, 'typeName'),
      name: stringNotNull(rawAction, 'name'),
      ...commonFields
    });
  case 'SetDefaultFieldTypeAction':
    return ({
      typeName: stringNotNull(rawAction, 'typeName'),
      name: stringNotNull(rawAction, 'name'),
      _default: stringNotNull(rawAction, '_default'),
      ...commonFields
    });
  case 'RemoveDefaultFieldTypeAction':
    return ({
      typeName: stringNotNull(rawAction, 'typeName'),
      name: stringNotNull(rawAction, 'name'),
      ...commonFields
    });
  case 'AddFieldTypeAction':
    if (FieldTypeValues.indexOf(rawAction.type) === -1) {
      throw new ValidationError(
        'Unknown field type ${rawAction.type} in action ${rawAction}'
      );
    }
    return ({
      typeName: stringNotNull(rawAction, 'typeName'),
      name: stringNotNull(rawAction, 'name'),
      _type: rawAction._type,
      description: stringNotNull(rawAction, 'description'),
      optional: booleanNotNull(rawAction, 'optional'),
      _default: rawAction._default,
      ...commonFields
    });
  case 'UpdateFieldDescriptionTypeAction':
    return ({
      typeName: stringNotNull(rawAction, 'typeName'),
      name: stringNotNull(rawAction, 'name'),
      description: stringNotNull(rawAction, 'description'),
      ...commonFields
    });
  case 'ReferenceFieldTypeAction':
    return ({
      typeName: stringNotNull(rawAction, 'typeName'),
      name: stringNotNull(rawAction, 'name'),
      description: stringNotNull(rawAction, 'description'),
      optional: booleanNotNull(rawAction, 'optional'),
      referenceType: stringNotNull(rawAction, 'referenceType'),
      referenceHash: stringNotNull(rawAction, 'referenceHash'),
      referenceVersion: integerNotNull(rawAction, 'referenceVersion'),
      ...commonFields
    });
  case 'NewTypeAction':
    return ({
      typeName: stringNotNull(rawAction, 'typeName'),
      description: rawAction.description,
      ...commonFields
    });
  default:
    throw new ValidationError(`Unknown Action: ${rawAction}`)
  }
}

export function loadActions(log: any[]): GroupAction[] {
  const loadedActions: GroupAction[] = [];
  for (let rawAction of log) {
    if (rawAction.actionType !== 'GroupAction') {
      throw new ValidationError(`Log entry must be GroupAction ${rawAction}`);
    }
    const groupedActions = [];
    for (const subAction of rawAction.actions) {
      groupedActions.push(loadAction(subAction));
    }
    const versions: GroupVersions = {};
    Object.keys(rawAction.versions).forEach(key => {
      if (!(typeof key === 'string')) {
        throw new ValidationError(`version key must be a string key: ${key}, action: ${rawAction}`);
      }

      const version = rawAction.versions[key];
      if (!(typeof version !== 'number')) {
        throw new ValidationError(`version must be a number: key: ${key} version: ${version}, action: ${rawAction}`);
      }

      versions[key] = version;
    })
    loadedActions.push({
      actions: groupedActions,
      versions: versions,
      hash: stringNotNull(rawAction, 'hash'),
      version: integerNotNull(rawAction, 'version')
    });
  }

  return loadedActions;
}

export function validateLog(
  log: GroupAction[]
): Map<string, number> {
  const versionNumbers = new Map<string, number>();
  let previousHash = null;
  for (let n = 0; n < log.length; n++) {
    const groupAction = log[n];
    const typesIncremented = new Set<string>();
    for (let subHashable of groupAction.actions) {
      const expectedHash = hashAction(subHashable, previousHash);
      if (expectedHash !== subHashable.hash) {
        throw new ValidationError(`Invalid hash at item ${n} expected ${expectedHash} got ${subHashable.hash} object: ${JSON.stringify(subHashable, null, 4)}`)
      }
      previousHash = expectedHash;

      const actionType = getActionType(subHashable);
      let currentVersion = versionNumbers.get(actionType);
      if (currentVersion === undefined && !isNewAction(subHashable)) {
        throw new ValidationError(`First action for a type must be new type, actionType: ${subHashable.constructor.name} object: ${subHashable}`)
      } 

      if (currentVersion === undefined) {
        currentVersion = 0;
        typesIncremented.add(actionType);
      } else if (!typesIncremented.has(actionType)) {
        currentVersion = versionNumbers.get(actionType);
        if (currentVersion === undefined) {
          throw new ValidationError('Should not happen');
        }
        currentVersion += 1;
        typesIncremented.add(actionType);
      }

      const actionVersion = groupAction.versions[actionType];
      if (actionVersion !== currentVersion) {
        throw new ValidationError(`Group Version doesn't match at item ${n} expected ${currentVersion} got ${actionVersion} for type ${actionType} object: ${JSON.stringify(subHashable, null, 4)}`)
      }
      versionNumbers.set(actionType, currentVersion);
    }

    if (groupAction.hash !== previousHash) {
      throw new ValidationError(`Invalid hash on group item expected ${groupAction.hash} got ${previousHash} object: ${JSON.stringify(groupAction, null, 4)}`)
    }
  }

  return versionNumbers;
}

export function validate(
  log: GroupAction[]
): string | null {
  try {
    validateLog(log);
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
    commitChangeSet(log, changeSet);
    return null;
  } catch (e) {
    if (e instanceof ValidationError) {
      return e.message;
    }

    throw e;
  }
}

export function changeActionToAction(
  action: ChangeAction,
  hash: string,
  version: number
): Action {
    if (action instanceof AddVersionServiceChangeAction) {
      return new AddVersionServiceAction(
        hash,
        version,
        action.changeLog,
        action.serviceName,
        action.inputType,
        action.outputType,
        action.inputVersion,
        action.inputHash,
        action.outputVersion,
        action.outputHash
      );
    } else if (action instanceof UpdateDescriptionServiceChangeAction) {
      return new UpdateDescriptionServiceAction(
        hash,
        version,
        action.changeLog,
        action.serviceName,
        action.description
      );
    } else if (action instanceof NewServiceChangeAction) {
      return new NewServiceAction(
        hash,
        version,
        action.changeLog,
        action.serviceName,
        action.description
      );
    } else if (action instanceof ReferenceFieldTypeChangeAction) {
      return new ReferenceFieldTypeAction(
        hash,
        version,
        action.changeLog,
        action.typeName,
        action.name,
        action.description,
        action.optional,
        action.referenceType,
        action.referenceHash,
        action.referenceVersion
      );
    } else if (action instanceof UpdateFieldDescriptionTypeChangeAction) {
      return new UpdateFieldDescriptionTypeAction(
        hash,
        version,
        action.changeLog,
        action.typeName,
        action.name,
        action.description
      );
    } else if (action instanceof AddFieldTypeChangeAction) {
      return new AddFieldTypeAction(
        hash,
        version,
        action.changeLog,
        action.typeName,
        action.name,
        action._type,
        action.description,
        action.optional,
        action._default
      );
    } else if (action instanceof RemoveDefaultFieldTypeChangeAction) {
      return new RemoveDefaultFieldTypeAction(
        hash,
        version,
        action.changeLog,
        action.typeName,
        action.name
      );
    } else if (action instanceof SetDefaultFieldTypeChangeAction) {
      return new SetDefaultFieldTypeAction(
        hash,
        version,
        action.changeLog,
        action.typeName,
        action.name,
        action._default
      );
    } else if (action instanceof DeleteFieldTypeChangeAction) {
      return new DeleteFieldTypeAction(
        hash,
        version,
        action.changeLog,
        action.typeName,
        action.name
      );
    } else if (action instanceof OptionalFieldTypeChangeAction) {
      return new OptionalFieldTypeAction(
        hash,
        version,
        action.changeLog,
        action.typeName,
        action.name
      );
    } else if (action instanceof RequiredFieldTypeChangeAction) {
      return new RequiredFieldTypeAction(
        hash,
        version,
        action.changeLog,
        action.typeName,
        action.name
      );
    } else if (action instanceof RenameFieldTypeChangeAction) {
      return new RenameFieldTypeAction(
        hash,
        version,
        action.changeLog,
        action.typeName,
        action._from,
        action.to
      );
    } else if (action instanceof NewTypeChangeAction) {
      return new NewTypeAction(
        hash,
        version,
        action.changeLog,
        action.typeName,
        action.description
      );
    } else {
      throw new Error(`Can't hash ${JSON.stringify(action, null, 4)}`)
    }
};

export function commitChangeSet(
  log: GroupAction[], 
  changeSet: ChangeSet,
): GroupAction[] {
  const currentVersions = validateLog(log);
  const newActions = log.slice();

  // TODO: Check if change can cleanly apply e.g. if someone else has touched 
  // the field or added an identical one.
  const versions: GroupVersions = {};
  const groupActions: Action[] = [];
  let previousHash = log.length > 0 ? log[log.length-1].hash : null;
  const typesIncremented = new Set<string>();
  for (let changeAction of changeSet.log) {
    const newHash = hashAction(changeAction, previousHash);
    const actionType = getActionType(changeAction);
    let currentVersion = currentVersions.get(actionType);
    if (currentVersion === undefined && !isNewAction(changeAction)) {
      throw new ValidationError(`First action for a type must be new type, actionType: ${changeAction.constructor.name} object: ${JSON.stringify(changeAction)}`)
    } 

    if (currentVersion === undefined) {
      currentVersion = 0;
      typesIncremented.add(actionType);
    } else if (!typesIncremented.has(actionType)) {
      currentVersion = currentVersions.get(actionType);
      if (currentVersion === undefined) {
        throw new ValidationError('Should not happen');
      }
      currentVersion += 1;
      typesIncremented.add(actionType);
    }

    groupActions.push(
      changeActionToAction(
        changeAction,
        newHash,
        currentVersion
      )
    );

    versions[actionType] = currentVersion;
    currentVersions.set(actionType, currentVersion);
    previousHash = newHash;
  }

  if (groupActions.length === 0) {
    return newActions;
  } else {
    assert(previousHash);
    newActions.push(
      new GroupAction(
        previousHash,
        -1,
        groupActions,
        versions
      )
    );

    validateLog(newActions);

    return newActions;
  }
}