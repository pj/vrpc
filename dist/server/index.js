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
const graphql_import_1 = require("graphql-import");
const types = __importStar(require("./types"));
const typeidea_1 = require("../typeidea");
const typeDefs = graphql_import_1.importSchema(path.join(__dirname, 'schema.graphql'));
async function resultsFromMutation(backend) {
    let log = await backend.getLog();
    const hashes = typeidea_1.hashActions(log);
    log = typeidea_1.addHashes(log, hashes, null);
    for (let i = 0; i < log.length; i++) {
        log[i].unhashed = false;
    }
    for (let [idx, hash, version] of hashes) {
        log[idx].unhashed = true;
    }
    const currentTypes = await backend.getCurrentTypes();
    let outputTypes = [];
    for (let currentType of currentTypes) {
        outputTypes.push(types.GQLType.fromGenerateType(currentType));
    }
    const currentServices = await backend.getCurrentServices();
    let outputServices = [];
    for (let currentService of currentServices) {
        outputServices.push(types.GQLService.fromGenerateService(currentService));
    }
    return ({ log, types: outputTypes, services: outputServices });
}
function actionFromInput(input) {
    switch (input.logType) {
        // Services
        case 'NewServiceAction':
            return new action.NewServiceAction(input.changeLog, null, null, input.serviceName, input.description);
        case 'UpdateDescriptionServiceAction':
            return new action.UpdateDescriptionServiceAction(input.changeLog, null, null, input.serviceName, input.description);
        case 'AddVersionServiceAction':
            return new action.AddVersionServiceAction(input.changeLog, null, null, input.serviceName, input.inputType, input.outputType, parseInt(input.inputVersion, 10), input.inputHash, parseInt(input.outputVersion, 10), input.outputHash);
        // Types
        case 'RenameFieldTypeAction':
            return new action.RenameFieldTypeAction(input.changeLog, null, null, input.typeName, input.fieldName, input.newFieldName);
        case 'RequiredFieldTypeAction':
            return new action.RequiredFieldTypeAction(input.changeLog, null, null, input.typeName, input.fieldName);
        case 'OptionalFieldTypeAction':
            return new action.OptionalFieldTypeAction(input.changeLog, null, null, input.typeName, input.fieldName);
        case 'DeleteFieldTypeAction':
            return new action.DeleteFieldTypeAction(input.changeLog, null, null, input.typeName, input.fieldName);
        case 'SetDefaultFieldTypeAction':
            return new action.SetDefaultFieldTypeAction(input.changeLog, null, null, input.typeName, input.fieldName, input.defaultValue);
        case 'RemoveDefaultFieldTypeAction':
            return new action.RemoveDefaultFieldTypeAction(input.changeLog, null, null, input.typeName, input.fieldName);
        case 'AddFieldTypeAction':
            return new action.AddFieldTypeAction(input.changeLog, null, null, input.typeName, input.fieldName, input.defaultType, input.description, input.optional, input.defaultValue);
        case 'UpdateDescriptionTypeAction':
            return new action.UpdateDescriptionTypeAction(input.changeLog, null, null, input.typeName, input.fieldName, input.description);
        case 'ReferenceFieldTypeAction':
            return new action.ReferenceFieldTypeAction(input.changeLog, null, null, input.typeName, input.fieldName, input.description, input.optional, input.referenceType, input.referenceHash, input.referenceVersion);
        case 'NewTypeAction':
            return new action.NewTypeAction(input.changeLog, null, null, input.typeName, input.description);
        default:
            throw new Error(`Unknown input action ${input}`);
    }
}
exports.actionFromInput = actionFromInput;
function startServer(backend) {
    const resolvers = {
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
        FieldData: {
            __resolveType(obj, context, info) {
                if (obj instanceof types.StringField) {
                    return 'StringField';
                }
                if (obj instanceof types.IntField) {
                    return 'IntField';
                }
                if (obj instanceof types.FloatField) {
                    return 'FloatField';
                }
                if (obj instanceof types.BooleanField) {
                    return 'BooleanField';
                }
                return null;
            }
        },
        Query: {
            log: async () => {
                return (await resultsFromMutation(backend)).log;
            },
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
        },
        Mutation: {
            async addToLog(root, input, context) {
                const action = actionFromInput(input.input);
                console.log('----------------');
                console.log("adding");
                console.log(action);
                await backend.addToLog(action);
                return (await resultsFromMutation(backend));
            },
            async truncateTo(root, input, context) {
                await backend.truncateTo(input.input.to);
                return (await resultsFromMutation(backend));
            },
            async hashTo(root, input, context) {
                await backend.hashTo(input.input.to);
                return (await resultsFromMutation(backend));
            },
            async _delete(root, input, context) {
                await backend._delete(input.input.to);
                return (await resultsFromMutation(backend));
            },
            async groupAndHash(root, input, context) {
                await backend.groupAndHash(input.input.to);
                return (await resultsFromMutation(backend));
            }
        }
    };
    const server = new apollo_server_1.ApolloServer({ typeDefs, resolvers });
    server.listen().then(({ url }) => {
        console.log(`Server ready at ${url}`);
    });
}
exports.startServer = startServer;
