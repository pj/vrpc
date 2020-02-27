"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { ApolloServer } = require('apollo-server');
const resolvers_1 = require("./resolvers");
const type_graphql_1 = require("type-graphql");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT || 4000;
async function startServer(backend) {
    // ... Building schema here
    const schema = await type_graphql_1.buildSchema({
        resolvers: [resolvers_1.VRPCResolver],
    });
    // Create the GraphQL server
    const server = new ApolloServer({
        schema,
        playground: true,
        context: {
            backend: backend
        },
        cors: {
            origin: '*',
            credentials: true
        }
    });
    // const server = new ApolloServer({ schema });
    const app = express();
    app.use(cors_1.default());
    // server.applyMiddleware({ app });
    app.use('/static', express.static(path_1.default.join(__dirname, '..', 'dist', 'client')));
    // Start the server
    server.listen({ port: 1234 }).then(() => {
        console.log(`🚀  Server ready at `);
    });
    app.listen(3000, () => console.log(`Example app listening on port ${3000}!`));
}
exports.startServer = startServer;
