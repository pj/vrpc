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
const types = __importStar(require("./types"));
const typeDefs = graphql_import_1.importSchema(path.join(__dirname, 'schema.graphql'));
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
        LogAction: {
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
            services: async () => {
                const currentServices = await backend.getCurrentServices();
                let output = [];
                for (let currentService of currentServices) {
                    output.push(types.GQLService.fromGenerateService(currentService));
                }
                return output;
            },
            types: async () => {
                const currentTypes = await backend.getCurrentTypes();
                let output = [];
                for (let currentType of currentTypes) {
                    output.push(types.GQLType.fromGenerateType(currentType));
                }
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
