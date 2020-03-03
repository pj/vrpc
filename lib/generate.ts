import {
    Field,
    ObjectType,
    InterfaceType,
    createUnionType
} from 'type-graphql';
import {
  Action, 
  ChangeAction,
  GroupAction, 
  FieldTypes, 
  FieldDefaults, 
  ChangeSet,
  FieldDefaultsUnion
} from './action';
import * as typeidea from './typeidea';

@InterfaceType()
export abstract class BaseField {
  @Field()
  name: string;

  @Field()
  changeLog: string;

  @Field()
  description: string;

  @Field()
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

@ObjectType({implements: BaseField})
export class ScalarField extends BaseField {
  @Field(type => FieldTypes)
  type: FieldTypes;

  // Handled by ScalarFieldResolver in resolvers.ts
  _default?: FieldDefaults;

  constructor(
    name: string,
    changeLog: string,
    description: string,
    optional: boolean,
    type: FieldTypes,
    _default: FieldDefaults | undefined
  ) {
    super(name, changeLog, description, optional);
    this.type = type;
    this._default = _default;
  }

  copy(): ScalarField {
    return new ScalarField(
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

@ObjectType({implements: BaseField})
export class ReferenceField extends BaseField {
  @Field()
  referenceType: string;

  @Field({nullable: true})
  referenceHash?: string;

  @Field({nullable: true})
  referenceVersion?: number;

  constructor(
    name: string,
    changeLog: string,
    description: string,
    optional: boolean,
    referenceType: string,
    referenceHash: string | undefined,
    referenceVersion: number | undefined
  ) {
    super(name, changeLog, description, optional);
    this.referenceType = referenceType;
    this.referenceHash = referenceHash;
    this.referenceVersion = referenceVersion;
  }

  copy() {
    return new ReferenceField(
      this.name,
      this.changeLog,
      this.description,
      this.optional,
      this.referenceType,
      this.referenceHash,
      this.referenceVersion
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

@ObjectType()
export class Version {
  @Field()
  _type: string;

  @Field()
  version: number;

  @Field()
  hash: string;

  // Handled by VersionResolver in resolvers.ts
  fields: FieldObject;

  constructor(
    _type: string,
    hash: string,
    version: number,
    fields: FieldObject,
  ) {
    this._type = _type;
    this.hash = hash;
    this.version = version;
    this.fields = fields;
  }

  toString(): string {
    if (this.version) {
      return `${this._type}_V${this.version}`;
    } else {
      return `${this._type}_H${this.hash}`;
    }
  }

  formatVersion(): string {
    return (`${this._type}_V${this.version}`);
  }

  formatHash(): string {
    return `${this._type}_H${this.hash}`;
  }
}

@ObjectType()
export class Type {
  @Field()
  name: string;

  @Field(type => [Version])
  versions: Version[];

  @Field({nullable: true})
  changeSetName?: string;

  @Field(type => [String])
  changeLog: string[];

  @Field()
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.versions = [];
    this.changeLog = [];
  }
}

@ObjectType()
export class VersionType {
  @Field()
  _type: string;

  @Field()
  version: number;

  @Field()
  hash: string;

  constructor(
    _type: string,
    hash: string,
    version: number,
  ) {
    this._type = _type;
    this.hash = hash;
    this.version = version;
  }

  toString(): string {
    return `${this._type}_V${this.version}`;
  }
}

export type ServiceVersions = {
  [key: string]: {
    output: VersionType,
    inputs: VersionType[]
  }
};

@ObjectType()
export class Service {
  @Field()
  name: string;

  @Field(type => [String])
  changeLog: string[];

  @Field()
  description: string;

  // Handled by field resolver in resolvers.ts
  versions: ServiceVersions; // Map<string, [VersionType, VersionType[]]>;

  seenInputVersions: Set<string>;

  constructor(
    name: string,
    description: string,
  ) {
    this.name = name;
    this.description = description;
    this.changeLog = [];
    this.versions = {};
    this.seenInputVersions = new Set();
  }
}

function updateServiceVersion(
  service: Service,
  logAction: Action | ChangeAction
): void {
  if (logAction.actionType === 'AddVersionServiceAction') {
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

function updateVersion(newVersion: Version, logAction: Action | ChangeAction) {
  if (logAction.actionType === 'RenameFieldTypeAction') {
    const currentField = newVersion.fields[logAction._from];
    const newField = currentField.copy();
    newField.name = logAction.to;
    newField.changeLog = logAction.changeLog;
    delete newVersion.fields[logAction._from];
    newVersion.fields[logAction.to] = newField;
  } else if (logAction.actionType === 'RequiredFieldTypeAction') {
    const currentField = newVersion.fields[logAction.name];
    const newField = currentField.copy();
    newField.optional = false;
    newField.changeLog = logAction.changeLog;
    newVersion.fields[newField.name] = newField;
  } else if (logAction.actionType === 'OptionalFieldTypeAction') {
    const currentField = newVersion.fields[logAction.name];
    const newField = currentField.copy();
    newField.optional = true;
    newField.changeLog = logAction.changeLog;
    newVersion.fields[newField.name] = newField;
  } else if (logAction.actionType === 'DeleteFieldTypeAction') {
    const currentField = newVersion.fields[logAction.name];
    const newField = currentField.copy();
    delete newVersion.fields[currentField.name];
  } else if (logAction.actionType === 'SetDefaultFieldTypeAction') {
    const currentField = newVersion.fields[logAction.name];
    const newField = currentField.copy();
    if (newField instanceof ScalarField) {
      newField._default = logAction._default;
    }
    newField.changeLog = logAction.changeLog;
    newVersion.fields[newField.name] = newField;
  } else if (logAction.actionType === 'RemoveDefaultFieldTypeAction') {
    const currentField = newVersion.fields[logAction.name];
    const newField = currentField.copy();
    if (newField instanceof ScalarField) {
      newField._default = undefined;
    }
    newField.changeLog = logAction.changeLog;
    newVersion.fields[newField.name] = newField;
  } else if (logAction.actionType === 'AddFieldTypeAction') {
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
  } else if (logAction.actionType === 'UpdateFieldDescriptionTypeAction') {
    const currentField = newVersion.fields[logAction.name];
    const newField = currentField.copy();
    newField.description = logAction.description;
    newField.changeLog = logAction.changeLog;
    newVersion.fields[newField.name] = newField;
  } else if (logAction.actionType === 'ReferenceFieldTypeAction') {
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

export function typeOrServiceName(
  logAction: Action | ChangeAction
): [string | null, string | null] {
  if (
    logAction.actionType === 'RenameFieldTypeAction'
    || logAction.actionType === 'RequiredFieldTypeAction'
    || logAction.actionType === 'OptionalFieldTypeAction'
    || logAction.actionType === 'DeleteFieldTypeAction'
    || logAction.actionType === 'SetDefaultFieldTypeAction'
    || logAction.actionType === 'RemoveDefaultFieldTypeAction'
    || logAction.actionType === 'AddFieldTypeAction'
    || logAction.actionType === 'UpdateFieldDescriptionTypeAction'
    || logAction.actionType === 'ReferenceFieldTypeAction'
    || logAction.actionType === 'NewTypeAction'
  ) {
    return [logAction.typeName, null];
  } else if (
    logAction.actionType === 'UpdateDescriptionServiceAction'
    || logAction.actionType === 'AddVersionServiceAction'
    || logAction.actionType === 'NewServiceAction'
  ) {
    return [null, logAction.serviceName];
  }

  throw new Error('Satisfying typescript');
}

export function generateDefinitions(
  log: GroupAction[],
  changeSet: ChangeSet | null
): [Type[], Service[]] {
  if (changeSet) {
    log = typeidea.commitChangeSet(log, changeSet);
  } else {
    typeidea.validate(log);
  }

  const types = new Map<string, Type>();
  const services = new Map<string, Service>();

  for (const groupAction of log) {
    const versionsForTypes = new Map<string, Version>();
    for (const action of groupAction.actions) {
      if (action.actionType === 'NewTypeAction') {
        const _type = new Type(action.typeName, action.description);
        _type.changeLog.push(action.changeLog);
        const newVersion = new Version(action.typeName, groupAction.hash, 0, {});
        versionsForTypes.set(action.typeName, newVersion);
        newVersion.fields = {};
        _type.versions.push(newVersion);
        types.set(action.typeName, _type);
      } else if (action.actionType === 'NewServiceAction') {
        const service = new Service(action.serviceName, action.description);
        service.changeLog.push(action.changeLog);
        services.set(action.serviceName, service);
      } else {
        const [typeName, serviceName] = typeOrServiceName(action);
        if (typeName) {
          const _type = types.get(typeName);
          if (!_type) {
            throw new Error('Should not happen');
          }
          _type.changeLog.push(action.changeLog);
          const versionNumber = groupAction.versions[typeName];
          let newVersion = versionsForTypes.get(typeName);
          if (newVersion === undefined) {
            newVersion = new Version(typeName, groupAction.hash, versionNumber, {});
            versionsForTypes.set(typeName, newVersion);
            if (_type.versions.length > 0) {
              newVersion.fields = {..._type.versions[_type.versions.length-1].fields};
            }
            _type.versions.push(newVersion);
          }
          updateVersion(newVersion, action);
        } else if (serviceName) {
          const service = services.get(serviceName);
          if (!service) {
            throw new Error('Should not happen');
          }
          service.changeLog.push(action.changeLog);
          if (action.actionType === 'UpdateDescriptionServiceAction') {
            service.description = action.description;
          }
          updateServiceVersion(service, action);
        } else {
          throw new Error('Should not happen');
        }
      }
    }
  }

  // if (changeSet) {
  //   // const latestServices = new Map<string, LatestServiceVersion>();
  //   const latestTypes = new Map<string, LatestVersion>();
  //   for (const action of changeSet.log) {
  //      if (action.actionType === 'NewTypeAction') {
  //       const _type = new Type(action.typeName, action.description);
  //       _type.changeLog.push(action.changeLog);
  //       types.set(action.typeName, _type);
  //     } else if (action.actionType === 'NewServiceAction') {
  //       const service = new Service(action.serviceName, action.description);
  //       service.changeLog.push(action.changeLog);
  //       services.set(action.serviceName, service);
  //     } else {
  //       const [typeName, serviceName] = typeOrServiceName(action);
  //       if (typeName) {
  //         const _type = types.get(typeName);
  //         if (!_type) {
  //           throw new Error('Should not happen');
  //         }
  //         _type.changeLog.push(action.changeLog);
  //         let latestVersion = latestTypes.get(typeName);
  //         if (!latestVersion) {
  //           latestVersion = new LatestVersion(typeName, {});
  //           latestTypes.set(typeName, latestVersion);
  //         }
  //         updateVersion(latestVersion, action);
  //       } else if (serviceName) {
  //         const service = services.get(serviceName);
  //         if (!service) {
  //           throw new Error('Should not happen');
  //         }
  //         service.latestChangeLog.push(action.changeLog);
  //         if (action.actionType === 'UpdateDescriptionServiceAction') {
  //           service.latestDescription = action.description;
  //         }
  //         updateServiceVersion(service, action);
  //       } else {
  //         throw new Error('Should not happen');
  //       }
  //     }
  //   }
  // }

  // for (let [typeName, typeActions] of logTypes.entries()) {
  //   const _type = new Type(typeName, '');
  //   for (let typeAction of typeActions) {
  //     _type.changeLog.push(typeAction.changeLog);
  //     const newVersion = getVersionForType(_type, typeAction);

  //     if (typeAction.actionType === 'NewTypeAction') {
  //       _type.description = typeAction.description;
  //     } else if (typeAction instanceof GroupAction) {
  //       for (let subAction of typeAction.actions) {
  //         updateVersion(newVersion, subAction);
  //       }
  //     } else {
  //       updateVersion(newVersion, typeAction);
  //     }

  //     _type.versions.push(newVersion);
  //   }

  //   types.push(_type);
  // }

  // for (let [serviceName, serviceActions] of logServices.entries()) {
  //   const service = new Service(serviceName, '');
  //   for (let serviceAction of serviceActions) {
  //     service.changeLog.push(serviceAction.changeLog);
  //     if (serviceAction instanceof GroupAction) {
  //       for (let subAction of serviceAction.actions) {
  //         updateServiceVersion(service, subAction);
  //       }
  //     } else {
  //       updateServiceVersion(
  //         service,
  //         serviceAction as AddVersionServiceAction
  //       );
  //     }
  //   }

  //   services.push(service);
  // }

  return [Array.from(types.values()), Array.from(services.values())];
}