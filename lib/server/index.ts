import * as path from 'path';
import { ApolloServer, gql } from 'apollo-server';
import { Backend } from '../backend';
import * as action from '../action';
import {importSchema} from 'graphql-import';
import * as schema from './schema';
import * as types from './types';

const typeDefs = importSchema(path.join(__dirname, 'schema.graphql'));

const TEMP_USER_ID = 'paul';

export function startServer(backend: Backend) {
  const resolvers: schema.GQLResolvers = {
    Query: {
      log: async (parent: schema.GQLQuery, context: any): Promise<schema.GQLLogAction[]> => {
        const log = await backend.getLog();
        const gqlLog = types.fromActionLog(log);
        return gqlLog;
      },
      services: async (): Promise<schema.GQLService[]> => {
        const currentServices = await backend.getCurrentServices();
        let output = [];
        for (let currentService of currentServices) {
          output.push(
            types.fromGenerateService(currentService)
          );
        }
        return output;
      },
      types: async (): Promise<schema.GQLType[]> => {
        const currentTypes = await backend.getCurrentTypes();
        let output = [];
        for (let currentType of currentTypes) {
          output.push(
            types.fromGenerateType(currentType)
          );
        }
        return output;
      },
      changeSets: async (
        _: schema.GQLQuery, 
        context: any
      ): Promise<schema.GQLChangeSet[]> => {
        const currentChangeSets = await backend.getChangeSets(context.userId);
        let output = [];
        for (let currentChangeSet of currentChangeSets) {
          output.push(
            types.fromGenerateChangeSet(currentChangeSet)
          );
        }
        return output;
      }
    },
    Mutation: {
      updateChangeSet: async (
        parent: schema.GQLMutation,
        context: any, 
        args: schema.GQLMutationUpdateChangeSetArgs
      ): Promise<schema.GQLChangeSet> => {
        await backend.updateChangeSet(context.userId, args.changeSetId, types.toChangeSet(args.changeSet));
        return (await backend.getChangeSet(context.userId, args.changeSetId));
      },
      commitChangeSet: async (
        parent: schema.GQLMutation, 
        context: any, 
        args: schema.GQLMutationCommitChangeSetArgs
      ): Promise<schema.GQLNewLog> => {
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
      deleteChangeSet: async (
        parent: schema.GQLMutation, 
        context: any, 
        args: schema.GQLMutationDeleteChangeSetArgs
      ): Promise<schema.GQLChangeSet[]> => {
        await backend.deleteChangeSet(context.userId, args.changeSetId);
        return (await backend.getChangeSets(context.userId));
      }
    }
  };

  const server = new ApolloServer({typeDefs, resolvers,
    context: ({ req }) => {
      return {userId: TEMP_USER_ID};
    }
  });

  server.listen().then(({ url }: {url: any}) => {
    console.log(`Server ready at ${url}`);
  });
}
