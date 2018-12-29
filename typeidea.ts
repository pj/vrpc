import * as crypto from 'crypto';
import {compile} from 'ejs';
import * as fs from 'fs';
import * as prettier from 'prettier';

const typescriptTypeFile = fs.readFileSync(
  './templates/typescript.ejs',
  {
    encoding: "utf8",
  }
);
const typescriptTypeTemplate = compile(
  typescriptTypeFile,
  {
    filename: './templates/typescript.ejs'
  }
);

type FieldTypes = 'string' | 'boolean' | 'number';

type FieldDefaults = string | boolean | number;

type Hash = string | null;

type VersionState = 'active' | 'deprecated' | 'dont_generate';

class Action {
  changeLog: string;
  hash: string | null;
  state: VersionState;

  constructor(changeLog: string, hash: string | null, state: VersionState) {
    this.changeLog = changeLog;
    this.hash = hash;
    this.state = state;
  }

  fieldsToHash(): string {
    return `${this.changeLog}`;
  };
}

export class NewAction extends Action {
  name: string;
  description: string;

  constructor(
    changeLog: string,
    hash: string | null,
    state: VersionState,
    name: string,
    description: string
  ) {
    super(changeLog, hash, state);
    this.name = name;
    this.description = description;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.name}`;
  };
}

export class RenameAction extends Action {
  _from: string;
  to: string;

  constructor(changeLog: string, hash: string | null, state: VersionState, _from: string, to: string) {
    super(changeLog, hash, state);
    this._from = _from;
    this.to = to;
  }
}

export class RequiredAction extends Action {
  name: string;

  constructor(changeLog: string, hash: string | null, state: VersionState, name: string) {
    super(changeLog, hash, state);
    this.name = name;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.name}`;
  };
}

export class OptionalAction extends Action {
  name: string;

  constructor(changeLog: string, hash: string | null, state: VersionState, name: string) {
    super(changeLog, hash, state);
    this.name = name;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.name}`;
  };
}

export class DeleteAction extends Action {
  name: string;

  constructor(changeLog: string, hash: string | null, state: VersionState, name: string) {
    super(changeLog, hash, state);
    this.name = name;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.name}`;
  };
}

export class SetDefaultAction extends Action {
  name: string;
  _default: FieldDefaults;

