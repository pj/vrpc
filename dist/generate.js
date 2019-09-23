"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const action = __importStar(require("./action"));
const typeidea = __importStar(require("./typeidea"));
const generate_typescript = __importStar(require("./generate_typescript"));
const prettier = __importStar(require("prettier"));
class BaseField {
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
}
exports.BaseField = BaseField;
class Field extends BaseField {
    constructor(name, changeLog, description, optional, type, _default) {
        super(name, changeLog, description, optional);
        this.type = type;
        this._default = _default;
    }
    copy() {
        return new Field(this.name, this.changeLog, this.description, this.optional, this.type, this._default);
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
}
exports.Field = Field;
class ReferenceField extends BaseField {
    constructor(name, changeLog, description, optional, referenceType, referenceHash, referenceVersion) {
        super(name, changeLog, description, optional);
        this.referenceType = referenceType;
        this.referenceHash = referenceHash;
        this.referenceVersion = referenceVersion;
    }
    copy() {
        return new ReferenceField(this.name, this.changeLog, this.description, this.optional, this.referenceType, this.referenceHash, this.referenceVersion);
    }
    fieldType() {
        return `${this.referenceType}.h_${this.referenceHash}`;
    }
    formattedDefault() {
        return "";
    }
}
exports.ReferenceField = ReferenceField;
class Version {
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
        return (this.version === null
            ? `${this._type}_Latest` : `${this._type}_V${this.version}`);
    }
    formatHash() {
        return `${this._type}_H${this.hash}`;
    }
}
exports.Version = Version;
class Type {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.versions = [];
        this.latest = null;
        this.changeLog = [];
    }
}
exports.Type = Type;
class VersionType {
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
}
exports.VersionType = VersionType;
class Service {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.changeLog = [];
        this.versions = new Map();
        this.seenInputVersions = new Set();
    }
}
exports.Service = Service;
function updateServiceVersion(service, logAction) {
    if (logAction instanceof action.AddVersionServiceAction) {
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
    else if (logAction instanceof action.NewServiceAction
        || logAction instanceof action.UpdateDescriptionServiceAction) {
        service.description = logAction.description;
    }
}
function updateVersion(newVersion, logAction) {
    if (logAction instanceof action.RenameFieldTypeAction) {
        const currentField = newVersion.fields[logAction._from];
        const newField = currentField.copy();
        newField.name = logAction.to;
        newField.changeLog = logAction.changeLog;
        delete newVersion.fields[logAction._from];
        newVersion.fields[logAction.to] = newField;
    }
    else if (logAction instanceof action.RequiredFieldTypeAction) {
        const currentField = newVersion.fields[logAction.name];
        const newField = currentField.copy();
        newField.optional = false;
        newField.changeLog = logAction.changeLog;
        newVersion.fields[newField.name] = newField;
    }
    else if (logAction instanceof action.OptionalFieldTypeAction) {
        const currentField = newVersion.fields[logAction.name];
        const newField = currentField.copy();
        newField.optional = true;
        newField.changeLog = logAction.changeLog;
        newVersion.fields[newField.name] = newField;
    }
    else if (logAction instanceof action.DeleteFieldTypeAction) {
        const currentField = newVersion.fields[logAction.name];
        const newField = currentField.copy();
        delete newVersion.fields[currentField.name];
    }
    else if (logAction instanceof action.SetDefaultFieldTypeAction) {
        const currentField = newVersion.fields[logAction.name];
        const newField = currentField.copy();
        if (newField instanceof Field) {
            newField._default = logAction._default;
        }
        newField.changeLog = logAction.changeLog;
        newVersion.fields[newField.name] = newField;
    }
    else if (logAction instanceof action.RemoveDefaultFieldTypeAction) {
        const currentField = newVersion.fields[logAction.name];
        const newField = currentField.copy();
        if (newField instanceof Field) {
            newField._default = null;
        }
        newField.changeLog = logAction.changeLog;
        newVersion.fields[newField.name] = newField;
    }
    else if (logAction instanceof action.AddFieldTypeAction) {
        const currentField = newVersion.fields[logAction.name];
        const newField = new Field(logAction.name, logAction.changeLog, logAction.description, logAction.optional, logAction.type, logAction._default);
        newVersion.fields[newField.name] = newField;
    }
    else if (logAction instanceof action.UpdateDescriptionTypeAction) {
        const currentField = newVersion.fields[logAction.name];
        const newField = currentField.copy();
        newField.description = logAction.description;
        newField.changeLog = logAction.changeLog;
        newVersion.fields[newField.name] = newField;
    }
    else if (logAction instanceof action.ReferenceFieldTypeAction) {
        const currentField = newVersion.fields[logAction.name];
        const newField = new ReferenceField(logAction.name, logAction.changeLog, logAction.description, logAction.optional, logAction.referenceType, logAction.referenceHash, logAction.referenceVersion);
        newVersion.fields[newField.name] = newField;
    }
}
function typeOrServiceName(logAction) {
    if (logAction instanceof action.RenameFieldTypeAction
        || logAction instanceof action.RequiredFieldTypeAction
        || logAction instanceof action.OptionalFieldTypeAction
        || logAction instanceof action.DeleteFieldTypeAction
        || logAction instanceof action.SetDefaultFieldTypeAction
        || logAction instanceof action.RemoveDefaultFieldTypeAction
        || logAction instanceof action.AddFieldTypeAction
        || logAction instanceof action.UpdateDescriptionTypeAction
        || logAction instanceof action.ReferenceFieldTypeAction
        || logAction instanceof action.NewTypeAction) {
        return [logAction.typeName, null];
    }
    else if (logAction instanceof action.UpdateDescriptionServiceAction
        || logAction instanceof action.AddVersionServiceAction
        || logAction instanceof action.NewServiceAction) {
        return [null, logAction.serviceName];
    }
    throw new Error('Satisfying typescript');
}
exports.typeOrServiceName = typeOrServiceName;
function groupByTypeAndService(log) {
    const types = new Map();
    const services = new Map();
    for (let logAction of log) {
        if (logAction instanceof action.GroupAction) {
            const [groupTypes, groupServices] = groupByTypeAndService(logAction.actions);
            for (let [key, subActions] of groupTypes) {
                const fakeGroupAction = new action.GroupAction(logAction.changeLog, logAction.hash, logAction.typeOrServiceName, subActions, logAction.versions);
                const existingType = types.get(key);
                if (existingType !== null && existingType !== undefined) {
                    existingType.push(fakeGroupAction);
                }
                else {
                    types.set(key, [fakeGroupAction]);
                }
            }
            for (let [key, subActions] of groupServices) {
                const fakeGroupAction = new action.GroupAction(logAction.changeLog, logAction.hash, logAction.typeOrServiceName, subActions, logAction.versions);
                const existingService = services.get(key);
                if (existingService !== null && existingService !== undefined) {
                    existingService.push(fakeGroupAction);
                }
                else {
                    services.set(key, [fakeGroupAction]);
                }
            }
        }
        else {
            const [typeName, serviceName] = typeOrServiceName(logAction);
            if (typeName !== null) {
                const existingType = types.get(typeName);
                if (existingType !== null && existingType !== undefined) {
                    existingType.push(logAction);
                }
                else {
                    types.set(typeName, [logAction]);
                }
            }
            else if (serviceName !== null) {
                const existingService = services.get(serviceName);
                if (existingService !== null && existingService !== undefined) {
                    existingService.push(logAction);
                }
                else {
                    services.set(serviceName, [logAction]);
                }
            }
        }
    }
    return [types, services];
}
function getVersionForType(_type, logAction) {
    if (logAction.hasHashAndVersion()) {
        const newVersion = new Version(_type.name, logAction.hash, logAction.version, {});
        if (logAction instanceof action.GroupAction) {
            newVersion.version = logAction.versions[_type.name];
        }
        if (_type.versions.length > 0) {
            newVersion.fields = Object.assign({}, _type.versions[_type.versions.length - 1].fields);
        }
        return newVersion;
    }
    else {
        if (_type.latest === null) {
            _type.latest = new Version(_type.name, null, null, {});
            if (_type.versions.length > 0) {
                _type.latest.fields = Object.assign({}, _type.versions[_type.versions.length - 1].fields);
            }
        }
        return _type.latest;
    }
}
function generateDefinitions(log) {
    typeidea.validateActions(log, false);
    const [logTypes, logServices] = groupByTypeAndService(log);
    const types = [];
    const services = [];
    for (let [typeName, typeActions] of logTypes.entries()) {
        const _type = new Type(typeName, '');
        for (let typeAction of typeActions) {
            _type.changeLog.push(typeAction.changeLog);
            const newVersion = getVersionForType(_type, typeAction);
            if (typeAction instanceof action.NewTypeAction) {
                _type.description = typeAction.description;
            }
            else if (typeAction instanceof action.GroupAction) {
                for (let subAction of typeAction.actions) {
                    updateVersion(newVersion, subAction);
                }
            }
            else {
                updateVersion(newVersion, typeAction);
            }
            if (typeAction.hasHashAndVersion()) {
                _type.versions.push(newVersion);
            }
        }
        types.push(_type);
    }
    for (let [serviceName, serviceActions] of logServices.entries()) {
        const service = new Service(serviceName, '');
        for (let serviceAction of serviceActions) {
            service.changeLog.push(serviceAction.changeLog);
            if (serviceAction instanceof action.GroupAction) {
                for (let subAction of serviceAction.actions) {
                    updateServiceVersion(service, subAction);
                }
            }
            else {
                updateServiceVersion(service, serviceAction);
            }
        }
        services.push(service);
    }
    return [types, services];
}
exports.generateDefinitions = generateDefinitions;
function generateTypescript(types) {
    return (prettier.format(generate_typescript.generateTypes(types), { parser: 'typescript' }));
}
exports.generateTypescript = generateTypescript;
function generateTypescriptServices(services) {
    return (prettier.format(generate_typescript.generateExpress(services), { parser: 'typescript' }));
}
exports.generateTypescriptServices = generateTypescriptServices;
function generateTypescriptClient(types, services) {
    return (prettier.format(generate_typescript.generateClient(types, services), { parser: 'typescript' }));
}
exports.generateTypescriptClient = generateTypescriptClient;
function generateTypescriptBoth(types, services) {
    const generatedTypes = generateTypescript(types);
    const generatedServices = generateTypescriptServices(services);
    const generatedClient = generateTypescriptClient(types, services);
    return [generatedTypes, generatedServices, generatedClient];
}
exports.generateTypescriptBoth = generateTypescriptBoth;
