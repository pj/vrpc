export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Action = {
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
};

export type AddFieldTypeAction = Action & {
   __typename?: 'AddFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  optional?: Maybe<Scalars['Boolean']>,
  _default?: Maybe<FieldData>,
};

export type AddVersionServiceAction = Action & {
   __typename?: 'AddVersionServiceAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  serviceName?: Maybe<Scalars['String']>,
  inputType?: Maybe<Scalars['String']>,
  outputType?: Maybe<Scalars['String']>,
  inputVersion?: Maybe<Scalars['Int']>,
  inputHash?: Maybe<Scalars['String']>,
  outputVersion?: Maybe<Scalars['Int']>,
  outputHash?: Maybe<Scalars['String']>,
};

export type BaseField = {
  name?: Maybe<Scalars['String']>,
  changeLog?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  optional?: Maybe<Scalars['Boolean']>,
};

export type BooleanField = {
   __typename?: 'BooleanField',
  value?: Maybe<Scalars['Boolean']>,
};

export type DeleteFieldTypeAction = Action & {
   __typename?: 'DeleteFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type Field = BaseField & {
   __typename?: 'Field',
  name?: Maybe<Scalars['String']>,
  changeLog?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  optional?: Maybe<Scalars['Boolean']>,
  _default?: Maybe<FieldData>,
};

export type FieldData = StringField | IntField | FloatField | BooleanField;

export type FieldObject = {
   __typename?: 'FieldObject',
  key?: Maybe<Scalars['String']>,
  field?: Maybe<BaseField>,
};

export type FloatField = {
   __typename?: 'FloatField',
  value?: Maybe<Scalars['Float']>,
};

export type GroupAction = Action & {
   __typename?: 'GroupAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  groupedActions?: Maybe<Array<Maybe<Action>>>,
  versions?: Maybe<Array<Maybe<GroupVersion>>>,
};

export type GroupVersion = {
   __typename?: 'GroupVersion',
  typeName?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
};

export type IntField = {
   __typename?: 'IntField',
  value?: Maybe<Scalars['Int']>,
};

export type NewServiceAction = Action & {
   __typename?: 'NewServiceAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  serviceName?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type NewTypeAction = Action & {
   __typename?: 'NewTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  typeName?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type OptionalFieldTypeAction = Action & {
   __typename?: 'OptionalFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  log?: Maybe<Array<Maybe<Action>>>,
  services?: Maybe<Array<Maybe<Service>>>,
  types?: Maybe<Array<Maybe<Type>>>,
};

export type ReferenceField = BaseField & {
   __typename?: 'ReferenceField',
  name?: Maybe<Scalars['String']>,
  changeLog?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  optional?: Maybe<Scalars['Boolean']>,
  referenceType?: Maybe<Scalars['String']>,
  referenceHash?: Maybe<Scalars['String']>,
  referenceVersion?: Maybe<Scalars['Int']>,
};

export type ReferenceFieldTypeAction = Action & {
   __typename?: 'ReferenceFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  optional?: Maybe<Scalars['Boolean']>,
  referenceType?: Maybe<Scalars['String']>,
  referenceHash?: Maybe<Scalars['String']>,
  referenceVersion?: Maybe<Scalars['Int']>,
};

export type RemoveDefaultFieldTypeAction = Action & {
   __typename?: 'RemoveDefaultFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type RenameFieldTypeAction = Action & {
   __typename?: 'RenameFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  typeName?: Maybe<Scalars['String']>,
  _from?: Maybe<Scalars['String']>,
  to?: Maybe<Scalars['String']>,
};

export type RequiredFieldTypeAction = Action & {
   __typename?: 'RequiredFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type Service = {
   __typename?: 'Service',
  name?: Maybe<Scalars['String']>,
  changeLog?: Maybe<Array<Maybe<Scalars['String']>>>,
  description?: Maybe<Scalars['String']>,
  versions?: Maybe<Array<Maybe<VersionType>>>,
};

export type SetDefaultFieldTypeAction = Action & {
   __typename?: 'SetDefaultFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  _default?: Maybe<FieldData>,
};

export type StringField = {
   __typename?: 'StringField',
  value?: Maybe<Scalars['String']>,
};

export type Type = {
   __typename?: 'Type',
  name?: Maybe<Scalars['String']>,
  versions?: Maybe<Array<Maybe<Version>>>,
  latest?: Maybe<Version>,
  changeLog?: Maybe<Array<Maybe<Scalars['String']>>>,
  description?: Maybe<Scalars['String']>,
};

export type UpdateDescriptionServiceAction = Action & {
   __typename?: 'UpdateDescriptionServiceAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  serviceName?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type UpdateDescriptionTypeAction = Action & {
   __typename?: 'UpdateDescriptionTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type Version = {
   __typename?: 'Version',
  _type?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  hash?: Maybe<Scalars['String']>,
  fields?: Maybe<Array<Maybe<FieldObject>>>,
};

export type VersionType = {
   __typename?: 'VersionType',
  _type?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  hash?: Maybe<Scalars['String']>,
};
