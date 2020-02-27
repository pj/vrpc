const express = require('express');
const { ApolloServer } = require('apollo-server');
import {VRPCResolver} from "./resolvers";
import {buildSchema} from 'type-graphql';
import { Backend } from "./backend";
import path from 'path';
import cors from 'cors';

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
    },
    cors: {
      origin: '*',
      credentials: true
    }
  });

  // const server = new ApolloServer({ schema });

  const app = express();
  app.use(cors())
  // server.applyMiddleware({ app });
  app.use('/static', express.static(path.join(__dirname, '..', 'dist', 'client')))

  // Start the server
  server.listen({port: 1234}).then(() => {
    console.log(`🚀  Server ready at `);
  });
  app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))
}