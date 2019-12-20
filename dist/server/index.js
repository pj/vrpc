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
const graphql_import_1 = require("graphql-import");
const types = __importStar(require("./types"));
const typeDefs = graphql_import_1.importSchema(path.join(__dirname, 'schema.graphql'));
const TEMP_USER_ID = 'paul';
function startServer(backend) {
    const resolvers = {
        Query: {
            log: async (parent, context) => {
                const log = await backend.getLog();
                const gqlLog = types.fromActionLog(log);
                return gqlLog;
            },
            services: async () => {
                const currentServices = await backend.getCurrentServices();
                let output = [];
                for (let currentService of currentServices) {
                    output.push(types.fromGenerateService(currentService));
                }
                return output;
            },
            types: async () => {
                const currentTypes = await backend.getCurrentTypes();
                let output = [];
                for (let currentType of currentTypes) {
                    output.push(types.fromGenerateType(currentType));
                }
                return output;
            },
            changeSets: async (_, context) => {
                const currentChangeSets = await backend.getChangeSets(context.userId);
                let output = [];
                for (let currentChangeSet of currentChangeSets) {
                    output.push(types.fromGenerateChangeSet(currentChangeSet));
                }
                return output;
            }
        },
        Mutation: {
            updateChangeSet: async (parent, context, args) => {
                await backend.updateChangeSet(context.userId, args.changeSetId, types.toChangeSet(args.changeSet));
                return (await backend.getChangeSet(context.userId, args.changeSetId));
            },
            commitChangeSet: async (parent, context, args) => {
                await backend.commitChangeSet(context.userId, args.changeSetId);
                const currentTypes = await backend.getCurrentTypes();
                const gqlTypes = currentTypes.map(t => types.fromGenerateType(t));
                const services = await backend.getCurrentServices();
                const gqlServices = services.map(s => types.fromGenerateService(s));
                return ({
                    log: (await backend.getLog()),
                    types: gqlTypes,
                    services: gqlServices,
                    changeSets: (await backend.getChangeSets(context.userId)),
                });
            },
            deleteChangeSet: async (parent, context, args) => {
                await backend.deleteChangeSet(context.userId, args.changeSetId);
                return (await backend.getChangeSets(context.userId));
            }
        }
    };
    const server = new apollo_server_1.ApolloServer({ typeDefs, resolvers,
        context: ({ req }) => {
            return { userId: TEMP_USER_ID };
        }
    });
    server.listen().then(({ url }) => {
        console.log(`Server ready at ${url}`);
    });
}
exports.startServer = startServer;
