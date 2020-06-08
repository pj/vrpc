import { TypeDefinition, Type } from './generated/type_definition';
import { ValidationError } from './vrpc';

// export enum FieldTypes {
//   Boolean = 'boolean',
//   Float = 'float',
//   Integer = 'integer',
//   String = 'string',
// }

export type FieldDefaults = string | boolean | number;

export const FieldTypeValues = ['string', 'boolean', 'integer', 'float'];

export interface HashedAction {
  hash: string;
  version: number;
}

export interface ActionDefaults {
  changeLog: string;
}

export class Action {
  name: string;
  changeLog: string;
  constructor(name: string, changeLog: string) {
    this.name = name;
    this.changeLog = changeLog;
  }
}

export class BaseChangeAction extends Action {

}

export class TypeChangeAction extends BaseChangeAction {

}

export class ServiceChangeAction extends BaseChangeAction {

}

export class BaseAction extends Action {
  hash: string;
  version: number;
}

export class TypeAction extends BaseAction {

}

export class ServiceAction extends BaseAction {

}

// Types
export class NewTypeAction extends TypeAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  name: string;
  description: string;
  constructor(hash: string, version: number, changeLog: string, name: string, description: string) {
    super(name, changeLog);
    this.hash = hash;
    this.version = version;
    this.name = name;
    this.description = description;
  }
}

export class NewTypeChangeAction extends TypeChangeAction implements ActionDefaults {
  changeLog: string;
  name: string;
  description: string;
  constructor(changeLog: string, name: string, description: string, ) {
    super(name, changeLog);
    this.description = description;
  }
}

export class RenameFieldTypeAction extends TypeAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  name: string;
  _from: string;
  to: string;
  constructor(
    hash: string,
    version: number,
    changeLog: string,
    name: string,
    _from: string,
    to: string,
  ) {
    super(name, changeLog);
    this.hash = hash;
    this.version = version;
    this._from = _from;
    this.to = to;
  }
}

export class RenameFieldTypeChangeAction extends TypeChangeAction implements ActionDefaults {
  changeLog: string;
  name: string;
  _from: string;
  to: string;
  constructor(
    changeLog: string,
    name: string,
    _from: string,
    to: string,
  ) {
    super(name, changeLog);
    this._from = _from;
    this.to = to;
  }
}

export class RequiredFieldTypeAction extends TypeAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  name: string;
  fieldName: string;

  constructor(
    hash: string,
    version: number,
    changeLog: string,
    name: string,
    fieldName: string,
  ) {
    super(name, changeLog);
    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.name = name;
    this.fieldName = fieldName;
  }
}

export class RequiredFieldTypeChangeAction extends TypeChangeAction implements ActionDefaults {
  changeLog: string;
  name: string;
  fieldName: string;

  constructor(

    changeLog: string,
    name: string,
    fieldName: string,
  ) {
    super(name, changeLog);
    this.changeLog = changeLog;
    this.name = name;
    this.fieldName = fieldName;
  }
}

export class OptionalFieldTypeAction extends TypeAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  name: string;
  fieldName: string;

  constructor(
    hash: string,
    version: number,
    changeLog: string,
    name: string,
    fieldName: string,
  ) {
    super(name, changeLog);
    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.name = name;
    this.fieldName = fieldName;
  }
}

export class OptionalFieldTypeChangeAction extends TypeChangeAction implements ActionDefaults {
  changeLog: string;
  name: string;
  fieldName: string;

  constructor(
    changeLog: string,
    name: string,
    fieldName: string,
  ) {
    super(name, changeLog);
    this.changeLog = changeLog;
    this.name = name;
    this.fieldName = fieldName;
  }
}

export class DeleteFieldTypeAction extends TypeAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  name: string;
  fieldName: string;

  constructor(
    hash: string,
    version: number,
    changeLog: string,
    name: string,
    fieldName: string,
  ) {
    super(name, changeLog);
    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.name = name;
    this.fieldName = fieldName;
  }
}


export class DeleteFieldTypeChangeAction extends TypeChangeAction implements ActionDefaults {
  changeLog: string;
  name: string;
  fieldName: string;

