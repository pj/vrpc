"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const resolvers_1 = require("./resolvers");
const schema = type_graphql_1.buildSchemaSync({
    resolvers: [resolvers_1.VRPCResolver],
});
type_graphql_1.emitSchemaDefinitionFileSync("./lib/schema.gql", schema);
