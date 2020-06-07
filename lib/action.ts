import { TypeDefinition, Type } from './generated/type_definition';

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

// Types
export class NewTypeAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  typeName: string;
  description: string;
  constructor(hash: string, version: number, changeLog: string, typeName: string, description: string) {
    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.typeName = typeName;
    this.description = description;
  }
}

export class NewTypeChangeAction implements ActionDefaults {
  changeLog: string;
  typeName: string;
  description: string;
  constructor(changeLog: string, typeName: string, description: string, ) {

    this.changeLog = changeLog;
    this.typeName = typeName;
    this.description = description;
  }
}

export class RenameFieldTypeAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  typeName: string;
  _from: string;
  to: string;
  constructor(

    hash: string,
    version: number,
    changeLog: string,
    typeName: string,
    _from: string,
    to: string,
  ) {

    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.typeName = typeName;
    this._from = _from;
    this.to = to;
  }
}

export class RenameFieldTypeChangeAction implements ActionDefaults {
  changeLog: string;
  typeName: string;
  _from: string;
  to: string;
  constructor(
    changeLog: string,
    typeName: string,
    _from: string,
    to: string,
  ) {


    this.changeLog = changeLog;
    this.typeName = typeName;
    this._from = _from;
    this.to = to;
  }
}

export class RequiredFieldTypeAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  typeName: string;
  name: string;

  constructor(

    hash: string,
    version: number,
    changeLog: string,
    typeName: string,
    name: string,
  ) {

    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.typeName = typeName;
    this.name = name;
  }
}

export class RequiredFieldTypeChangeAction implements ActionDefaults {
  changeLog: string;
  typeName: string;
  name: string;

  constructor(

    changeLog: string,
    typeName: string,
    name: string,
  ) {

    this.changeLog = changeLog;
    this.typeName = typeName;
    this.name = name;
  }
}

export class OptionalFieldTypeAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  typeName: string;
  name: string;

  constructor(

    hash: string,
    version: number,
    changeLog: string,
    typeName: string,
    name: string,
  ) {

    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.typeName = typeName;
    this.name = name;
  }
}

export class OptionalFieldTypeChangeAction implements ActionDefaults {
  changeLog: string;
  typeName: string;
  name: string;

  constructor(

    changeLog: string,
    typeName: string,
    name: string,
  ) {

    this.changeLog = changeLog;
    this.typeName = typeName;
    this.name = name;
  }
}

export class DeleteFieldTypeAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  typeName: string;
  name: string;

  constructor(

    hash: string,
    version: number,
    changeLog: string,
    typeName: string,
    name: string,
  ) {

    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.typeName = typeName;
    this.name = name;
  }
}


export class DeleteFieldTypeChangeAction implements ActionDefaults {
  changeLog: string;
  typeName: string;
  name: string;

  constructor(

    changeLog: string,
    typeName: string,
    name: string,
  ) {

    this.changeLog = changeLog;
    this.typeName = typeName;
    this.name = name;
  }
}


export class SetDefaultFieldTypeAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  typeName: string;
  name: string;
  _default: FieldDefaults;

  constructor(

    hash: string,
    version: number,
    changeLog: string,
    typeName: string,
    name: string,
    _default: FieldDefaults,
  ) {

    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.typeName = typeName;
    this.name = name;
    this._default = _default;
  }
}


export class SetDefaultFieldTypeChangeAction implements ActionDefaults {
  changeLog: string;
  typeName: string;
  name: string;
  _default: FieldDefaults;

  constructor(

    changeLog: string,
    typeName: string,
    name: string,
    _default: FieldDefaults,
  ) {

    this.changeLog = changeLog;
    this.typeName = typeName;
    this.name = name;
    this._default = _default;
  }
}


export class RemoveDefaultFieldTypeAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  typeName: string;
  name: string;

  constructor(

    hash: string,
    version: number,
    changeLog: string,
    typeName: string,
    name: string,
  ) {

    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.typeName = typeName;
    this.name = name;
  }
}


export class RemoveDefaultFieldTypeChangeAction implements ActionDefaults {
  changeLog: string;
  typeName: string;
  name: string;

  constructor(

    changeLog: string,
    typeName: string,
    name: string,
  ) {

    this.changeLog = changeLog;
    this.typeName = typeName;
    this.name = name;
  }
}


export class AddFieldTypeAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  typeName: string;
  name: string;
  _type: Type;
  description: string;
  optional: boolean;
  _default?: FieldDefaults;

  constructor(

    hash: string,
    version: number,
    changeLog: string,
    typeName: string,
    name: string,
    _type: Type,
    description: string,
    optional: boolean,
    _default?: FieldDefaults,
  ) {

    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.typeName = typeName;
    this.name = name;
    this._type = _type;
    this.description = description;
    this.optional = optional;
    this._default = _default;
  }
}


export class AddFieldTypeChangeAction implements ActionDefaults {
  changeLog: string;
  typeName: string;
  name: string;
  _type: Type;
  description: string;
  optional: boolean;
  _default?: FieldDefaults;

