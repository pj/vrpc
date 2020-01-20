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
        return (log.map(l => types.actionToGQLLogAction(l)));
      },
      services: async (): Promise<schema.GQLService[]> => {
        const currentServices = await backend.getCurrentServices();
        return (currentServices.map(s => types.serviceToGQLService(s)));
      },
      types: async (): Promise<schema.GQLType[]> => {
        const currentTypes = await backend.getCurrentTypes();
        return (currentTypes.map(t => types.typeToGQLType(t)));
      },
      changeSets: async (
        _: schema.GQLQuery, 
        context: any
      ): Promise<schema.GQLChangeSet[]> => {
        const currentChangeSets = await backend.getChangeSets(context.userId);
        return (currentChangeSets.map(c => types.changeSetToGQLChangeSet(c)));
      }
    },
    Mutation: {
      updateChangeSet: async (
        parent: schema.GQLMutation,
        context: any, 
        args: schema.GQLMutationUpdateChangeSetArgs
      ): Promise<schema.GQLChangeSet> => {
        await backend.updateChangeSet(
          context.userId,
          args.changeSet.id, 
          types.gqlChangeSetToChangeSet(args.changeSet)
        );
        const changeSet = await backend.getChangeSet(
          context.userId, 
          args.changeSet.id
        );
        return (types.changeSetToGQLChangeSet(changeSet));
      },
      commitChangeSet: async (
        parent: schema.GQLMutation, 
        context: any, 
        args: schema.GQLMutationCommitChangeSetArgs
      ): Promise<schema.GQLNewLog> => {
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
      deleteChangeSet: async (
        parent: schema.GQLMutation, 
        context: any, 
        args: schema.GQLMutationDeleteChangeSetArgs
      ): Promise<schema.GQLChangeSet[]> => {
        await backend.deleteChangeSet(context.userId, args.changeSetId);
        const changeSets = await backend.getChangeSets(context.userId)
        return (changeSets.map(c => types.changeSetToGQLChangeSet(c)));
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
