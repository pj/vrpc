import * as crypto from 'crypto';
// Actions

type FieldTypes = 'string' | 'boolean' | 'number';

type ActionName = 'New' | 'Rename' | 'Required' | 'Optional' | 'Delete' |
  'SetDefault' | 'RemoveDefault' | 'UpdateDescription' | 'Add' | 'Reference';

class Action {
  action: ActionName;
  changeLog: string;
  hash: string;

  constructor(action: ActionName, changeLog: string, hash: string) {
    this.action = action;
    this.changeLog = changeLog;
    this.hash = hash;
  }

  fieldsToHash(): string {
    return `${this.action}_${this.changeLog}`;
  };
}

export class NewAction extends Action {
  name: string;

  constructor(changeLog: string, hash: string, name: string) {
    super('New', changeLog, hash);
    this.name = name;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.name}`;
  };
}

export class RenameAction extends Action {
  _from: string;
  to: string;

  constructor(changeLog: string, hash: string, _from: string, to: string) {
    super('Rename', changeLog, hash);
    this._from = _from;
    this.to = to;
  }
}

export class RequiredAction extends Action {
  name: string;

  constructor(changeLog: string, hash: string, name: string) {
    super('Required', changeLog, hash);
    this.name = name;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.name}`;
  };
}

export class OptionalAction extends Action {
  name: string;

  constructor(changeLog: string, hash: string, name: string) {
    super('Optional', changeLog, hash);
    this.name = name;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.name}`;
  };
}

export class DeleteAction extends Action {
  name: string;

  constructor(changeLog: string, hash: string, name: string) {
    super('Delete', changeLog, hash);
    this.name = name;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.name}`;
  };
}

export class SetDefaultAction extends Action {
  name: string;
  _default: string | boolean | number;

  constructor(changeLog: string, hash: string, name: string, _default: string | boolean | number) {
    super('SetDefault', changeLog, hash);
    this.name = name;
    this._default = _default;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.name}_${this._default}`;
  };
}

export class RemoveDefaultAction extends Action {
  name: string;

  constructor(changeLog: string, hash: string, name: string) {
    super('RemoveDefault', changeLog, hash);
    this.name = name;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.name}`;
  };
}

export class AddAction extends Action {
  name: string;
  type: FieldTypes;
  description: string;
  optional: boolean;
  _default: string | boolean | number;

  constructor(
    changeLog: string, hash: string, name: string, type: FieldTypes,
    description: string, optional: boolean, _default: string | boolean | number
  ) {
    super('Add', changeLog, hash);
    this.name = name;
    this.type = type;
    this.description = description;
    this.optional = optional;
    this._default = _default;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.name}_${this.type}_${this.description}_${this.optional}_${this._default}`;
  };
}

export class UpdateDescriptionAction extends Action {
  name: string;
  description: string;

  constructor(changeLog: string, hash: string, name: string, description: string) {
    super('UpdateDescription', changeLog, hash);
    this.name = name;
    this.description = description;
  }
}

export class ReferenceAction extends Action {
  name: string;
  description: string;
  optional: boolean;
  referenceType: string;
  referenceHash: string;

  constructor(
    changeLog: string, hash: string, name: string, description: string,
    optional: boolean, referenceType: string, referenceHash: string
  ) {
    super('Reference', changeLog, hash);
    this.name = name;
    this.description = description;
    this.optional = optional;
    this.referenceType = referenceType;
    this.referenceHash = referenceHash;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.name}_${this.description}_${this.optional}_${this.referenceType}_${this.referenceHash}`;
  };
}
// services

function service(name) {

}

function hashAction(action: Action, previous: string) {
  const hash = crypto.createHash('sha256');

  if (previous !== null) {
    hash.update(previous);
  }

  const fieldsToHash = action.fieldsToHash();
  hash.update(fieldsToHash);

  return hash.digest('base64');
}

/*
Take a list of types and services and verify the types and generate any empty
types.
 */
export function hash(types: Array<Array<Action>>, services: any) {
  const newHashes = [];
  for (const type of types) {
    const first = type[0];
    if (first.action !== 'New') {
      throw new Error(`Type must start with a NewAction element ${first}`);
    }
    let previousHash = hashAction(first, null);
    if (previousHash !== first.hash) {
      throw new Error(`Invalid hash at item ${0} ${first}, did you change something?`)
    }
    let createHashes = false;

    for (let n = 1; n < type.length; n++) {
      let action = type[n];
      if (createHashes) {
        if (action.hash !== null) {
          throw new Error(`Hash entered when there were previous items without hashes index: ${n} action: ${action}`);
        }
        previousHash = hashAction(action, previousHash);
        newHashes.push([n, hashAction(action, previousHash)]);
      } else {
        if (action.hash === null) {
          previousHash = hashAction(action, previousHash);
          newHashes.push([n, previousHash]);
          createHashes = true;
        } else {
          const expectedHash = hashAction(action, previousHash);
          if (expectedHash !== action.hash) {
            throw new Error(`Invalid hash at item ${n} ${action}, did you change something?`)
          }
          previousHash = action.hash;
        }
      }
    }
  }

  return newHashes;
}

