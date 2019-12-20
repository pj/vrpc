import * as _ from 'lodash';

import * as generate from '../generate';
import * as schema from './schema';
import * as action from '~action';

// export function actionFromInput(input: any): action.Action {
//   switch(input.logType) {
//     // Services
//     case 'NewServiceAction':
//       return new action.NewServiceAction(
//         input.changeLog,
//         null,
//         null,
//         input.serviceName,
//         input.description,
//       );
//     case 'UpdateDescriptionServiceAction':
//       return new action.UpdateDescriptionServiceAction(
//         input.changeLog,
//         null,
//         null,
//         input.serviceName,
//         input.description
//       );
//     case 'AddVersionServiceAction':
//       return new action.AddVersionServiceAction(
//         input.changeLog,
//         null,
//         null,
//         input.serviceName,
//         input.inputType,
//         input.outputType,
//         parseInt(input.inputVersion, 10),
//         input.inputHash,
//         parseInt(input.outputVersion, 10),
//         input.outputHash,
//       );
//     // Types
//     case 'RenameFieldTypeAction':
//       return new action.RenameFieldTypeAction(
//         input.changeLog,
//         null,
//         null,
//         input.typeName,
//         input.fieldName,
//         input.newFieldName
//       );
//     case 'RequiredFieldTypeAction':
//       return new action.RequiredFieldTypeAction(
//         input.changeLog,
//         null,
//         null,
//         input.typeName,
//         input.fieldName
//       );
//     case 'OptionalFieldTypeAction':
//       return new action.OptionalFieldTypeAction(
//         input.changeLog,
//         null,
//         null,
//         input.typeName,
//         input.fieldName
//       );
//     case 'DeleteFieldTypeAction':
//       return new action.DeleteFieldTypeAction(
//         input.changeLog,
//         null,
//         null,
//         input.typeName,
//         input.fieldName
//       );
//     case 'SetDefaultFieldTypeAction':
//       return new action.SetDefaultFieldTypeAction(
//         input.changeLog,
//         null,
//         null,
//         input.typeName,
//         input.fieldName,
//         input.defaultValue
//       );
//     case 'RemoveDefaultFieldTypeAction':
//       return new action.RemoveDefaultFieldTypeAction(
//         input.changeLog,
//         null,
//         null,
//         input.typeName,
//         input.fieldName
//       );
//     case 'AddFieldTypeAction':
//       return new action.AddFieldTypeAction(
//         input.changeLog,
//         null,
//         null,
//         input.typeName,
//         input.fieldName,
//         input.defaultType,
//         input.description,
//         input.optional,
//         input.defaultValue
//       );
//     case 'UpdateDescriptionTypeAction':
//       return new action.UpdateDescriptionTypeAction(
//         input.changeLog,
//         null,
//         null,
//         input.typeName,
//         input.fieldName,
//         input.description
//       );
//     case 'ReferenceFieldTypeAction':
//       return new action.ReferenceFieldTypeAction(
//         input.changeLog,
//         null,
//         null,
//         input.typeName,
//         input.fieldName,
//         input.description,
//         input.optional,
//         input.referenceType,
//         input.referenceHash,
//         input.referenceVersion
//       );
//     case 'NewTypeAction':
//       return new action.NewTypeAction(
//         input.changeLog,
//         null,
//         null,
//         input.typeName,
//         input.description
//       );
//     default:
//       throw new Error(`Unknown input action ${input}`)
//   }
// }


// async function resultsFromMutation(backend: Backend): Promise<any> {
//   let log = await backend.getLog();
//   const hashes = hashActions(log);
//   log = addHashes(log, hashes, null);
//   for (let i = 0; i < log.length; i++) {
//     (log[i] as any).unhashed = false;
//   }
//   for (let [idx, hash, version] of hashes) {
//     (log[idx] as any).unhashed = true;
//   }