  constructor(

    changeLog: string,
    typeName: string,
    name: string,
    _type: Type,
    description: string,
    optional: boolean,
    _default?: FieldDefaults,
  ) {

    this.changeLog = changeLog;
    this.typeName = typeName;
    this.name = name;
    this._type = _type;
    this.description = description;
    this.optional = optional;
    this._default = _default;
  }
}


export class UpdateFieldDescriptionTypeAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  typeName: string;
  name: string;
  description: string;

  constructor(

    hash: string,
    version: number,
    changeLog: string,
    typeName: string,
    name: string,
    description: string,
  ) {

    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.typeName = typeName;
    this.name = name;
    this.description = description;
  }
}


export class UpdateFieldDescriptionTypeChangeAction implements ActionDefaults {
  changeLog: string;
  typeName: string;
  name: string;
  description: string;

  constructor(

    changeLog: string,
    typeName: string,
    name: string,
    description: string,
  ) {

    this.changeLog = changeLog;
    this.typeName = typeName;
    this.name = name;
    this.description = description;
  }
}


export class ReferenceFieldTypeAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  typeName: string;
  name: string;
  description: string;
  optional: boolean;
  referenceType: string;
  referenceHash: string;
  referenceVersion: number;

  constructor(

    hash: string,
    version: number,
    changeLog: string,
    typeName: string,
    name: string,
    description: string,
    optional: boolean,
    referenceType: string,
    referenceHash: string,
    referenceVersion: number,
  ) {

    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.typeName = typeName;
    this.name = name;
    this.description = description;
    this.optional = optional;
    this.referenceType = referenceType;
    this.referenceHash = referenceHash;
    this.referenceVersion = referenceVersion;
  }
}


export class ReferenceFieldTypeChangeAction implements ActionDefaults {
  changeLog: string;
  typeName: string;
  name: string;
  description: string;
  optional: boolean;
  referenceType: string;
  referenceHash: string;
  referenceVersion: number;

  constructor(

    changeLog: string,
    typeName: string,
    name: string,
    description: string,
    optional: boolean,
    referenceType: string,
    referenceHash: string,
    referenceVersion: number,
  ) {

    this.changeLog = changeLog;
    this.typeName = typeName;
    this.name = name;
    this.description = description;
    this.optional = optional;
    this.referenceType = referenceType;
    this.referenceHash = referenceHash;
    this.referenceVersion = referenceVersion;
  }
}

// Service Definitions

export class NewServiceAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  serviceName: string;
  description: string;

  constructor(

    hash: string,
    version: number,
    changeLog: string,
    serviceName: string,
    description: string,

  ) {

    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.serviceName = serviceName;
    this.description = description;
  }
}


export class NewServiceChangeAction implements ActionDefaults {
  changeLog: string;
  serviceName: string;
  description: string;

  constructor(

    changeLog: string,
    serviceName: string,
    description: string,
  ) {

    this.changeLog = changeLog;
    this.serviceName = serviceName;
    this.description = description;
  }
}



export class UpdateDescriptionServiceAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  serviceName: string;
  description: string;

  constructor(

    hash: string,
    version: number,
    changeLog: string,
    serviceName: string,
    description: string,
  ) {

    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.serviceName = serviceName;
    this.description = description;
  }
}


export class UpdateDescriptionServiceChangeAction implements ActionDefaults {
  changeLog: string;
  serviceName: string;
  description: string;

  constructor(

    changeLog: string,
    serviceName: string,
    description: string,
  ) {

    this.changeLog = changeLog;
    this.serviceName = serviceName;
    this.description = description;
  }
}


export class AddVersionServiceAction implements HashedAction, ActionDefaults {
  hash: string;
  version: number;
  changeLog: string;
  serviceName: string;
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
    serviceName: string,
    inputType: string,
    outputType: string,
    inputVersion: number,
    inputHash: string,
    outputVersion: number,
    outputHash: string,
  ) {

    this.hash = hash;
    this.version = version;
    this.changeLog = changeLog;
    this.serviceName = serviceName;
    this.inputType = inputType;
    this.outputType = outputType;
    this.inputVersion = inputVersion;
    this.inputHash = inputHash;
    this.outputVersion = outputVersion;
    this.outputHash = outputHash;
  }
}


export class AddVersionServiceChangeAction implements ActionDefaults {
  changeLog: string;
  serviceName: string;
  inputType: string;
  outputType: string;
  inputVersion: number;
  inputHash: string;
  outputVersion: number;
  outputHash: string;

  constructor(

    changeLog: string,
    serviceName: string,
    inputType: string,
    outputType: string,
    inputVersion: number,
    inputHash: string,
    outputVersion: number,
    outputHash: string,
  ) {

    this.changeLog = changeLog;
    this.serviceName = serviceName;
    this.inputType = inputType;
    this.outputType = outputType;
    this.inputVersion = inputVersion;
    this.inputHash = inputHash;
    this.outputVersion = outputVersion;
    this.outputHash = outputHash;
  }
};