  constructor(
    changeLog: string,
    name: string,
    fieldName: string,
  ) {
    super(name, changeLog);
    this.changeLog = changeLog;
    this.name = name;
    this.fieldName = fieldName;
  }
}


export class SetDefaultFieldTypeAction extends TypeAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  name: string;
  fieldName: string;
  _default: FieldDefaults;

  constructor(
    hash: string,
    version: number,
    changeLog: string,
    name: string,
    fieldName: string,
    _default: FieldDefaults,
  ) {
    super(name, changeLog);
    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.name = name;
    this.fieldName = fieldName;
    this._default = _default;
  }
}


export class SetDefaultFieldTypeChangeAction extends TypeChangeAction implements ActionDefaults {
  changeLog: string;
  name: string;
  fieldName: string;
  _default: FieldDefaults;

  constructor(
    changeLog: string,
    name: string,
    fieldName: string,
    _default: FieldDefaults,
  ) {
    super(name, changeLog);
    this.changeLog = changeLog;
    this.name = name;
    this.fieldName = fieldName;
    this._default = _default;
  }
}


export class RemoveDefaultFieldTypeAction extends TypeAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  name: string;
  fieldName: string;

  constructor(
    hash: string,
    version: number,
    changeLog: string,
    name: string,
    fieldName: string,
  ) {
    super(name, changeLog);
    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.name = name;
    this.fieldName = fieldName;
  }
}


export class RemoveDefaultFieldTypeChangeAction extends TypeChangeAction implements ActionDefaults {
  changeLog: string;
  name: string;
  fieldName: string;

  constructor(
    changeLog: string,
    name: string,
    fieldName: string,
  ) {
    super(name, changeLog);
    this.changeLog = changeLog;
    this.name = name;
    this.fieldName = fieldName;
  }
}


export class AddFieldTypeAction extends TypeAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  name: string;
  fieldName: string;
  _type: Type;
  description: string;
  optional: boolean;
  _default?: FieldDefaults;

  constructor(
    hash: string,
    version: number,
    changeLog: string,
    name: string,
    fieldName: string,
    _type: Type,
    description: string,
    optional: boolean,
    _default?: FieldDefaults,
  ) {
    super(name, changeLog);
    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.name = name;
    this.fieldName = fieldName;
    this._type = _type;
    this.description = description;
    this.optional = optional;
    this._default = _default;
  }
}


export class AddFieldTypeChangeAction extends TypeChangeAction implements ActionDefaults {
  changeLog: string;
  name: string;
  fieldName: string;
  _type: Type;
  description: string;
  optional: boolean;
  _default?: FieldDefaults;

  constructor(

    changeLog: string,
    name: string,
    fieldName: string,
    _type: Type,
    description: string,
    optional: boolean,
    _default?: FieldDefaults,
  ) {
    super(name, changeLog);
    this.changeLog = changeLog;
    this.name = name;
    this.fieldName = fieldName;
    this._type = _type;
    this.description = description;
    this.optional = optional;
    this._default = _default;
  }
}


export class UpdateFieldDescriptionTypeAction extends TypeAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  name: string;
  fieldName: string;
  description: string;

  constructor(
    hash: string,
    version: number,
    changeLog: string,
    name: string,
    fieldName: string,
    description: string,
  ) {
    super(name, changeLog);
    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.name = name;
    this.fieldName = fieldName;
    this.description = description;
  }
}


export class UpdateFieldDescriptionTypeChangeAction extends TypeChangeAction implements ActionDefaults {
  changeLog: string;
  name: string;
  fieldName: string;
  description: string;

  constructor(
    changeLog: string,
    name: string,
    fieldName: string,
    description: string,
  ) {
    super(name, changeLog);
    this.changeLog = changeLog;
    this.name = name;
    this.fieldName = fieldName;
    this.description = description;
  }
}