//   const currentTypes = await backend.getCurrentTypes();
//   let outputTypes = [];
//   for (let currentType of currentTypes) {
//     outputTypes.push(
//       types.GQLType.fromGenerateType(currentType)
//     );
//   }

//   const currentServices = await backend.getCurrentServices();
//   let outputServices = [];
//   for (let currentService of currentServices) {
//     outputServices.push(
//       types.GQLService.fromGenerateService(currentService)
//     );
//   }

//   return ({log, types: outputTypes, services: outputServices});
// }

export function fromGenerateVersion(generateVersion: generate.Version): schema.GQLVersion {
  const fields = [];
  for (let [key, field] of Object.entries(generateVersion.fields)) {
    let gqlField = null;
    if (field instanceof generate.Field) {
      let gqlDefault = null;
      if (_.isBoolean(field._default)) {
        gqlDefault = {value: field._default};
      } else if (_.isNumber(field._default)) {
        gqlDefault = {value: field._default};
      } else if (_.isString(field._default)) {
        gqlDefault = {value: field._default};
      }
      gqlField = { 
        name: field.name,
        changeLog: field.changeLog,
        description: field.description,
        optional: field.optional,
        _type: field.type === 'string' ? 'stringType' :
          (field.type === 'boolean' ? 'booleanType' : 'numberType'),
        _default: gqlDefault
      } as schema.GQLField;
    } else if (field instanceof generate.ReferenceField) {
      gqlField = {
        name: field.name,
        changeLog: field.changeLog,
        description: field.description,
        optional: field.optional,
        referenceType: field.referenceType,
        referenceHash: field.referenceHash,
        referenceVersion: field.referenceVersion
      } as schema.GQLReferenceField;
    } else {
      throw new Error('Should never happen (famous last words).');
    }
    fields.push({key, field: gqlField});
  }
  return ({
    _type: generateVersion._type,
    hash: generateVersion.hash,
    version: generateVersion.version,
    fields
  });
}

export function fromGenerateType(generateType: generate.Type): schema.GQLType {
  const versions = [];
  for (let version of generateType.versions) {
    versions.push(
      fromGenerateVersion(version)
    );
  }
  const latest = null;
  return ({
    name: generateType.name,
    description: generateType.description,
    versions,
    latest,
    changeLog: generateType.changeLog
  });
}

export function fromGenerateService(generateService: generate.Service): schema.GQLService {
  const versions = [];
  for (let version of generateService.versions.values()) {
    const [versionOutput, versionInputs] = version;
    const gqlOutputVersion = {
      _type: versionOutput._type,
      hash: versionOutput.hash,
      version: versionOutput.version
    }
    const gqlInputVersions = [];
    for (let versionInput of versionInputs) {
      gqlInputVersions.push(
        {
          _type: versionInput._type,
          hash: versionInput.hash,
          version: versionInput.version
        }
      );
    }
    versions.push({inputs: gqlInputVersions, output: gqlOutputVersion});
  }
  const latest = null;
  return ({
    name: generateService.name,
    description:generateService.description,
    changeLog: generateService.changeLog,
    versions
  });
}

export function fromActionLog(log: action.Action[]): schema.GQLLogAction[] {
  return log;
}

export function fromGenerateChangeSet(changeSet: action.ChangeSet): schema.GQLChangeSet {
  return ({
    baseHash: changeSet.baseHash,
    log: changeSet.log
  });
}

export function toAction(logAction: schema.GQLLogActionInput): action.Action {
  const entry = Object.values(logAction).find(v => v !== null || v !== undefined);
  if (entry === null || entry === undefined) {
    throw new Error("GQLLogActionInput must contain one action input");
  }

  return entry;
}

export function toChangeSet(changeSet: schema.GQLChangeSetInput): action.ChangeSet {
  const log = changeSet.log.map(c => toAction(c));
  return ({
    baseHash: changeSet.baseHash,
    log: log
  });
}