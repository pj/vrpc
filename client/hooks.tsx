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

export type Action = NewTypeAction | RenameFieldTypeAction | RequiredFieldTypeAction | OptionalFieldTypeAction | DeleteFieldTypeAction | SetDefaultFieldTypeAction | RemoveDefaultFieldTypeAction | AddFieldTypeAction | UpdateDescriptionTypeAction | ReferenceFieldTypeAction | NewServiceAction | UpdateDescriptionServiceAction | AddVersionServiceAction;

export type AddFieldTypeAction = {
   __typename: 'AddFieldTypeAction',
  hash: Scalars['String'],
  version: Scalars['Float'],
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  _type: FieldTypes,
  description: Scalars['String'],
  optional: Scalars['Boolean'],
  _default?: Maybe<FieldDefaults>,
};

export type AddFieldTypeChangeAction = {
   __typename: 'AddFieldTypeChangeAction',
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  _type: FieldTypes,
  description: Scalars['String'],
  optional: Scalars['Boolean'],
  _default?: Maybe<FieldDefaults>,
};

export type AddFieldTypeInputAction = {
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  _type: FieldTypes,
  description: Scalars['String'],
  optional: Scalars['Boolean'],
  _default: FieldDataInput,
};

export type AddVersionServiceAction = {
   __typename: 'AddVersionServiceAction',
  hash: Scalars['String'],
  version: Scalars['Float'],
  changeLog: Scalars['String'],
  serviceName: Scalars['String'],
  inputType: Scalars['String'],
  outputType: Scalars['String'],
  inputVersion: Scalars['Float'],
  inputHash: Scalars['String'],
  outputVersion: Scalars['Float'],
  outputHash: Scalars['String'],
};

export type AddVersionServiceChangeAction = {
   __typename: 'AddVersionServiceChangeAction',
  changeLog: Scalars['String'],
  serviceName: Scalars['String'],
  inputType: Scalars['String'],
  outputType: Scalars['String'],
  inputVersion: Scalars['Float'],
  inputHash: Scalars['String'],
  outputVersion: Scalars['Float'],
  outputHash: Scalars['String'],
};

export type AddVersionServiceInputAction = {
  changeLog: Scalars['String'],
  serviceName: Scalars['String'],
  inputType: Scalars['String'],
  outputType: Scalars['String'],
  inputVersion: Scalars['Float'],
  inputHash: Scalars['String'],
  outputVersion: Scalars['Float'],
  outputHash: Scalars['String'],
};

export type BaseField = {
  name: Scalars['String'],
  changeLog: Scalars['String'],
  description: Scalars['String'],
  optional: Scalars['Boolean'],
};

export type BooleanField = {
   __typename: 'BooleanField',
  value: Scalars['Boolean'],
};

export type ChangeAction = NewTypeChangeAction | RenameFieldTypeChangeAction | RequiredFieldTypeChangeAction | OptionalFieldTypeChangeAction | DeleteFieldTypeChangeAction | SetDefaultFieldTypeChangeAction | RemoveDefaultFieldTypeChangeAction | AddFieldTypeChangeAction | UpdateDescriptionTypeChangeAction | ReferenceFieldTypeChangeAction | NewServiceChangeAction | UpdateDescriptionServiceChangeAction | AddVersionServiceChangeAction;

export type ChangeSet = {
   __typename: 'ChangeSet',
  id: Scalars['String'],
  log: Array<ChangeAction>,
  baseHash?: Maybe<Scalars['String']>,
};

export type ChangeSetAction = {
  newService?: Maybe<NewServiceInputAction>,
  updateServiceDescription?: Maybe<UpdateDescriptionServiceInputAction>,
  addVersion?: Maybe<AddVersionServiceInputAction>,
  renameField?: Maybe<RenameFieldTypeInputAction>,
  requiredField?: Maybe<RequiredFieldTypeInputAction>,
  optionalField?: Maybe<OptionalFieldTypeInputAction>,
  deleteField?: Maybe<DeleteFieldTypeInputAction>,
  setDefault?: Maybe<SetDefaultFieldTypeInputAction>,
  removeDefault?: Maybe<RemoveDefaultFieldTypeInputAction>,
  addField?: Maybe<AddFieldTypeInputAction>,
  updateTypeDescription?: Maybe<UpdateDescriptionTypeInputAction>,
  referenceField?: Maybe<ReferenceFieldTypeInputAction>,
  newType?: Maybe<NewTypeInputAction>,
};

export type ChangeSetAppend = {
  id: Scalars['String'],
  action: ChangeSetAction,
};

export type ChangeSetInput = {
  id: Scalars['String'],
  baseHash?: Maybe<Scalars['String']>,
  log: Array<ChangeSetAction>,
};

export type CommitOutput = {
   __typename: 'CommitOutput',
  log: Array<GroupAction>,
  types: Array<Type>,
  services: Array<Service>,
  changeSets: Array<ChangeSet>,
};

