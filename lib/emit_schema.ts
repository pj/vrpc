import "reflect-metadata";
import {
    buildSchemaSync,
    emitSchemaDefinitionFileSync
} from 'type-graphql';
import { VRPCResolver} from './resolvers';

const schema = buildSchemaSync({
  resolvers: [VRPCResolver],
});
emitSchemaDefinitionFileSync("./lib/schema.gql", schema);