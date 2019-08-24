"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action = require("./action");
const typeidea = require("./typeidea");
const generate_typescript = require("./generate_typescript");
const prettier = require("prettier");
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
        return `${this._type}_V${this.version}`;
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
    //inputType: string;
    //outputType: string;
    //inputVersions: ServiceVersion[];
    //outputVersions: ServiceVersion[];
    //latest: ServiceVersion[] | null;
    constructor(name, description) {
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
    addVersion(logAction) {
        const inputVersion = `${logAction.inputType}_${logAction.inputVersion}`;
        const outputVersion = `${logAction.outputType}_${logAction.outputVersion}`;
        if (this.seenInputVersions.has(inputVersion)) {
            throw new Error(`Input version ${inputVersion} used elsewhere`);
        }
        this.seenInputVersions.add(inputVersion);
        const existingVersion = this.versions.get(outputVersion);
        if (existingVersion) {
            existingVersion[1].push(new VersionType(logAction.inputType, logAction.inputHash, logAction.inputVersion));
        }
        else {
            this.versions.set(outputVersion, [
                new VersionType(logAction.outputType, logAction.outputHash, logAction.outputVersion),
                [new VersionType(logAction.inputType, logAction.inputHash, logAction.inputVersion)],
            ]);
        }
    }
}
exports.Service = Service;
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
function updateTypeFields(logAction, types, groupingVersions, isLatest) {
    if (!(logAction instanceof action.RenameFieldTypeAction ||
        logAction instanceof action.RequiredFieldTypeAction ||
        logAction instanceof action.OptionalFieldTypeAction ||
        logAction instanceof action.DeleteFieldTypeAction ||
        logAction instanceof action.SetDefaultFieldTypeAction ||
        logAction instanceof action.RemoveDefaultFieldTypeAction ||
        logAction instanceof action.AddFieldTypeAction ||
        logAction instanceof action.UpdateDescriptionTypeAction ||
        logAction instanceof action.ReferenceFieldTypeAction)) {
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
            newVersion = new Version(_type.name, logAction.hash, logAction.version, {});
            if (_type.versions.length > 0) {
                newVersion.fields = Object.assign({}, _type.versions[_type.versions.length - 1].fields);
            }
            _type.latest = newVersion;
        }
        else {
            newVersion = _type.latest;
        }
    }
    else if (groupingVersions === null) {
        newVersion = new Version(_type.name, logAction.hash, logAction.version, {});
        if (_type.versions.length > 0) {
            newVersion.fields = Object.assign({}, _type.versions[_type.versions.length - 1].fields);
        }
    }
    else {
        newVersion = groupingVersions.get(_type.name);
        if (newVersion === undefined) {
            newVersion = new Version(_type.name, logAction.hash, logAction.version, {});
            if (_type.versions.length > 0) {
                newVersion.fields = Object.assign({}, _type.versions[_type.versions.length - 1].fields);
            }
        }
    }
    updateVersion(newVersion, logAction);
    _type.changeLog.push(logAction.changeLog);
    if (!isLatest) {
        if (groupingVersions === null) {
            _type.versions.push(newVersion);
        }
        else {
            groupingVersions.set(_type.name, newVersion);
        }
    }
}
function updateServices(logAction, services, isLatest) {
    if (!(logAction instanceof action.UpdateDescriptionServiceAction ||
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
        throw new Error(`Updating service that doesn't exist ${logAction.serviceName}`);
    }
    const newService = services.get(logAction.serviceName);
    if (newService === undefined) {
        throw new Error(`This should not happen, added because typescript`);
    }
    if (logAction instanceof action.UpdateDescriptionServiceAction) {
        newService.description = logAction.description;
    }
    else if (logAction instanceof action.AddVersionServiceAction) {
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
function updateTypesAndServices(logAction, types, services, groupingVersions, isLatest) {
    if (logAction instanceof action.NewTypeAction) {
        if (types.has(logAction.typeName)) {
            throw new Error(`Type ${logAction.typeName} defined twice!`);
        }
        const newType = new Type(logAction.typeName, logAction.description);
        newType.changeLog.push(logAction.changeLog);
        types.set(newType.name, newType);
    }
    else if (logAction instanceof action.GroupAction) {
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
    }
    else if (logAction instanceof action.NewServiceAction) {
        if (types.has(logAction.serviceName)) {
            throw new Error(`Service ${logAction.serviceName} defined twice!`);
        }
        const newService = new Service(logAction.serviceName, logAction.description);
        newService.changeLog.push(logAction.changeLog);
        services.set(newService.name, newService);
    }
    else {
        updateTypeFields(logAction, types, groupingVersions, isLatest);
        updateServices(logAction, services, isLatest);
    }
}
function generateDefinitions(log) {
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
        }
        else if (action.hash === null) {
            notHashed = true;
            latest.push(action);
        }
        else {
            const expectedHash = typeidea.hashAction(action, previousHash);
            if (expectedHash !== action.hash) {
                throw new Error(`Invalid hash at item ${n} ${action}, did you change something?`);
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
exports.generateDefinitions = generateDefinitions;
function generateTypescript(types) {
    return (prettier.format(generate_typescript.generateTypes(types), { parser: 'typescript' }));
}
exports.generateTypescript = generateTypescript;
function generateTypescriptServices(services) {
    return (prettier.format(generate_typescript.generateExpress(services), { parser: 'typescript' }));
}
exports.generateTypescriptServices = generateTypescriptServices;
function generateTypescriptBoth(types, services) {
    const generatedTypes = generateTypescript(types);
    const generatedServices = generateTypescriptServices(services);
    return [generatedTypes, generatedServices];
}
exports.generateTypescriptBoth = generateTypescriptBoth;
