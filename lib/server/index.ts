import * as path from 'path';
import { ApolloServer, gql } from 'apollo-server';
import { Backend } from '../backend';
import * as action from '../action';
import {BaseField, Field, ReferenceField} from '../generate';
import {importSchema} from 'graphql-import';
import * as types from './types';
import {hashActions, addHashes} from '../typeidea';

const typeDefs = importSchema(path.join(__dirname, 'schema.graphql'));

async function resultsFromMutation(backend: Backend): Promise<any> {
  let log = await backend.getLog();
  const hashes = hashActions(log);
  log = addHashes(log, hashes, null);
  for (let i = 0; i < log.length; i++) {
    (log[i] as any).unhashed = false;
  }
  for (let [idx, hash, version] of hashes) {
    console.log(idx);
    (log[idx] as any).unhashed = true;
  }

  const currentTypes = await backend.getCurrentTypes();
  let outputTypes = [];
  for (let currentType of currentTypes) {
    outputTypes.push(
      types.GQLType.fromGenerateType(currentType)
    );
  }

  const currentServices = await backend.getCurrentServices();
  let outputServices = [];
  for (let currentService of currentServices) {
    outputServices.push(
      types.GQLService.fromGenerateService(currentService)
    );
  }

  return ({log, types: outputTypes, services: outputServices});
}

export function actionFromInput(input: any): action.Action {
  switch(input.logType) {
    // Services
    case 'NewServiceAction':
      return new action.NewServiceAction(
        input.changeLog,
        null,
        null,
        input.serviceName,
        input.description,
      );
    case 'UpdateDescriptionServiceAction':
      return new action.UpdateDescriptionServiceAction(
        input.changeLog,
        null,
        null,
        input.serviceName,
        input.description
      );
    case 'AddVersionServiceAction':
      return new action.AddVersionServiceAction(
        input.changeLog,
        null,
        null,
        input.serviceName,
        input.inputType,
        input.outputType,
        parseInt(input.inputVersion, 10),
        input.inputHash,
        parseInt(input.outputVersion, 10),
        input.outputHash,
      );
    // Types
    case 'RenameFieldTypeAction':
      return new action.RenameFieldTypeAction(
        input.changeLog,
        null,
        null,
        input.typeName,
        input.fieldName,
        input.newFieldName
      );
    case 'RequiredFieldTypeAction':
      return new action.RequiredFieldTypeAction(
        input.changeLog,
        null,
        null,
        input.typeName,
        input.fieldName
      );
    case 'OptionalFieldTypeAction':
      return new action.OptionalFieldTypeAction(
        input.changeLog,
        null,
        null,
        input.typeName,
        input.fieldName
      );
    case 'DeleteFieldTypeAction':
      return new action.DeleteFieldTypeAction(
        input.changeLog,
        null,
        null,
        input.typeName,
        input.fieldName
      );
    case 'SetDefaultFieldTypeAction':
      return new action.SetDefaultFieldTypeAction(
        input.changeLog,
        null,
        null,
        input.typeName,
        input.fieldName,
        input.defaultValue
      );
    case 'RemoveDefaultFieldTypeAction':
      return new action.RemoveDefaultFieldTypeAction(
        input.changeLog,
        null,
        null,
        input.typeName,
        input.fieldName
      );
    case 'AddFieldTypeAction':
      return new action.AddFieldTypeAction(
        input.changeLog,
        null,
        null,
        input.typeName,
        input.fieldName,
        input.defaultType,
        input.description,
        input.optional,
        input.defaultValue
      );
    case 'UpdateDescriptionTypeAction':
      return new action.UpdateDescriptionTypeAction(
        input.changeLog,
        null,
        null,
        input.typeName,
        input.fieldName,
        input.description
      );
    case 'ReferenceFieldTypeAction':
      return new action.ReferenceFieldTypeAction(
        input.changeLog,
        null,
        null,
        input.typeName,
        input.fieldName,
        input.description,
        input.optional,
        input.referenceType,
        input.referenceHash,
        input.referenceVersion
      );
    case 'NewTypeAction':
      return new action.NewTypeAction(
        input.changeLog,
        null,
        null,
        input.typeName,
        input.description
      );
    default:
      throw new Error(`Unknown input action ${input}`)
  }
}

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
    FieldData: {
      __resolveType(
        obj: any,
        context: any,
        info: any
      ): string | null {
        if (obj instanceof types.StringField) {
          return 'StringField';
        }

        if (obj instanceof types.IntField) {
          return 'IntField';
        }

        if (obj instanceof types.FloatField) {
          return 'FloatField';
        }

        if (obj instanceof types.BooleanField) {
          return 'BooleanField';
        }

        return null;
      }
    },
    Query: {
      log: async (): Promise<any> => {
        return (await resultsFromMutation(backend)).log;
      },
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
    },
    Mutation: {
      async addToLog(root: any, input: any, context: any) {
        const action = actionFromInput(input.input);
        console.log('----------------');
        console.log("adding");
        console.log(action);
        await backend.addToLog(action);

        return (await resultsFromMutation(backend));
      },
      async truncateTo(root: any, input: any, context: any) {
        await backend.truncateTo(input.input.to);
        return (await resultsFromMutation(backend));
      },
      async hashTo(root: any, input: any, context: any) {
        await backend.hashTo(input.input.to);
        return (await resultsFromMutation(backend));
      },
      async _delete(root: any, input: any, context: any) {
        await backend._delete(input.input.to);
        return (await resultsFromMutation(backend));
      },
      async groupAndHash(root: any, input: any, context: any) {
        await backend.groupAndHash(input.input.to);
        return (await resultsFromMutation(backend));
      }
    }
  };

  const server = new ApolloServer({typeDefs, resolvers});

  server.listen().then(({ url }: {url: any}) => {
    console.log(`Server ready at ${url}`);
  });
}
