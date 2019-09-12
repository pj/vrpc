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
};

export type GQLAddFieldTypeAction = GQLAction & {
   __typename?: 'AddFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  optional?: Maybe<Scalars['Boolean']>,
  _default?: Maybe<GQLFieldData>,
};

export type GQLAddVersionServiceAction = GQLAction & {
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

export type GQLDeleteFieldTypeAction = GQLAction & {
   __typename?: 'DeleteFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
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
};

export type GQLFieldData = GQLStringField | GQLIntField | GQLFloatField | GQLBooleanField;

export type GQLFieldObject = {
   __typename?: 'FieldObject',
  key?: Maybe<Scalars['String']>,
  field?: Maybe<GQLBaseField>,
};

export type GQLFloatField = {
   __typename?: 'FloatField',
  value?: Maybe<Scalars['Float']>,
};

export type GQLGroupAction = GQLAction & {
   __typename?: 'GroupAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  groupedActions?: Maybe<Array<Maybe<GQLAction>>>,
  versions?: Maybe<Array<Maybe<GQLGroupVersion>>>,
};

export type GQLGroupVersion = {
   __typename?: 'GroupVersion',
  typeName?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
};

export type GQLIntField = {
   __typename?: 'IntField',
  value?: Maybe<Scalars['Int']>,
};

export type GQLNewServiceAction = GQLAction & {
   __typename?: 'NewServiceAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  serviceName?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type GQLNewTypeAction = GQLAction & {
   __typename?: 'NewTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  typeName?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type GQLOptionalFieldTypeAction = GQLAction & {
   __typename?: 'OptionalFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type GQLQuery = {
   __typename?: 'Query',
  log?: Maybe<Array<Maybe<GQLAction>>>,
  services?: Maybe<Array<Maybe<GQLService>>>,
  types?: Maybe<Array<Maybe<GQLType>>>,
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
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type GQLRenameFieldTypeAction = GQLAction & {
   __typename?: 'RenameFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  typeName?: Maybe<Scalars['String']>,
  _from?: Maybe<Scalars['String']>,
  to?: Maybe<Scalars['String']>,
};

export type GQLRequiredFieldTypeAction = GQLAction & {
   __typename?: 'RequiredFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type GQLService = {
   __typename?: 'Service',
  name?: Maybe<Scalars['String']>,
  changeLog?: Maybe<Array<Maybe<Scalars['String']>>>,
  description?: Maybe<Scalars['String']>,
  versions?: Maybe<Array<Maybe<GQLVersionType>>>,
};

export type GQLSetDefaultFieldTypeAction = GQLAction & {
   __typename?: 'SetDefaultFieldTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
  typeName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  _default?: Maybe<GQLFieldData>,
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
  serviceName?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type GQLUpdateDescriptionTypeAction = GQLAction & {
   __typename?: 'UpdateDescriptionTypeAction',
  changeLog?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['Int']>,
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
