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
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
};

export type GQLAddFieldTypeAction = GQLAction & {
   __typename?: 'AddFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  optional?: Maybe<Scalars['Boolean']>,
  _default?: Maybe<GQLFieldData>,
};

export type GQLAddFieldTypeActionInput = {
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  optional?: Maybe<Scalars['Boolean']>,
  _default?: Maybe<GQLFieldDataInput>,
};

export type GQLAddVersionServiceAction = GQLAction & {
   __typename?: 'AddVersionServiceAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  serviceName?: Maybe<Scalars['String']>,
  inputType?: Maybe<Scalars['String']>,
  outputType?: Maybe<Scalars['String']>,
  inputVersion?: Maybe<Scalars['Int']>,
  inputHash?: Maybe<Scalars['String']>,
  outputVersion?: Maybe<Scalars['Int']>,
  outputHash?: Maybe<Scalars['String']>,
};

export type GQLAddVersionServiceActionInput = {
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  serviceName?: Maybe<Scalars['String']>,
  inputType?: Maybe<Scalars['String']>,
  outputType?: Maybe<Scalars['String']>,
  inputVersion?: Maybe<Scalars['Int']>,
  inputHash?: Maybe<Scalars['String']>,
  outputVersion?: Maybe<Scalars['Int']>,
  outputHash?: Maybe<Scalars['String']>,
};

export type GQLBaseField = {
  name?: Maybe<Scalars['String']>,
  changeLog?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  optional?: Maybe<Scalars['Boolean']>,
};

export type GQLBooleanField = {
   __typename?: 'BooleanField',
  value?: Maybe<Scalars['Boolean']>,
};

export type GQLChangeSet = {
   __typename?: 'ChangeSet',
  id: Scalars['String'],
  baseHash: Scalars['String'],
  log?: Maybe<Array<Maybe<GQLLogAction>>>,
};

export type GQLChangeSetInput = {
  id: Scalars['String'],
  baseHash: Scalars['String'],
  log: Array<GQLLogActionInput>,
};

export type GQLDeleteFieldTypeAction = GQLAction & {
   __typename?: 'DeleteFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type GQLDeleteFieldTypeActionInput = {
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type GQLField = GQLBaseField & {
   __typename?: 'Field',
  name?: Maybe<Scalars['String']>,
  changeLog?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  optional?: Maybe<Scalars['Boolean']>,
  _default?: Maybe<GQLFieldData>,
  _type?: Maybe<GQLFieldTypes>,
};

export type GQLFieldData = GQLStringField | GQLIntField | GQLFloatField | GQLBooleanField;

export type GQLFieldDataInput = {
  booleanValue?: Maybe<Scalars['Boolean']>,
  integerValue?: Maybe<Scalars['Int']>,
  floatValue?: Maybe<Scalars['Float']>,
  stringValue?: Maybe<Scalars['String']>,
};

export type GQLFieldObject = {
   __typename?: 'FieldObject',
  key?: Maybe<Scalars['String']>,
  field?: Maybe<GQLBaseField>,
};

export enum GQLFieldTypes {
  StringType = 'stringType',
  BooleanType = 'booleanType',
  NumberType = 'numberType'
}

export type GQLFloatField = {
   __typename?: 'FloatField',
  value?: Maybe<Scalars['Float']>,
};

export type GQLGroupAction = GQLAction & {
   __typename?: 'GroupAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  groupedActions?: Maybe<Array<Maybe<GQLAction>>>,
  versions?: Maybe<Array<Maybe<GQLGroupVersion>>>,
};

export type GQLGroupVersion = {
   __typename?: 'GroupVersion',
  typeName?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
};

export type GQLIntField = {
   __typename?: 'IntField',
  value?: Maybe<Scalars['Int']>,
};

export type GQLLogAction = GQLNewServiceAction | GQLUpdateDescriptionServiceAction | GQLAddVersionServiceAction | GQLRenameFieldTypeAction | GQLRequiredFieldTypeAction | GQLOptionalFieldTypeAction | GQLDeleteFieldTypeAction | GQLSetDefaultFieldTypeAction | GQLRemoveDefaultFieldTypeAction | GQLAddFieldTypeAction | GQLUpdateDescriptionTypeAction | GQLReferenceFieldTypeAction | GQLNewTypeAction | GQLGroupAction;

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
   __typename?: 'Mutation',
  updateChangeSet?: Maybe<GQLChangeSet>,
  commitChangeSet?: Maybe<GQLNewLog>,
  deleteChangeSet?: Maybe<Array<Maybe<GQLChangeSet>>>,
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
   __typename?: 'NewLog',
  log?: Maybe<Array<Maybe<GQLLogAction>>>,
  services?: Maybe<Array<Maybe<GQLService>>>,
  types?: Maybe<Array<Maybe<GQLType>>>,
  changeSets?: Maybe<Array<Maybe<GQLChangeSet>>>,
};

