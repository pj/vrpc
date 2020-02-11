// import * as _ from 'lodash';
// import * as generate from './generate';
// import * as schema from './server/schema';
// import {GQLNewServiceActionInput} from './server/schema';
// import * as action from '~action';
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
// export function versionToGQLVersion(generateVersion: generate.Version): schema.GQLVersion {
//   const fields: schema.GQLFieldObject[] = [];
//   for (let [key, field] of Object.entries(generateVersion.fields)) {
//     let gqlField = null;
//     if (field instanceof generate.Field) {
//       let gqlDefault = null;
//       if (_.isBoolean(field._default)) {
//         gqlDefault = {value: field._default};
//       } else if (_.isNumber(field._default)) {
//         gqlDefault = {value: field._default};
//       } else if (_.isString(field._default)) {
//         gqlDefault = {value: field._default};
//       }
//       gqlField = { 
//         __typename: 'Field',
//         name: field.name,
//         changeLog: field.changeLog,
//         description: field.description,
//         optional: field.optional,
//         _type: field.type === 'string' ? 'stringType' :
//           (field.type === 'boolean' ? 'booleanType' : 'numberType'),
//         _default: gqlDefault
//       } as schema.GQLField;
//     } else if (field instanceof generate.ReferenceField) {
//       gqlField = {
//         __typename: 'ReferenceField',
//         name: field.name,
//         changeLog: field.changeLog,
//         description: field.description,
//         optional: field.optional,
//         referenceType: field.referenceType,
//         referenceHash: field.referenceHash,
//         referenceVersion: field.referenceVersion
//       } as schema.GQLReferenceField;
//     } else {
//       throw new Error('Should never happen (famous last words).');
//     }
//     fields.push({
//       __typename: 'FieldObject',
//       key: key, 
//       field: gqlField
//     });
//   }
//   return ({
//     __typename: 'Version',
//     _type: generateVersion._type,
//     hash: generateVersion.hash,
//     version: generateVersion.version,
//     fields
//   });
// }
// export function typeToGQLType(generateType: generate.Type): schema.GQLType {
//   const versions = [];
//   for (let version of generateType.versions) {
//     versions.push(
//       versionToGQLVersion(version)
//     );
//   }
//   const latest = null;
//   return ({
//     __typename: 'Type',
//     name: generateType.name,
//     description: generateType.description,
//     versions,
//     latest,
//     changeLog: generateType.changeLog
//   });
// }
// export function serviceToGQLService(generateService: generate.Service): schema.GQLService {
//   const versions: schema.GQLServiceVersion[] = [];
//   for (let version of generateService.versions.values()) {
//     const [versionOutput, versionInputs] = version;
//     const gqlOutputVersion: schema.GQLVersionType = {
//       __typename: 'VersionType',
//       _type: versionOutput._type,
//       hash: versionOutput.hash,
//       version: versionOutput.version
//     }
//     const gqlInputVersions: schema.GQLVersionType[] = [];
//     for (let versionInput of versionInputs) {
//       gqlInputVersions.push(
//         {
//           __typename: 'VersionType',
//           _type: versionInput._type,
//           hash: versionInput.hash,
//           version: versionInput.version
//         }
//       );
//     }
//     versions.push({
//       __typename: 'ServiceVersion', 
//       inputs: gqlInputVersions, 
//       output: gqlOutputVersion
//     });
//   }
//   const latest = null;
//   return ({
//     __typename: 'Service',
//     name: generateService.name,
//     description:generateService.description,
//     changeLog: generateService.changeLog,
//     versions
//   });
// }
// export function actionToGQLLogAction(
//   log: action.Action
// ): schema.GQLLogAction {
//   if (
//     log.hash === null 
//     || log.hash === undefined 
//     || log.version === null
//     || log.version === undefined) {
//       throw new Error(`Unhashed log action: ${log}`)
//   }
//   const hash = log.hash;
//   const version = log.version;
//   if (log instanceof action.NewServiceAction) {
//     return ({
//       __typename: 'NewServiceAction',
//       hash: hash,
//       version: version,
//       changeLog: log.changeLog,
//       serviceName: log.serviceName,
//       description: log.description
//     });
//   } else if (log instanceof action.UpdateDescriptionServiceAction) {
//     return ({
//       __typename: 'UpdateDescriptionServiceAction',
//       hash: hash,
//       version: version,
//       changeLog: log.changeLog,
//       serviceName: log.serviceName,
//       description: log.description
//     });
//   } else if (log instanceof action.AddVersionServiceAction) {
//     return ({
//       __typename: 'AddVersionServiceAction',
//       hash: hash,
//       version: version,
//       changeLog: log.changeLog,
//       serviceName: log.serviceName,
//       inputType: log.inputType,
//       outputType: log.outputType,
//       inputVersion: log.inputVersion,
//       inputHash: log.inputHash,
//       outputVersion: log.outputVersion,
//       outputHash: log.outputHash
//     });
//   } else if (log instanceof action.RenameFieldTypeAction) {
//     return ({
//       __typename: 'RenameFieldTypeAction',
//       hash: hash,
//       version: version,
//       changeLog: log.changeLog,
//       typeName: log.typeName,
//       _from: log._from,
//       to: log.to
//     });
//   } else if (log instanceof action.RequiredFieldTypeAction) {
//     return ({
//       __typename: 'RequiredFieldTypeAction',
//       hash: hash,
//       version: version,
//       changeLog: log.changeLog,
//       typeName: log.typeName,
//       name: log.name
//     });
//   } else if (log instanceof action.OptionalFieldTypeAction) {
//     return ({
//       __typename: 'OptionalFieldTypeAction',
//       hash: hash,
//       version: version,
//       changeLog: log.changeLog,
//       typeName: log.typeName,
//       name: log.name
//     });
//   } else if (log instanceof action.DeleteFieldTypeAction) {
//     return ({
//       __typename: 'DeleteFieldTypeAction',
//       hash: hash,
//       version: version,
//       changeLog: log.changeLog,
//       typeName: log.typeName,
//       name: log.name
//     });
//   } else if (log instanceof action.SetDefaultFieldTypeAction) {
//     const _default = defaultToGQLDefault(log._default);
//     return ({
//       __typename: 'SetDefaultFieldTypeAction',
//       hash: hash,
//       version: version,
//       changeLog: log.changeLog,
//       typeName: log.typeName,
//       name: log.name,
//       newDefault: _default
//     });
//   } else if (log instanceof action.RemoveDefaultFieldTypeAction) {
//     return ({
//       __typename: 'RemoveDefaultFieldTypeAction',
//       hash: hash,
//       version: version,
//       changeLog: log.changeLog,
//       typeName: log.typeName,
//       name: log.name
//     });
//   } else if (log instanceof action.AddFieldTypeAction) {
//     let _default = null;
//     if (log._default !== null) {
//       _default = defaultToGQLDefault(log._default);
//     }
//     return ({
//       __typename: 'AddFieldTypeAction',
//       hash: hash,
//       version: version,
//       changeLog: log.changeLog,
//       typeName: log.typeName,
//       name: log.name,
//       type: fieldTypesToGQLFieldTypes(log.type),
//       description: log.description,
//       optional: log.optional,
//       _default: _default
//     });
//   } else if (log instanceof action.UpdateDescriptionTypeAction) {
//     return ({
//       __typename: 'UpdateDescriptionTypeAction',
//       hash: hash,
//       version: version,
//       changeLog: log.changeLog,
//       typeName: log.typeName,
//       name: log.name,
//       description: log.description
//     });
//   } else if (log instanceof action.ReferenceFieldTypeAction) {
//     return ({
//       __typename: 'ReferenceFieldTypeAction',
//       hash: hash,
//       version: version,
//       changeLog: log.changeLog,
//       typeName: log.typeName,
//       name: log.name,
//       description: log.description,
//       optional: log.optional,
//       referenceType: log.referenceType,
//       referenceHash: log.referenceHash,
//       referenceVersion: log.referenceVersion
//     });
//   } else if (log instanceof action.NewTypeAction) {
//     return ({
//       __typename: 'NewTypeAction',
//       hash: hash,
//       version: version,
//       changeLog: log.changeLog,
//       typeName: log.typeName,
//       description: log.description
//     });
//   }
//   throw new Error(`Unknown action: ${log}`);
// }
// export function defaultToGQLDefault(
//   _default: action.FieldDefaults
// ): schema.GQLFieldData {
//   if (typeof(_default) === 'string') {
//     return (
//       {
//         __typename: 'StringField',
//         value: _default
//       }
//     );
//   } else if (typeof(_default) === 'boolean') {
//     return (
//       {
//         __typename: 'BooleanField',
//         value: _default
//       }
//     );
//   } else if (typeof(_default) === 'number') {
//     if (Number.isSafeInteger(_default)) {
//       return (
//         {
//           __typename: 'IntField',
//           value: _default
//         }
//       );
//     } else {
//       return (
//         {
//           __typename: 'FloatField',
//           value: _default
//         }
//       );
//     }
//   }
//   throw new Error(`Unknown default: ${_default}`);
// }
// export function fieldTypesToGQLFieldTypes(
//   _type: action.FieldTypes
// ): schema.GQLFieldTypes {
//   switch (_type) {
//     case 'string':
//       return schema.GQLFieldTypes.StringType;
//     case 'boolean':
//       return schema.GQLFieldTypes.BooleanType;
//     case 'integer':
//       return schema.GQLFieldTypes.IntType;
//     case 'float':
//       return schema.GQLFieldTypes.FloatType;
//     default:
//       throw new Error(`Unknown field type ${_type}`)
//   }
// }
// export function actionToGQLChangeAction(
//   log: action.Action
// ): schema.GQLLogActionChange {
//   if (log instanceof action.NewServiceAction) {
//     return ({
//       __typename: 'NewServiceChangeAction',
//       changeLog: log.changeLog,
//       serviceName: log.serviceName,
//       description: log.description,
//     });
//   } else if (log instanceof action.UpdateDescriptionServiceAction) {
//     return ({
//       __typename: 'UpdateDescriptionServiceChangeAction',
//       changeLog: log.changeLog,
//       serviceName: log.serviceName,
//       description: log.description
//     });
//   } else if (log instanceof action.AddVersionServiceAction) {
//     return ({
//       __typename: 'AddVersionServiceChangeAction',
//       changeLog: log.changeLog,
//       serviceName: log.serviceName,
//       inputType: log.inputType,
//       outputType: log.outputType,
//       inputVersion: log.inputVersion,
//       inputHash: log.inputHash,
//       outputVersion: log.outputVersion,
//       outputHash: log.outputHash
//     });
//   } else if (log instanceof action.RenameFieldTypeAction) {
//     return ({
//       __typename: 'RenameFieldTypeChangeAction',
//       changeLog: log.changeLog,
//       typeName: log.typeName,
//       _from: log._from,
//       to: log.to
//     });
//   } else if (log instanceof action.RequiredFieldTypeAction) {
//     return ({
//       __typename: 'RequiredFieldTypeChangeAction',
//       changeLog: log.changeLog,
//       typeName: log.typeName,
//       name: log.name
//     });
//   } else if (log instanceof action.OptionalFieldTypeAction) {
//     return ({
//       __typename: 'OptionalFieldTypeChangeAction',
//       changeLog: log.changeLog,
//       typeName: log.typeName,
//       name: log.name
//     });
//   } else if (log instanceof action.DeleteFieldTypeAction) {
//     return ({
//       __typename: 'DeleteFieldTypeChangeAction',
//       changeLog: log.changeLog,
//       typeName: log.typeName,
//       name: log.name
//     });
//   } else if (log instanceof action.SetDefaultFieldTypeAction) {
//     const _default = defaultToGQLDefault(log._default);
//     return ({
//       __typename: 'SetDefaultFieldTypeChangeAction',
//       changeLog: log.changeLog,
//       typeName: log.typeName,
//       name: log.name,
//       newDefault: _default
//     });
//   } else if (log instanceof action.RemoveDefaultFieldTypeAction) {
//     return ({
//       __typename: 'RemoveDefaultFieldTypeChangeAction',
//       changeLog: log.changeLog,
//       typeName: log.typeName,
//       name: log.name
//     });
//   } else if (log instanceof action.AddFieldTypeAction) {
//     let _default = null;
//     if (log._default !== null) {
//       _default = defaultToGQLDefault(log._default);
//     }
//     return ({
//       __typename: 'AddFieldTypeChangeAction',
//       changeLog: log.changeLog,
//       typeName: log.typeName,
//       name: log.name,
//       type: fieldTypesToGQLFieldTypes(log.type),
//       description: log.description,
//       optional: log.optional,
//       _default: _default
//     });
//   } else if (log instanceof action.UpdateDescriptionTypeAction) {
//     return ({
//       __typename: 'UpdateDescriptionTypeChangeAction',
//       changeLog: log.changeLog,
//       typeName: log.typeName,
//       name: log.name,
//       description: log.description
//     });
//   } else if (log instanceof action.ReferenceFieldTypeAction) {
//     return ({
//       __typename: 'ReferenceFieldTypeChangeAction',
//       changeLog: log.changeLog,
//       typeName: log.typeName,
//       name: log.name,
//       description: log.description,
//       optional: log.optional,
//       referenceType: log.referenceType,
//       referenceHash: log.referenceHash,
//       referenceVersion: log.referenceVersion
//     });
//   } else if (log instanceof action.NewTypeAction) {
//     return ({
//       __typename: 'NewTypeChangeAction',
//       changeLog: log.changeLog,
//       typeName: log.typeName,
//       description: log.description
//     });
//   }
//   throw new Error(`Unknown action: ${log}`);
// }
// export function changeSetToGQLChangeSet(changeSet: action.ChangeSet): schema.GQLChangeSet {
//   return ({
//     __typename: 'ChangeSet',
//     id: changeSet.id,
//     baseHash: changeSet.baseHash,
//     log: changeSet.log.map(a => actionToGQLChangeAction(a))
//   });
// }
// export function gqlDefaultToDefaultField(
//   _default: schema.GQLFieldDataInput
// ): [action.FieldDefaults, action.FieldTypes] {
//   if (_default.booleanValue !== null && _default.booleanValue !== undefined) {
//     return [_default.booleanValue, 'boolean'];
//   } else if (
//     _default.floatValue !== null 
//     && _default.floatValue !== undefined
//   ) {
//     return [_default.floatValue, 'float'];
//   } else if (
//     _default.integerValue !== null 
//     && _default.integerValue !== undefined
//   ) {
//     return [_default.integerValue, 'integer'];
//   } else if (
//     _default.stringValue !== null 
//     && _default.stringValue !== undefined
//   ) {
//     return [_default.stringValue, 'string'];
//   } else {
//     throw new Error(`No value present in default: ${_default}`);
//   }
// }
// export function gqlFieldTypesToFieldTypes(_type: schema.GQLFieldTypes): action.FieldTypes {
//   switch (_type) {
//     case 'stringType':
//       return 'string';
//     case 'booleanType':
//       return 'boolean';
//     case 'intType':
//       return 'integer';
//     case 'floatType':
//       return 'float';
//     default:
//       throw new Error(`Unknown field type ${_type}`)
//   }
// }
// export function gqlLogActionInputToAction(logAction: schema.GQLLogActionInput): action.Action {
//   if (logAction.newService) {
//     return new action.NewServiceAction(
//       logAction.newService.changeLog,
//       null,
//       null,
//       logAction.newService.serviceName,
//       logAction.newService.description,
//     );
//   } else if (logAction.updateServiceDescription) {
//     return new action.UpdateDescriptionServiceAction(
//       logAction.updateServiceDescription.changeLog,
//       null,
//       null,
//       logAction.updateServiceDescription.serviceName,
//       logAction.updateServiceDescription.description
//     );
//   } else if (logAction.addVersion) {
//     return new action.AddVersionServiceAction(
//       logAction.addVersion.changeLog,
//       null,
//       null,
//       logAction.addVersion.serviceName,
//       logAction.addVersion.inputType,
//       logAction.addVersion.outputType,
//       logAction.addVersion.inputVersion,
//       logAction.addVersion.inputHash,
//       logAction.addVersion.outputVersion,
//       logAction.addVersion.outputHash,
//     );
//   } else if (logAction.renameField) {
//     return new action.RenameFieldTypeAction(
//       logAction.renameField.changeLog,
//       null,
//       null,
//       logAction.renameField.typeName,
//       logAction.renameField._from,
//       logAction.renameField.to
//     );
//   } else if (logAction.requiredField) {
//     return new action.RequiredFieldTypeAction(
//       logAction.requiredField.changeLog,
//       null,
//       null,
//       logAction.requiredField.typeName,
//       logAction.requiredField.name
//     );
//   } else if (logAction.optionalField) {
//     return new action.OptionalFieldTypeAction(
//       logAction.optionalField.changeLog,
//       null,
//       null,
//       logAction.optionalField.typeName,
//       logAction.optionalField.name
//     );
//   } else if (logAction.deleteField) {
//     return new action.DeleteFieldTypeAction(
//       logAction.deleteField.changeLog,
//       null,
//       null,
//       logAction.deleteField.typeName,
//       logAction.deleteField.name
//     );
//   } else if (logAction.setDefault) {
//     const _default = gqlDefaultToDefaultField(logAction.setDefault.newDefault);
//     return new action.SetDefaultFieldTypeAction(
//       logAction.setDefault.changeLog,
//       null,
//       null,
//       logAction.setDefault.typeName,
//       logAction.setDefault.name,
//       _default[0]
//     );
//   } else if (logAction.removeDefault) {
//     return new action.RemoveDefaultFieldTypeAction(
//       logAction.removeDefault.changeLog,
//       null,
//       null,
//       logAction.removeDefault.typeName,
//       logAction.removeDefault.name
//     );
//   } else if (logAction.addField) {
//     let _default = null
//     if (logAction.addField._default) {
//       _default = gqlDefaultToDefaultField(logAction.addField._default)[0];
//     }
//     return new action.AddFieldTypeAction(
//       logAction.addField.changeLog,
//       null,
//       null,
//       logAction.addField.typeName,
//       logAction.addField.name,
//       gqlFieldTypesToFieldTypes(logAction.addField.type),
//       logAction.addField.description,
//       logAction.addField.optional,
//       _default
//     );
//   } else if (logAction.updateTypeDescription) {
//     return new action.UpdateDescriptionTypeAction(
//       logAction.updateTypeDescription.changeLog,
//       null,
//       null,
//       logAction.updateTypeDescription.typeName,
//       logAction.updateTypeDescription.name,
//       logAction.updateTypeDescription.description
//     );
//   } else if (logAction.referenceField) {
//     return new action.ReferenceFieldTypeAction(
//       logAction.referenceField.changeLog,
//       null,
//       null,
//       logAction.referenceField.typeName,
//       logAction.referenceField.name,
//       logAction.referenceField.description,
//       logAction.referenceField.optional,
//       logAction.referenceField.referenceType,
//       logAction.referenceField.referenceHash,
//       logAction.referenceField.referenceVersion
//     );
//   } else if (logAction.newType) {
//     return new action.NewTypeAction(
//       logAction.newType.changeLog,
//       null,
//       null,
//       logAction.newType.typeName,
//       logAction.newType.description
//     );
//   }
//   throw new Error("GQLLogActionInput must contain one action input");
// }
// export function gqlChangeSetToChangeSet(changeSet: schema.GQLChangeSetInput): action.ChangeSet {
//   const log = changeSet.log.map(c => gqlLogActionInputToAction(c));
//   return ({
//     id: changeSet.id,
//     baseHash: changeSet.baseHash,
//     log: log
//   });
// }
