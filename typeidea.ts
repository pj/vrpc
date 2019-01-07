import * as crypto from 'crypto';
import {compile} from 'ejs';
import * as fs from 'fs';
import * as prettier from 'prettier';
import * as action from './action';

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

type Hash = string | null;

export function hashAction(
  action: types.Action | service.ServiceAction,
  previous: string | null
) {
  const hash = crypto.createHash('sha256');

  if (previous !== null) {
    hash.update(previous);
  }

  const fieldsToHash = action.fieldsToHash();
  hash.update(fieldsToHash);

  return hash.digest('hex');
}

/**
* Take a list of types and verify the types and generate any empty types.
*/
export function hashActions(
  hashables: Array<action.Action>,
): Array<[number, string]> {
  const hashedTypes: Array<Array<[number, string]>> = [];
  for (const type of hashables) {
    const newHashes: Array<[number, string]> = [];
    const first = type[0];
    if (!(first instanceof types.NewAction || first instanceof service.NewServiceAction)) {
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
  type: types.FieldTypes;
  _default: types.FieldDefaults | null;

  constructor(
    name: string,
    changeLog: string,
    description: string,
    optional: boolean,
    type: types.FieldTypes,
    _default: types.FieldDefaults | null
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
  state: types.VersionState;
  fields: FieldObject;

  constructor(hash: string | null, fields: FieldObject, state: types.VersionState) {
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


function updateFields(action: types.Action, version: Version): void {
  if (action instanceof types.RenameAction) {
    const currentField = version.fields[action._from];
    const newField = currentField.copy();
    newField.name = action.to;
    newField.changeLog = action.changeLog;
    delete version.fields[action._from];
    version.fields[action.to] = newField;
  } else if (action instanceof types.RequiredAction) {
    const currentField = version.fields[action.name];
    const newField = currentField.copy();
    newField.optional = false;
    newField.changeLog = action.changeLog;
    version.fields[newField.name] = newField;
  } else if (action instanceof types.OptionalAction) {
    const currentField = version.fields[action.name];
    const newField = currentField.copy();
    newField.optional = true;
    newField.changeLog = action.changeLog;
    version.fields[newField.name] = newField;
  } else if (action instanceof types.DeleteAction) {
    const currentField = version.fields[action.name];
    const newField = currentField.copy();
    delete version.fields[currentField.name];
  } else if (action instanceof types.SetDefaultAction) {
    const currentField = version.fields[action.name];
    const newField = currentField.copy();
    if (newField instanceof Field) {
      newField._default = action._default;
    }
    newField.changeLog = action.changeLog;
    version.fields[newField.name] = newField;
  } else if (action instanceof types.RemoveDefaultAction) {
    const currentField = version.fields[action.name];
    const newField = currentField.copy();
    if (newField instanceof Field) {
      newField._default = null;
    }
    newField.changeLog = action.changeLog;
    version.fields[newField.name] = newField;
  } else if (action instanceof types.AddAction) {
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
  } else if (action instanceof types.UpdateDescriptionAction) {
    const currentField = version.fields[action.name];
    const newField = currentField.copy();
    newField.description = action.description;
    newField.changeLog = action.changeLog;
    version.fields[newField.name] = newField;
  } else if (action instanceof types.ReferenceAction) {
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
  } else if (action instanceof types.GroupAction) {
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
export function generateTypes(types: Array<Array<types.Action>>): Type[] {
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

    const name = (hashed[0] as types.NewAction).name;
    const description = (hashed[0] as types.NewAction).description;
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
  unhashedType: action.Action[],
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
