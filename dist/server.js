"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const resolvers_1 = require("./resolvers");
const type_graphql_1 = require("type-graphql");
const PORT = process.env.PORT || 4000;
async function startServer(backend) {
    // ... Building schema here
    const schema = await type_graphql_1.buildSchema({
        resolvers: [resolvers_1.VRPCResolver],
    });
    // Create the GraphQL server
    const server = new apollo_server_1.ApolloServer({
        schema,
        playground: true,
        context: {
            backend: backend
        }
    });
    // Start the server
    const { url } = await server.listen(PORT);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}
exports.startServer = startServer;
