import {
  FieldDefaults, 
} from './action';
import {Type as FieldTypes} from './generated/type_definition';

export abstract class BaseField {
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

export class ScalarField extends BaseField {
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

export class ReferenceField extends BaseField {
  referenceType: string;
  referenceHash?: string;
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


export class Version {
  _type: string;
  version: number;
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

export class BaseGeneratable {
  name: string;
  changeLog: string[];
  description: string;
  currentVersion: number | null;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.currentVersion = null;
    this.changeLog = [];
  }
}

export class Type extends BaseGeneratable{
  versions: Version[];
  changeSetName?: string;

  constructor(name: string, description: string) {
    super(name, description);
    this.versions = [];
  }
}

// export class VersionType {
//   _type: string;
//   version: number;
//   hash: string;

//   constructor(
//     _type: string,
//     hash: string,
//     version: number,
//   ) {
//     this._type = _type;
//     this.hash = hash;
//     this.version = version;
//   }

//   toString(): string {
//     return `${this._type}_V${this.version}`;
//   }
// }

export class ServiceMapping {
  name: string;
  version: number;
  inputType: string;
  inputVersion: number;
  inputHash: string;
  outputType: string;
  outputVersion: number;
  outputHash: string;

  constructor(
    name: string,
    version: number,
    inputType: string,
    inputVersion: number,
    inputHash: string,
    outputType: string,
    outputVersion: number,
    outputHash: string,
  ) {
    this.name = name;
    this.version = version;
    this.inputType = inputType;
    this.inputVersion = inputVersion;
    this.inputHash = inputHash;
    this.outputType = outputType;
    this.outputVersion = outputVersion;
    this.outputHash = outputHash;
  }
}

export class ServiceVersion {
  name: string;
  version: number;
  hash: string;
  mappings: Map<string, Map<string, ServiceMapping>>;

  constructor(
    name: string,
    version: number,
    hash: string,
    mappings: Map<string, Map<string, ServiceMapping>>
  ) {
    this.name = name;
    this.version = version;
    this.hash = hash;
    this.mappings = mappings;
  }
}

export class Service extends BaseGeneratable {
  name: string;
  changeLog: string[];
  description: string;
  versions: ServiceVersion[];

  constructor(
    name: string,
    description: string,
  ) {
    super(name, description);
    this.versions = [];
  }
}