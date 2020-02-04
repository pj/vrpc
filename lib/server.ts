import { ApolloServer } from "apollo-server";
import {VRPCResolver} from "./resolvers";
import {buildSchema} from 'type-graphql';
import { Backend } from "./backend";

const PORT = process.env.PORT || 4000;

export async function startServer(backend: Backend) {
  // ... Building schema here
  const schema = await buildSchema({
    resolvers: [VRPCResolver],
  });

  // Create the GraphQL server
  const server = new ApolloServer({
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