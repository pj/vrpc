import { ApolloServer, gql } from 'apollo-server';
import { Backend } from '../backend';
import * as action from '../action';
import {BaseField, Field, ReferenceField} from '../generate';
import {importSchema} from 'graphql-import';

const typeDefs = importSchema('schema.graphql');

export function startServer(backend: Backend) {
  const resolvers = {
    BaseField: {
      __resolveType(
        obj: action.Action,
        context: any,
        info: any
      ): string | null {
        if (obj instanceof Field) {
          return 'Field';
        } else if (obj instanceof ReferenceField) {
          return 'ReferenceField';
        }
        return null;
      }
    },
    Action: {
      __resolveType(
        obj: action.Action,
        context: any,
        info: any
      ): string | null {
        if (obj instanceof action.NewServiceAction) {
          return 'NewServiceAction';
        } else if (obj instanceof action.UpdateDescriptionServiceAction) {
          return 'UpdateDescriptionServiceAction';
        } else if (obj instanceof action.AddVersionServiceAction) {
          return 'AddVersionServiceAction';
        } else if (obj instanceof action.RenameFieldTypeAction) {
          return 'RenameFieldTypeAction';
        } else if (obj instanceof action.RequiredFieldTypeAction) {
          return 'RequiredFieldTypeAction';
        } else if (obj instanceof action.OptionalFieldTypeAction) {
          return 'OptionalFieldTypeAction';
        } else if (obj instanceof action.DeleteFieldTypeAction) {
          return 'DeleteFieldTypeAction';
        } else if (obj instanceof action.SetDefaultFieldTypeAction) {
          return 'SetDefaultFieldTypeAction';
        } else if (obj instanceof action.RemoveDefaultFieldTypeAction) {
          return 'RemoveDefaultFieldTypeAction';
        } else if (obj instanceof action.AddFieldTypeAction) {
          return 'AddFieldTypeAction';
        } else if (obj instanceof action.UpdateDescriptionTypeAction) {
          return 'UpdateDescriptionTypeAction';
        } else if (obj instanceof action.ReferenceFieldTypeAction) {
          return 'ReferenceFieldTypeAction';
        } else if (obj instanceof action.NewTypeAction) {
          return 'NewTypeAction';
        } else if (obj instanceof action.GroupAction) {
          return 'GroupAction';
        }
        return null;
      }
    },
    Query: {
      log: async () => await backend.getLog(),
      services: async () => await backend.getCurrentServices(),
      types: async () => {
        const currentTypes = await backend.getCurrentTypes();
        let output = [];


        return output;
      }
    }
  };

  const server = new ApolloServer({typeDefs, resolvers});

  server.listen().then(({ url }: {url: any}) => {
    console.log(`Server ready at ${url}`);
  });`)})`
}