export type Action = NewTypeAction | RenameFieldTypeAction
  | RequiredFieldTypeAction | OptionalFieldTypeAction | DeleteFieldTypeAction
  | SetDefaultFieldTypeAction | RemoveDefaultFieldTypeAction | AddFieldTypeAction
  | UpdateFieldDescriptionTypeAction | ReferenceFieldTypeAction | NewServiceAction
  | UpdateDescriptionServiceAction | AddVersionServiceAction;

export type ChangeAction = NewTypeChangeAction | RenameFieldTypeChangeAction
  | RequiredFieldTypeChangeAction | OptionalFieldTypeChangeAction
  | DeleteFieldTypeChangeAction | SetDefaultFieldTypeChangeAction
  | RemoveDefaultFieldTypeChangeAction | AddFieldTypeChangeAction
  | UpdateFieldDescriptionTypeChangeAction | ReferenceFieldTypeChangeAction
  | NewServiceChangeAction | UpdateDescriptionServiceChangeAction
  | AddVersionServiceChangeAction;


export type GroupVersions = {
  [key: string]: number;
};


export class GroupAction implements HashedAction {
  hash: string;
  version: number;
  actions: Action[];
  versions: GroupVersions;

  constructor(
    hash: string,
    version: number,
    actions: Action[],
    versions: GroupVersions
  ) {
    this.hash = hash;
    this.version = version;
    this.actions = actions;
    this.versions = versions;
  }
}
export class GroupChangeAction {
  actions: Action[];
  versions: GroupVersions;
}

export function fieldsToHash(action: ChangeAction | GroupChangeAction) {
    if (
      action instanceof AddVersionServiceAction ||
      action instanceof AddVersionServiceChangeAction
    ) {
      return `${action.changeLog}_${action.serviceName}_${action.inputType}_${action.outputType}_${action.inputVersion}_${action.outputVersion}`;
    } else if (
      action instanceof UpdateDescriptionServiceAction ||
      action instanceof UpdateDescriptionServiceChangeAction
    ) {
      return `${action.changeLog}_${action.serviceName}_${action.description}`;
    } else if (
      action instanceof NewServiceAction ||
      action instanceof NewServiceChangeAction
    ) {
      return `${action.changeLog}_${action.serviceName}_${action.description}`;
    } else if (
      action instanceof ReferenceFieldTypeAction ||
      action instanceof ReferenceFieldTypeChangeAction
    ) {
      return `${action.changeLog}_${action.typeName}_${action.name}_${action.description}_${action.optional}_${action.referenceType}_${action.referenceHash}_${action.referenceVersion}`;
    } else if (
      action instanceof UpdateFieldDescriptionTypeAction ||
      action instanceof UpdateFieldDescriptionTypeChangeAction
    ) {
      return `${action.changeLog}_${action.typeName}_${action.name}_${action.description}`;
    } else if (
      action instanceof AddFieldTypeAction ||
      action instanceof AddFieldTypeChangeAction
    ) {
      return `${action.changeLog}_${action.typeName}_${action.name}_${action._type}_${action.description}_${action.optional}_${action._default}`;
    } else if (
      action instanceof RemoveDefaultFieldTypeAction ||
      action instanceof RemoveDefaultFieldTypeChangeAction
    ) {
      return `${action.changeLog}_${action.typeName}_${action.name}`;
    } else if (
      action instanceof SetDefaultFieldTypeAction ||
      action instanceof SetDefaultFieldTypeChangeAction
    ) {
      return `${action.changeLog}_${action.typeName}_${action.name}_${action._default}`;
    } else if (
      action instanceof DeleteFieldTypeAction ||
      action instanceof DeleteFieldTypeChangeAction
    ) {
      return `${action.changeLog}_${action.typeName}_${action.name}`;
    } else if (
      action instanceof OptionalFieldTypeAction ||
      action instanceof OptionalFieldTypeChangeAction
    ) {
      return `${action.changeLog}_${action.typeName}_${action.name}`;
    } else if (
      action instanceof RequiredFieldTypeAction ||
      action instanceof RequiredFieldTypeChangeAction
    ) {
      return `${action.changeLog}_${action.typeName}_${action.name}`;
    } else if (
      action instanceof RenameFieldTypeAction ||
      action instanceof RenameFieldTypeChangeAction
    ) {
      return `${action.changeLog}_${action.typeName}_${action._from}_${action.to}`;
    } else if (
      action instanceof NewTypeAction ||
      action instanceof NewTypeChangeAction
    ) {
      return `${action.changeLog}_${action.typeName}_${action.description}`;
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
  log: ChangeAction[];
  baseHash?: string
  typeDefinition?: TypeDefinition[]

  constructor(id: string, log: ChangeAction[], baseHash?: string, typeDefinition?: TypeDefinition[]) {
    this.id = id;
    this.log = log;
    this.baseHash = baseHash;
    this.typeDefinition = typeDefinition;
  }
};