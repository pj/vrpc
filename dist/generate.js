"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var Field_1, ReferenceField_1;
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const action_1 = require("./action");
const typeidea = __importStar(require("./typeidea"));
let BaseField = class BaseField {
    constructor(name, changeLog, description, optional) {
        this.name = name;
        this.changeLog = changeLog;
        this.description = description;
        this.optional = optional;
    }
    fieldType() {
        throw new Error("Not implemented");
    }
    copy() {
        throw new Error("Not implemented");
    }
    formattedDefault() {
        throw new Error("Not implemented");
    }
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BaseField.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BaseField.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BaseField.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], BaseField.prototype, "optional", void 0);
BaseField = __decorate([
    type_graphql_1.InterfaceType(),
    __metadata("design:paramtypes", [String, String, String, Boolean])
], BaseField);
exports.BaseField = BaseField;
let Field = Field_1 = class Field extends BaseField {
    constructor(name, changeLog, description, optional, type, _default) {
        super(name, changeLog, description, optional);
        this.type = type;
        this._default = _default;
    }
    copy() {
        return new Field_1(this.name, this.changeLog, this.description, this.optional, this.type, this._default);
    }
    fieldType() {
        return this.type + (this.optional ? " | null" : "");
    }
    formattedDefault() {
        if (!this._default) {
            return "";
        }
        if (this.type === 'string') {
            return `"${this._default}"`;
        }
        return "" + this._default;
    }
};
__decorate([
    type_graphql_1.Field(type => action_1.FieldTypes),
    __metadata("design:type", String)
], Field.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(type => action_1.FieldDefaultsUnion, { nullable: true }),
    __metadata("design:type", Object)
], Field.prototype, "_default", void 0);
Field = Field_1 = __decorate([
    type_graphql_1.ObjectType({ implements: BaseField }),
    __metadata("design:paramtypes", [String, String, String, Boolean, String, Object])
], Field);
exports.Field = Field;
let ReferenceField = ReferenceField_1 = class ReferenceField extends BaseField {
    constructor(name, changeLog, description, optional, referenceType, referenceHash, referenceVersion) {
        super(name, changeLog, description, optional);
        this.referenceType = referenceType;
        this.referenceHash = referenceHash;
        this.referenceVersion = referenceVersion;
    }
    copy() {
        return new ReferenceField_1(this.name, this.changeLog, this.description, this.optional, this.referenceType, this.referenceHash, this.referenceVersion);
    }
    fieldType() {
        return `${this.referenceType}.h_${this.referenceHash}`;
    }
    formattedDefault() {
        return "";
    }
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ReferenceField.prototype, "referenceType", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], ReferenceField.prototype, "referenceHash", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], ReferenceField.prototype, "referenceVersion", void 0);
ReferenceField = ReferenceField_1 = __decorate([
    type_graphql_1.ObjectType({ implements: BaseField }),
    __metadata("design:paramtypes", [String, String, String, Boolean, String, Object, Object])
], ReferenceField);
exports.ReferenceField = ReferenceField;
exports.FieldUnion = type_graphql_1.createUnionType({
    name: "FieldUnion",
    types: () => [ReferenceField, Field]
});
let Version = class Version {
    constructor(_type, hash, version, fields) {
        this._type = _type;
        this.hash = hash;
        this.version = version;
        this.fields = fields;
    }
    toString() {
        if (this.version) {
            return `${this._type}_V${this.version}`;
        }
        else {
            return `${this._type}_H${this.hash}`;
        }
    }
    formatVersion() {
        return (`${this._type}_V${this.version}`);
    }
    formatHash() {
        return `${this._type}_H${this.hash}`;
    }
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Version.prototype, "_type", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Version.prototype, "version", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Version.prototype, "hash", void 0);
__decorate([
    type_graphql_1.Field(type => [exports.FieldUnion]),
    __metadata("design:type", Object)
], Version.prototype, "fields", void 0);
Version = __decorate([
    type_graphql_1.ObjectType(),
    __metadata("design:paramtypes", [String, String, Number, Object])
], Version);
exports.Version = Version;
let Type = class Type {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.versions = [];
        this.changeLog = [];
    }
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Type.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(type => [Version]),
    __metadata("design:type", Array)
], Type.prototype, "versions", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Type.prototype, "changeSetName", void 0);
__decorate([
    type_graphql_1.Field(type => [String]),
    __metadata("design:type", Array)
], Type.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Type.prototype, "description", void 0);
Type = __decorate([
    type_graphql_1.ObjectType(),
    __metadata("design:paramtypes", [String, String])
], Type);
exports.Type = Type;
let VersionType = class VersionType {
    constructor(_type, hash, version) {
        this._type = _type;
        this.hash = hash;
        this.version = version;
    }
    toString() {
        if (this.version) {
            return `${this._type}_V${this.version}`;
        }
        else {
            return `${this._type}_H${this.hash}`;
        }
    }
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], VersionType.prototype, "_type", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], VersionType.prototype, "version", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], VersionType.prototype, "hash", void 0);
VersionType = __decorate([
    type_graphql_1.ObjectType(),
    __metadata("design:paramtypes", [String, String, Number])
], VersionType);
exports.VersionType = VersionType;
let GQLVersionType = class GQLVersionType {
};
__decorate([
    type_graphql_1.Field(type => VersionType),
    __metadata("design:type", VersionType)
], GQLVersionType.prototype, "output", void 0);
__decorate([
    type_graphql_1.Field(type => [VersionType]),
    __metadata("design:type", Array)
], GQLVersionType.prototype, "inputs", void 0);
GQLVersionType = __decorate([
    type_graphql_1.ObjectType('ServiceVersionType')
], GQLVersionType);
exports.GQLVersionType = GQLVersionType;
let Service = class Service {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.changeLog = [];
        this.versions = new Map();
        this.seenInputVersions = new Set();
    }
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Service.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(type => [String]),
    __metadata("design:type", Array)
], Service.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Service.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(type => [GQLVersionType]),
    __metadata("design:type", Map)
], Service.prototype, "versions", void 0);
Service = __decorate([
    type_graphql_1.ObjectType(),
    __metadata("design:paramtypes", [String, String])
], Service);
exports.Service = Service;
function updateServiceVersion(service, logAction) {
    if (logAction.actionType === 'AddVersionServiceAction') {
        const inputVersion = `${logAction.inputType}_${logAction.inputVersion}`;
        const outputVersion = `${logAction.outputType}_${logAction.outputVersion}`;
        if (service.seenInputVersions.has(inputVersion)) {
            throw new Error(`Input version ${inputVersion} used elsewhere`);
        }
        service.seenInputVersions.add(inputVersion);
        const existingVersion = service.versions.get(outputVersion);
        if (existingVersion) {
            existingVersion[1].push(new VersionType(logAction.inputType, logAction.inputHash, logAction.inputVersion));
        }
        else {
            service.versions.set(outputVersion, [
                new VersionType(logAction.outputType, logAction.outputHash, logAction.outputVersion),
                [new VersionType(logAction.inputType, logAction.inputHash, logAction.inputVersion)],
            ]);
        }
    }
    else {
        throw new Error('Should not happen');
    }
}
function updateVersion(newVersion, logAction) {
    if (logAction.actionType === 'RenameFieldTypeAction') {
        const currentField = newVersion.fields[logAction._from];
        const newField = currentField.copy();
        newField.name = logAction.to;
        newField.changeLog = logAction.changeLog;
        delete newVersion.fields[logAction._from];
        newVersion.fields[logAction.to] = newField;
    }
    else if (logAction.actionType === 'RequiredFieldTypeAction') {
        const currentField = newVersion.fields[logAction.name];
        const newField = currentField.copy();
        newField.optional = false;
        newField.changeLog = logAction.changeLog;
        newVersion.fields[newField.name] = newField;
    }
    else if (logAction.actionType === 'OptionalFieldTypeAction') {
        const currentField = newVersion.fields[logAction.name];
        const newField = currentField.copy();
        newField.optional = true;
        newField.changeLog = logAction.changeLog;
        newVersion.fields[newField.name] = newField;
    }
    else if (logAction.actionType === 'DeleteFieldTypeAction') {
        const currentField = newVersion.fields[logAction.name];
        const newField = currentField.copy();
        delete newVersion.fields[currentField.name];
    }
    else if (logAction.actionType === 'SetDefaultFieldTypeAction') {
        const currentField = newVersion.fields[logAction.name];
        const newField = currentField.copy();
        if (newField instanceof Field) {
            newField._default = logAction._default;
        }
        newField.changeLog = logAction.changeLog;
        newVersion.fields[newField.name] = newField;
    }
    else if (logAction.actionType === 'RemoveDefaultFieldTypeAction') {
        const currentField = newVersion.fields[logAction.name];
        const newField = currentField.copy();
        if (newField instanceof Field) {
            newField._default = undefined;
        }
        newField.changeLog = logAction.changeLog;
        newVersion.fields[newField.name] = newField;
    }
    else if (logAction.actionType === 'AddFieldTypeAction') {
        const currentField = newVersion.fields[logAction.name];
        const newField = new Field(logAction.name, logAction.changeLog, logAction.description, logAction.optional, logAction._type, logAction._default = logAction._default);
        newVersion.fields[newField.name] = newField;
    }
    else if (logAction.actionType === 'UpdateDescriptionTypeAction') {
        const currentField = newVersion.fields[logAction.name];
        const newField = currentField.copy();
        newField.description = logAction.description;
        newField.changeLog = logAction.changeLog;
        newVersion.fields[newField.name] = newField;
    }
    else if (logAction.actionType === 'ReferenceFieldTypeAction') {
        const currentField = newVersion.fields[logAction.name];
        const newField = new ReferenceField(logAction.name, logAction.changeLog, logAction.description, logAction.optional, logAction.referenceType, logAction.referenceHash, logAction.referenceVersion);
        newVersion.fields[newField.name] = newField;
    }
    else {
        throw new Error('Should not happen');
    }
}
function typeOrServiceName(logAction) {
    if (logAction.actionType === 'RenameFieldTypeAction'
        || logAction.actionType === 'RequiredFieldTypeAction'
        || logAction.actionType === 'OptionalFieldTypeAction'
        || logAction.actionType === 'DeleteFieldTypeAction'
        || logAction.actionType === 'SetDefaultFieldTypeAction'
        || logAction.actionType === 'RemoveDefaultFieldTypeAction'
        || logAction.actionType === 'AddFieldTypeAction'
        || logAction.actionType === 'UpdateDescriptionTypeAction'
        || logAction.actionType === 'ReferenceFieldTypeAction'
        || logAction.actionType === 'NewTypeAction') {
        return [logAction.typeName, null];
    }
    else if (logAction.actionType === 'UpdateDescriptionServiceAction'
        || logAction.actionType === 'AddVersionServiceAction'
        || logAction.actionType === 'NewServiceAction') {
        return [null, logAction.serviceName];
    }
    throw new Error('Satisfying typescript');
}
exports.typeOrServiceName = typeOrServiceName;
// function groupActions(
//   logAction: Action, 
//   types: Map<string, Action[]>, 
//   services: Map<string, Action[]>
// ) {
//   const [typeName, serviceName] = typeOrServiceName(logAction);
//   if (typeName !== null) {
//     const existingType = types.get(typeName);
//     if (existingType !== null && existingType !== undefined) {
//       existingType.push(logAction);
//     } else {
//       types.set(typeName, [logAction]);
//     }
//   } else if (serviceName !== null) {
//     const existingService = services.get(serviceName);
//     if (existingService !== null && existingService !== undefined) {
//       existingService.push(logAction);
//     } else {
//       services.set(serviceName, [logAction]);
//     }
//   }
// }
// function groupByTypeAndService(log: GroupAction[]): [
//   Map<string, Action[]>,
//   Map<string, Action[]>
// ] {
//   const types = new Map();
//   const services = new Map();
//   for (let logAction of log) {
//       const [groupTypes, groupServices] = groupByTypeAndService(
//         logAction.actions
//       );
//       for (let [key, subActions] of groupTypes) {
//         const fakeGroupAction = new GroupAction(
//           logAction.changeLog,
//           logAction.hash,
//           logAction.typeOrServiceName,
//           subActions,
//           logAction.versions
//         );
//         const existingType = types.get(key);
//         if (existingType !== null && existingType !== undefined) {
//           existingType.push(fakeGroupAction);
//         } else {
//           types.set(key, [fakeGroupAction]);
//         }
//       }
//       for (let [key, subActions] of groupServices) {
//         const fakeGroupAction = new GroupAction(
//           logAction.changeLog,
//           logAction.hash,
//           logAction.typeOrServiceName,
//           subActions,
//           logAction.versions
//         );
//         const existingService = services.get(key);
//         if (existingService !== null && existingService !== undefined) {
//           existingService.push(fakeGroupAction);
//         } else {
//           services.set(key, [fakeGroupAction]);
//         }
//       }
//   }
//   return [types, services];
// }
// function getVersionForType(_type: Type, logAction: Action): Version {
//   const newVersion = new Version(_type.name, logAction.hash, logAction.version, {});
//   if (logAction instanceof GroupAction) {
//     newVersion.version = logAction.versions[_type.name];
//   }
//   if (_type.versions.length > 0) {
//     newVersion.fields = {..._type.versions[_type.versions.length-1].fields};
//   }
//   return newVersion;
// }
function generateDefinitions(log, changeSet) {
    if (changeSet) {
        log = typeidea.commitChangeSet(log, changeSet);
    }
    else {
        typeidea.validate(log);
    }
    // const [logTypes, logServices] = groupByTypeAndService(log);
    // const types = [];
    // const services = [];
    const types = new Map();
    const services = new Map();
    for (const groupAction of log) {
        const versionsForTypes = new Map();
        for (const action of groupAction.actions) {
            if (action.actionType === 'NewTypeAction') {
                const _type = new Type(action.typeName, action.description);
                _type.changeLog.push(action.changeLog);
                types.set(action.typeName, _type);
            }
            else if (action.actionType === 'NewServiceAction') {
                const service = new Service(action.serviceName, action.description);
                service.changeLog.push(action.changeLog);
                services.set(action.serviceName, service);
            }
            else {
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
                            newVersion.fields = Object.assign({}, _type.versions[_type.versions.length - 1].fields);
                        }
                        _type.versions.push(newVersion);
                    }
                    updateVersion(newVersion, action);
                }
                else if (serviceName) {
                    const service = services.get(serviceName);
                    if (!service) {
                        throw new Error('Should not happen');
                    }
                    service.changeLog.push(action.changeLog);
                    if (action.actionType === 'UpdateDescriptionServiceAction') {
                        service.description = action.description;
                    }
                    updateServiceVersion(service, action);
                }
                else {
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
exports.generateDefinitions = generateDefinitions;