export class ReferenceFieldTypeAction extends TypeAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  name: string;
  fieldName: string;
  description: string;
  optional: boolean;
  referenceType: string;
  referenceHash: string;
  referenceVersion: number;

  constructor(
    hash: string,
    version: number,
    changeLog: string,
    name: string,
    fieldName: string,
    description: string,
    optional: boolean,
    referenceType: string,
    referenceHash: string,
    referenceVersion: number,
  ) {
    super(name, changeLog);
    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.name = name;
    this.fieldName = fieldName;
    this.description = description;
    this.optional = optional;
    this.referenceType = referenceType;
    this.referenceHash = referenceHash;
    this.referenceVersion = referenceVersion;
  }
}


export class ReferenceFieldTypeChangeAction extends TypeChangeAction implements ActionDefaults {
  changeLog: string;
  name: string;
  fieldName: string;
  description: string;
  optional: boolean;
  referenceType: string;
  referenceHash: string;
  referenceVersion: number;

  constructor(
    changeLog: string,
    name: string,
    fieldName: string,
    description: string,
    optional: boolean,
    referenceType: string,
    referenceHash: string,
    referenceVersion: number,
  ) {
    super(name, changeLog);
    this.changeLog = changeLog;
    this.name = name;
    this.fieldName = fieldName;
    this.description = description;
    this.optional = optional;
    this.referenceType = referenceType;
    this.referenceHash = referenceHash;
    this.referenceVersion = referenceVersion;
  }
}

// Service Definitions

export class NewServiceAction extends ServiceAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  name: string;
  description: string;

  constructor(
    hash: string,
    version: number,
    changeLog: string,
    name: string,
    description: string,
  ) {
    super(name, changeLog);
    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.name = name;
    this.description = description;
  }
}


export class NewServiceChangeAction extends ServiceChangeAction implements ActionDefaults {
  changeLog: string;
  name: string;
  description: string;

  constructor(
    changeLog: string,
    name: string,
    description: string,
  ) {
    super(name, changeLog);
    this.changeLog = changeLog;
    this.name = name;
    this.description = description;
  }
}

export class UpdateDescriptionServiceAction extends ServiceAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  name: string;
  description: string;

  constructor(

    hash: string,
    version: number,
    changeLog: string,
    name: string,
    description: string,
  ) {
    super(name, changeLog);
    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.name = name;
    this.description = description;
  }
}


export class UpdateDescriptionServiceChangeAction extends ServiceChangeAction implements ActionDefaults {
  changeLog: string;
  name: string;
  description: string;

  constructor(
    changeLog: string,
    name: string,
    description: string,
  ) {
    super(name, changeLog);
    this.changeLog = changeLog;
    this.name = name;
    this.description = description;
  }
}


export class AddVersionServiceAction extends ServiceAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  name: string;
  inputType: string;
  outputType: string;
  inputVersion: number;
  inputHash: string;
  outputVersion: number;
  outputHash: string;

  constructor(
    hash: string,
    version: number,
    changeLog: string,
    name: string,
    inputType: string,
    outputType: string,
    inputVersion: number,
    inputHash: string,
    outputVersion: number,
    outputHash: string,
  ) {
    super(name, changeLog);
    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.name = name;
    this.inputType = inputType;
    this.outputType = outputType;
    this.inputVersion = inputVersion;
    this.inputHash = inputHash;
    this.outputVersion = outputVersion;
    this.outputHash = outputHash;
  }
}


export class AddVersionServiceChangeAction extends ServiceChangeAction implements ActionDefaults {
  changeLog: string;
  name: string;
  inputType: string;
  outputType: string;
  inputVersion: number;
  inputHash: string;
  outputVersion: number;
  outputHash: string;

  constructor(
    changeLog: string,
    name: string,
    inputType: string,
    outputType: string,
    inputVersion: number,
    inputHash: string,
    outputVersion: number,
    outputHash: string,
  ) {
    super(name, changeLog);
    this.changeLog = changeLog;
    this.name = name;
    this.inputType = inputType;
    this.outputType = outputType;
    this.inputVersion = inputVersion;
    this.inputHash = inputHash;
    this.outputVersion = outputVersion;
    this.outputHash = outputHash;
  }
};


export type GroupVersions = {
  [key: string]: number;
};


