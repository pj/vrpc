import * as path from 'path';
import { ApolloServer, gql } from 'apollo-server';
import { Backend } from '../backend';
import * as action from '../action';
import {BaseField, Field, ReferenceField} from '../generate';
import {importSchema} from 'graphql-import';
import * as types from './types';

const typeDefs = importSchema(path.join(__dirname, 'schema.graphql'));

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
    LogAction: {
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
      services: async (): Promise<types.GQLService[]> => {
        const currentServices = await backend.getCurrentServices();
        let output = [];
        for (let currentService of currentServices) {
          output.push(
            types.GQLService.fromGenerateService(currentService)
          );
        }
        return output;
      },
      types: async (): Promise<types.GQLType[]> => {
        const currentTypes = await backend.getCurrentTypes();
        let output = [];
        for (let currentType of currentTypes) {
          output.push(
            types.GQLType.fromGenerateType(currentType)
          );
        }
        return output;
      }
    }
  };

  const server = new ApolloServer({typeDefs, resolvers});

  server.listen().then(({ url }: {url: any}) => {
    console.log(`Server ready at ${url}`);
  });`)})`
}
