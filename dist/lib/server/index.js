"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = apollo_server_1.gql `
  type StringField {
    value: String
  }

  type IntField {
    value: Int
  }

  type FloatField {
    value: Float
  }

  type BooleanField {
    value: Boolean
  }

  union FieldData = StringField | IntField | FloatField | BooleanField

  interface Action {
    changeLog: String,
    hash: String,
    version: Int
  }

  type NewServiceAction implements Action {
    serviceName: String,
    description: String
  }

  type UpdateDescriptionServiceAction implements Action {
    serviceName: String,
    description: String
  }

  type AddVersionServiceAction implements Action {
    serviceName: String,
    inputType: String,
    outputType: String,
    inputVersion: Int,
    inputHash: String,
    outputVersion: Int,
    outputHash: String
  }

  type RenameFieldTypeAction implements Action {
    typeName: String,
    _from: String,
    to: String
  }

  type RequiredFieldTypeAction implements Action {
    typeName: String,
    name: String
  }

  type OptionalFieldTypeAction implements Action {
    typeName: String,
    name: String
  }

  type DeleteFieldTypeAction implements Action {
    typeName: String,
    name: String
  }

  type SetDefaultFieldTypeAction implements Action {
    typeName: String,
    name: String,
    _default: FieldData
  }

  type RemoveDefaultFieldTypeAction implements Action {
    typeName: String,
    name: String
  }

  type AddFieldTypeAction implements Action {
    typeName: String,
    name: String,
    type: String,
    description: String,
    optional: Boolean,
    _default: FieldData
  }

  type UpdateDescriptionTypeAction implements Action {
    typeName: String,
    name: String,
    description: String
  }

  type ReferenceFieldTypeAction implements Action {
    typeName: String,
    name: String,
    description: String,
    optional: Boolean,
    referenceType: String,
    referenceHash: String,
    referenceVersion: Int
  }

  type NewTypeAction implements Action {
    typeName: String,
    description: String
  }

  type GroupVersion {
    typeName: String,
    version: Int
  }

  type GroupAction implements Action {
    groupedActions: [Action],
    versions: [GroupVersion]
  }

  type VersionType {
    _type: String,
    version: Int,
    hash: String
  }

  type Service {
    name: String,
    changeLog: [String],
    description: String,
    versions: [VersionType]
  }

  interface BaseField {
    name: String,
    changeLog: String,
    description: String,
    optional: Boolean
  }

  type Field implements BaseField {
    _default: FieldData
  }

  type ReferenceField implements BaseField {
    referenceType: String,
    referenceHash: String,
    referenceVersion: Int
  }

  type FieldObject {
    key: String,
    field: BaseField
  }

  type Version {
    _type: String,
    version: Int,
    hash: String,
    fields: [FieldObject]
  }

  type Type {
    name: String,
    versions: [Version],
    latest: Version,
    changeLog: [String],
    description: String
  }

  type Query {
    log: [Action]
    services: [Service]
    types: [Type]
  }
`;
function startServer(backend) {
    const resolvers = {
        Query: {
            log: () => [],
            services: () => [],
            types: () => []
        },
    };
    const server = new apollo_server_1.ApolloServer({ typeDefs, resolvers });
    server.listen().then(({ url }) => {
        console.log(`Server ready at ${url}`);
    });
    `)})`;
}
exports.startServer = startServer;
