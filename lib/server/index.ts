import * as path from 'path';
import { ApolloServer, gql } from 'apollo-server';
import { Backend } from '../backend';
import * as action from '../action';
import {BaseField, Field, ReferenceField} from '../generate';
import {importSchema} from 'graphql-import';

const typeDefs = importSchema(path.join(__filename, 'schema.graphql'));

//class BaseFieldGQL {
//  name: string;
//  changeLog: string;
//  description: string;
//  optional: boolean;
//
//  constructor(
//    name: string,
//    changeLog: string,
//    description: string,
//    optional: boolean,
//  ) {
//    this.name = name;
//    this.changeLog = changeLog;
//    this.description = description;
//    this.optional = optional;
//  }
//}
//
//class FieldGQL extends BaseFieldGQL {
//  type: action.FieldTypes;
//  _default: action.FieldDefaults | null;
//
//  constructor(
//    name: string,
//    changeLog: string,
//    description: string,
//    optional: boolean,
//    type: action.FieldTypes,
//    _default: action.FieldDefaults | null
//  ) {
//    super(name, changeLog, description, optional);
//    this.type = type;
//    this._default = _default;
//  }
//}
//
//export class ReferenceFieldGQL extends BaseFieldGQL {
//  referenceType: string;
//  referenceHash: string | null;
//  referenceVersion: number | null;
//
//  constructor(
//    name: string,
//    changeLog: string,
//    description: string,
//    optional: boolean,
//    referenceType: string,
//    referenceHash: string | null,
//    referenceVersion: number | null
//  ) {
//    super(name, changeLog, description, optional);
//    this.referenceType = referenceType;
//    this.referenceHash = referenceHash;
//    this.referenceVersion = referenceVersion;
//  }
//}
//
//export type FieldObjectGQL = {
//  [key: string]: BaseFieldGQL;
//};
//
//export class Version {
//  _type: string;
//  version: number | null;
//  hash: string | null;
//  fields: FieldObjectGQL[];
//
//  constructor(
//    _type: string,
//    hash: string | null,
//    version: number | null,
//    fields: FieldObject,
//  ) {
//    this._type = _type;
//    this.hash = hash;
//    this.version = version;
//    this.fields = fields;
//  }
//}
//
//export class Type {
//  name: string;
//  versions: Version[];
//  latest: Version | null;
//  changeLog: string[];
//  description: string;
//
//  constructor(name: string, description: string) {
//    this.name = name;
//    this.description = description;
//    this.versions = [];
//    this.latest = null;
//    this.changeLog = [];
//  }
//}
//
//export class VersionType {
//  _type: string;
//  version: number | null;
//  hash: string | null;
//
//  constructor(
//    _type: string,
//    hash: string | null,
//    version: number | null,
//  ) {
//    this._type = _type;
//    this.hash = hash;
//    this.version = version;
//  }
//}
//
//export class Service {
//  name: string;
//  changeLog: string[];
//  description: string;
//  versions: Map<string, [VersionType, VersionType[]]>;
//  seenInputVersions: Set<string>;
//
//  constructor(
//    name: string,
//    description: string,
//  ) {
//    this.name = name;
//    this.description = description;
//    this.changeLog = [];
//    this.versions = new Map();
//    this.seenInputVersions = new Set();
//  }
//}

export function startServer(backend: Backend) {
  const resolvers = {
    BaseField: {
      __resolveType(
        obj: action.Action,
        context: any,
        info: any
      ): string | null {
        if (obj instanceof Field) {
          return 'Field';
        } else if (obj instanceof ReferenceField) {
          return 'ReferenceField';
        }
        return null;
      }
    },
    Action: {
      __resolveType(
        obj: action.Action,
        context: any,
        info: any
      ): string | null {
        if (obj instanceof action.NewServiceAction) {
          return 'NewServiceAction';
        } else if (obj instanceof action.UpdateDescriptionServiceAction) {
          return 'UpdateDescriptionServiceAction';
        } else if (obj instanceof action.AddVersionServiceAction) {
          return 'AddVersionServiceAction';
        } else if (obj instanceof action.RenameFieldTypeAction) {
          return 'RenameFieldTypeAction';
        } else if (obj instanceof action.RequiredFieldTypeAction) {
          return 'RequiredFieldTypeAction';
        } else if (obj instanceof action.OptionalFieldTypeAction) {
          return 'OptionalFieldTypeAction';
        } else if (obj instanceof action.DeleteFieldTypeAction) {
          return 'DeleteFieldTypeAction';
        } else if (obj instanceof action.SetDefaultFieldTypeAction) {
          return 'SetDefaultFieldTypeAction';
        } else if (obj instanceof action.RemoveDefaultFieldTypeAction) {
          return 'RemoveDefaultFieldTypeAction';
        } else if (obj instanceof action.AddFieldTypeAction) {
          return 'AddFieldTypeAction';
        } else if (obj instanceof action.UpdateDescriptionTypeAction) {
          return 'UpdateDescriptionTypeAction';
        } else if (obj instanceof action.ReferenceFieldTypeAction) {
          return 'ReferenceFieldTypeAction';
        } else if (obj instanceof action.NewTypeAction) {
          return 'NewTypeAction';
        } else if (obj instanceof action.GroupAction) {
          return 'GroupAction';
        }
        return null;
      }
    },
    Query: {
      log: async () => await backend.getLog(),
      services: async () => await backend.getCurrentServices(),
      types: async () => {
        const currentTypes = await backend.getCurrentTypes();
        let output = [];


        return output;
      }
    }
  };

  const server = new ApolloServer({typeDefs, resolvers});

  server.listen().then(({ url }: {url: any}) => {
    console.log(`Server ready at ${url}`);
  });`)})`
}