export class Field {
  name: string;
  type: FieldTypes;
  changeLog: string;
  description: string;
  optional: boolean;
  _default: number | boolean | string;

  constructor(
    name: string,
    type: FieldTypes,
    changeLog: string,
    description: string,
    optional: boolean,
    _default: number | boolean | string
  ) {
    this.name = name;
    this.type = type;
    this.changeLog = changeLog;
    this.description = description;
    this.optional = optional;
    this._default = _default;
  }
}

export class ReferenceField {
  name: string;
  changeLog: string;
  description: string;
  optional: boolean;
  referenceType: string;
  referenceHash: string;

  constructor(
    name: string,
    changeLog: string,
    description: string,
    optional: boolean,
    referenceType: string,
    referenceHash: string
  ) {
    this.name = name;
    this.changeLog = changeLog;
    this.description = description;
    this.optional = optional;
    this.referenceType = referenceType;
    this.referenceHash = referenceHash;
  }
}

export class Version {
  name: string;
  hash: string;
  fields: {};

  constructor(name: string, hash: string, fields: Array<Field>) {
    this.name = name;
    this.hash = hash;
    this.fields = fields;
  }
}

export class Type {
  name: string;
  versions: Version[];

  constructor(name: string) {
    this.name = name;
    this.versions = [];
  }
}
/*
Generate types and services (and verify).
 */
export function generateTypes(types: any, services: any): Type[] {
  const generatedTypes = [];
  for (const type of types) {
    const versions = [];
    for (let n = 0; n < type.length; n++) {
      const action = type[n];
      if (action.hash === null) {
        throw new Error(`No hash at ${n} ${action}, did you forget to add it?`)
      }
    }

    const first = type[0];
    if (first.action !== 'New') {
      throw new Error(`Type must start with a NewAction element ${first}`);
    }
    let previousHash = hashAction(first, null);
    if (previousHash !== first.hash) {
      throw new Error(`Invalid hash at item ${0} ${first}, did you change something?`)
    }
    let createHashes = false;

    for (let n = 1; n < type.length; n++) {
      let action = type[n];
      const expectedHash = hashAction(action, previousHash);
      if (expectedHash !== action.hash) {
        throw new Error(`Invalid hash at item ${n} ${action}, did you change something?`)
      }
      previousHash = action.hash;
    }

    const name = first.name;
    let previousVersion = null;
    const newType = new Type(name);

    for (let n = 1; n < type.length; n++) {
      let action = type[n];
      const newVersion = {...previousVersion};
      const newFields = {...newVersion.fields};
      newVersion.fields = newFields;
      const currentField = newVersion.fields.get(action.name);

      if (action instanceof RenameAction) {
        const newField = {...currentField};
        newField.name = action.to;
        newField.changeLog = action.changeLog;
        delete newFields[newField.from];
        newFields[newField.name] = newField;
      } else if (action instanceof RequiredAction) {
        const newField = {...currentField};
        newField.optional = false;
        newField.changeLog = action.changeLog;
        newFields[newField.name] = newField;
      } else if (action instanceof OptionalAction) {
        const newField = {...currentField};
        newField.optional = true;
        newField.changeLog = action.changeLog;
        newFields[newField.name] = newField;
      } else if (action instanceof DeleteAction) {
        delete newFields[currentField.name];
      } else if (action instanceof SetDefaultAction) {
        const newField = {...currentField};
        newField._default = action._default;
        newField.changeLog = action.changeLog;
        newFields[newField.name] = newField;
      } else if (action instanceof RemoveDefaultAction) {
        const newField = {...currentField};
        newField._default = null;
        newField.changeLog = action.changeLog;
        newFields[newField.name] = newField;
      } else if (action instanceof AddAction) {
        const newField = new Field(
          action.name,
          action.type,
          action.changeLog,
          action.description,
          action.optional,
          action._default
        );
        newFields[newField.name] = newField;
      } else if (action instanceof UpdateDescriptionAction) {
        const newField = {...currentField};
        newField.description = action.description;
        newField.changeLog = action.changeLog;
        newFields[newField.name] = newField;
      } else if (action instanceof ReferenceAction) {
        const newField = new ReferenceField(
          action.name,
          action.changeLog,
          action.description,
          action.optional,
          action.referenceType,
          action.referenceHash
        );
        newFields[newField.name] = newField;
      }

      newType.versions.push(newVersion);
      previousVersion = newVersion;
    }
    generatedTypes.push(newType);
  }

  return generatedTypes;
}

export function generateTypescript(types: Type[]) {


  const fileTemplate = `

  
  
  
  
`
}
