import * as action from './action';
import * as typeidea from './typeidea';
import * as generate_typescript from './generate_typescript';
import {compile} from 'ejs';
import * as fs from 'fs';
import * as prettier from 'prettier';
import * as path from 'path';

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

  formattedDefault(): string {
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

export type FieldObject = {
  [key: string]: BaseField;
};

export class Version {
  version: number | null;
  hash: string | null;
  fields: FieldObject;

  constructor(
    hash: string | null,
    version: number | null,
    fields: FieldObject,
  ) {
    this.hash = hash;
    this.version = version;
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

export class VersionType {
  _type: string;
  version: number | null;
  hash: string;

  constructor(
    _type: string,
    hash: string,
    version: number | null,
  ) {
    this._type = _type;
    this.hash = hash;
    this.version = version;
  }
}

export class Service {
  name: string;
  changeLog: string[];
  description: string;
  versions: Map<string, [VersionType, VersionType[]]>;
  seenInputVersions: Set<string>;
  //inputType: string;
  //outputType: string;
  //inputVersions: ServiceVersion[];
  //outputVersions: ServiceVersion[];
  //latest: ServiceVersion[] | null;

  constructor(
    name: string,
    description: string,
    //inputType: string,
    //outputType: string,
  ) {
    this.name = name;
    this.description = description;
    this.changeLog = [];
    this.versions = new Map();
    this.seenInputVersions = new Set();
    //this.inputType = inputType;
    //this.outputType = outputType;
    //this.inputVersions = [];
    //this.outputVersions = [];
    //this.latest = [];
  }

  addVersion(logAction: action.AddVersionServiceAction) {
    const inputVersion = `${logAction.inputType}_${logAction.inputVersion}`;
    const outputVersion = `${logAction.outputType}_${logAction.outputVersion}`;

    if (this.seenInputVersions.has(inputVersion)) {
      throw new Error(`Input version ${inputVersion} used elsewhere`);
    }
    this.seenInputVersions.add(inputVersion);
    const existingVersion = this.versions.get(outputVersion);
    if (existingVersion) {
      existingVersion[1].push(
        new VersionType(logAction.inputType, logAction.inputVersion, logAction.version),
      );
    } else {
      this.versions.set(
        outputVersion,
        [
          new VersionType(logAction.outputType, logAction.outputVersion, logAction.version),
          [new VersionType(logAction.inputType, logAction.inputVersion, logAction.version)],
        ],
      );
    }
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
      newVersion = new Version(logAction.hash, logAction.version, {});
      if (_type.versions.length > 0) {
        newVersion.fields = {..._type.versions[_type.versions.length-1].fields};
      }
      _type.latest = newVersion;
    } else {
      newVersion = _type.latest;
    }
  } else if (groupingVersions === null) {
    newVersion = new Version(logAction.hash, logAction.version, {});
    if (_type.versions.length > 0) {
      newVersion.fields = {..._type.versions[_type.versions.length-1].fields};
    }
  } else {
    newVersion = groupingVersions.get(_type.name);
    if (newVersion === undefined) {
      newVersion = new Version(logAction.hash, logAction.version, {});
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
    logAction instanceof action.AddVersionServiceAction)
    //logAction instanceof action.AddInputVersionServiceAction ||
    //logAction instanceof action.RemoveInputVersionServiceAction ||
    //logAction instanceof action.DeprecateInputVersionServiceAction ||
    //logAction instanceof action.AddOutputVersionServiceAction ||
    //logAction instanceof action.RemoveOutputVersionServiceAction ||
    //logAction instanceof action.DeprecateOutputVersionServiceAction)
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
  } else if (logAction instanceof action.AddVersionServiceAction) {

    const outputVersion = `${logAction.outputType}_${logAction.outputVersion}`;
    newService.addVersion(logAction);
    //const currentType = newService.versions.get(outputVersion);
    //if (currentType) {
    //  const currentVersions = currentType[1];
    //  currentVersions.push(new VersionType(logAction.inputType, logAction.inputVersion));
    //} else {
    //  newService.versions.set(
    //    outputVersion,
    //    [
    //      new VersionType(logAction.outputType, logAction.outputVersion),
    //      [new VersionType(logAction.inputType, logAction.inputVersion)],
    //    ],
    //  );
    //}
  }
  //} else if (logAction instanceof action.AddInputVersionServiceAction) {
  //    newService.inputVersions.push(
  //      new ServiceVersion(logAction.version, 'active')
  //    );
  //} else if (logAction instanceof action.RemoveInputVersionServiceAction) {
  //  newService.inputVersions = newService.inputVersions.map(serviceVersion => {
  //    if (serviceVersion.version === (logAction as any).version) {
  //      return new ServiceVersion((logAction as any).version, 'removed');
  //    }
  //    return serviceVersion;
  //  });
  //} else if (logAction instanceof action.DeprecateInputVersionServiceAction) {
  //  newService.inputVersions = newService.inputVersions.map(serviceVersion => {
  //    if (serviceVersion.version === (logAction as any).version) {
  //      return new ServiceVersion((logAction as any).version, 'deprecated');
  //    }
  //    return serviceVersion;
  //  });
  //} else if (logAction instanceof action.AddOutputVersionServiceAction) {
  //  newService.outputVersions.push(
  //    new ServiceVersion(logAction.version, 'active')
  //  );
  //} else if (logAction instanceof action.RemoveOutputVersionServiceAction) {
  //  newService.outputVersions = newService.outputVersions.map(serviceVersion => {
  //    if (serviceVersion.version === (logAction as any).version) {
  //      return new ServiceVersion((logAction as any).version, 'removed');
  //    }
  //    return serviceVersion;
  //  });
  //} else if (logAction instanceof action.DeprecateOutputVersionServiceAction) {
  //  newService.outputVersions = newService.outputVersions.map(serviceVersion => {
  //    if (serviceVersion.version === (logAction as any).version) {
  //      return new ServiceVersion((logAction as any).version, 'deprecated');
  //    }
  //    return serviceVersion;
  //  });
  //}
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

  const versionNumbers = new Map<string, number>();
  for (let logAction of log) {
    if (logAction.hash === null) {
      break;
    }
    if (
      logAction instanceof action.RenameFieldTypeAction ||
      logAction instanceof action.RequiredFieldTypeAction ||
      logAction instanceof action.OptionalFieldTypeAction ||
      logAction instanceof action.DeleteFieldTypeAction ||
      logAction instanceof action.SetDefaultFieldTypeAction ||
      logAction instanceof action.RemoveDefaultFieldTypeAction ||
      logAction instanceof action.AddFieldTypeAction ||
      logAction instanceof action.UpdateDescriptionTypeAction ||
      logAction instanceof action.ReferenceFieldTypeAction
    ) {
      let currentVersion = versionNumbers.get(logAction.typeName) || 0;
      logAction.version = currentVersion;
      versionNumbers.set(logAction.typeName, currentVersion + 1);
    } else if (logAction instanceof action.NewTypeAction) {
      let currentVersion = versionNumbers.get(logAction.name) || 0;
      logAction.version = currentVersion;
      versionNumbers.set(logAction.name, currentVersion + 1);
    } else if (logAction instanceof action.GroupAction) {
      //throw new Error(`Not implemented yet :-(`);
    } else if (
      logAction instanceof action.NewServiceAction ||
      logAction instanceof action.UpdateDescriptionServiceAction ||
      logAction instanceof action.AddVersionServiceAction
    ) {
      let currentVersion = versionNumbers.get(logAction.serviceName) || 0;
      logAction.version = currentVersion;
      versionNumbers.set(logAction.serviceName, currentVersion + 1);
    } else {
      throw new Error(`Unknown log action ${logAction}`);
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

//const typescriptTypeFile = fs.readFileSync(
//  path.join(__dirname, 'templates', 'typescript.ejs'),
//  {
//    encoding: "utf8",
//  }
//);
//
//const typescriptTypeTemplate = compile(
//  typescriptTypeFile,
//  {
//    filename: path.join(__dirname, 'templates', 'typescript.ejs'),
//  }
//);

export function generateTypescript(types: Type[]): string {
  return (
    prettier.format(
      generate_typescript.generateTypes(types),
      {parser: 'typescript'},
    )
  );
}

//const typescriptServiceFile = fs.readFileSync(
//  path.join(__dirname, 'templates', 'express.ejs'),
//  {
//    encoding: "utf8",
//  }
//);
//
//const typescriptServiceTemplate = compile(
//  typescriptServiceFile,
//  {
//    filename: path.join(__dirname, 'templates', 'express.ejs'),
//  }
//);

export function generateTypescriptServices(
  services: Service[],
): string {
  return (
    prettier.format(
      // typescriptServiceTemplate({services: services}),
      generate_typescript.generateExpress(services),
      {parser: 'typescript'},
    )
  );
}

export function generateTypescriptBoth(
  types: Type[],
  services: Service[],
): [string, string] {
  const generatedTypes = generateTypescript(types);
  const generatedServices = generateTypescriptServices(services);

  return [generatedTypes, generatedServices];
}