export type GQLNewServiceAction = GQLAction & {
   __typename?: 'NewServiceAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  serviceName?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type GQLNewServiceActionInput = {
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  serviceName?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type GQLNewTypeAction = GQLAction & {
   __typename?: 'NewTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  typeName?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type GQLNewTypeActionInput = {
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  typeName?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type GQLOptionalFieldTypeAction = GQLAction & {
   __typename?: 'OptionalFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type GQLOptionalFieldTypeActionInput = {
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type GQLQuery = {
   __typename?: 'Query',
  log?: Maybe<Array<Maybe<GQLLogAction>>>,
  services?: Maybe<Array<Maybe<GQLService>>>,
  types?: Maybe<Array<Maybe<GQLType>>>,
  changeSets?: Maybe<Array<Maybe<GQLChangeSet>>>,
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
   __typename?: 'ReferenceField',
  name?: Maybe<Scalars['String']>,
  changeLog?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  optional?: Maybe<Scalars['Boolean']>,
  referenceType?: Maybe<Scalars['String']>,
  referenceHash?: Maybe<Scalars['String']>,
  referenceVersion?: Maybe<Scalars['Int']>,
};

export type GQLReferenceFieldTypeAction = GQLAction & {
   __typename?: 'ReferenceFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  optional?: Maybe<Scalars['Boolean']>,
  referenceType?: Maybe<Scalars['String']>,
  referenceHash?: Maybe<Scalars['String']>,
  referenceVersion?: Maybe<Scalars['Int']>,
};

export type GQLReferenceFieldTypeActionInput = {
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  optional?: Maybe<Scalars['Boolean']>,
  referenceType?: Maybe<Scalars['String']>,
  referenceHash?: Maybe<Scalars['String']>,
  referenceVersion?: Maybe<Scalars['Int']>,
};

export type GQLRemoveDefaultFieldTypeAction = GQLAction & {
   __typename?: 'RemoveDefaultFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type GQLRemoveDefaultFieldTypeActionInput = {
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type GQLRenameFieldTypeAction = GQLAction & {
   __typename?: 'RenameFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  typeName?: Maybe<Scalars['String']>,
  _from?: Maybe<Scalars['String']>,
  to?: Maybe<Scalars['String']>,
};

export type GQLRenameFieldTypeActionInput = {
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  typeName?: Maybe<Scalars['String']>,
  _from?: Maybe<Scalars['String']>,
  to?: Maybe<Scalars['String']>,
};

export type GQLRequiredFieldTypeAction = GQLAction & {
   __typename?: 'RequiredFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type GQLRequiredFieldTypeActionInput = {
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type GQLService = {
   __typename?: 'Service',
  name?: Maybe<Scalars['String']>,
  changeLog?: Maybe<Array<Maybe<Scalars['String']>>>,
  description?: Maybe<Scalars['String']>,
  versions?: Maybe<Array<Maybe<GQLServiceVersion>>>,
};

export type GQLServiceVersion = {
   __typename?: 'ServiceVersion',
  inputs?: Maybe<Array<Maybe<GQLVersionType>>>,
  output?: Maybe<GQLVersionType>,
};

export type GQLSetDefaultFieldTypeAction = GQLAction & {
   __typename?: 'SetDefaultFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  _default?: Maybe<GQLFieldData>,
};

export type GQLSetDefaultFieldTypeActionInput = {
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  _default?: Maybe<GQLFieldDataInput>,
};

export type GQLStringField = {
   __typename?: 'StringField',
  value?: Maybe<Scalars['String']>,
};

export type GQLType = {
   __typename?: 'Type',
  name?: Maybe<Scalars['String']>,
  versions?: Maybe<Array<Maybe<GQLVersion>>>,
  latest?: Maybe<GQLVersion>,
  changeLog?: Maybe<Array<Maybe<Scalars['String']>>>,
  description?: Maybe<Scalars['String']>,
};

export type GQLUpdateDescriptionServiceAction = GQLAction & {
   __typename?: 'UpdateDescriptionServiceAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  serviceName?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type GQLUpdateDescriptionServiceActionInput = {
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  serviceName?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type GQLUpdateDescriptionTypeAction = GQLAction & {
   __typename?: 'UpdateDescriptionTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type GQLUpdateDescriptionTypeActionInput = {
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  unhashed?: Maybe<Scalars['Boolean']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type GQLVersion = {
   __typename?: 'Version',
  _type?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  hash?: Maybe<Scalars['String']>,
  fields?: Maybe<Array<Maybe<GQLFieldObject>>>,
};

export type GQLVersionType = {
   __typename?: 'VersionType',
  _type?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  hash?: Maybe<Scalars['String']>,
};
export type GQLLogFieldsFragment = ({ __typename?: 'NewServiceAction' } | { __typename?: 'UpdateDescriptionServiceAction' } | { __typename?: 'AddVersionServiceAction' } | { __typename?: 'RenameFieldTypeAction' } | { __typename?: 'RequiredFieldTypeAction' } | { __typename?: 'OptionalFieldTypeAction' } | { __typename?: 'DeleteFieldTypeAction' } | { __typename?: 'SetDefaultFieldTypeAction' } | { __typename?: 'RemoveDefaultFieldTypeAction' } | { __typename?: 'AddFieldTypeAction' } | { __typename?: 'UpdateDescriptionTypeAction' } | { __typename?: 'ReferenceFieldTypeAction' } | { __typename?: 'NewTypeAction' } | (
  { __typename: 'GroupAction' }
  & Pick<GQLGroupAction, 'changeLog'>
  & { groupedActions: Maybe<Array<Maybe<({ __typename?: 'NewServiceAction' } | { __typename?: 'UpdateDescriptionServiceAction' } | { __typename?: 'AddVersionServiceAction' } | { __typename?: 'RenameFieldTypeAction' } | { __typename?: 'RequiredFieldTypeAction' } | { __typename?: 'OptionalFieldTypeAction' } | { __typename?: 'DeleteFieldTypeAction' } | { __typename?: 'SetDefaultFieldTypeAction' } | { __typename?: 'RemoveDefaultFieldTypeAction' } | { __typename?: 'AddFieldTypeAction' } | { __typename?: 'UpdateDescriptionTypeAction' } | { __typename?: 'ReferenceFieldTypeAction' } | { __typename?: 'NewTypeAction' } | { __typename?: 'GroupAction' })
    & GQLActionsFragmentFragment
  >>>, versions: Maybe<Array<Maybe<(
    { __typename?: 'GroupVersion' }
    & Pick<GQLGroupVersion, 'typeName' | 'version'>
  )>>> }
))
  & GQLActionsFragmentFragment
;

export type GQLTypeFieldsFragment = (
  { __typename?: 'Type' }
  & Pick<GQLType, 'name' | 'description'>
  & { versions: Maybe<Array<Maybe<(
    { __typename?: 'Version' }
    & Pick<GQLVersion, 'version' | '_type'>
    & { fields: Maybe<Array<Maybe<(
      { __typename?: 'FieldObject' }
      & Pick<GQLFieldObject, 'key'>
      & { field: Maybe<(
        { __typename?: 'Field' }
        & Pick<GQLField, 'name' | 'optional' | '_type' | 'description' | 'changeLog'>
      ) | (
        { __typename?: 'ReferenceField' }
        & Pick<GQLReferenceField, 'name' | 'description' | 'changeLog'>
      )> }
    )>>> }
  )>>> }
);

export type GQLServiceFieldsFragment = (
  { __typename?: 'Service' }
  & Pick<GQLService, 'name' | 'description' | 'changeLog'>
  & { versions: Maybe<Array<Maybe<(
    { __typename?: 'ServiceVersion' }
    & { inputs: Maybe<Array<Maybe<(
      { __typename?: 'VersionType' }
      & Pick<GQLVersionType, 'version' | '_type'>
    )>>>, output: Maybe<(
      { __typename?: 'VersionType' }
      & Pick<GQLVersionType, 'version' | '_type'>
    )> }
  )>>> }
);

export type GQLChangeSetFieldsFragment = (
  { __typename?: 'ChangeSet' }
  & Pick<GQLChangeSet, 'id' | 'baseHash'>
  & { log: Maybe<Array<Maybe<({ __typename?: 'NewServiceAction' } | { __typename?: 'UpdateDescriptionServiceAction' } | { __typename?: 'AddVersionServiceAction' } | { __typename?: 'RenameFieldTypeAction' } | { __typename?: 'RequiredFieldTypeAction' } | { __typename?: 'OptionalFieldTypeAction' } | { __typename?: 'DeleteFieldTypeAction' } | { __typename?: 'SetDefaultFieldTypeAction' } | { __typename?: 'RemoveDefaultFieldTypeAction' } | { __typename?: 'AddFieldTypeAction' } | { __typename?: 'UpdateDescriptionTypeAction' } | { __typename?: 'ReferenceFieldTypeAction' } | { __typename?: 'NewTypeAction' } | { __typename?: 'GroupAction' })
    & GQLActionsFragmentFragment
  >>> }
);

export type GQLAllDataQueryVariables = {};


export type GQLAllDataQuery = (
  { __typename?: 'Query' }
  & { log: Maybe<Array<Maybe<({ __typename?: 'NewServiceAction' } | { __typename?: 'UpdateDescriptionServiceAction' } | { __typename?: 'AddVersionServiceAction' } | { __typename?: 'RenameFieldTypeAction' } | { __typename?: 'RequiredFieldTypeAction' } | { __typename?: 'OptionalFieldTypeAction' } | { __typename?: 'DeleteFieldTypeAction' } | { __typename?: 'SetDefaultFieldTypeAction' } | { __typename?: 'RemoveDefaultFieldTypeAction' } | { __typename?: 'AddFieldTypeAction' } | { __typename?: 'UpdateDescriptionTypeAction' } | { __typename?: 'ReferenceFieldTypeAction' } | { __typename?: 'NewTypeAction' } | { __typename?: 'GroupAction' })
    & GQLLogFieldsFragment
  >>>, types: Maybe<Array<Maybe<{ __typename?: 'Type' }
    & GQLTypeFieldsFragment
  >>>, services: Maybe<Array<Maybe<{ __typename?: 'Service' }
    & GQLServiceFieldsFragment
  >>>, changeSets: Maybe<Array<Maybe<{ __typename?: 'ChangeSet' }
    & GQLChangeSetFieldsFragment
  >>> }
);

export type GQLDataFragmentFragment = (
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
);

export type GQLActionsFragmentFragment = (
  { __typename: 'NewServiceAction' }
  & Pick<GQLNewServiceAction, 'serviceName' | 'description' | 'changeLog' | 'hash' | 'unhashed' | 'version'>
  & { _id: GQLNewServiceAction['hash'] }
) | (
  { __typename: 'UpdateDescriptionServiceAction' }
  & Pick<GQLUpdateDescriptionServiceAction, 'serviceName' | 'description' | 'changeLog' | 'hash' | 'unhashed' | 'version'>
  & { _id: GQLUpdateDescriptionServiceAction['hash'] }
) | (
  { __typename: 'AddVersionServiceAction' }
  & Pick<GQLAddVersionServiceAction, 'serviceName' | 'inputType' | 'outputType' | 'inputVersion' | 'inputHash' | 'outputVersion' | 'outputHash' | 'changeLog' | 'hash' | 'unhashed' | 'version'>
  & { _id: GQLAddVersionServiceAction['hash'] }
) | (
  { __typename: 'RenameFieldTypeAction' }
  & Pick<GQLRenameFieldTypeAction, 'typeName' | '_from' | 'to' | 'changeLog' | 'hash' | 'unhashed' | 'version'>
  & { _id: GQLRenameFieldTypeAction['hash'] }
) | (
  { __typename: 'RequiredFieldTypeAction' }
  & Pick<GQLRequiredFieldTypeAction, 'typeName' | 'name' | 'changeLog' | 'hash' | 'unhashed' | 'version'>
  & { _id: GQLRequiredFieldTypeAction['hash'] }
) | (
  { __typename: 'OptionalFieldTypeAction' }
  & Pick<GQLOptionalFieldTypeAction, 'typeName' | 'name' | 'changeLog' | 'hash' | 'unhashed' | 'version'>
  & { _id: GQLOptionalFieldTypeAction['hash'] }
) | (
  { __typename: 'DeleteFieldTypeAction' }
  & Pick<GQLDeleteFieldTypeAction, 'typeName' | 'name' | 'changeLog' | 'hash' | 'unhashed' | 'version'>
  & { _id: GQLDeleteFieldTypeAction['hash'] }
) | (
  { __typename: 'SetDefaultFieldTypeAction' }
  & Pick<GQLSetDefaultFieldTypeAction, 'typeName' | 'name' | 'changeLog' | 'hash' | 'unhashed' | 'version'>
  & { _id: GQLSetDefaultFieldTypeAction['hash'] }
  & { _default: Maybe<({ __typename?: 'StringField' } | { __typename?: 'IntField' } | { __typename?: 'FloatField' } | { __typename?: 'BooleanField' })
    & GQLDataFragmentFragment
  > }
) | (
  { __typename: 'RemoveDefaultFieldTypeAction' }
  & Pick<GQLRemoveDefaultFieldTypeAction, 'typeName' | 'name' | 'changeLog' | 'hash' | 'unhashed' | 'version'>
  & { _id: GQLRemoveDefaultFieldTypeAction['hash'] }
) | (
  { __typename: 'AddFieldTypeAction' }
  & Pick<GQLAddFieldTypeAction, 'typeName' | 'name' | 'type' | 'description' | 'optional' | 'changeLog' | 'hash' | 'unhashed' | 'version'>
  & { _id: GQLAddFieldTypeAction['hash'] }
  & { _default: Maybe<({ __typename?: 'StringField' } | { __typename?: 'IntField' } | { __typename?: 'FloatField' } | { __typename?: 'BooleanField' })
    & GQLDataFragmentFragment
  > }
) | (
  { __typename: 'UpdateDescriptionTypeAction' }
  & Pick<GQLUpdateDescriptionTypeAction, 'typeName' | 'name' | 'description' | 'changeLog' | 'hash' | 'unhashed' | 'version'>
  & { _id: GQLUpdateDescriptionTypeAction['hash'] }
) | (
  { __typename: 'ReferenceFieldTypeAction' }
  & Pick<GQLReferenceFieldTypeAction, 'typeName' | 'name' | 'description' | 'optional' | 'referenceType' | 'referenceHash' | 'referenceVersion' | 'changeLog' | 'hash' | 'unhashed' | 'version'>
  & { _id: GQLReferenceFieldTypeAction['hash'] }
) | (
  { __typename: 'NewTypeAction' }
  & Pick<GQLNewTypeAction, 'typeName' | 'description' | 'changeLog' | 'hash' | 'unhashed' | 'version'>
  & { _id: GQLNewTypeAction['hash'] }
) | (
  { __typename: 'GroupAction' }
  & Pick<GQLGroupAction, 'changeLog' | 'hash' | 'unhashed' | 'version'>
  & { _id: GQLGroupAction['hash'] }
);

export type GQLChangeSetFragmentFragment = (
  { __typename?: 'ChangeSet' }
  & Pick<GQLChangeSet, 'id' | 'baseHash'>
  & { log: Maybe<Array<Maybe<({ __typename?: 'NewServiceAction' } | { __typename?: 'UpdateDescriptionServiceAction' } | { __typename?: 'AddVersionServiceAction' } | { __typename?: 'RenameFieldTypeAction' } | { __typename?: 'RequiredFieldTypeAction' } | { __typename?: 'OptionalFieldTypeAction' } | { __typename?: 'DeleteFieldTypeAction' } | { __typename?: 'SetDefaultFieldTypeAction' } | { __typename?: 'RemoveDefaultFieldTypeAction' } | { __typename?: 'AddFieldTypeAction' } | { __typename?: 'UpdateDescriptionTypeAction' } | { __typename?: 'ReferenceFieldTypeAction' } | { __typename?: 'NewTypeAction' } | { __typename?: 'GroupAction' })
    & GQLActionsFragmentFragment
  >>> }
);

export type GQLUpdateChangeSetMutationVariables = {
  changeSet: GQLChangeSetInput
};


export type GQLUpdateChangeSetMutation = (
  { __typename?: 'Mutation' }
  & { updateChangeSet: Maybe<{ __typename?: 'ChangeSet' }
    & GQLChangeSetFragmentFragment
  > }
);

export type GQLCommitChangeSetMutationVariables = {
  changeSetId: Scalars['String']
};


export type GQLCommitChangeSetMutation = (
  { __typename?: 'Mutation' }
  & { commitChangeSet: Maybe<(
    { __typename?: 'NewLog' }
    & { log: Maybe<Array<Maybe<({ __typename?: 'NewServiceAction' } | { __typename?: 'UpdateDescriptionServiceAction' } | { __typename?: 'AddVersionServiceAction' } | { __typename?: 'RenameFieldTypeAction' } | { __typename?: 'RequiredFieldTypeAction' } | { __typename?: 'OptionalFieldTypeAction' } | { __typename?: 'DeleteFieldTypeAction' } | { __typename?: 'SetDefaultFieldTypeAction' } | { __typename?: 'RemoveDefaultFieldTypeAction' } | { __typename?: 'AddFieldTypeAction' } | { __typename?: 'UpdateDescriptionTypeAction' } | { __typename?: 'ReferenceFieldTypeAction' } | { __typename?: 'NewTypeAction' } | { __typename?: 'GroupAction' })
      & GQLLogFieldsFragment
    >>>, types: Maybe<Array<Maybe<{ __typename?: 'Type' }
      & GQLTypeFieldsFragment
    >>>, services: Maybe<Array<Maybe<{ __typename?: 'Service' }
      & GQLServiceFieldsFragment
    >>>, changeSets: Maybe<Array<Maybe<{ __typename?: 'ChangeSet' }
      & GQLChangeSetFieldsFragment
    >>> }
  )> }
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
  unhashed
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
    _default {
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
  description
  versions {
    version
    _type
    fields {
      key
      field {
        name
        description
        changeLog
        ... on Field {
          name
          optional
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
    }
    output {
      version
      _type
    }
  }
}
    `;
export const ChangeSetFieldsFragmentDoc = gql`
    fragment ChangeSetFields on ChangeSet {
  id
  baseHash
  log {
    ...ActionsFragment
  }
}
    ${ActionsFragmentFragmentDoc}`;
export const ChangeSetFragmentFragmentDoc = gql`
    fragment ChangeSetFragment on ChangeSet {
  id
  baseHash
  log {
    ...ActionsFragment
  }
}
    ${ActionsFragmentFragmentDoc}`;
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