export class GroupAction {
  hash: string;
  actions: BaseAction[];
  versions: Map<string, number>;

  constructor(
    hash: string,
    actions: BaseAction[],
    versions: Map<string, number>
  ) {
    this.hash = hash;
    this.actions = actions;
    this.versions = versions;
  }
}
export class GroupChangeAction {
  actions: BaseChangeAction[];
  versions: Map<string, number>;

  constructor(
    actions: BaseChangeAction[],
  ) {
    this.actions = actions;
    this.versions = new Map();
  }
}

export function fieldsToHash(action: BaseChangeAction | GroupChangeAction) {
    if (
      action instanceof AddVersionServiceAction ||
      action instanceof AddVersionServiceChangeAction
    ) {
      return `${action.changeLog}_${action.name}_${action.inputType}_${action.outputType}_${action.inputVersion}_${action.outputVersion}`;
    } else if (
      action instanceof UpdateDescriptionServiceAction ||
      action instanceof UpdateDescriptionServiceChangeAction
    ) {
      return `${action.changeLog}_${action.name}_${action.description}`;
    } else if (
      action instanceof NewServiceAction ||
      action instanceof NewServiceChangeAction
    ) {
      return `${action.changeLog}_${action.name}_${action.description}`;
    } else if (
      action instanceof ReferenceFieldTypeAction ||
      action instanceof ReferenceFieldTypeChangeAction
    ) {
      return `${action.changeLog}_${action.name}_${action.fieldName}_${action.description}_${action.optional}_${action.referenceType}_${action.referenceHash}_${action.referenceVersion}`;
    } else if (
      action instanceof UpdateFieldDescriptionTypeAction ||
      action instanceof UpdateFieldDescriptionTypeChangeAction
    ) {
      return `${action.changeLog}_${action.name}_${action.fieldName}_${action.description}`;
    } else if (
      action instanceof AddFieldTypeAction ||
      action instanceof AddFieldTypeChangeAction
    ) {
      return `${action.changeLog}_${action.name}_${action.fieldName}_${action._type}_${action.description}_${action.optional}_${action._default}`;
    } else if (
      action instanceof RemoveDefaultFieldTypeAction ||
      action instanceof RemoveDefaultFieldTypeChangeAction
    ) {
      return `${action.changeLog}_${action.name}_${action.fieldName}`;
    } else if (
      action instanceof SetDefaultFieldTypeAction ||
      action instanceof SetDefaultFieldTypeChangeAction
    ) {
      return `${action.changeLog}_${action.name}_${action.fieldName}_${action._default}`;
    } else if (
      action instanceof DeleteFieldTypeAction ||
      action instanceof DeleteFieldTypeChangeAction
    ) {
      return `${action.changeLog}_${action.name}_${action.fieldName}`;
    } else if (
      action instanceof OptionalFieldTypeAction ||
      action instanceof OptionalFieldTypeChangeAction
    ) {
      return `${action.changeLog}_${action.name}_${action.fieldName}`;
    } else if (
      action instanceof RequiredFieldTypeAction ||
      action instanceof RequiredFieldTypeChangeAction
    ) {
      return `${action.changeLog}_${action.name}_${action.fieldName}`;
    } else if (
      action instanceof RenameFieldTypeAction ||
      action instanceof RenameFieldTypeChangeAction
    ) {
      return `${action.changeLog}_${action.name}_${action._from}_${action.to}`;
    } else if (
      action instanceof NewTypeAction ||
      action instanceof NewTypeChangeAction
    ) {
      return `${action.changeLog}_${action.name}_${action.description}`;
    } else if (
      action instanceof GroupAction
    ) {
      const subHashes: string[] = [];
      for (const subAction of action.actions) {
        subHashes.push(fieldsToHash(subAction));
      }
      return subHashes.join('_');
    } else {
      throw new Error(`Can't hash ${JSON.stringify(action, null, 4)}`)
    }
};


export class ChangeSet {
  id: string;
  log: BaseChangeAction[];
  baseHash?: string
  typeDefinition?: TypeDefinition[]

