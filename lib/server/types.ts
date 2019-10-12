import * as _ from 'lodash';

import * as action from '../action';
import * as generate from '../generate';

export type GQLFieldTypes = 'stringType' | 'booleanType' | 'numberType';

export type GQLFieldDefaults = string | boolean | number;

export class StringField {
  value: string;
  constructor(value: string) {
    this.value = value;
  }
}

export class IntField {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
}

export class FloatField {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
}

export class BooleanField {
  value: boolean;
  constructor(value: boolean) {
    this.value = value;
  }
}

export type GQLFieldData = StringField | IntField | FloatField | BooleanField;

export class GQLBaseField {
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

  get __typename(): string {
    return "BaseField";
  }
}

export class GQLField extends GQLBaseField {
  _type: GQLFieldTypes;
  _default: GQLFieldData | null;

  constructor(
    name: string,
    changeLog: string,
    description: string,
    optional: boolean,
    _type: GQLFieldTypes,
    _default: GQLFieldData | null
  ) {
    super(name, changeLog, description, optional);
    this._type = _type;
    this._default = _default;
  }

  get __typename(): string {
    return "Field";
  }
}

export class GQLReferenceField extends GQLBaseField {
  referenceType: string;
  referenceHash: string | null;
  referenceVersion: number | null;

  constructor(
    name: string,
    changeLog: string,
    description: string,
    optional: boolean,
    referenceType: string,
    referenceHash: string | null,
    referenceVersion: number | null
  ) {
    super(name, changeLog, description, optional);
    this.referenceType = referenceType;
    this.referenceHash = referenceHash;
    this.referenceVersion = referenceVersion;
  }

  get __typename(): string {
    return "ReferenceField";
  }
}

export class GQLFieldObject {
  key: string;
  field: GQLBaseField;

  constructor(
    key: string,
    field: GQLBaseField
  ) {
    this.key = key;
    this.field = field;
  }
}

export class GQLVersion {
  _type: string;
  version: number | null;
  hash: string | null;
  fields: GQLFieldObject[];

  constructor(
    _type: string,
    hash: string | null,
    version: number | null,
    fields: GQLFieldObject[],
  ) {
    this._type = _type;
    this.hash = hash;
    this.version = version;
    this.fields = fields;
  }

  static fromGenerateVersion(generateVersion: generate.Version): GQLVersion {
    const fields = [];
    for (let [key, field] of Object.entries(generateVersion.fields)) {
      let gqlField = null;
      if (field instanceof generate.Field) {
        let gqlDefault = null;
        if (_.isBoolean(field._default)) {
          gqlDefault = new BooleanField(field._default);
        } else if (_.isNumber(field._default)) {
          gqlDefault = new FloatField(field._default);
        } else if (_.isString(field._default)) {
          gqlDefault = new StringField(field._default);
        }
        gqlField = new GQLField(
          field.name,
          field.changeLog,
          field.description,
          field.optional,
          field.type === 'string' ? 'stringType' :
            (field.type === 'boolean' ? 'booleanType' : 'numberType'),
          gqlDefault
        );
      } else if (field instanceof generate.ReferenceField) {
        gqlField = new GQLReferenceField(
          field.name,
          field.changeLog,
          field.description,
          field.optional,
          field.referenceType,
          field.referenceHash,
          field.referenceVersion
        );
      } else {
        throw new Error('Should never happen (famous last words).');
      }
      fields.push(
        new GQLFieldObject(key, gqlField)
      );
    }
    return new GQLVersion(
      generateVersion._type,
      generateVersion.hash,
      generateVersion.version,
      fields
    )
  }
}

export class GQLType {
  name: string;
  versions: GQLVersion[];
  latest: GQLVersion | null;
  changeLog: string[];
  description: string;

  constructor(
    name: string,
    description: string,
    versions: GQLVersion[],
    latest: GQLVersion | null,
    changeLog: string[]
  ) {
    this.name = name;
    this.description = description;
    this.versions = versions;
    this.latest = latest;
    this.changeLog = changeLog;
  }

  static fromGenerateType(generateType: generate.Type): GQLType {
    const versions = [];
    for (let version of generateType.versions) {
      versions.push(
        GQLVersion.fromGenerateVersion(version)
      );
    }
    const latest = null;
    return new GQLType(
      generateType.name,
      generateType.description,
      versions,
      latest,
      generateType.changeLog
    )
  }
}

export class GQLVersionType {
  _type: string;
  version: number | null;
  hash: string | null;

  constructor(
    _type: string,
    hash: string | null,
    version: number | null,
  ) {
    this._type = _type;
    this.hash = hash;
    this.version = version;
  }
}

export class GQLServiceVersion {
  inputs: GQLVersionType[];
  output: GQLVersionType;

  constructor(
    inputs: GQLVersionType[],
    output: GQLVersionType
  ) {
    this.inputs = inputs;
    this.output = output;
  }
}

export class GQLService {
  name: string;
  changeLog: string[];
  description: string;
  versions: GQLServiceVersion[];

  constructor(
    name: string,
    description: string,
    changeLog: string[],
    versions: GQLServiceVersion[]
  ) {
    this.name = name;
    this.description = description;
    this.changeLog = [];
    this.versions = versions;
  }

  static fromGenerateService(generateService: generate.Service): GQLService {
    const versions = [];
    for (let version of generateService.versions.values()) {
      const [versionOutput, versionInputs] = version;
      const gqlOutputVersion = new GQLVersionType(
        versionOutput._type,
        versionOutput.hash,
        versionOutput.version
      );
      const gqlInputVersions = [];
      for (let versionInput of versionInputs) {
        gqlInputVersions.push(
          new GQLVersionType(
            versionInput._type,
            versionInput.hash,
            versionInput.version
          )
        );
      }
      versions.push(
        new GQLServiceVersion(gqlInputVersions, gqlOutputVersion)
      );
    }
    const latest = null;
    return new GQLService(
      generateService.name,
      generateService.description,
      generateService.changeLog,
      versions
    );
  }
}
