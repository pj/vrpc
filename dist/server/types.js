"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const generate = __importStar(require("../generate"));
class StringField {
    constructor(value) {
        this.value = value;
    }
}
exports.StringField = StringField;
class IntField {
    constructor(value) {
        this.value = value;
    }
}
exports.IntField = IntField;
class FloatField {
    constructor(value) {
        this.value = value;
    }
}
exports.FloatField = FloatField;
class BooleanField {
    constructor(value) {
        this.value = value;
    }
}
exports.BooleanField = BooleanField;
class GQLBaseField {
    constructor(name, changeLog, description, optional) {
        this.name = name;
        this.changeLog = changeLog;
        this.description = description;
        this.optional = optional;
    }
    get __typename() {
        return "BaseField";
    }
}
exports.GQLBaseField = GQLBaseField;
class GQLField extends GQLBaseField {
    constructor(name, changeLog, description, optional, _type, _default) {
        super(name, changeLog, description, optional);
        this._type = _type;
        this._default = _default;
    }
    get __typename() {
        return "Field";
    }
}
exports.GQLField = GQLField;
class GQLReferenceField extends GQLBaseField {
    constructor(name, changeLog, description, optional, referenceType, referenceHash, referenceVersion) {
        super(name, changeLog, description, optional);
        this.referenceType = referenceType;
        this.referenceHash = referenceHash;
        this.referenceVersion = referenceVersion;
    }
    get __typename() {
        return "ReferenceField";
    }
}
exports.GQLReferenceField = GQLReferenceField;
class GQLFieldObject {
    constructor(key, field) {
        this.key = key;
        this.field = field;
    }
}
exports.GQLFieldObject = GQLFieldObject;
class GQLVersion {
    constructor(_type, hash, version, fields) {
        this._type = _type;
        this.hash = hash;
        this.version = version;
        this.fields = fields;
    }
    static fromGenerateVersion(generateVersion) {
        const fields = [];
        for (let [key, field] of Object.entries(generateVersion.fields)) {
            let gqlField = null;
            if (field instanceof generate.Field) {
                let gqlDefault = null;
                if (_.isBoolean(field._default)) {
                    gqlDefault = new BooleanField(field._default);
                }
                else if (_.isNumber(field._default)) {
                    gqlDefault = new FloatField(field._default);
                }
                else if (_.isString(field._default)) {
                    gqlDefault = new StringField(field._default);
                }
                gqlField = new GQLField(field.name, field.changeLog, field.description, field.optional, field.type === 'string' ? 'stringType' :
                    (field.type === 'boolean' ? 'booleanType' : 'numberType'), gqlDefault);
            }
            else if (field instanceof generate.ReferenceField) {
                gqlField = new GQLReferenceField(field.name, field.changeLog, field.description, field.optional, field.referenceType, field.referenceHash, field.referenceVersion);
            }
            else {
                throw new Error('Should never happen (famous last words).');
            }
            fields.push(new GQLFieldObject(key, gqlField));
        }
        return new GQLVersion(generateVersion._type, generateVersion.hash, generateVersion.version, fields);
    }
}
exports.GQLVersion = GQLVersion;
class GQLType {
    constructor(name, description, versions, latest, changeLog) {
        this.name = name;
        this.description = description;
        this.versions = versions;
        this.latest = latest;
        this.changeLog = changeLog;
    }
    static fromGenerateType(generateType) {
        const versions = [];
        for (let version of generateType.versions) {
            versions.push(GQLVersion.fromGenerateVersion(version));
        }
        const latest = null;
        return new GQLType(generateType.name, generateType.description, versions, latest, generateType.changeLog);
    }
}
exports.GQLType = GQLType;
class GQLVersionType {
    constructor(_type, hash, version) {
        this._type = _type;
        this.hash = hash;
        this.version = version;
    }
}
exports.GQLVersionType = GQLVersionType;
class GQLServiceVersion {
    constructor(inputs, output) {
        this.inputs = inputs;
        this.output = output;
    }
}
exports.GQLServiceVersion = GQLServiceVersion;
class GQLService {
    constructor(name, description, changeLog, versions) {
        this.name = name;
        this.description = description;
        this.changeLog = [];
        this.versions = versions;
    }
    static fromGenerateService(generateService) {
        const versions = [];
        for (let version of generateService.versions.values()) {
            const [versionOutput, versionInputs] = version;
            const gqlOutputVersion = new GQLVersionType(versionOutput._type, versionOutput.hash, versionOutput.version);
            const gqlInputVersions = [];
            for (let versionInput of versionInputs) {
                gqlInputVersions.push(new GQLVersionType(versionInput._type, versionInput.hash, versionInput.version));
            }
            versions.push(new GQLServiceVersion(gqlInputVersions, gqlOutputVersion));
        }
        const latest = null;
        return new GQLService(generateService.name, generateService.description, generateService.changeLog, versions);
    }
}
exports.GQLService = GQLService;
