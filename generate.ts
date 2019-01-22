import * as action from './action';
import * as typeidea from './typeidea';
import {compile} from 'ejs';
import * as fs from 'fs';
import * as prettier from 'prettier';

type VersionState = 'active' | 'removed' | 'deprecated';

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
  type: action.FieldTypes;
  _default: action.FieldDefaults | null;

  constructor(
    name: string,
    changeLog: string,
    description: string,
    optional: boolean,
    type: action.FieldTypes,
    _default: action.FieldDefaults | null
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
  fields: FieldObject;

  constructor(hash: string | null, fields: FieldObject) {
    this.hash = hash;
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

//export function generateTypescript(types: Type[]) {
//  return types.map((_type) => {
//    // load imports.
//    const imports = new Set();
//    for (const version of _type.versions) {
//      for (const field of Object.values(version.fields)) {
//        if (field instanceof ReferenceField) {
//          imports.add(field.referenceType);
//        }
//      }
//    }
//    return [
//      _type,
//      prettier.format(
//        typescriptTypeTemplate(
//          {
//            versions: _type.versions,
//            imports: imports,
//            latest: _type.latest,
//            changeLog: _type.changeLog,
//            description: _type.description
//          }
//        ),
//        {parser: 'typescript'},
//      )
//    ];
//  }
//  );
//}

export class ServiceVersion {
  version: string;
  state: VersionState;

  constructor(
    version: string,
    state: VersionState,
  ) {
    this.version = version;
    this.state = state;
  }
}

export class Service {
  name: string;
  changeLog: string[];
  description: string;
  inputType: string;
  outputType: string;
  inputVersions: ServiceVersion[];
  outputVersions: ServiceVersion[];
  latest: ServiceVersion[] | null;

  constructor(
    name: string,
    description: string,
    inputType: string,
    outputType: string,
  ) {
    this.name = name;
    this.description = description;
    this.changeLog = [];
    this.inputType = inputType;
    this.outputType = outputType;
    this.inputVersions = [];
    this.outputVersions = [];
    this.latest = [];
  }
}

function updateVersion(newVersion: Version, logAction: action.Action) {
  if (logAction instanceof action.RenameFieldTypeAction) {
    const currentField = newVersion.fields[logAction._from];
    const newField = currentField.copy();
    newField.name = logAction.to;
    newField.changeLog = logAction.changeLog;
    delete newVersion.fields[logAction._from];
    newVersion.fields[logAction.to] = newField;
  } else if (logAction instanceof action.RequiredFieldTypeAction) {
    const currentField = newVersion.fields[logAction.name];
    const newField = currentField.copy();
    newField.optional = false;
    newField.changeLog = logAction.changeLog;
    newVersion.fields[newField.name] = newField;
  } else if (logAction instanceof action.OptionalFieldTypeAction) {
    const currentField = newVersion.fields[logAction.name];
    const newField = currentField.copy();
    newField.optional = true;
    newField.changeLog = logAction.changeLog;
    newVersion.fields[newField.name] = newField;
  } else if (logAction instanceof action.DeleteFieldTypeAction) {
    const currentField = newVersion.fields[logAction.name];
    const newField = currentField.copy();
    delete newVersion.fields[currentField.name];
  } else if (logAction instanceof action.SetDefaultFieldTypeAction) {
    const currentField = newVersion.fields[logAction.name];
    const newField = currentField.copy();
    if (newField instanceof Field) {
      newField._default = logAction._default;
    }
    newField.changeLog = logAction.changeLog;
    newVersion.fields[newField.name] = newField;
  } else if (logAction instanceof action.RemoveDefaultFieldTypeAction) {
    const currentField = newVersion.fields[logAction.name];
    const newField = currentField.copy();
    if (newField instanceof Field) {
      newField._default = null;
    }
    newField.changeLog = logAction.changeLog;
    newVersion.fields[newField.name] = newField;
  } else if (logAction instanceof action.AddFieldTypeAction) {
    const currentField = newVersion.fields[logAction.name];
    const newField = new Field(
      logAction.name,
      logAction.changeLog,
      logAction.description,
      logAction.optional,
      logAction.type,
      logAction._default
    );
    newVersion.fields[newField.name] = newField;
  } else if (logAction instanceof action.UpdateDescriptionTypeAction) {
    const currentField = newVersion.fields[logAction.name];
    const newField = currentField.copy();
    newField.description = logAction.description;
    newField.changeLog = logAction.changeLog;
    newVersion.fields[newField.name] = newField;
  } else if (logAction instanceof action.ReferenceFieldTypeAction) {
    const currentField = newVersion.fields[logAction.name];
    const newField = new ReferenceField(
      logAction.name,
      logAction.changeLog,
      logAction.description,
      logAction.optional,
      logAction.referenceType,
      logAction.referenceHash
    );
    newVersion.fields[newField.name] = newField;
  }
}

function updateTypeFields(
  logAction: action.Action,
  types: Map<string, Type>,
  groupingVersions: Map<string, Version> | null,
  isLatest: boolean,
) {
  if (!(
    logAction instanceof action.RenameFieldTypeAction ||
    logAction instanceof action.RequiredFieldTypeAction ||
    logAction instanceof action.OptionalFieldTypeAction ||
    logAction instanceof action.DeleteFieldTypeAction ||
    logAction instanceof action.SetDefaultFieldTypeAction ||
    logAction instanceof action.RemoveDefaultFieldTypeAction ||
    logAction instanceof action.AddFieldTypeAction ||
    logAction instanceof action.UpdateDescriptionTypeAction ||
    logAction instanceof action.ReferenceFieldTypeAction)
  ) {
    return;
  }

  if (!types.has(logAction.typeName)) {
    throw new Error(`Type ${logAction.typeName} does not exist.`);
  }
  const _type = types.get(logAction.typeName);
  if (_type === undefined) {
    throw new Error(`This should not happen because it was added for typescript`);
  }

  let newVersion;
  if (isLatest) {
    if (_type.latest === null) {
      newVersion = new Version(logAction.hash, {});
      if (_type.versions.length > 0) {
        newVersion.fields = {..._type.versions[_type.versions.length-1].fields};
      }
      _type.latest = newVersion;
    } else {
      newVersion = _type.latest;
    }
  } else if (groupingVersions === null) {
    newVersion = new Version(logAction.hash, {});
    if (_type.versions.length > 0) {
      newVersion.fields = {..._type.versions[_type.versions.length-1].fields};
    }
  } else {
    newVersion = groupingVersions.get(_type.name);
    if (newVersion === undefined) {
      newVersion = new Version(logAction.hash, {});
      if (_type.versions.length > 0) {
        newVersion.fields = {..._type.versions[_type.versions.length-1].fields};
      }
    }
  }

  updateVersion(newVersion, logAction);

  _type.changeLog.push(logAction.changeLog);

  if (!isLatest) {
    if (groupingVersions === null) {
      _type.versions.push(newVersion)
    } else {
      groupingVersions.set(_type.name, newVersion);
    }
  }
}

function updateServices(
  logAction: action.Action,
  services: Map<string, Service>,
  isLatest: boolean,
) {
  if (!(
    logAction instanceof action.UpdateDescriptionServiceAction ||
    logAction instanceof action.AddInputVersionServiceAction ||
    logAction instanceof action.RemoveInputVersionServiceAction ||
    logAction instanceof action.DeprecateInputVersionServiceAction ||
    logAction instanceof action.AddOutputVersionServiceAction ||
    logAction instanceof action.RemoveOutputVersionServiceAction ||
    logAction instanceof action.DeprecateOutputVersionServiceAction)
  ) {
    return;
  }

  if (!services.has(logAction.serviceName)) {
    throw new Error(`Updating service that doesn't exist ${logAction.serviceName}`)
  }

  const newService = services.get(logAction.serviceName);
  if (newService === undefined) {
    throw new Error(`This should not happen, added because typescript`);
  }

  if (logAction instanceof action.UpdateDescriptionServiceAction) {
      newService.description = logAction.description;
  } else if (logAction instanceof action.AddInputVersionServiceAction) {
      newService.inputVersions.push(
        new ServiceVersion(logAction.version, 'active')
      );
  } else if (logAction instanceof action.RemoveInputVersionServiceAction) {
    newService.inputVersions = newService.inputVersions.map(serviceVersion => {
      if (serviceVersion.version === (logAction as any).version) {
        return new ServiceVersion((logAction as any).version, 'removed');
      }
      return serviceVersion;
    });
  } else if (logAction instanceof action.DeprecateInputVersionServiceAction) {
    newService.inputVersions = newService.inputVersions.map(serviceVersion => {
      if (serviceVersion.version === (logAction as any).version) {
        return new ServiceVersion((logAction as any).version, 'deprecated');
      }
      return serviceVersion;
    });
  } else if (logAction instanceof action.AddOutputVersionServiceAction) {
    newService.outputVersions.push(
      new ServiceVersion(logAction.version, 'active')
    );
  } else if (logAction instanceof action.RemoveOutputVersionServiceAction) {
    newService.outputVersions = newService.outputVersions.map(serviceVersion => {
      if (serviceVersion.version === (logAction as any).version) {
        return new ServiceVersion((logAction as any).version, 'removed');
      }
      return serviceVersion;
    });
  } else if (logAction instanceof action.DeprecateOutputVersionServiceAction) {
    newService.outputVersions = newService.outputVersions.map(serviceVersion => {
      if (serviceVersion.version === (logAction as any).version) {
        return new ServiceVersion((logAction as any).version, 'deprecated');
      }
      return serviceVersion;
    });
  }
}

function updateTypesAndServices(
  logAction: action.Action,
  types: Map<string, Type>,
  services: Map<string, Service>,
  groupingVersions: Map<string, Version> | null,
  isLatest: boolean,
) {
  if (logAction instanceof action.NewTypeAction) {
    if (types.has(logAction.name)) {
      throw new Error(`Type ${logAction.name} defined twice!`);
    }
    const newType = new Type(
      logAction.name,
      logAction.description,
    );
    newType.changeLog.push(logAction.changeLog);
    types.set(newType.name, newType);
  } else if (logAction instanceof action.GroupAction) {
    const subGroupingVersions = new Map();
    for (const subAction of logAction.actions) {
      updateTypesAndServices(subAction, types, services, subGroupingVersions, isLatest);
    }

    for (const [typeName, newVersion] of subGroupingVersions.entries()) {
      // Rethink this, should every version have the same hash?
      newVersion.hash = logAction.hash;
      const _type = types.get(typeName);
      if (_type === undefined) {
        throw new Error(`Can't find type that was updated in group.`);
      }

      _type.versions.push(newVersion);
    }
  // Services
  } else if (logAction instanceof action.NewServiceAction) {
    if (types.has(logAction.serviceName)) {
      throw new Error(`Service ${logAction.serviceName} defined twice!`);
    }
    const newService = new Service(
      logAction.serviceName,
      logAction.description,
      logAction.inputType,
      logAction.outputType,
    );
    newService.changeLog.push(logAction.changeLog);
    services.set(newService.name, newService);
  } else {
    updateTypeFields(logAction, types, groupingVersions, isLatest);
    updateServices(logAction, services, isLatest);
  }
}

export function generateDefinitions(log: action.Action[]): [Type[], Service[]] {
  // verify log
  let previousHash = null;
  const hashed = [];
  const latest = [];
  let notHashed = false;
  for (let n = 0; n < log.length; n++) {
    const action = log[n];
    if (notHashed) {
      if (action.hash !== null) {
        throw new Error(`Hashed action after unhashed action at ${n} ${action}`);
      }
      latest.push(action);
    } else if (action.hash === null) {
      notHashed = true;
      latest.push(action);
    } else {
      const expectedHash = typeidea.hashAction(action, previousHash);
      if (expectedHash !== action.hash) {
        throw new Error(
          `Invalid hash at item ${n} ${action}, did you change something?`
        );
      }
      hashed.push(action);
      previousHash = expectedHash;
    }
  }

  const types = new Map();
  const services = new Map();
  for (let n = 0; n < hashed.length; n++) {
    const logAction = hashed[n];
    updateTypesAndServices(logAction, types, services, null, false);
  }

  for (let n = 0; n < latest.length; n++) {
    const logAction = latest[n];
    updateTypesAndServices(logAction, types, services, null, true);
  }

  return [Array.from(types.values()), Array.from(services.values())];
}

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

const typescriptServiceFile = fs.readFileSync(
  './templates/service.ejs',
  {
    encoding: "utf8",
  }
);

const typescriptServiceTemplate = compile(
  typescriptServiceFile,
  {
    filename: './templates/service.ejs'
  }
);


export function generateTypescript(
  types: Type[],
  services: Service[],
): Array<[Type, string]> {
  return types.map((_type): [Type, string] => {
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