  constructor(changeLog: string, hash: string | null, state: VersionState, name: string, _default: FieldDefaults) {
    super(changeLog, hash, state);
    this.name = name;
    this._default = _default;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.name}_${this._default}`;
  };
}

export class RemoveDefaultAction extends Action {
  name: string;

  constructor(changeLog: string, hash: string | null, state: VersionState, name: string) {
    super(changeLog, hash, state);
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
  _default: FieldDefaults | null;

  constructor(
    changeLog: string, hash: string | null, state: VersionState, name: string, type: FieldTypes,
    description: string, optional: boolean, _default: FieldDefaults | null
  ) {
    super(changeLog, hash, state);
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

  constructor(changeLog: string, hash: string | null, state: VersionState, name: string, description: string) {
    super(changeLog, hash, state);
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
    changeLog: string, hash: string | null, state: VersionState, name: string, description: string,
    optional: boolean, referenceType: string, referenceHash: string
  ) {
    super(changeLog, hash, state);
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

export class GroupAction extends Action {
  actions: Action[];

  constructor(
    changeLog: string, hash: string | null, state: VersionState, actions: Action[],
  ) {
    super(changeLog, hash, state);
    this.actions = actions;
  }

  fieldsToHash(): string {
    const subHashes: string[] = [];
    for (const action of this.actions) {
      subHashes.push(action.fieldsToHash());
    }
    return subHashes.join('_');
  };
}

// services

function service(name: string) {

}

function hashAction(action: Action, previous: string | null) {
  const hash = crypto.createHash('sha256');

  if (previous !== null) {
    hash.update(previous);
  }

  const fieldsToHash = action.fieldsToHash();
  hash.update(fieldsToHash);

  return hash.digest('hex');
}

/*
Take a list of types and services and verify the types and generate any empty
types.
 */
export function hashTypes(
  types: Array<Array<Action>>,
  services: any
): Array<Array<[number, string]>> {
  const hashedTypes: Array<Array<[number, string]>> = [];
  for (const type of types) {
    const newHashes: Array<[number, string]> = [];
    const first = type[0];
    if (!(first instanceof NewAction)) {
      throw new Error(`Type must start with a NewAction element ${first}`);
    }
    let previousHash = hashAction(first, null);
    if (first.hash === null) {
      newHashes.push([0, previousHash]);
    }
    if (first.hash !== null && previousHash !== first.hash) {
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
        newHashes.push([n, previousHash]);
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

    hashedTypes.push(newHashes);
  }

  return hashedTypes;
}

export class BaseField {
  name: string;
  changeLog: string;
  description: string;
  optional: boolean;

  constructor(
    name: string,
    changeLog: string,
    description: string,
    optional: boolean,
  ) {
    this.name = name;
    this.changeLog = changeLog;
    this.description = description;
    this.optional = optional;
  }

  fieldType(): string {
    throw new Error("Not implemented");
  }

  copy(): BaseField {
    throw new Error("Not implemented");
  }
}

export class Field extends BaseField {
  type: FieldTypes;
  _default: FieldDefaults | null;

  constructor(
    name: string,
    changeLog: string,
    description: string,
    optional: boolean,
    type: FieldTypes,
    _default: FieldDefaults | null
  ) {
    super(name, changeLog, description, optional);
    this.type = type;
    this._default = _default;
  }

  copy(): Field {
    return new Field(
      this.name,
      this.changeLog,
      this.description,
      this.optional,
      this.type,
      this._default
    );
  }

  fieldType(): string {
    return this.type + (this.optional ? " | null" : "");
  }

  formattedDefault(): string {
    if (!this._default) {
      return "";
    }
    if (this.type === 'string') {
      return `"${this._default}"`;
    }
    return "" + this._default;
  }
}

export class ReferenceField extends BaseField {
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
    super(name, changeLog, description, optional);
    this.referenceType = referenceType;
    this.referenceHash = referenceHash;
  }

  copy() {
    return new ReferenceField(
      this.name,
      this.changeLog,
      this.description,
      this.optional,
      this.referenceType,
      this.referenceHash
    );
  }

  fieldType() {
    return `${this.referenceType}.h_${this.referenceHash}`;
  }

  formattedDefault(): string {
    return "";
  }
}

type FieldObject = {
  [key: string]: BaseField;
};

export class Version {
  hash: string | null;
  state: VersionState;
  fields: FieldObject;

  constructor(hash: string | null, fields: FieldObject, state: VersionState) {
    this.hash = hash;
    this.state = state;
    this.fields = fields;
  }
}

export class Type {
  name: string;
  versions: Version[];
  latest: Version | null;
  changeLog: string[];
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.versions = [];
    this.latest = null;
    this.changeLog = [];
  }
}


function updateFields(action: Action, version: Version): void {
  if (action instanceof RenameAction) {
    const currentField = version.fields[action._from];
    const newField = currentField.copy();
    newField.name = action.to;
    newField.changeLog = action.changeLog;
    delete version.fields[action._from];
    version.fields[action.to] = newField;
  } else if (action instanceof RequiredAction) {
    const currentField = version.fields[action.name];
    const newField = currentField.copy();
    newField.optional = false;
    newField.changeLog = action.changeLog;
    version.fields[newField.name] = newField;
  } else if (action instanceof OptionalAction) {
    const currentField = version.fields[action.name];
    const newField = currentField.copy();
    newField.optional = true;
    newField.changeLog = action.changeLog;
    version.fields[newField.name] = newField;
  } else if (action instanceof DeleteAction) {
    const currentField = version.fields[action.name];
    const newField = currentField.copy();
    delete version.fields[currentField.name];
  } else if (action instanceof SetDefaultAction) {
    const currentField = version.fields[action.name];
    const newField = currentField.copy();
    if (newField instanceof Field) {
      newField._default = action._default;
    }
    newField.changeLog = action.changeLog;
    version.fields[newField.name] = newField;
  } else if (action instanceof RemoveDefaultAction) {
    const currentField = version.fields[action.name];
    const newField = currentField.copy();
    if (newField instanceof Field) {
      newField._default = null;
    }
    newField.changeLog = action.changeLog;
    version.fields[newField.name] = newField;
  } else if (action instanceof AddAction) {
    const currentField = version.fields[action.name];
    const newField = new Field(
      action.name,
      action.changeLog,
      action.description,
      action.optional,
      action.type,
      action._default
    );
    version.fields[newField.name] = newField;
  } else if (action instanceof UpdateDescriptionAction) {
    const currentField = version.fields[action.name];
    const newField = currentField.copy();
    newField.description = action.description;
    newField.changeLog = action.changeLog;
    version.fields[newField.name] = newField;
  } else if (action instanceof ReferenceAction) {
    const currentField = version.fields[action.name];
    const newField = new ReferenceField(
      action.name,
      action.changeLog,
      action.description,
      action.optional,
      action.referenceType,
      action.referenceHash
    );
    version.fields[newField.name] = newField;
  } else if (action instanceof GroupAction) {
    for (const subAction of action.actions) {
      updateFields(subAction, version);
    }
  } else {
    throw new Error(`Unknown action type: ${action.constructor.name}`)
  }
}

/*
Generate types and services (and verify).
 */
export function generateTypes(types: Array<Array<Action>>, services: any): Type[] {
  const generatedTypes = [];
  for (const type of types) {
    const versions = [];
    let previousHash = null;
    const hashed = [];
    const latest = [];
    const changeLog = [];
    let notHashed = false;
    for (let n = 0; n < type.length; n++) {
      const action = type[n];
      if (notHashed) {
        if (action.hash !== null) {
          throw new Error(`Hashed action after unhashed action at ${n} ${action}`);
        }
        latest.push(action);
      } else if (action.hash === null) {
        notHashed = true;
        latest.push(action);
      } else {
        const expectedHash = hashAction(action, previousHash);
        if (expectedHash !== action.hash) {
          throw new Error(`Invalid hash at item ${n} ${action}, did you change something?`)
        }
        hashed.push(action);
        previousHash = expectedHash;
      }
    }

    const name = (hashed[0] as NewAction).name;
    const description = (hashed[0] as NewAction).description;
    let previousVersion = null;
    const newType = new Type(name, description);

    for (let n = 1; n < hashed.length; n++) {
      let action = hashed[n];
      const newVersion = new Version(action.hash, {}, action.state);
      if (previousVersion) {
        newVersion.fields = {...previousVersion.fields}
      }

      updateFields(action, newVersion);
      changeLog.push(action.changeLog);

      newType.versions.push(newVersion);
      previousVersion = newVersion;
    }
    let latestVersion = null;
    if (latest.length > 0) {
      latestVersion = new Version(null, {}, 'active');
      if (previousVersion) {
        latestVersion.fields = {...previousVersion.fields};
      }
      for (let n = 0; n < latest.length; n++) {
        const action = latest[n];
        changeLog.push(action.changeLog);
        updateFields(action, latestVersion);
      }
    }
    newType.latest = latestVersion;
    newType.changeLog = changeLog;
    generatedTypes.push(newType);
  }

  return generatedTypes;
}

export function generateTypescript(types: Type[]) {
  return types.map((_type) => {
    // load imports.
    const imports = new Set();
    for (const version of _type.versions) {
      for (const field of Object.values(version.fields)) {
        if (field instanceof ReferenceField) {
          imports.add(field.referenceType);
        }
      }
    }
    return [
      _type,
      prettier.format(
        typescriptTypeTemplate(
          {
            versions: _type.versions,
            imports: imports,
            latest: _type.latest,
            changeLog: _type.changeLog,
            description: _type.description
          }
        ),
        {parser: 'typescript'},
      )
    ];
  }
  );
}

export function addHashes(
  unhashedType: Action[],
  hashes: Array<[number, string]>,
  hashTo: number | null
) {
  const hashed = unhashedType.slice();
  if (hashTo === null) {
    hashTo = unhashedType.length;
  }
  for (let i = hashes[0][0]; i < hashTo; i++) {
    const hash = hashes[i][1];
    const action = unhashedType[i];
    const newAction = Object.assign(
      Object.create(Object.getPrototypeOf(action)),
      action
    );
    newAction.hash = hash
    hashed[i] = newAction;
  }

  return hashed;
}

function createActions(actions: any[]): Action[] {
  const log = [];

  for (const action of actions) {
    switch(action._action_type) {
      case 'RenameAction':
        log.push(new RenameAction(
          action.changeLog,
          action.hash,
          action.state,
          action._from,
          action.to)
        );
        break;
      case 'RequiredAction':
        log.push(new RequiredAction(action.changeLog, action.hash, action.state, action.name));
        break;
      case 'OptionalAction':
        log.push(new OptionalAction(action.changeLog, action.hash, action.state, action.name));
        break;
      case 'DeleteAction':
        log.push(new DeleteAction(action.changeLog, action.hash, action.state, action.name));
        break;
      case 'SetDefaultAction':
        log.push(new SetDefaultAction(action.changeLog, action.hash, action.state, action.name, action._default));
        break;
      case 'RemoveDefaultAction':
        log.push(new RemoveDefaultAction(action.changeLog, action.hash, action.state, action.name));
        break;
      case 'AddAction':
        log.push(new AddAction(action.changeLog, action.hash, action.state, action.name, action.type, action.description, action.optional, action._default));
        break;
      case 'UpdateDescriptionAction':
        log.push(new UpdateDescriptionAction(action.changeLog, action.hash, action.state, action.name, action.description));
        break;
      case 'ReferenceAction':
        log.push(new ReferenceAction(action.changeLog, action.hash, action.state, action.name, action.description, action.optional, action.referenceType, action.referenceHash));
        break;
      case 'NewAction':
        log.push(new NewAction(action.changeLog, action.hash, action.state, action.name, action.description));
        break;
      case 'GroupAction':
        const groupedActions = createActions(action.actions);
        log.push(new GroupAction(action.changeLog, action.hash, action.state, groupedActions));
        break;
    }
  }

  return log;
}

export function loadActions(path: string): Array<Array<Action>> {
  const types = require(path);
  const outputTypes = [];

  for (const _type of types) {
    const log = createActions(_type);
    outputTypes.push(log);
  }

  return outputTypes;
}
