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
                return (log.map(l => types.actionToGQLLogAction(l)));
            },
            services: async () => {
                const currentServices = await backend.getCurrentServices();
                return (currentServices.map(s => types.serviceToGQLService(s)));
            },
            types: async () => {
                const currentTypes = await backend.getCurrentTypes();
                return (currentTypes.map(t => types.typeToGQLType(t)));
            },
            changeSets: async (_, context) => {
                const currentChangeSets = await backend.getChangeSets(context.userId);
                return (currentChangeSets.map(c => types.changeSetToGQLChangeSet(c)));
            }
        },
        Mutation: {
            updateChangeSet: async (parent, context, args) => {
                await backend.updateChangeSet(context.userId, args.changeSet.id, types.gqlChangeSetToChangeSet(args.changeSet));
                const changeSet = await backend.getChangeSet(context.userId, args.changeSet.id);
                return (types.changeSetToGQLChangeSet(changeSet));
            },
            commitChangeSet: async (parent, context, args) => {
                await backend.commitChangeSet(context.userId, args.changeSetId);
                const currentTypes = await backend.getCurrentTypes();
                const gqlTypes = currentTypes.map(t => types.typeToGQLType(t));
                const services = await backend.getCurrentServices();
                const gqlServices = services.map(s => types.serviceToGQLService(s));
                const log = await backend.getLog();
                const changeSets = await backend.getChangeSets(context.userId);
                return ({
                    __typename: 'NewLog',
                    log: log.map(l => types.actionToGQLLogAction(l)),
                    types: gqlTypes,
                    services: gqlServices,
                    changeSets: changeSets.map(c => types.changeSetToGQLChangeSet(c))
                });
            },
            deleteChangeSet: async (parent, context, args) => {
                await backend.deleteChangeSet(context.userId, args.changeSetId);
                const changeSets = await backend.getChangeSets(context.userId);
                return (changeSets.map(c => types.changeSetToGQLChangeSet(c)));
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
