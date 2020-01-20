import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type GQLAction = {
  changeLog: Scalars['String'],
  hash: Scalars['String'],
  version: Scalars['Int'],
};

export type GQLAddFieldTypeAction = GQLAction & {
   __typename: 'AddFieldTypeAction',
  changeLog: Scalars['String'],
  hash: Scalars['String'],
  version: Scalars['Int'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  type: GQLFieldTypes,
  description: Scalars['String'],
  optional: Scalars['Boolean'],
  _default?: Maybe<GQLFieldData>,
};

export type GQLAddFieldTypeActionInput = {
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  type: GQLFieldTypes,
  description: Scalars['String'],
  optional: Scalars['Boolean'],
  _default?: Maybe<GQLFieldDataInput>,
};

export type GQLAddFieldTypeChangeAction = GQLChangeAction & {
   __typename: 'AddFieldTypeChangeAction',
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  type: GQLFieldTypes,
  description: Scalars['String'],
  optional: Scalars['Boolean'],
  _default?: Maybe<GQLFieldData>,
};

export type GQLAddVersionServiceAction = GQLAction & {
   __typename: 'AddVersionServiceAction',
  changeLog: Scalars['String'],
  hash: Scalars['String'],
  version: Scalars['Int'],
  serviceName: Scalars['String'],
  inputType: Scalars['String'],
  outputType: Scalars['String'],
  inputVersion: Scalars['Int'],
  inputHash: Scalars['String'],
  outputVersion: Scalars['Int'],
  outputHash: Scalars['String'],
};

export type GQLAddVersionServiceActionInput = {
  changeLog: Scalars['String'],
  serviceName: Scalars['String'],
  inputType: Scalars['String'],
  outputType: Scalars['String'],
  inputVersion: Scalars['Int'],
  inputHash: Scalars['String'],
  outputVersion: Scalars['Int'],
  outputHash: Scalars['String'],
};

export type GQLAddVersionServiceChangeAction = GQLChangeAction & {
   __typename: 'AddVersionServiceChangeAction',
  changeLog: Scalars['String'],
  serviceName: Scalars['String'],
  inputType: Scalars['String'],
  outputType: Scalars['String'],
  inputVersion: Scalars['Int'],
  inputHash: Scalars['String'],
  outputVersion: Scalars['Int'],
  outputHash: Scalars['String'],
};

export type GQLBaseField = {
  name: Scalars['String'],
  changeLog: Scalars['String'],
  description: Scalars['String'],
  optional: Scalars['Boolean'],
};

export type GQLBooleanField = {
   __typename: 'BooleanField',
  value?: Maybe<Scalars['Boolean']>,
};

export type GQLChangeAction = {
  changeLog: Scalars['String'],
};

export type GQLChangeSet = {
   __typename: 'ChangeSet',
  id: Scalars['String'],
  baseHash: Scalars['String'],
  log: Array<GQLLogActionChange>,
};

export type GQLChangeSetInput = {
  id: Scalars['String'],
  baseHash: Scalars['String'],
  log: Array<GQLLogActionInput>,
};

export type GQLDeleteFieldTypeAction = GQLAction & {
   __typename: 'DeleteFieldTypeAction',
  changeLog: Scalars['String'],
  hash: Scalars['String'],
  version: Scalars['Int'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type GQLDeleteFieldTypeActionInput = {
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type GQLDeleteFieldTypeChangeAction = GQLChangeAction & {
   __typename: 'DeleteFieldTypeChangeAction',
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type GQLField = GQLBaseField & {
   __typename: 'Field',
  name: Scalars['String'],
  changeLog: Scalars['String'],
  description: Scalars['String'],
  optional: Scalars['Boolean'],
  _default: GQLFieldData,
  _type: GQLFieldTypes,
};

export type GQLFieldData = GQLStringField | GQLIntField | GQLFloatField | GQLBooleanField;

export type GQLFieldDataInput = {
  booleanValue?: Maybe<Scalars['Boolean']>,
  integerValue?: Maybe<Scalars['Int']>,
  floatValue?: Maybe<Scalars['Float']>,
  stringValue?: Maybe<Scalars['String']>,
};

export type GQLFieldObject = {
   __typename: 'FieldObject',
  key: Scalars['String'],
  field: GQLBaseField,
};

export enum GQLFieldTypes {
  StringType = 'stringType',
  BooleanType = 'booleanType',
  IntType = 'intType',
  FloatType = 'floatType'
}

export type GQLFloatField = {
   __typename: 'FloatField',
  value?: Maybe<Scalars['Float']>,
};

export type GQLGroupAction = GQLAction & {
   __typename: 'GroupAction',
  changeLog: Scalars['String'],
  hash: Scalars['String'],
  version: Scalars['Int'],
  groupedActions: Array<GQLLogAction>,
  versions: Array<GQLGroupVersion>,
};

export type GQLGroupVersion = {
   __typename: 'GroupVersion',
  typeName: Scalars['String'],
  version: Scalars['Int'],
};

export type GQLIntField = {
   __typename: 'IntField',
  value?: Maybe<Scalars['Int']>,
};

export type GQLLogAction = GQLNewServiceAction | GQLUpdateDescriptionServiceAction | GQLAddVersionServiceAction | GQLRenameFieldTypeAction | GQLRequiredFieldTypeAction | GQLOptionalFieldTypeAction | GQLDeleteFieldTypeAction | GQLSetDefaultFieldTypeAction | GQLRemoveDefaultFieldTypeAction | GQLAddFieldTypeAction | GQLUpdateDescriptionTypeAction | GQLReferenceFieldTypeAction | GQLNewTypeAction | GQLGroupAction;

export type GQLLogActionChange = GQLNewServiceChangeAction | GQLUpdateDescriptionServiceChangeAction | GQLAddVersionServiceChangeAction | GQLRenameFieldTypeChangeAction | GQLRequiredFieldTypeChangeAction | GQLOptionalFieldTypeChangeAction | GQLDeleteFieldTypeChangeAction | GQLSetDefaultFieldTypeChangeAction | GQLRemoveDefaultFieldTypeChangeAction | GQLAddFieldTypeChangeAction | GQLUpdateDescriptionTypeChangeAction | GQLReferenceFieldTypeChangeAction | GQLNewTypeChangeAction;

export type GQLLogActionInput = {
  newService?: Maybe<GQLNewServiceActionInput>,
  updateServiceDescription?: Maybe<GQLUpdateDescriptionServiceActionInput>,
  addVersion?: Maybe<GQLAddVersionServiceActionInput>,
  renameField?: Maybe<GQLRenameFieldTypeActionInput>,
  requiredField?: Maybe<GQLRequiredFieldTypeActionInput>,
  optionalField?: Maybe<GQLOptionalFieldTypeActionInput>,
  deleteField?: Maybe<GQLDeleteFieldTypeActionInput>,
  setDefault?: Maybe<GQLSetDefaultFieldTypeActionInput>,
  removeDefault?: Maybe<GQLRemoveDefaultFieldTypeActionInput>,
  addField?: Maybe<GQLAddFieldTypeActionInput>,
  updateTypeDescription?: Maybe<GQLUpdateDescriptionTypeActionInput>,
  referenceField?: Maybe<GQLReferenceFieldTypeActionInput>,
  newType?: Maybe<GQLNewTypeActionInput>,
};

export type GQLMutation = {
   __typename: 'Mutation',
  updateChangeSet: GQLChangeSet,
  commitChangeSet: GQLNewLog,
  deleteChangeSet: Array<GQLChangeSet>,
};


export type GQLMutationUpdateChangeSetArgs = {
  changeSet: GQLChangeSetInput
};


export type GQLMutationCommitChangeSetArgs = {
  changeSetId: Scalars['String']
};


export type GQLMutationDeleteChangeSetArgs = {
  changeSetId: Scalars['String']
};

export type GQLNewLog = {
   __typename: 'NewLog',
  log: Array<GQLLogAction>,
  services: Array<GQLService>,
  types: Array<GQLType>,
  changeSets: Array<GQLChangeSet>,
};

export type GQLNewServiceAction = GQLAction & {
   __typename: 'NewServiceAction',
  changeLog: Scalars['String'],
  hash: Scalars['String'],
  version: Scalars['Int'],
  serviceName: Scalars['String'],
  description: Scalars['String'],
};

export type GQLNewServiceActionInput = {
  changeLog: Scalars['String'],
  serviceName: Scalars['String'],
  description: Scalars['String'],
};

export type GQLNewServiceChangeAction = GQLChangeAction & {
   __typename: 'NewServiceChangeAction',
  changeLog: Scalars['String'],
  serviceName: Scalars['String'],
  description: Scalars['String'],
};

export type GQLNewTypeAction = GQLAction & {
   __typename: 'NewTypeAction',
  changeLog: Scalars['String'],
  hash: Scalars['String'],
  version: Scalars['Int'],
  typeName: Scalars['String'],
  description: Scalars['String'],
};

export type GQLNewTypeActionInput = {
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  description: Scalars['String'],
};

export type GQLNewTypeChangeAction = GQLChangeAction & {
   __typename: 'NewTypeChangeAction',
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  description: Scalars['String'],
};

export type GQLOptionalFieldTypeAction = GQLAction & {
   __typename: 'OptionalFieldTypeAction',
  changeLog: Scalars['String'],
  hash: Scalars['String'],
  version: Scalars['Int'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type GQLOptionalFieldTypeActionInput = {
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type GQLOptionalFieldTypeChangeAction = GQLChangeAction & {
   __typename: 'OptionalFieldTypeChangeAction',
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type GQLQuery = {
   __typename: 'Query',
  log: Array<GQLLogAction>,
  services: Array<GQLService>,
  types: Array<GQLType>,
  changeSets: Array<GQLChangeSet>,
};


export type GQLQueryLogArgs = {
  changeSetId?: Maybe<Scalars['String']>
};


export type GQLQueryServicesArgs = {
  changeSetId?: Maybe<Scalars['String']>
};


export type GQLQueryTypesArgs = {
  changeSetId?: Maybe<Scalars['String']>
};

export type GQLReferenceField = GQLBaseField & {
   __typename: 'ReferenceField',
  name: Scalars['String'],
  changeLog: Scalars['String'],
  description: Scalars['String'],
  optional: Scalars['Boolean'],
  referenceType: Scalars['String'],
  referenceHash: Scalars['String'],
  referenceVersion: Scalars['Int'],
};

export type GQLReferenceFieldTypeAction = GQLAction & {
   __typename: 'ReferenceFieldTypeAction',
  changeLog: Scalars['String'],
  hash: Scalars['String'],
  version: Scalars['Int'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  description: Scalars['String'],
  optional: Scalars['Boolean'],
  referenceType: Scalars['String'],
  referenceHash: Scalars['String'],
  referenceVersion: Scalars['Int'],
};

export type GQLReferenceFieldTypeActionInput = {
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  description: Scalars['String'],
  optional: Scalars['Boolean'],
  referenceType: Scalars['String'],
  referenceHash: Scalars['String'],
  referenceVersion: Scalars['Int'],
};

export type GQLReferenceFieldTypeChangeAction = GQLChangeAction & {
   __typename: 'ReferenceFieldTypeChangeAction',
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  description: Scalars['String'],
  optional: Scalars['Boolean'],
  referenceType: Scalars['String'],
  referenceHash: Scalars['String'],
  referenceVersion: Scalars['Int'],
};

export type GQLRemoveDefaultFieldTypeAction = GQLAction & {
   __typename: 'RemoveDefaultFieldTypeAction',
  changeLog: Scalars['String'],
  hash: Scalars['String'],
  version: Scalars['Int'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type GQLRemoveDefaultFieldTypeActionInput = {
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type GQLRemoveDefaultFieldTypeChangeAction = GQLChangeAction & {
   __typename: 'RemoveDefaultFieldTypeChangeAction',
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type GQLRenameFieldTypeAction = GQLAction & {
   __typename: 'RenameFieldTypeAction',
  changeLog: Scalars['String'],
  hash: Scalars['String'],
  version: Scalars['Int'],
  typeName: Scalars['String'],
  _from: Scalars['String'],
  to: Scalars['String'],
};

export type GQLRenameFieldTypeActionInput = {
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  _from: Scalars['String'],
  to: Scalars['String'],
};

export type GQLRenameFieldTypeChangeAction = GQLChangeAction & {
   __typename: 'RenameFieldTypeChangeAction',
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  _from: Scalars['String'],
  to: Scalars['String'],
};

export type GQLRequiredFieldTypeAction = GQLAction & {
   __typename: 'RequiredFieldTypeAction',
  changeLog: Scalars['String'],
  hash: Scalars['String'],
  version: Scalars['Int'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type GQLRequiredFieldTypeActionInput = {
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type GQLRequiredFieldTypeChangeAction = GQLChangeAction & {
   __typename: 'RequiredFieldTypeChangeAction',
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type GQLService = {
   __typename: 'Service',
  name: Scalars['String'],
  changeLog: Array<Scalars['String']>,
  description: Scalars['String'],
  versions: Array<GQLServiceVersion>,
};

export type GQLServiceVersion = {
   __typename: 'ServiceVersion',
  inputs: Array<GQLVersionType>,
  output: GQLVersionType,
};

export type GQLSetDefaultFieldTypeAction = GQLAction & {
   __typename: 'SetDefaultFieldTypeAction',
  changeLog: Scalars['String'],
  hash: Scalars['String'],
  version: Scalars['Int'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  newDefault: GQLFieldData,
};

export type GQLSetDefaultFieldTypeActionInput = {
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  newDefault: GQLFieldDataInput,
};

export type GQLSetDefaultFieldTypeChangeAction = GQLChangeAction & {
   __typename: 'SetDefaultFieldTypeChangeAction',
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  newDefault: GQLFieldData,
};

export type GQLStringField = {
   __typename: 'StringField',
  value?: Maybe<Scalars['String']>,
};

export type GQLType = {
   __typename: 'Type',
  name: Scalars['String'],
  versions: Array<GQLVersion>,
  latest?: Maybe<GQLVersion>,
  changeLog: Array<Scalars['String']>,
  description: Scalars['String'],
};

export type GQLUpdateDescriptionServiceAction = GQLAction & {
   __typename: 'UpdateDescriptionServiceAction',
  changeLog: Scalars['String'],
  hash: Scalars['String'],
  version: Scalars['Int'],
  serviceName: Scalars['String'],
  description: Scalars['String'],
};

export type GQLUpdateDescriptionServiceActionInput = {
  changeLog: Scalars['String'],
  serviceName: Scalars['String'],
  description: Scalars['String'],
};

export type GQLUpdateDescriptionServiceChangeAction = GQLChangeAction & {
   __typename: 'UpdateDescriptionServiceChangeAction',
  changeLog: Scalars['String'],
  serviceName: Scalars['String'],
  description: Scalars['String'],
};

export type GQLUpdateDescriptionTypeAction = GQLAction & {
   __typename: 'UpdateDescriptionTypeAction',
  changeLog: Scalars['String'],
  hash: Scalars['String'],
  version: Scalars['Int'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  description: Scalars['String'],
};

export type GQLUpdateDescriptionTypeActionInput = {
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  description: Scalars['String'],
};

export type GQLUpdateDescriptionTypeChangeAction = GQLChangeAction & {
   __typename: 'UpdateDescriptionTypeChangeAction',
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  description: Scalars['String'],
};

export type GQLVersion = {
   __typename: 'Version',
  _type: Scalars['String'],
  version: Scalars['Int'],
  hash: Scalars['String'],
  fields: Array<GQLFieldObject>,
};

export type GQLVersionType = {
   __typename: 'VersionType',
  _type: Scalars['String'],
  version: Scalars['Int'],
  hash: Scalars['String'],
};

type GQLLogFields_NewServiceAction_Fragment = (
  { __typename: 'NewServiceAction' }
  & GQLActionsFragment_NewServiceAction_Fragment
);

type GQLLogFields_UpdateDescriptionServiceAction_Fragment = (
  { __typename: 'UpdateDescriptionServiceAction' }
  & GQLActionsFragment_UpdateDescriptionServiceAction_Fragment
);

type GQLLogFields_AddVersionServiceAction_Fragment = (
  { __typename: 'AddVersionServiceAction' }
  & GQLActionsFragment_AddVersionServiceAction_Fragment
);

type GQLLogFields_RenameFieldTypeAction_Fragment = (
  { __typename: 'RenameFieldTypeAction' }
  & GQLActionsFragment_RenameFieldTypeAction_Fragment
);

type GQLLogFields_RequiredFieldTypeAction_Fragment = (
  { __typename: 'RequiredFieldTypeAction' }
  & GQLActionsFragment_RequiredFieldTypeAction_Fragment
);

type GQLLogFields_OptionalFieldTypeAction_Fragment = (
  { __typename: 'OptionalFieldTypeAction' }
  & GQLActionsFragment_OptionalFieldTypeAction_Fragment
);

type GQLLogFields_DeleteFieldTypeAction_Fragment = (
  { __typename: 'DeleteFieldTypeAction' }
  & GQLActionsFragment_DeleteFieldTypeAction_Fragment
);

type GQLLogFields_SetDefaultFieldTypeAction_Fragment = (
  { __typename: 'SetDefaultFieldTypeAction' }
  & GQLActionsFragment_SetDefaultFieldTypeAction_Fragment
);

type GQLLogFields_RemoveDefaultFieldTypeAction_Fragment = (
  { __typename: 'RemoveDefaultFieldTypeAction' }
  & GQLActionsFragment_RemoveDefaultFieldTypeAction_Fragment
);

type GQLLogFields_AddFieldTypeAction_Fragment = (
  { __typename: 'AddFieldTypeAction' }
  & GQLActionsFragment_AddFieldTypeAction_Fragment
);

type GQLLogFields_UpdateDescriptionTypeAction_Fragment = (
  { __typename: 'UpdateDescriptionTypeAction' }
  & GQLActionsFragment_UpdateDescriptionTypeAction_Fragment
);

type GQLLogFields_ReferenceFieldTypeAction_Fragment = (
  { __typename: 'ReferenceFieldTypeAction' }
  & GQLActionsFragment_ReferenceFieldTypeAction_Fragment
);

type GQLLogFields_NewTypeAction_Fragment = (
  { __typename: 'NewTypeAction' }
  & GQLActionsFragment_NewTypeAction_Fragment
);

type GQLLogFields_GroupAction_Fragment = (
  { __typename: 'GroupAction' }
  & Pick<GQLGroupAction, 'changeLog' | 'hash' | 'version'>
  & { _id: GQLGroupAction['hash'] }
  & { groupedActions: Array<(
    { __typename: 'NewServiceAction' }
    & GQLActionsFragment_NewServiceAction_Fragment
  ) | (
    { __typename: 'UpdateDescriptionServiceAction' }
    & GQLActionsFragment_UpdateDescriptionServiceAction_Fragment
  ) | (
    { __typename: 'AddVersionServiceAction' }
    & GQLActionsFragment_AddVersionServiceAction_Fragment
  ) | (
    { __typename: 'RenameFieldTypeAction' }
    & GQLActionsFragment_RenameFieldTypeAction_Fragment
  ) | (
    { __typename: 'RequiredFieldTypeAction' }
    & GQLActionsFragment_RequiredFieldTypeAction_Fragment
  ) | (
    { __typename: 'OptionalFieldTypeAction' }
    & GQLActionsFragment_OptionalFieldTypeAction_Fragment
  ) | (
    { __typename: 'DeleteFieldTypeAction' }
    & GQLActionsFragment_DeleteFieldTypeAction_Fragment
  ) | (
    { __typename: 'SetDefaultFieldTypeAction' }
    & GQLActionsFragment_SetDefaultFieldTypeAction_Fragment
  ) | (
    { __typename: 'RemoveDefaultFieldTypeAction' }
    & GQLActionsFragment_RemoveDefaultFieldTypeAction_Fragment
  ) | (
    { __typename: 'AddFieldTypeAction' }
    & GQLActionsFragment_AddFieldTypeAction_Fragment
  ) | (
    { __typename: 'UpdateDescriptionTypeAction' }
    & GQLActionsFragment_UpdateDescriptionTypeAction_Fragment
  ) | (
    { __typename: 'ReferenceFieldTypeAction' }
    & GQLActionsFragment_ReferenceFieldTypeAction_Fragment
  ) | (
    { __typename: 'NewTypeAction' }
    & GQLActionsFragment_NewTypeAction_Fragment
  ) | (
    { __typename: 'GroupAction' }
    & GQLActionsFragment_GroupAction_Fragment
  )>, versions: Array<(
    { __typename: 'GroupVersion' }
    & Pick<GQLGroupVersion, 'typeName' | 'version'>
  )> }
  & GQLActionsFragment_GroupAction_Fragment
);

export type GQLLogFieldsFragment = GQLLogFields_NewServiceAction_Fragment | GQLLogFields_UpdateDescriptionServiceAction_Fragment | GQLLogFields_AddVersionServiceAction_Fragment | GQLLogFields_RenameFieldTypeAction_Fragment | GQLLogFields_RequiredFieldTypeAction_Fragment | GQLLogFields_OptionalFieldTypeAction_Fragment | GQLLogFields_DeleteFieldTypeAction_Fragment | GQLLogFields_SetDefaultFieldTypeAction_Fragment | GQLLogFields_RemoveDefaultFieldTypeAction_Fragment | GQLLogFields_AddFieldTypeAction_Fragment | GQLLogFields_UpdateDescriptionTypeAction_Fragment | GQLLogFields_ReferenceFieldTypeAction_Fragment | GQLLogFields_NewTypeAction_Fragment | GQLLogFields_GroupAction_Fragment;

export type GQLTypeFieldsFragment = (
  { __typename: 'Type' }
  & Pick<GQLType, 'name' | 'changeLog' | 'description'>
  & { versions: Array<(
    { __typename: 'Version' }
    & Pick<GQLVersion, 'version' | 'hash' | '_type'>
    & { fields: Array<(
      { __typename: 'FieldObject' }
      & Pick<GQLFieldObject, 'key'>
      & { field: (
        { __typename: 'Field' }
        & Pick<GQLField, '_type' | 'name' | 'description' | 'changeLog' | 'optional'>
        & { _default: (
          { __typename: 'StringField' }
          & { stringValue: GQLStringField['value'] }
        ) | (
          { __typename: 'IntField' }
          & { intValue: GQLIntField['value'] }
        ) | (
          { __typename: 'FloatField' }
          & { floatValue: GQLFloatField['value'] }
        ) | (
          { __typename: 'BooleanField' }
          & { booleanValue: GQLBooleanField['value'] }
        ) }
      ) | (
        { __typename: 'ReferenceField' }
        & Pick<GQLReferenceField, 'referenceType' | 'referenceHash' | 'referenceVersion' | 'name' | 'description' | 'changeLog' | 'optional'>
      ) }
    )> }
  )> }
);

export type GQLServiceFieldsFragment = (
  { __typename: 'Service' }
  & Pick<GQLService, 'name' | 'description' | 'changeLog'>
  & { versions: Array<(
    { __typename: 'ServiceVersion' }
    & { inputs: Array<(
      { __typename: 'VersionType' }
      & Pick<GQLVersionType, 'version' | '_type' | 'hash'>
    )>, output: (
      { __typename: 'VersionType' }
      & Pick<GQLVersionType, 'version' | '_type' | 'hash'>
    ) }
  )> }
);

export type GQLChangeSetFieldsFragment = (
  { __typename: 'ChangeSet' }
  & Pick<GQLChangeSet, 'id' | 'baseHash'>
  & { log: Array<(
    { __typename: 'NewServiceChangeAction' }
    & GQLChangeActionsFragment_NewServiceChangeAction_Fragment
  ) | (
    { __typename: 'UpdateDescriptionServiceChangeAction' }
    & GQLChangeActionsFragment_UpdateDescriptionServiceChangeAction_Fragment
  ) | (
    { __typename: 'AddVersionServiceChangeAction' }
    & GQLChangeActionsFragment_AddVersionServiceChangeAction_Fragment
  ) | (
    { __typename: 'RenameFieldTypeChangeAction' }
    & GQLChangeActionsFragment_RenameFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'RequiredFieldTypeChangeAction' }
    & GQLChangeActionsFragment_RequiredFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'OptionalFieldTypeChangeAction' }
    & GQLChangeActionsFragment_OptionalFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'DeleteFieldTypeChangeAction' }
    & GQLChangeActionsFragment_DeleteFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'SetDefaultFieldTypeChangeAction' }
    & GQLChangeActionsFragment_SetDefaultFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'RemoveDefaultFieldTypeChangeAction' }
    & GQLChangeActionsFragment_RemoveDefaultFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'AddFieldTypeChangeAction' }
    & GQLChangeActionsFragment_AddFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'UpdateDescriptionTypeChangeAction' }
    & GQLChangeActionsFragment_UpdateDescriptionTypeChangeAction_Fragment
  ) | (
    { __typename: 'ReferenceFieldTypeChangeAction' }
    & GQLChangeActionsFragment_ReferenceFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'NewTypeChangeAction' }
    & GQLChangeActionsFragment_NewTypeChangeAction_Fragment
  )> }
);

export type GQLAllDataQueryVariables = {};


export type GQLAllDataQuery = (
  { __typename: 'Query' }
  & { log: Array<(
    { __typename: 'NewServiceAction' }
    & GQLLogFields_NewServiceAction_Fragment
  ) | (
    { __typename: 'UpdateDescriptionServiceAction' }
    & GQLLogFields_UpdateDescriptionServiceAction_Fragment
  ) | (
    { __typename: 'AddVersionServiceAction' }
    & GQLLogFields_AddVersionServiceAction_Fragment
  ) | (
    { __typename: 'RenameFieldTypeAction' }
    & GQLLogFields_RenameFieldTypeAction_Fragment
  ) | (
    { __typename: 'RequiredFieldTypeAction' }
    & GQLLogFields_RequiredFieldTypeAction_Fragment
  ) | (
    { __typename: 'OptionalFieldTypeAction' }
    & GQLLogFields_OptionalFieldTypeAction_Fragment
  ) | (
    { __typename: 'DeleteFieldTypeAction' }
    & GQLLogFields_DeleteFieldTypeAction_Fragment
  ) | (
    { __typename: 'SetDefaultFieldTypeAction' }
    & GQLLogFields_SetDefaultFieldTypeAction_Fragment
  ) | (
    { __typename: 'RemoveDefaultFieldTypeAction' }
    & GQLLogFields_RemoveDefaultFieldTypeAction_Fragment
  ) | (
    { __typename: 'AddFieldTypeAction' }
    & GQLLogFields_AddFieldTypeAction_Fragment
  ) | (
    { __typename: 'UpdateDescriptionTypeAction' }
    & GQLLogFields_UpdateDescriptionTypeAction_Fragment
  ) | (
    { __typename: 'ReferenceFieldTypeAction' }
    & GQLLogFields_ReferenceFieldTypeAction_Fragment
  ) | (
    { __typename: 'NewTypeAction' }
    & GQLLogFields_NewTypeAction_Fragment
  ) | (
    { __typename: 'GroupAction' }
    & GQLLogFields_GroupAction_Fragment
  )>, types: Array<(
    { __typename: 'Type' }
    & GQLTypeFieldsFragment
  )>, services: Array<(
    { __typename: 'Service' }
    & GQLServiceFieldsFragment
  )>, changeSets: Array<(
    { __typename: 'ChangeSet' }
    & GQLChangeSetFieldsFragment
  )> }
);

type GQLDataFragment_StringField_Fragment = (
  { __typename: 'StringField' }
  & { stringValue: GQLStringField['value'] }
);

type GQLDataFragment_IntField_Fragment = (
  { __typename: 'IntField' }
  & { intValue: GQLIntField['value'] }
);

type GQLDataFragment_FloatField_Fragment = (
  { __typename: 'FloatField' }
  & { floatValue: GQLFloatField['value'] }
);

type GQLDataFragment_BooleanField_Fragment = (
  { __typename: 'BooleanField' }
  & { booleanValue: GQLBooleanField['value'] }
);

export type GQLDataFragmentFragment = GQLDataFragment_StringField_Fragment | GQLDataFragment_IntField_Fragment | GQLDataFragment_FloatField_Fragment | GQLDataFragment_BooleanField_Fragment;

type GQLActionsFragment_NewServiceAction_Fragment = (
  { __typename: 'NewServiceAction' }
  & Pick<GQLNewServiceAction, 'serviceName' | 'description' | 'changeLog' | 'hash' | 'version'>
  & { _id: GQLNewServiceAction['hash'] }
);

type GQLActionsFragment_UpdateDescriptionServiceAction_Fragment = (
  { __typename: 'UpdateDescriptionServiceAction' }
  & Pick<GQLUpdateDescriptionServiceAction, 'serviceName' | 'description' | 'changeLog' | 'hash' | 'version'>
  & { _id: GQLUpdateDescriptionServiceAction['hash'] }
);

type GQLActionsFragment_AddVersionServiceAction_Fragment = (
  { __typename: 'AddVersionServiceAction' }
  & Pick<GQLAddVersionServiceAction, 'serviceName' | 'inputType' | 'outputType' | 'inputVersion' | 'inputHash' | 'outputVersion' | 'outputHash' | 'changeLog' | 'hash' | 'version'>
  & { _id: GQLAddVersionServiceAction['hash'] }
);

type GQLActionsFragment_RenameFieldTypeAction_Fragment = (
  { __typename: 'RenameFieldTypeAction' }
  & Pick<GQLRenameFieldTypeAction, 'typeName' | '_from' | 'to' | 'changeLog' | 'hash' | 'version'>
  & { _id: GQLRenameFieldTypeAction['hash'] }
);

type GQLActionsFragment_RequiredFieldTypeAction_Fragment = (
  { __typename: 'RequiredFieldTypeAction' }
  & Pick<GQLRequiredFieldTypeAction, 'typeName' | 'name' | 'changeLog' | 'hash' | 'version'>
  & { _id: GQLRequiredFieldTypeAction['hash'] }
);

type GQLActionsFragment_OptionalFieldTypeAction_Fragment = (
  { __typename: 'OptionalFieldTypeAction' }
  & Pick<GQLOptionalFieldTypeAction, 'typeName' | 'name' | 'changeLog' | 'hash' | 'version'>
  & { _id: GQLOptionalFieldTypeAction['hash'] }
);

type GQLActionsFragment_DeleteFieldTypeAction_Fragment = (
  { __typename: 'DeleteFieldTypeAction' }
  & Pick<GQLDeleteFieldTypeAction, 'typeName' | 'name' | 'changeLog' | 'hash' | 'version'>
  & { _id: GQLDeleteFieldTypeAction['hash'] }
);

type GQLActionsFragment_SetDefaultFieldTypeAction_Fragment = (
  { __typename: 'SetDefaultFieldTypeAction' }
  & Pick<GQLSetDefaultFieldTypeAction, 'typeName' | 'name' | 'changeLog' | 'hash' | 'version'>
  & { _id: GQLSetDefaultFieldTypeAction['hash'] }
  & { newDefault: (
    { __typename: 'StringField' }
    & GQLDataFragment_StringField_Fragment
  ) | (
    { __typename: 'IntField' }
    & GQLDataFragment_IntField_Fragment
  ) | (
    { __typename: 'FloatField' }
    & GQLDataFragment_FloatField_Fragment
  ) | (
    { __typename: 'BooleanField' }
    & GQLDataFragment_BooleanField_Fragment
  ) }
);

type GQLActionsFragment_RemoveDefaultFieldTypeAction_Fragment = (
  { __typename: 'RemoveDefaultFieldTypeAction' }
  & Pick<GQLRemoveDefaultFieldTypeAction, 'typeName' | 'name' | 'changeLog' | 'hash' | 'version'>
  & { _id: GQLRemoveDefaultFieldTypeAction['hash'] }
);

type GQLActionsFragment_AddFieldTypeAction_Fragment = (
  { __typename: 'AddFieldTypeAction' }
  & Pick<GQLAddFieldTypeAction, 'typeName' | 'name' | 'type' | 'description' | 'optional' | 'changeLog' | 'hash' | 'version'>
  & { _id: GQLAddFieldTypeAction['hash'] }
  & { _default: Maybe<(
    { __typename: 'StringField' }
    & GQLDataFragment_StringField_Fragment
  ) | (
    { __typename: 'IntField' }
    & GQLDataFragment_IntField_Fragment
  ) | (
    { __typename: 'FloatField' }
    & GQLDataFragment_FloatField_Fragment
  ) | (
    { __typename: 'BooleanField' }
    & GQLDataFragment_BooleanField_Fragment
  )> }
);

type GQLActionsFragment_UpdateDescriptionTypeAction_Fragment = (
  { __typename: 'UpdateDescriptionTypeAction' }
  & Pick<GQLUpdateDescriptionTypeAction, 'typeName' | 'name' | 'description' | 'changeLog' | 'hash' | 'version'>
  & { _id: GQLUpdateDescriptionTypeAction['hash'] }
);

type GQLActionsFragment_ReferenceFieldTypeAction_Fragment = (
  { __typename: 'ReferenceFieldTypeAction' }
  & Pick<GQLReferenceFieldTypeAction, 'typeName' | 'name' | 'description' | 'optional' | 'referenceType' | 'referenceHash' | 'referenceVersion' | 'changeLog' | 'hash' | 'version'>
  & { _id: GQLReferenceFieldTypeAction['hash'] }
);

type GQLActionsFragment_NewTypeAction_Fragment = (
  { __typename: 'NewTypeAction' }
  & Pick<GQLNewTypeAction, 'typeName' | 'description' | 'changeLog' | 'hash' | 'version'>
  & { _id: GQLNewTypeAction['hash'] }
);

type GQLActionsFragment_GroupAction_Fragment = (
  { __typename: 'GroupAction' }
  & Pick<GQLGroupAction, 'changeLog' | 'hash' | 'version'>
  & { _id: GQLGroupAction['hash'] }
);

export type GQLActionsFragmentFragment = GQLActionsFragment_NewServiceAction_Fragment | GQLActionsFragment_UpdateDescriptionServiceAction_Fragment | GQLActionsFragment_AddVersionServiceAction_Fragment | GQLActionsFragment_RenameFieldTypeAction_Fragment | GQLActionsFragment_RequiredFieldTypeAction_Fragment | GQLActionsFragment_OptionalFieldTypeAction_Fragment | GQLActionsFragment_DeleteFieldTypeAction_Fragment | GQLActionsFragment_SetDefaultFieldTypeAction_Fragment | GQLActionsFragment_RemoveDefaultFieldTypeAction_Fragment | GQLActionsFragment_AddFieldTypeAction_Fragment | GQLActionsFragment_UpdateDescriptionTypeAction_Fragment | GQLActionsFragment_ReferenceFieldTypeAction_Fragment | GQLActionsFragment_NewTypeAction_Fragment | GQLActionsFragment_GroupAction_Fragment;

type GQLChangeActionsFragment_NewServiceChangeAction_Fragment = (
  { __typename: 'NewServiceChangeAction' }
  & Pick<GQLNewServiceChangeAction, 'serviceName' | 'description' | 'changeLog'>
);

type GQLChangeActionsFragment_UpdateDescriptionServiceChangeAction_Fragment = (
  { __typename: 'UpdateDescriptionServiceChangeAction' }
  & Pick<GQLUpdateDescriptionServiceChangeAction, 'serviceName' | 'description' | 'changeLog'>
);

type GQLChangeActionsFragment_AddVersionServiceChangeAction_Fragment = (
  { __typename: 'AddVersionServiceChangeAction' }
  & Pick<GQLAddVersionServiceChangeAction, 'serviceName' | 'inputType' | 'outputType' | 'inputVersion' | 'inputHash' | 'outputVersion' | 'outputHash' | 'changeLog'>
);

type GQLChangeActionsFragment_RenameFieldTypeChangeAction_Fragment = (
  { __typename: 'RenameFieldTypeChangeAction' }
  & Pick<GQLRenameFieldTypeChangeAction, 'typeName' | '_from' | 'to' | 'changeLog'>
);

type GQLChangeActionsFragment_RequiredFieldTypeChangeAction_Fragment = (
  { __typename: 'RequiredFieldTypeChangeAction' }
  & Pick<GQLRequiredFieldTypeChangeAction, 'typeName' | 'name' | 'changeLog'>
);

type GQLChangeActionsFragment_OptionalFieldTypeChangeAction_Fragment = (
  { __typename: 'OptionalFieldTypeChangeAction' }
  & Pick<GQLOptionalFieldTypeChangeAction, 'typeName' | 'name' | 'changeLog'>
);

type GQLChangeActionsFragment_DeleteFieldTypeChangeAction_Fragment = (
  { __typename: 'DeleteFieldTypeChangeAction' }
  & Pick<GQLDeleteFieldTypeChangeAction, 'typeName' | 'name' | 'changeLog'>
);

type GQLChangeActionsFragment_SetDefaultFieldTypeChangeAction_Fragment = (
  { __typename: 'SetDefaultFieldTypeChangeAction' }
  & Pick<GQLSetDefaultFieldTypeChangeAction, 'typeName' | 'name' | 'changeLog'>
  & { newDefault: (
    { __typename: 'StringField' }
    & GQLDataFragment_StringField_Fragment
  ) | (
    { __typename: 'IntField' }
    & GQLDataFragment_IntField_Fragment
  ) | (
    { __typename: 'FloatField' }
    & GQLDataFragment_FloatField_Fragment
  ) | (
    { __typename: 'BooleanField' }
    & GQLDataFragment_BooleanField_Fragment
  ) }
);

type GQLChangeActionsFragment_RemoveDefaultFieldTypeChangeAction_Fragment = (
  { __typename: 'RemoveDefaultFieldTypeChangeAction' }
  & Pick<GQLRemoveDefaultFieldTypeChangeAction, 'typeName' | 'name' | 'changeLog'>
);

type GQLChangeActionsFragment_AddFieldTypeChangeAction_Fragment = (
  { __typename: 'AddFieldTypeChangeAction' }
  & Pick<GQLAddFieldTypeChangeAction, 'typeName' | 'name' | 'type' | 'description' | 'optional' | 'changeLog'>
  & { _default: Maybe<(
    { __typename: 'StringField' }
    & GQLDataFragment_StringField_Fragment
  ) | (
    { __typename: 'IntField' }
    & GQLDataFragment_IntField_Fragment
  ) | (
    { __typename: 'FloatField' }
    & GQLDataFragment_FloatField_Fragment
  ) | (
    { __typename: 'BooleanField' }
    & GQLDataFragment_BooleanField_Fragment
  )> }
);

type GQLChangeActionsFragment_UpdateDescriptionTypeChangeAction_Fragment = (
  { __typename: 'UpdateDescriptionTypeChangeAction' }
  & Pick<GQLUpdateDescriptionTypeChangeAction, 'typeName' | 'name' | 'description' | 'changeLog'>
);

type GQLChangeActionsFragment_ReferenceFieldTypeChangeAction_Fragment = (
  { __typename: 'ReferenceFieldTypeChangeAction' }
  & Pick<GQLReferenceFieldTypeChangeAction, 'typeName' | 'name' | 'description' | 'optional' | 'referenceType' | 'referenceHash' | 'referenceVersion' | 'changeLog'>
);

type GQLChangeActionsFragment_NewTypeChangeAction_Fragment = (
  { __typename: 'NewTypeChangeAction' }
  & Pick<GQLNewTypeChangeAction, 'typeName' | 'description' | 'changeLog'>
);

export type GQLChangeActionsFragmentFragment = GQLChangeActionsFragment_NewServiceChangeAction_Fragment | GQLChangeActionsFragment_UpdateDescriptionServiceChangeAction_Fragment | GQLChangeActionsFragment_AddVersionServiceChangeAction_Fragment | GQLChangeActionsFragment_RenameFieldTypeChangeAction_Fragment | GQLChangeActionsFragment_RequiredFieldTypeChangeAction_Fragment | GQLChangeActionsFragment_OptionalFieldTypeChangeAction_Fragment | GQLChangeActionsFragment_DeleteFieldTypeChangeAction_Fragment | GQLChangeActionsFragment_SetDefaultFieldTypeChangeAction_Fragment | GQLChangeActionsFragment_RemoveDefaultFieldTypeChangeAction_Fragment | GQLChangeActionsFragment_AddFieldTypeChangeAction_Fragment | GQLChangeActionsFragment_UpdateDescriptionTypeChangeAction_Fragment | GQLChangeActionsFragment_ReferenceFieldTypeChangeAction_Fragment | GQLChangeActionsFragment_NewTypeChangeAction_Fragment;

export type GQLChangeSetFragmentFragment = (
  { __typename: 'ChangeSet' }
  & Pick<GQLChangeSet, 'id' | 'baseHash'>
  & { log: Array<(
    { __typename: 'NewServiceChangeAction' }
    & GQLChangeActionsFragment_NewServiceChangeAction_Fragment
  ) | (
    { __typename: 'UpdateDescriptionServiceChangeAction' }
    & GQLChangeActionsFragment_UpdateDescriptionServiceChangeAction_Fragment
  ) | (
    { __typename: 'AddVersionServiceChangeAction' }
    & GQLChangeActionsFragment_AddVersionServiceChangeAction_Fragment
  ) | (
    { __typename: 'RenameFieldTypeChangeAction' }
    & GQLChangeActionsFragment_RenameFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'RequiredFieldTypeChangeAction' }
    & GQLChangeActionsFragment_RequiredFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'OptionalFieldTypeChangeAction' }
    & GQLChangeActionsFragment_OptionalFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'DeleteFieldTypeChangeAction' }
    & GQLChangeActionsFragment_DeleteFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'SetDefaultFieldTypeChangeAction' }
    & GQLChangeActionsFragment_SetDefaultFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'RemoveDefaultFieldTypeChangeAction' }
    & GQLChangeActionsFragment_RemoveDefaultFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'AddFieldTypeChangeAction' }
    & GQLChangeActionsFragment_AddFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'UpdateDescriptionTypeChangeAction' }
    & GQLChangeActionsFragment_UpdateDescriptionTypeChangeAction_Fragment
  ) | (
    { __typename: 'ReferenceFieldTypeChangeAction' }
    & GQLChangeActionsFragment_ReferenceFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'NewTypeChangeAction' }
    & GQLChangeActionsFragment_NewTypeChangeAction_Fragment
  )> }
);

export type GQLUpdateChangeSetMutationVariables = {
  changeSet: GQLChangeSetInput
};


export type GQLUpdateChangeSetMutation = (
  { __typename: 'Mutation' }
  & { updateChangeSet: (
    { __typename: 'ChangeSet' }
    & GQLChangeSetFragmentFragment
  ) }
);

export type GQLCommitChangeSetMutationVariables = {
  changeSetId: Scalars['String']
};


export type GQLCommitChangeSetMutation = (
  { __typename: 'Mutation' }
  & { commitChangeSet: (
    { __typename: 'NewLog' }
    & { log: Array<(
      { __typename: 'NewServiceAction' }
      & GQLLogFields_NewServiceAction_Fragment
    ) | (
      { __typename: 'UpdateDescriptionServiceAction' }
      & GQLLogFields_UpdateDescriptionServiceAction_Fragment
    ) | (
      { __typename: 'AddVersionServiceAction' }
      & GQLLogFields_AddVersionServiceAction_Fragment
    ) | (
      { __typename: 'RenameFieldTypeAction' }
      & GQLLogFields_RenameFieldTypeAction_Fragment
    ) | (
      { __typename: 'RequiredFieldTypeAction' }
      & GQLLogFields_RequiredFieldTypeAction_Fragment
    ) | (
      { __typename: 'OptionalFieldTypeAction' }
      & GQLLogFields_OptionalFieldTypeAction_Fragment
    ) | (
      { __typename: 'DeleteFieldTypeAction' }
      & GQLLogFields_DeleteFieldTypeAction_Fragment
    ) | (
      { __typename: 'SetDefaultFieldTypeAction' }
      & GQLLogFields_SetDefaultFieldTypeAction_Fragment
    ) | (
      { __typename: 'RemoveDefaultFieldTypeAction' }
      & GQLLogFields_RemoveDefaultFieldTypeAction_Fragment
    ) | (
      { __typename: 'AddFieldTypeAction' }
      & GQLLogFields_AddFieldTypeAction_Fragment
    ) | (
      { __typename: 'UpdateDescriptionTypeAction' }
      & GQLLogFields_UpdateDescriptionTypeAction_Fragment
    ) | (
      { __typename: 'ReferenceFieldTypeAction' }
      & GQLLogFields_ReferenceFieldTypeAction_Fragment
    ) | (
      { __typename: 'NewTypeAction' }
      & GQLLogFields_NewTypeAction_Fragment
    ) | (
      { __typename: 'GroupAction' }
      & GQLLogFields_GroupAction_Fragment
    )>, types: Array<(
      { __typename: 'Type' }
      & GQLTypeFieldsFragment
    )>, services: Array<(
      { __typename: 'Service' }
      & GQLServiceFieldsFragment
    )>, changeSets: Array<(
      { __typename: 'ChangeSet' }
      & GQLChangeSetFieldsFragment
    )> }
  ) }
);

export const DataFragmentFragmentDoc = gql`
    fragment DataFragment on FieldData {
  ... on StringField {
    __typename
    stringValue: value
  }
  ... on IntField {
    __typename
    intValue: value
  }
  ... on FloatField {
    __typename
    floatValue: value
  }
  ... on BooleanField {
    __typename
    booleanValue: value
  }
}
    `;
export const ActionsFragmentFragmentDoc = gql`
    fragment ActionsFragment on Action {
  __typename
  changeLog
  hash
  _id: hash
  version
  ... on NewServiceAction {
    serviceName
    description
  }
  ... on UpdateDescriptionServiceAction {
    serviceName
    description
  }
  ... on AddVersionServiceAction {
    serviceName
    inputType
    outputType
    inputVersion
    inputHash
    outputVersion
    outputHash
  }
  ... on RenameFieldTypeAction {
    typeName
    _from
    to
  }
  ... on RequiredFieldTypeAction {
    typeName
    name
  }
  ... on OptionalFieldTypeAction {
    typeName
    name
  }
  ... on DeleteFieldTypeAction {
    typeName
    name
  }
  ... on SetDefaultFieldTypeAction {
    typeName
    name
    newDefault {
      ...DataFragment
    }
  }
  ... on RemoveDefaultFieldTypeAction {
    typeName
    name
  }
  ... on AddFieldTypeAction {
    typeName
    name
    type
    description
    optional
    _default {
      ...DataFragment
    }
  }
  ... on UpdateDescriptionTypeAction {
    typeName
    name
    description
  }
  ... on ReferenceFieldTypeAction {
    typeName
    name
    description
    optional
    referenceType
    referenceHash
    referenceVersion
  }
  ... on NewTypeAction {
    typeName
    description
  }
}
    ${DataFragmentFragmentDoc}`;
export const LogFieldsFragmentDoc = gql`
    fragment LogFields on LogAction {
  ...ActionsFragment
  ... on GroupAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    groupedActions {
      ...ActionsFragment
    }
    versions {
      typeName
      version
    }
  }
}
    ${ActionsFragmentFragmentDoc}`;
export const TypeFieldsFragmentDoc = gql`
    fragment TypeFields on Type {
  name
  changeLog
  description
  versions {
    version
    hash
    _type
    fields {
      key
      field {
        name
        description
        changeLog
        optional
        ... on ReferenceField {
          referenceType
          referenceHash
          referenceVersion
        }
        ... on Field {
          _default {
            ... on StringField {
              stringValue: value
            }
            ... on BooleanField {
              booleanValue: value
            }
            ... on FloatField {
              floatValue: value
            }
            ... on IntField {
              intValue: value
            }
          }
          _type
        }
      }
    }
  }
}
    `;
export const ServiceFieldsFragmentDoc = gql`
    fragment ServiceFields on Service {
  name
  description
  changeLog
  versions {
    inputs {
      version
      _type
      hash
    }
    output {
      version
      _type
      hash
    }
  }
}
    `;
export const ChangeActionsFragmentFragmentDoc = gql`
    fragment ChangeActionsFragment on ChangeAction {
  __typename
  changeLog
  ... on NewServiceChangeAction {
    serviceName
    description
  }
  ... on UpdateDescriptionServiceChangeAction {
    serviceName
    description
  }
  ... on AddVersionServiceChangeAction {
    serviceName
    inputType
    outputType
    inputVersion
    inputHash
    outputVersion
    outputHash
  }
  ... on RenameFieldTypeChangeAction {
    typeName
    _from
    to
  }
  ... on RequiredFieldTypeChangeAction {
    typeName
    name
  }
  ... on OptionalFieldTypeChangeAction {
    typeName
    name
  }
  ... on DeleteFieldTypeChangeAction {
    typeName
    name
  }
  ... on SetDefaultFieldTypeChangeAction {
    typeName
    name
    newDefault {
      ...DataFragment
    }
  }
  ... on RemoveDefaultFieldTypeChangeAction {
    typeName
    name
  }
  ... on AddFieldTypeChangeAction {
    typeName
    name
    type
    description
    optional
    _default {
      ...DataFragment
    }
  }
  ... on UpdateDescriptionTypeChangeAction {
    typeName
    name
    description
  }
  ... on ReferenceFieldTypeChangeAction {
    typeName
    name
    description
    optional
    referenceType
    referenceHash
    referenceVersion
  }
  ... on NewTypeChangeAction {
    typeName
    description
  }
}
    ${DataFragmentFragmentDoc}`;
export const ChangeSetFieldsFragmentDoc = gql`
    fragment ChangeSetFields on ChangeSet {
  id
  baseHash
  log {
    ...ChangeActionsFragment
  }
}
    ${ChangeActionsFragmentFragmentDoc}`;
export const ChangeSetFragmentFragmentDoc = gql`
    fragment ChangeSetFragment on ChangeSet {
  id
  baseHash
  log {
    ...ChangeActionsFragment
  }
}
    ${ChangeActionsFragmentFragmentDoc}`;
export const AllDataDocument = gql`
    query allData {
  log {
    ...LogFields
  }
  types {
    ...TypeFields
  }
  services {
    ...ServiceFields
  }
  changeSets {
    ...ChangeSetFields
  }
}
    ${LogFieldsFragmentDoc}
${TypeFieldsFragmentDoc}
${ServiceFieldsFragmentDoc}
${ChangeSetFieldsFragmentDoc}`;

/**
 * __useAllDataQuery__
 *
 * To run a query within a React component, call `useAllDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllDataQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllDataQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GQLAllDataQuery, GQLAllDataQueryVariables>) {
        return ApolloReactHooks.useQuery<GQLAllDataQuery, GQLAllDataQueryVariables>(AllDataDocument, baseOptions);
      }
export function useAllDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GQLAllDataQuery, GQLAllDataQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GQLAllDataQuery, GQLAllDataQueryVariables>(AllDataDocument, baseOptions);
        }
export type AllDataQueryHookResult = ReturnType<typeof useAllDataQuery>;
export type AllDataLazyQueryHookResult = ReturnType<typeof useAllDataLazyQuery>;
export type AllDataQueryResult = ApolloReactCommon.QueryResult<GQLAllDataQuery, GQLAllDataQueryVariables>;
export const UpdateChangeSetDocument = gql`
    mutation UpdateChangeSet($changeSet: ChangeSetInput!) {
  updateChangeSet(changeSet: $changeSet) {
    ...ChangeSetFragment
  }
}
    ${ChangeSetFragmentFragmentDoc}`;
export type GQLUpdateChangeSetMutationFn = ApolloReactCommon.MutationFunction<GQLUpdateChangeSetMutation, GQLUpdateChangeSetMutationVariables>;

/**
 * __useUpdateChangeSetMutation__
 *
 * To run a mutation, you first call `useUpdateChangeSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChangeSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChangeSetMutation, { data, loading, error }] = useUpdateChangeSetMutation({
 *   variables: {
 *      changeSet: // value for 'changeSet'
 *   },
 * });
 */
export function useUpdateChangeSetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GQLUpdateChangeSetMutation, GQLUpdateChangeSetMutationVariables>) {
        return ApolloReactHooks.useMutation<GQLUpdateChangeSetMutation, GQLUpdateChangeSetMutationVariables>(UpdateChangeSetDocument, baseOptions);
      }
export type UpdateChangeSetMutationHookResult = ReturnType<typeof useUpdateChangeSetMutation>;
export type UpdateChangeSetMutationResult = ApolloReactCommon.MutationResult<GQLUpdateChangeSetMutation>;
export type UpdateChangeSetMutationOptions = ApolloReactCommon.BaseMutationOptions<GQLUpdateChangeSetMutation, GQLUpdateChangeSetMutationVariables>;
export const CommitChangeSetDocument = gql`
    mutation CommitChangeSet($changeSetId: String!) {
  commitChangeSet(changeSetId: $changeSetId) {
    log {
      ...LogFields
    }
    types {
      ...TypeFields
    }
    services {
      ...ServiceFields
    }
    changeSets {
      ...ChangeSetFields
    }
  }
}
    ${LogFieldsFragmentDoc}
${TypeFieldsFragmentDoc}
${ServiceFieldsFragmentDoc}
${ChangeSetFieldsFragmentDoc}`;
export type GQLCommitChangeSetMutationFn = ApolloReactCommon.MutationFunction<GQLCommitChangeSetMutation, GQLCommitChangeSetMutationVariables>;

/**
 * __useCommitChangeSetMutation__
 *
 * To run a mutation, you first call `useCommitChangeSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommitChangeSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commitChangeSetMutation, { data, loading, error }] = useCommitChangeSetMutation({
 *   variables: {
 *      changeSetId: // value for 'changeSetId'
 *   },
 * });
 */
export function useCommitChangeSetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GQLCommitChangeSetMutation, GQLCommitChangeSetMutationVariables>) {
        return ApolloReactHooks.useMutation<GQLCommitChangeSetMutation, GQLCommitChangeSetMutationVariables>(CommitChangeSetDocument, baseOptions);
      }
export type CommitChangeSetMutationHookResult = ReturnType<typeof useCommitChangeSetMutation>;
export type CommitChangeSetMutationResult = ApolloReactCommon.MutationResult<GQLCommitChangeSetMutation>;
export type CommitChangeSetMutationOptions = ApolloReactCommon.BaseMutationOptions<GQLCommitChangeSetMutation, GQLCommitChangeSetMutationVariables>;