  constructor(
    id: string, 
    log: BaseChangeAction[], 
    baseHash?: string, 
    typeDefinition?: TypeDefinition[]
  ) {
    this.id = id;
    this.log = log;
    this.baseHash = baseHash;
    this.typeDefinition = typeDefinition;
  }
};

export function changeActionToAction(
  action: BaseChangeAction,
  hash: string,
  version: number
): BaseAction {
    if (action instanceof AddVersionServiceChangeAction) {
      return new AddVersionServiceAction(
        hash,
        version,
        action.changeLog,
        action.name,
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
        action.name,
        action.description
      );
    } else if (action instanceof NewServiceChangeAction) {
      return new NewServiceAction(
        hash,
        version,
        action.changeLog,
        action.name,
        action.description
      );
    } else if (action instanceof ReferenceFieldTypeChangeAction) {
      return new ReferenceFieldTypeAction(
        hash,
        version,
        action.changeLog,
        action.name,
        action.fieldName,
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
        action.name,
        action.fieldName,
        action.description
      );
    } else if (action instanceof AddFieldTypeChangeAction) {
      return new AddFieldTypeAction(
        hash,
        version,
        action.changeLog,
        action.name,
        action.fieldName,
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
        action.name,
        action.fieldName
      );
    } else if (action instanceof SetDefaultFieldTypeChangeAction) {
      return new SetDefaultFieldTypeAction(
        hash,
        version,
        action.changeLog,
        action.name,
        action.fieldName,
        action._default
      );
    } else if (action instanceof DeleteFieldTypeChangeAction) {
      return new DeleteFieldTypeAction(
        hash,
        version,
        action.changeLog,
        action.name,
        action.fieldName
      );
    } else if (action instanceof OptionalFieldTypeChangeAction) {
      return new OptionalFieldTypeAction(
        hash,
        version,
        action.changeLog,
        action.name,
        action.fieldName
      );
    } else if (action instanceof RequiredFieldTypeChangeAction) {
      return new RequiredFieldTypeAction(
        hash,
        version,
        action.changeLog,
        action.name,
        action.fieldName
      );
    } else if (action instanceof RenameFieldTypeChangeAction) {
      return new RenameFieldTypeAction(
        hash,
        version,
        action.changeLog,
        action.name,
        action._from,
        action.to
      );
    } else if (action instanceof NewTypeChangeAction) {
      return new NewTypeAction(
        hash,
        version,
        action.changeLog,
        action.name,
        action.description
      );
    } else {
      throw new Error(`Can't hash ${JSON.stringify(action, null, 4)}`)
    }
};

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