export type DeleteFieldTypeAction = {
   __typename: 'DeleteFieldTypeAction',
  hash: Scalars['String'],
  version: Scalars['Float'],
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type DeleteFieldTypeChangeAction = {
   __typename: 'DeleteFieldTypeChangeAction',
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type DeleteFieldTypeInputAction = {
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type FieldDataInput = {
  stringValue?: Maybe<Scalars['String']>,
  integerValue?: Maybe<Scalars['Float']>,
  floatValue?: Maybe<Scalars['Float']>,
  booleanValue?: Maybe<Scalars['Boolean']>,
};

export type FieldDefaults = StringField | BooleanField | FloatField | IntegerField;

export enum FieldTypes {
  String = 'STRING',
  Boolean = 'BOOLEAN',
  Integer = 'INTEGER',
  Float = 'FLOAT'
}

export type FieldUnion = ReferenceField | ScalarField;

export type FloatField = {
   __typename: 'FloatField',
  value: Scalars['Float'],
};

export type GroupAction = {
   __typename: 'GroupAction',
  hash: Scalars['String'],
  version: Scalars['Float'],
  actionType: Scalars['String'],
  actions: Array<Action>,
};

export type IntegerField = {
   __typename: 'IntegerField',
  value: Scalars['Int'],
};

export type Mutation = {
   __typename: 'Mutation',
  updateChangeSet: ChangeSet,
  appendChangeSet: ChangeSet,
  commitChangeSet: CommitOutput,
  deleteChangeSet: Array<ChangeSet>,
};


export type MutationUpdateChangeSetArgs = {
  changeSet: ChangeSetInput
};


export type MutationAppendChangeSetArgs = {
  changeSet: ChangeSetAppend
};


export type MutationCommitChangeSetArgs = {
  changeSetId: Scalars['String']
};


export type MutationDeleteChangeSetArgs = {
  changeSetId: Scalars['String']
};

export type NewServiceAction = {
   __typename: 'NewServiceAction',
  hash: Scalars['String'],
  version: Scalars['Float'],
  changeLog: Scalars['String'],
  serviceName: Scalars['String'],
  description: Scalars['String'],
};

export type NewServiceChangeAction = {
   __typename: 'NewServiceChangeAction',
  changeLog: Scalars['String'],
  serviceName: Scalars['String'],
  description: Scalars['String'],
};

export type NewServiceInputAction = {
  changeLog: Scalars['String'],
  serviceName: Scalars['String'],
  description: Scalars['String'],
};

export type NewTypeAction = {
   __typename: 'NewTypeAction',
  hash: Scalars['String'],
  version: Scalars['Float'],
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  description: Scalars['String'],
};

export type NewTypeChangeAction = {
   __typename: 'NewTypeChangeAction',
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  description: Scalars['String'],
};

export type NewTypeInputAction = {
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  description: Scalars['String'],
};

export type OptionalFieldTypeAction = {
   __typename: 'OptionalFieldTypeAction',
  hash: Scalars['String'],
  version: Scalars['Float'],
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type OptionalFieldTypeChangeAction = {
   __typename: 'OptionalFieldTypeChangeAction',
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type OptionalFieldTypeInputAction = {
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type Query = {
   __typename: 'Query',
  log: Array<GroupAction>,
  types: Array<Type>,
  services: Array<Service>,
  changeSet: ChangeSet,
  changeSets: Array<ChangeSet>,
};


export type QueryChangeSetArgs = {
  changeSetId: Scalars['String']
};

export type ReferenceField = BaseField & {
   __typename: 'ReferenceField',
  name: Scalars['String'],
  changeLog: Scalars['String'],
  description: Scalars['String'],
  optional: Scalars['Boolean'],
  referenceType: Scalars['String'],
  referenceHash?: Maybe<Scalars['String']>,
  referenceVersion?: Maybe<Scalars['Float']>,
};

export type ReferenceFieldTypeAction = {
   __typename: 'ReferenceFieldTypeAction',
  hash: Scalars['String'],
  version: Scalars['Float'],
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  description: Scalars['String'],
  optional: Scalars['Boolean'],
  referenceType: Scalars['String'],
  referenceHash: Scalars['String'],
  referenceVersion: Scalars['Float'],
};

export type ReferenceFieldTypeChangeAction = {
   __typename: 'ReferenceFieldTypeChangeAction',
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  description: Scalars['String'],
  optional: Scalars['Boolean'],
  referenceType: Scalars['String'],
  referenceHash: Scalars['String'],
  referenceVersion: Scalars['Float'],
};

export type ReferenceFieldTypeInputAction = {
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  description: Scalars['String'],
  optional: Scalars['Boolean'],
  referenceType: Scalars['String'],
  referenceHash: Scalars['String'],
  referenceVersion: Scalars['Float'],
};

export type RemoveDefaultFieldTypeAction = {
   __typename: 'RemoveDefaultFieldTypeAction',
  hash: Scalars['String'],
  version: Scalars['Float'],
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type RemoveDefaultFieldTypeChangeAction = {
   __typename: 'RemoveDefaultFieldTypeChangeAction',
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type RemoveDefaultFieldTypeInputAction = {
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type RenameFieldTypeAction = {
   __typename: 'RenameFieldTypeAction',
  hash: Scalars['String'],
  version: Scalars['Float'],
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  _from: Scalars['String'],
  to: Scalars['String'],
};

export type RenameFieldTypeChangeAction = {
   __typename: 'RenameFieldTypeChangeAction',
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  _from: Scalars['String'],
  to: Scalars['String'],
};

export type RenameFieldTypeInputAction = {
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  _from: Scalars['String'],
  to: Scalars['String'],
};

export type RequiredFieldTypeAction = {
   __typename: 'RequiredFieldTypeAction',
  hash: Scalars['String'],
  version: Scalars['Float'],
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type RequiredFieldTypeChangeAction = {
   __typename: 'RequiredFieldTypeChangeAction',
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type RequiredFieldTypeInputAction = {
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
};

export type ScalarField = BaseField & {
   __typename: 'ScalarField',
  name: Scalars['String'],
  changeLog: Scalars['String'],
  description: Scalars['String'],
  optional: Scalars['Boolean'],
  type: FieldTypes,
  _default?: Maybe<Array<FieldDefaults>>,
};

export type Service = {
   __typename: 'Service',
  name: Scalars['String'],
  changeLog: Array<Scalars['String']>,
  description: Scalars['String'],
  versions: Array<ServiceVersionType>,
};

export type ServiceVersionType = {
   __typename: 'ServiceVersionType',
  output: VersionType,
  inputs: Array<VersionType>,
};

export type SetDefaultFieldTypeAction = {
   __typename: 'SetDefaultFieldTypeAction',
  hash: Scalars['String'],
  version: Scalars['Float'],
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  _default: FieldDefaults,
};

export type SetDefaultFieldTypeChangeAction = {
   __typename: 'SetDefaultFieldTypeChangeAction',
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  _default: FieldDefaults,
};

export type SetDefaultFieldTypeInputAction = {
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  _default: FieldDataInput,
};

export type StringField = {
   __typename: 'StringField',
  value: Scalars['String'],
};

export type Type = {
   __typename: 'Type',
  name: Scalars['String'],
  versions: Array<Version>,
  changeSetName?: Maybe<Scalars['String']>,
  changeLog: Array<Scalars['String']>,
  description: Scalars['String'],
};

export type UpdateDescriptionServiceAction = {
   __typename: 'UpdateDescriptionServiceAction',
  hash: Scalars['String'],
  version: Scalars['Float'],
  changeLog: Scalars['String'],
  serviceName: Scalars['String'],
  description: Scalars['String'],
};

export type UpdateDescriptionServiceChangeAction = {
   __typename: 'UpdateDescriptionServiceChangeAction',
  changeLog: Scalars['String'],
  serviceName: Scalars['String'],
  description: Scalars['String'],
};

export type UpdateDescriptionServiceInputAction = {
  changeLog: Scalars['String'],
  serviceName: Scalars['String'],
  description: Scalars['String'],
};

export type UpdateDescriptionTypeAction = {
   __typename: 'UpdateDescriptionTypeAction',
  hash: Scalars['String'],
  version: Scalars['Float'],
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  description: Scalars['String'],
};

export type UpdateDescriptionTypeChangeAction = {
   __typename: 'UpdateDescriptionTypeChangeAction',
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  description: Scalars['String'],
};

export type UpdateDescriptionTypeInputAction = {
  changeLog: Scalars['String'],
  typeName: Scalars['String'],
  name: Scalars['String'],
  description: Scalars['String'],
};

export type Version = {
   __typename: 'Version',
  _type: Scalars['String'],
  version: Scalars['Float'],
  hash: Scalars['String'],
  fields: Array<FieldUnion>,
};

export type VersionType = {
   __typename: 'VersionType',
  _type: Scalars['String'],
  version: Scalars['Float'],
  hash: Scalars['String'],
};

export type LogFieldsFragment = (
  { __typename: 'GroupAction' }
  & Pick<GroupAction, 'hash'>
  & { actions: Array<(
    { __typename: 'NewTypeAction' }
    & ActionsFragment_NewTypeAction_Fragment
  ) | (
    { __typename: 'RenameFieldTypeAction' }
    & ActionsFragment_RenameFieldTypeAction_Fragment
  ) | (
    { __typename: 'RequiredFieldTypeAction' }
    & ActionsFragment_RequiredFieldTypeAction_Fragment
  ) | (
    { __typename: 'OptionalFieldTypeAction' }
    & ActionsFragment_OptionalFieldTypeAction_Fragment
  ) | (
    { __typename: 'DeleteFieldTypeAction' }
    & ActionsFragment_DeleteFieldTypeAction_Fragment
  ) | (
    { __typename: 'SetDefaultFieldTypeAction' }
    & ActionsFragment_SetDefaultFieldTypeAction_Fragment
  ) | (
    { __typename: 'RemoveDefaultFieldTypeAction' }
    & ActionsFragment_RemoveDefaultFieldTypeAction_Fragment
  ) | (
    { __typename: 'AddFieldTypeAction' }
    & ActionsFragment_AddFieldTypeAction_Fragment
  ) | (
    { __typename: 'UpdateDescriptionTypeAction' }
    & ActionsFragment_UpdateDescriptionTypeAction_Fragment
  ) | (
    { __typename: 'ReferenceFieldTypeAction' }
    & ActionsFragment_ReferenceFieldTypeAction_Fragment
  ) | (
    { __typename: 'NewServiceAction' }
    & ActionsFragment_NewServiceAction_Fragment
  ) | (
    { __typename: 'UpdateDescriptionServiceAction' }
    & ActionsFragment_UpdateDescriptionServiceAction_Fragment
  ) | (
    { __typename: 'AddVersionServiceAction' }
    & ActionsFragment_AddVersionServiceAction_Fragment
  )> }
);

export type VersionQueryFragment = (
  { __typename: 'Version' }
  & Pick<Version, 'version' | 'hash' | '_type'>
  & { fields: Array<(
    { __typename: 'ReferenceField' }
    & Pick<ReferenceField, 'name' | 'description' | 'changeLog' | 'optional' | 'referenceType' | 'referenceHash' | 'referenceVersion'>
  ) | (
    { __typename: 'ScalarField' }
    & Pick<ScalarField, 'name' | 'description' | 'changeLog' | 'optional' | 'type'>
    & { _default: Maybe<Array<(
      { __typename: 'StringField' }
      & { stringValue: StringField['value'] }
    ) | (
      { __typename: 'BooleanField' }
      & { booleanValue: BooleanField['value'] }
    ) | (
      { __typename: 'FloatField' }
      & { floatValue: FloatField['value'] }
    ) | (
      { __typename: 'IntegerField' }
      & { intValue: IntegerField['value'] }
    )>> }
  )> }
);

export type TypeFieldsFragment = (
  { __typename: 'Type' }
  & Pick<Type, 'name' | 'changeLog' | 'description'>
  & { versions: Array<(
    { __typename: 'Version' }
    & VersionQueryFragment
  )> }
);

export type ServiceFieldsFragment = (
  { __typename: 'Service' }
  & Pick<Service, 'name' | 'description' | 'changeLog'>
  & { versions: Array<(
    { __typename: 'ServiceVersionType' }
    & { inputs: Array<(
      { __typename: 'VersionType' }
      & Pick<VersionType, 'version' | '_type' | 'hash'>
    )>, output: (
      { __typename: 'VersionType' }
      & Pick<VersionType, 'version' | '_type' | 'hash'>
    ) }
  )> }
);

export type ChangeSetFieldsFragment = (
  { __typename: 'ChangeSet' }
  & Pick<ChangeSet, 'id' | 'baseHash'>
  & { log: Array<(
    { __typename: 'NewTypeChangeAction' }
    & ChangeActionsFragment_NewTypeChangeAction_Fragment
  ) | (
    { __typename: 'RenameFieldTypeChangeAction' }
    & ChangeActionsFragment_RenameFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'RequiredFieldTypeChangeAction' }
    & ChangeActionsFragment_RequiredFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'OptionalFieldTypeChangeAction' }
    & ChangeActionsFragment_OptionalFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'DeleteFieldTypeChangeAction' }
    & ChangeActionsFragment_DeleteFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'SetDefaultFieldTypeChangeAction' }
    & ChangeActionsFragment_SetDefaultFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'RemoveDefaultFieldTypeChangeAction' }
    & ChangeActionsFragment_RemoveDefaultFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'AddFieldTypeChangeAction' }
    & ChangeActionsFragment_AddFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'UpdateDescriptionTypeChangeAction' }
    & ChangeActionsFragment_UpdateDescriptionTypeChangeAction_Fragment
  ) | (
    { __typename: 'ReferenceFieldTypeChangeAction' }
    & ChangeActionsFragment_ReferenceFieldTypeChangeAction_Fragment
  ) | (
    { __typename: 'NewServiceChangeAction' }
    & ChangeActionsFragment_NewServiceChangeAction_Fragment
  ) | (
    { __typename: 'UpdateDescriptionServiceChangeAction' }
    & ChangeActionsFragment_UpdateDescriptionServiceChangeAction_Fragment
  ) | (
    { __typename: 'AddVersionServiceChangeAction' }
    & ChangeActionsFragment_AddVersionServiceChangeAction_Fragment
  )> }
);

export type AllDataQueryVariables = {};


export type AllDataQuery = (
  { __typename: 'Query' }
  & { log: Array<(
    { __typename: 'GroupAction' }
    & LogFieldsFragment
  )>, types: Array<(
    { __typename: 'Type' }
    & TypeFieldsFragment
  )>, services: Array<(
    { __typename: 'Service' }
    & ServiceFieldsFragment
  )>, changeSets: Array<(
    { __typename: 'ChangeSet' }
    & ChangeSetFieldsFragment
  )> }
);

type DataFragment_StringField_Fragment = (
  { __typename: 'StringField' }
  & { stringValue: StringField['value'] }
);

type DataFragment_BooleanField_Fragment = (
  { __typename: 'BooleanField' }
  & { booleanValue: BooleanField['value'] }
);

type DataFragment_FloatField_Fragment = (
  { __typename: 'FloatField' }
  & { floatValue: FloatField['value'] }
);

type DataFragment_IntegerField_Fragment = (
  { __typename: 'IntegerField' }
  & { intValue: IntegerField['value'] }
);

export type DataFragmentFragment = DataFragment_StringField_Fragment | DataFragment_BooleanField_Fragment | DataFragment_FloatField_Fragment | DataFragment_IntegerField_Fragment;

type ActionsFragment_NewTypeAction_Fragment = (
  { __typename: 'NewTypeAction' }
  & Pick<NewTypeAction, 'changeLog' | 'hash' | 'version' | 'typeName' | 'description'>
  & { _id: NewTypeAction['hash'] }
);

type ActionsFragment_RenameFieldTypeAction_Fragment = (
  { __typename: 'RenameFieldTypeAction' }
  & Pick<RenameFieldTypeAction, 'changeLog' | 'hash' | 'version' | 'typeName' | '_from' | 'to'>
  & { _id: RenameFieldTypeAction['hash'] }
);

type ActionsFragment_RequiredFieldTypeAction_Fragment = (
  { __typename: 'RequiredFieldTypeAction' }
  & Pick<RequiredFieldTypeAction, 'changeLog' | 'hash' | 'version' | 'typeName' | 'name'>
  & { _id: RequiredFieldTypeAction['hash'] }
);

type ActionsFragment_OptionalFieldTypeAction_Fragment = (
  { __typename: 'OptionalFieldTypeAction' }
  & Pick<OptionalFieldTypeAction, 'changeLog' | 'hash' | 'version' | 'typeName' | 'name'>
  & { _id: OptionalFieldTypeAction['hash'] }
);

type ActionsFragment_DeleteFieldTypeAction_Fragment = (
  { __typename: 'DeleteFieldTypeAction' }
  & Pick<DeleteFieldTypeAction, 'changeLog' | 'hash' | 'version' | 'typeName' | 'name'>
  & { _id: DeleteFieldTypeAction['hash'] }
);

type ActionsFragment_SetDefaultFieldTypeAction_Fragment = (
  { __typename: 'SetDefaultFieldTypeAction' }
  & Pick<SetDefaultFieldTypeAction, 'changeLog' | 'hash' | 'version' | 'typeName' | 'name'>
  & { _id: SetDefaultFieldTypeAction['hash'] }
  & { newDefault: (
    { __typename: 'StringField' }
    & DataFragment_StringField_Fragment
  ) | (
    { __typename: 'BooleanField' }
    & DataFragment_BooleanField_Fragment
  ) | (
    { __typename: 'FloatField' }
    & DataFragment_FloatField_Fragment
  ) | (
    { __typename: 'IntegerField' }
    & DataFragment_IntegerField_Fragment
  ) }
);

type ActionsFragment_RemoveDefaultFieldTypeAction_Fragment = (
  { __typename: 'RemoveDefaultFieldTypeAction' }
  & Pick<RemoveDefaultFieldTypeAction, 'changeLog' | 'hash' | 'version' | 'typeName' | 'name'>
  & { _id: RemoveDefaultFieldTypeAction['hash'] }
);

type ActionsFragment_AddFieldTypeAction_Fragment = (
  { __typename: 'AddFieldTypeAction' }
  & Pick<AddFieldTypeAction, 'changeLog' | 'hash' | 'version' | 'typeName' | 'name' | '_type' | 'description' | 'optional'>
  & { _id: AddFieldTypeAction['hash'] }
  & { _default: Maybe<(
    { __typename: 'StringField' }
    & DataFragment_StringField_Fragment
  ) | (
    { __typename: 'BooleanField' }
    & DataFragment_BooleanField_Fragment
  ) | (
    { __typename: 'FloatField' }
    & DataFragment_FloatField_Fragment
  ) | (
    { __typename: 'IntegerField' }
    & DataFragment_IntegerField_Fragment
  )> }
);

type ActionsFragment_UpdateDescriptionTypeAction_Fragment = (
  { __typename: 'UpdateDescriptionTypeAction' }
  & Pick<UpdateDescriptionTypeAction, 'changeLog' | 'hash' | 'version' | 'typeName' | 'name' | 'description'>
  & { _id: UpdateDescriptionTypeAction['hash'] }
);

type ActionsFragment_ReferenceFieldTypeAction_Fragment = (
  { __typename: 'ReferenceFieldTypeAction' }
  & Pick<ReferenceFieldTypeAction, 'changeLog' | 'hash' | 'version' | 'typeName' | 'name' | 'description' | 'optional' | 'referenceType' | 'referenceHash' | 'referenceVersion'>
  & { _id: ReferenceFieldTypeAction['hash'] }
);

type ActionsFragment_NewServiceAction_Fragment = (
  { __typename: 'NewServiceAction' }
  & Pick<NewServiceAction, 'changeLog' | 'hash' | 'version' | 'serviceName' | 'description'>
  & { _id: NewServiceAction['hash'] }
);

type ActionsFragment_UpdateDescriptionServiceAction_Fragment = (
  { __typename: 'UpdateDescriptionServiceAction' }
  & Pick<UpdateDescriptionServiceAction, 'changeLog' | 'hash' | 'version' | 'serviceName' | 'description'>
  & { _id: UpdateDescriptionServiceAction['hash'] }
);

type ActionsFragment_AddVersionServiceAction_Fragment = (
  { __typename: 'AddVersionServiceAction' }
  & Pick<AddVersionServiceAction, 'changeLog' | 'hash' | 'version' | 'serviceName' | 'inputType' | 'outputType' | 'inputVersion' | 'inputHash' | 'outputVersion' | 'outputHash'>
  & { _id: AddVersionServiceAction['hash'] }
);

export type ActionsFragmentFragment = ActionsFragment_NewTypeAction_Fragment | ActionsFragment_RenameFieldTypeAction_Fragment | ActionsFragment_RequiredFieldTypeAction_Fragment | ActionsFragment_OptionalFieldTypeAction_Fragment | ActionsFragment_DeleteFieldTypeAction_Fragment | ActionsFragment_SetDefaultFieldTypeAction_Fragment | ActionsFragment_RemoveDefaultFieldTypeAction_Fragment | ActionsFragment_AddFieldTypeAction_Fragment | ActionsFragment_UpdateDescriptionTypeAction_Fragment | ActionsFragment_ReferenceFieldTypeAction_Fragment | ActionsFragment_NewServiceAction_Fragment | ActionsFragment_UpdateDescriptionServiceAction_Fragment | ActionsFragment_AddVersionServiceAction_Fragment;

type ChangeActionsFragment_NewTypeChangeAction_Fragment = (
  { __typename: 'NewTypeChangeAction' }
  & Pick<NewTypeChangeAction, 'changeLog' | 'typeName' | 'description'>
);

type ChangeActionsFragment_RenameFieldTypeChangeAction_Fragment = (
  { __typename: 'RenameFieldTypeChangeAction' }
  & Pick<RenameFieldTypeChangeAction, 'changeLog' | 'typeName' | '_from' | 'to'>
);

type ChangeActionsFragment_RequiredFieldTypeChangeAction_Fragment = (
  { __typename: 'RequiredFieldTypeChangeAction' }
  & Pick<RequiredFieldTypeChangeAction, 'changeLog' | 'typeName' | 'name'>
);

type ChangeActionsFragment_OptionalFieldTypeChangeAction_Fragment = (
  { __typename: 'OptionalFieldTypeChangeAction' }
  & Pick<OptionalFieldTypeChangeAction, 'changeLog' | 'typeName' | 'name'>
);

type ChangeActionsFragment_DeleteFieldTypeChangeAction_Fragment = (
  { __typename: 'DeleteFieldTypeChangeAction' }
  & Pick<DeleteFieldTypeChangeAction, 'changeLog' | 'typeName' | 'name'>
);

type ChangeActionsFragment_SetDefaultFieldTypeChangeAction_Fragment = (
  { __typename: 'SetDefaultFieldTypeChangeAction' }
  & Pick<SetDefaultFieldTypeChangeAction, 'changeLog' | 'typeName' | 'name'>
  & { newDefault: (
    { __typename: 'StringField' }
    & DataFragment_StringField_Fragment
  ) | (
    { __typename: 'BooleanField' }
    & DataFragment_BooleanField_Fragment
  ) | (
    { __typename: 'FloatField' }
    & DataFragment_FloatField_Fragment
  ) | (
    { __typename: 'IntegerField' }
    & DataFragment_IntegerField_Fragment
  ) }
);

type ChangeActionsFragment_RemoveDefaultFieldTypeChangeAction_Fragment = (
  { __typename: 'RemoveDefaultFieldTypeChangeAction' }
  & Pick<RemoveDefaultFieldTypeChangeAction, 'changeLog' | 'typeName' | 'name'>
);

type ChangeActionsFragment_AddFieldTypeChangeAction_Fragment = (
  { __typename: 'AddFieldTypeChangeAction' }
  & Pick<AddFieldTypeChangeAction, 'changeLog' | 'typeName' | 'name' | '_type' | 'description' | 'optional'>
  & { _default: Maybe<(
    { __typename: 'StringField' }
    & DataFragment_StringField_Fragment
  ) | (
    { __typename: 'BooleanField' }
    & DataFragment_BooleanField_Fragment
  ) | (
    { __typename: 'FloatField' }
    & DataFragment_FloatField_Fragment
  ) | (
    { __typename: 'IntegerField' }
    & DataFragment_IntegerField_Fragment
  )> }
);

type ChangeActionsFragment_UpdateDescriptionTypeChangeAction_Fragment = (
  { __typename: 'UpdateDescriptionTypeChangeAction' }
  & Pick<UpdateDescriptionTypeChangeAction, 'changeLog' | 'typeName' | 'name' | 'description'>
);

type ChangeActionsFragment_ReferenceFieldTypeChangeAction_Fragment = (
  { __typename: 'ReferenceFieldTypeChangeAction' }
  & Pick<ReferenceFieldTypeChangeAction, 'changeLog' | 'typeName' | 'name' | 'description' | 'optional' | 'referenceType' | 'referenceHash' | 'referenceVersion'>
);

type ChangeActionsFragment_NewServiceChangeAction_Fragment = (
  { __typename: 'NewServiceChangeAction' }
  & Pick<NewServiceChangeAction, 'changeLog' | 'serviceName' | 'description'>
);

type ChangeActionsFragment_UpdateDescriptionServiceChangeAction_Fragment = (
  { __typename: 'UpdateDescriptionServiceChangeAction' }
  & Pick<UpdateDescriptionServiceChangeAction, 'changeLog' | 'serviceName' | 'description'>
);

type ChangeActionsFragment_AddVersionServiceChangeAction_Fragment = (
  { __typename: 'AddVersionServiceChangeAction' }
  & Pick<AddVersionServiceChangeAction, 'changeLog' | 'serviceName' | 'inputType' | 'outputType' | 'inputVersion' | 'inputHash' | 'outputVersion' | 'outputHash'>
);

export type ChangeActionsFragmentFragment = ChangeActionsFragment_NewTypeChangeAction_Fragment | ChangeActionsFragment_RenameFieldTypeChangeAction_Fragment | ChangeActionsFragment_RequiredFieldTypeChangeAction_Fragment | ChangeActionsFragment_OptionalFieldTypeChangeAction_Fragment | ChangeActionsFragment_DeleteFieldTypeChangeAction_Fragment | ChangeActionsFragment_SetDefaultFieldTypeChangeAction_Fragment | ChangeActionsFragment_RemoveDefaultFieldTypeChangeAction_Fragment | ChangeActionsFragment_AddFieldTypeChangeAction_Fragment | ChangeActionsFragment_UpdateDescriptionTypeChangeAction_Fragment | ChangeActionsFragment_ReferenceFieldTypeChangeAction_Fragment | ChangeActionsFragment_NewServiceChangeAction_Fragment | ChangeActionsFragment_UpdateDescriptionServiceChangeAction_Fragment | ChangeActionsFragment_AddVersionServiceChangeAction_Fragment;

export type UpdateChangeSetMutationVariables = {
  changeSet: ChangeSetInput
};


export type UpdateChangeSetMutation = (
  { __typename: 'Mutation' }
  & { updateChangeSet: (
    { __typename: 'ChangeSet' }
    & ChangeSetFieldsFragment
  ) }
);

export type AppendChangeSetMutationVariables = {
  changeSet: ChangeSetAppend
};


export type AppendChangeSetMutation = (
  { __typename: 'Mutation' }
  & { appendChangeSet: (
    { __typename: 'ChangeSet' }
    & ChangeSetFieldsFragment
  ) }
);

export type CommitChangeSetMutationVariables = {
  changeSetId: Scalars['String']
};


export type CommitChangeSetMutation = (
  { __typename: 'Mutation' }
  & { commitChangeSet: (
    { __typename: 'CommitOutput' }
    & { log: Array<(
      { __typename: 'GroupAction' }
      & LogFieldsFragment
    )>, types: Array<(
      { __typename: 'Type' }
      & TypeFieldsFragment
    )>, services: Array<(
      { __typename: 'Service' }
      & ServiceFieldsFragment
    )>, changeSets: Array<(
      { __typename: 'ChangeSet' }
      & ChangeSetFieldsFragment
    )> }
  ) }
);

export const DataFragmentFragmentDoc = gql`
    fragment DataFragment on FieldDefaults {
  ... on StringField {
    __typename
    stringValue: value
  }
  ... on IntegerField {
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
  ... on NewServiceAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    serviceName
    description
  }
  ... on UpdateDescriptionServiceAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    serviceName
    description
  }
  ... on AddVersionServiceAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    serviceName
    inputType
    outputType
    inputVersion
    inputHash
    outputVersion
    outputHash
  }
  ... on RenameFieldTypeAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    typeName
    _from
    to
  }
  ... on RequiredFieldTypeAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    typeName
    name
  }
  ... on OptionalFieldTypeAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    typeName
    name
  }
  ... on DeleteFieldTypeAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    typeName
    name
  }
  ... on SetDefaultFieldTypeAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    typeName
    name
    newDefault: _default {
      ...DataFragment
    }
  }
  ... on RemoveDefaultFieldTypeAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    typeName
    name
  }
  ... on AddFieldTypeAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    typeName
    name
    _type
    description
    optional
    _default {
      ...DataFragment
    }
  }
  ... on UpdateDescriptionTypeAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    typeName
    name
    description
  }
  ... on ReferenceFieldTypeAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    typeName
    name
    description
    optional
    referenceType
    referenceHash
    referenceVersion
  }
  ... on NewTypeAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    typeName
    description
  }
}
    ${DataFragmentFragmentDoc}`;
export const LogFieldsFragmentDoc = gql`
    fragment LogFields on GroupAction {
  hash
  actions {
    ...ActionsFragment
  }
}
    ${ActionsFragmentFragmentDoc}`;
export const VersionQueryFragmentDoc = gql`
    fragment VersionQuery on Version {
  version
  hash
  _type
  fields {
    ... on ReferenceField {
      name
      description
      changeLog
      optional
      referenceType
      referenceHash
      referenceVersion
    }
    ... on ScalarField {
      name
      description
      changeLog
      optional
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
        ... on IntegerField {
          intValue: value
        }
      }
      type
    }
  }
}
    `;
export const TypeFieldsFragmentDoc = gql`
    fragment TypeFields on Type {
  name
  changeLog
  description
  versions {
    ...VersionQuery
  }
}
    ${VersionQueryFragmentDoc}`;
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
  ... on NewServiceChangeAction {
    __typename
    changeLog
    serviceName
    description
  }
  ... on UpdateDescriptionServiceChangeAction {
    __typename
    changeLog
    serviceName
    description
  }
  ... on AddVersionServiceChangeAction {
    __typename
    changeLog
    serviceName
    inputType
    outputType
    inputVersion
    inputHash
    outputVersion
    outputHash
  }
  ... on RenameFieldTypeChangeAction {
    __typename
    changeLog
    typeName
    _from
    to
  }
  ... on RequiredFieldTypeChangeAction {
    __typename
    changeLog
    typeName
    name
  }
  ... on OptionalFieldTypeChangeAction {
    __typename
    changeLog
    typeName
    name
  }
  ... on DeleteFieldTypeChangeAction {
    __typename
    changeLog
    typeName
    name
  }
  ... on SetDefaultFieldTypeChangeAction {
    __typename
    changeLog
    typeName
    name
    newDefault: _default {
      ...DataFragment
    }
  }
  ... on RemoveDefaultFieldTypeChangeAction {
    __typename
    changeLog
    typeName
    name
  }
  ... on AddFieldTypeChangeAction {
    __typename
    changeLog
    typeName
    name
    _type
    description
    optional
    _default {
      ...DataFragment
    }
  }
  ... on UpdateDescriptionTypeChangeAction {
    __typename
    changeLog
    typeName
    name
    description
  }
  ... on ReferenceFieldTypeChangeAction {
    __typename
    changeLog
    typeName
    name
    description
    optional
    referenceType
    referenceHash
    referenceVersion
  }
  ... on NewTypeChangeAction {
    __typename
    changeLog
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
export function useAllDataQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AllDataQuery, AllDataQueryVariables>) {
        return ApolloReactHooks.useQuery<AllDataQuery, AllDataQueryVariables>(AllDataDocument, baseOptions);
      }
export function useAllDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllDataQuery, AllDataQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AllDataQuery, AllDataQueryVariables>(AllDataDocument, baseOptions);
        }
export type AllDataQueryHookResult = ReturnType<typeof useAllDataQuery>;
export type AllDataLazyQueryHookResult = ReturnType<typeof useAllDataLazyQuery>;
export type AllDataQueryResult = ApolloReactCommon.QueryResult<AllDataQuery, AllDataQueryVariables>;
export const UpdateChangeSetDocument = gql`
    mutation UpdateChangeSet($changeSet: ChangeSetInput!) {
  updateChangeSet(changeSet: $changeSet) {
    ...ChangeSetFields
  }
}
    ${ChangeSetFieldsFragmentDoc}`;
export type UpdateChangeSetMutationFn = ApolloReactCommon.MutationFunction<UpdateChangeSetMutation, UpdateChangeSetMutationVariables>;

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
export function useUpdateChangeSetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateChangeSetMutation, UpdateChangeSetMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateChangeSetMutation, UpdateChangeSetMutationVariables>(UpdateChangeSetDocument, baseOptions);
      }
export type UpdateChangeSetMutationHookResult = ReturnType<typeof useUpdateChangeSetMutation>;
export type UpdateChangeSetMutationResult = ApolloReactCommon.MutationResult<UpdateChangeSetMutation>;
export type UpdateChangeSetMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateChangeSetMutation, UpdateChangeSetMutationVariables>;
export const AppendChangeSetDocument = gql`
    mutation AppendChangeSet($changeSet: ChangeSetAppend!) {
  appendChangeSet(changeSet: $changeSet) {
    ...ChangeSetFields
  }
}
    ${ChangeSetFieldsFragmentDoc}`;
export type AppendChangeSetMutationFn = ApolloReactCommon.MutationFunction<AppendChangeSetMutation, AppendChangeSetMutationVariables>;

/**
 * __useAppendChangeSetMutation__
 *
 * To run a mutation, you first call `useAppendChangeSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAppendChangeSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appendChangeSetMutation, { data, loading, error }] = useAppendChangeSetMutation({
 *   variables: {
 *      changeSet: // value for 'changeSet'
 *   },
 * });
 */
export function useAppendChangeSetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AppendChangeSetMutation, AppendChangeSetMutationVariables>) {
        return ApolloReactHooks.useMutation<AppendChangeSetMutation, AppendChangeSetMutationVariables>(AppendChangeSetDocument, baseOptions);
      }
export type AppendChangeSetMutationHookResult = ReturnType<typeof useAppendChangeSetMutation>;
export type AppendChangeSetMutationResult = ApolloReactCommon.MutationResult<AppendChangeSetMutation>;
export type AppendChangeSetMutationOptions = ApolloReactCommon.BaseMutationOptions<AppendChangeSetMutation, AppendChangeSetMutationVariables>;
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
export type CommitChangeSetMutationFn = ApolloReactCommon.MutationFunction<CommitChangeSetMutation, CommitChangeSetMutationVariables>;

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
export function useCommitChangeSetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CommitChangeSetMutation, CommitChangeSetMutationVariables>) {
        return ApolloReactHooks.useMutation<CommitChangeSetMutation, CommitChangeSetMutationVariables>(CommitChangeSetDocument, baseOptions);
      }
export type CommitChangeSetMutationHookResult = ReturnType<typeof useCommitChangeSetMutation>;
export type CommitChangeSetMutationResult = ApolloReactCommon.MutationResult<CommitChangeSetMutation>;
export type CommitChangeSetMutationOptions = ApolloReactCommon.BaseMutationOptions<CommitChangeSetMutation, CommitChangeSetMutationVariables>;