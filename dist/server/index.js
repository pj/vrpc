"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const apollo_server_1 = require("apollo-server");
const action = __importStar(require("../action"));
const generate_1 = require("../generate");
const graphql_import_1 = require("graphql-import");
const typeDefs = graphql_import_1.importSchema(path.join(__filename, 'schema.graphql'));
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
function startServer(backend) {
    const resolvers = {
        BaseField: {
            __resolveType(obj, context, info) {
                if (obj instanceof generate_1.Field) {
                    return 'Field';
                }
                else if (obj instanceof generate_1.ReferenceField) {
                    return 'ReferenceField';
                }
                return null;
            }
        },
        Action: {
            __resolveType(obj, context, info) {
                if (obj instanceof action.NewServiceAction) {
                    return 'NewServiceAction';
                }
                else if (obj instanceof action.UpdateDescriptionServiceAction) {
                    return 'UpdateDescriptionServiceAction';
                }
                else if (obj instanceof action.AddVersionServiceAction) {
                    return 'AddVersionServiceAction';
                }
                else if (obj instanceof action.RenameFieldTypeAction) {
                    return 'RenameFieldTypeAction';
                }
                else if (obj instanceof action.RequiredFieldTypeAction) {
                    return 'RequiredFieldTypeAction';
                }
                else if (obj instanceof action.OptionalFieldTypeAction) {
                    return 'OptionalFieldTypeAction';
                }
                else if (obj instanceof action.DeleteFieldTypeAction) {
                    return 'DeleteFieldTypeAction';
                }
                else if (obj instanceof action.SetDefaultFieldTypeAction) {
                    return 'SetDefaultFieldTypeAction';
                }
                else if (obj instanceof action.RemoveDefaultFieldTypeAction) {
                    return 'RemoveDefaultFieldTypeAction';
                }
                else if (obj instanceof action.AddFieldTypeAction) {
                    return 'AddFieldTypeAction';
                }
                else if (obj instanceof action.UpdateDescriptionTypeAction) {
                    return 'UpdateDescriptionTypeAction';
                }
                else if (obj instanceof action.ReferenceFieldTypeAction) {
                    return 'ReferenceFieldTypeAction';
                }
                else if (obj instanceof action.NewTypeAction) {
                    return 'NewTypeAction';
                }
                else if (obj instanceof action.GroupAction) {
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
    const server = new apollo_server_1.ApolloServer({ typeDefs, resolvers });
    server.listen().then(({ url }) => {
        console.log(`Server ready at ${url}`);
    });
    `)})`;
}
exports.startServer = startServer;