// function loadAction(rawAction: any): Action {
//   const commonFields = {
//     changeLog: stringNotNull(rawAction, 'changeLog'),
//     hash: stringNotNull(rawAction, 'hash'),
//     version: integerNotNull(rawAction, 'version'),
//   };
//   switch(rawAction.actionType) {
//   // Services
//   case 'NewServiceAction':
//     return ({
//       name: stringNotNull(rawAction, 'name'),
//       description: stringNotNull(rawAction, 'description'),
//       ...commonFields
//     });
//   case 'UpdateDescriptionServiceAction':
//     return ({
//       name: stringNotNull(rawAction, 'name'),
//       description: stringNotNull(rawAction, 'description'),
//       ...commonFields
//     });
//   case 'AddVersionServiceAction':
//     return ({
//       name: stringNotNull(rawAction, 'name'),
//       inputType: stringNotNull(rawAction, 'inputType'),
//       outputType: stringNotNull(rawAction, 'outputType'),
//       inputVersion: integerNotNull(rawAction, 'inputVersion'),
//       inputHash: stringNotNull(rawAction, 'inputHash'),
//       outputVersion: integerNotNull(rawAction, 'outputVersion'),
//       outputHash: stringNotNull(rawAction, 'outputHash'),
//       ...commonFields
//     });
//   // Types
//   case 'RenameFieldTypeAction':
//     return ({
//       name: stringNotNull(rawAction, 'name'),
//       _from: stringNotNull(rawAction, '_from'),
//       to: stringNotNull(rawAction, 'to'),
//       ...commonFields
//     });
//   case 'RequiredFieldTypeAction':
//     return ({
//       name: stringNotNull(rawAction, 'name'),
//       fieldName: stringNotNull(rawAction, 'fieldName'),
//       ...commonFields
//     });
//   case 'OptionalFieldTypeAction':
//     return ({
//       name: stringNotNull(rawAction, 'name'),
//       fieldName: stringNotNull(rawAction, 'fieldName'),
//       ...commonFields
//     });
//   case 'DeleteFieldTypeAction':
//     return ({
//       name: stringNotNull(rawAction, 'name'),
//       fieldName: stringNotNull(rawAction, 'fieldName'),
//       ...commonFields
//     });
//   case 'SetDefaultFieldTypeAction':
//     return ({
//       name: stringNotNull(rawAction, 'name'),
//       fieldName: stringNotNull(rawAction, 'fieldName'),
//       _default: stringNotNull(rawAction, '_default'),
//       ...commonFields
//     });
//   case 'RemoveDefaultFieldTypeAction':
//     return ({
//       name: stringNotNull(rawAction, 'name'),
//       fieldName: stringNotNull(rawAction, 'fieldName'),
//       ...commonFields
//     });
//   case 'AddFieldTypeAction':
//     if (FieldTypeValues.indexOf(rawAction.type) === -1) {
//       throw new ValidationError(
//         'Unknown field type ${rawAction.type} in action ${rawAction}'
//       );
//     }
//     return ({
//       name: stringNotNull(rawAction, 'name'),
//       fieldName: stringNotNull(rawAction, 'fieldName'),
//       _type: rawAction._type,
//       description: stringNotNull(rawAction, 'description'),
//       optional: booleanNotNull(rawAction, 'optional'),
//       _default: rawAction._default,
//       ...commonFields
//     });
//   case 'UpdateFieldDescriptionTypeAction':
//     return ({
//       name: stringNotNull(rawAction, 'name'),
//       fieldName: stringNotNull(rawAction, 'fieldName'),
//       description: stringNotNull(rawAction, 'description'),
//       ...commonFields
//     });
//   case 'ReferenceFieldTypeAction':
//     return ({
//       name: stringNotNull(rawAction, 'name'),
//       fieldName: stringNotNull(rawAction, 'fieldName'),
//       description: stringNotNull(rawAction, 'description'),
//       optional: booleanNotNull(rawAction, 'optional'),
//       referenceType: stringNotNull(rawAction, 'referenceType'),
//       referenceHash: stringNotNull(rawAction, 'referenceHash'),
//       referenceVersion: integerNotNull(rawAction, 'referenceVersion'),
//       ...commonFields
//     });
//   case 'NewTypeAction':
//     return ({
//       name: stringNotNull(rawAction, 'name'),
//       description: rawAction.description,
//       ...commonFields
//     });
//   default:
//     throw new ValidationError(`Unknown Action: ${rawAction}`)
//   }
// }

// export function loadActions(log: any[]): GroupAction[] {
//   const loadedActions: GroupAction[] = [];
//   for (let rawAction of log) {
//     if (rawAction.actionType !== 'GroupAction') {
//       throw new ValidationError(`Log entry must be GroupAction ${rawAction}`);
//     }
//     const groupedActions = [];
//     for (const subAction of rawAction.actions) {
//       groupedActions.push(loadAction(subAction));
//     }
//     const versions: GroupVersions = {};
//     Object.keys(rawAction.versions).forEach(key => {
//       if (!(typeof key === 'string')) {
//         throw new ValidationError(`version key must be a string key: ${key}, action: ${rawAction}`);
//       }

//       const version = rawAction.versions[key];
//       if (!(typeof version !== 'number')) {
//         throw new ValidationError(`version must be a number: key: ${key} version: ${version}, action: ${rawAction}`);
//       }

//       versions[key] = version;
//     })
//     loadedActions.push({
//       actions: groupedActions,
//       versions: versions,
//       hash: stringNotNull(rawAction, 'hash'),
//       version: integerNotNull(rawAction, 'version')
//     });
//   }

//   return loadedActions;
// }