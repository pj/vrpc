import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type GQLResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  LogAction: GQLResolversTypes['NewServiceAction'] | GQLResolversTypes['UpdateDescriptionServiceAction'] | GQLResolversTypes['AddVersionServiceAction'] | GQLResolversTypes['RenameFieldTypeAction'] | GQLResolversTypes['RequiredFieldTypeAction'] | GQLResolversTypes['OptionalFieldTypeAction'] | GQLResolversTypes['DeleteFieldTypeAction'] | GQLResolversTypes['SetDefaultFieldTypeAction'] | GQLResolversTypes['RemoveDefaultFieldTypeAction'] | GQLResolversTypes['AddFieldTypeAction'] | GQLResolversTypes['UpdateDescriptionTypeAction'] | GQLResolversTypes['ReferenceFieldTypeAction'] | GQLResolversTypes['NewTypeAction'] | GQLResolversTypes['GroupAction'],
  NewServiceAction: ResolverTypeWrapper<GQLNewServiceAction>,
  Action: ResolverTypeWrapper<GQLAction>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  UpdateDescriptionServiceAction: ResolverTypeWrapper<GQLUpdateDescriptionServiceAction>,
  AddVersionServiceAction: ResolverTypeWrapper<GQLAddVersionServiceAction>,
  RenameFieldTypeAction: ResolverTypeWrapper<GQLRenameFieldTypeAction>,
  RequiredFieldTypeAction: ResolverTypeWrapper<GQLRequiredFieldTypeAction>,
  OptionalFieldTypeAction: ResolverTypeWrapper<GQLOptionalFieldTypeAction>,
  DeleteFieldTypeAction: ResolverTypeWrapper<GQLDeleteFieldTypeAction>,
  SetDefaultFieldTypeAction: ResolverTypeWrapper<Omit<GQLSetDefaultFieldTypeAction, '_default'> & { _default?: Maybe<GQLResolversTypes['FieldData']> }>,
  FieldData: GQLResolversTypes['StringField'] | GQLResolversTypes['IntField'] | GQLResolversTypes['FloatField'] | GQLResolversTypes['BooleanField'],
  StringField: ResolverTypeWrapper<GQLStringField>,
  IntField: ResolverTypeWrapper<GQLIntField>,
  FloatField: ResolverTypeWrapper<GQLFloatField>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  BooleanField: ResolverTypeWrapper<GQLBooleanField>,
  RemoveDefaultFieldTypeAction: ResolverTypeWrapper<GQLRemoveDefaultFieldTypeAction>,
  AddFieldTypeAction: ResolverTypeWrapper<Omit<GQLAddFieldTypeAction, '_default'> & { _default?: Maybe<GQLResolversTypes['FieldData']> }>,
  UpdateDescriptionTypeAction: ResolverTypeWrapper<GQLUpdateDescriptionTypeAction>,
  ReferenceFieldTypeAction: ResolverTypeWrapper<GQLReferenceFieldTypeAction>,
  NewTypeAction: ResolverTypeWrapper<GQLNewTypeAction>,
  GroupAction: ResolverTypeWrapper<GQLGroupAction>,
  GroupVersion: ResolverTypeWrapper<GQLGroupVersion>,
  Service: ResolverTypeWrapper<GQLService>,
  ServiceVersion: ResolverTypeWrapper<GQLServiceVersion>,
  VersionType: ResolverTypeWrapper<GQLVersionType>,
  Type: ResolverTypeWrapper<GQLType>,
  Version: ResolverTypeWrapper<GQLVersion>,
  FieldObject: ResolverTypeWrapper<GQLFieldObject>,
  BaseField: ResolverTypeWrapper<GQLBaseField>,
  ChangeSet: ResolverTypeWrapper<Omit<GQLChangeSet, 'log'> & { log?: Maybe<Array<Maybe<GQLResolversTypes['LogAction']>>> }>,
  Mutation: ResolverTypeWrapper<{}>,
  ChangeSetInput: GQLChangeSetInput,
  LogActionInput: GQLLogActionInput,
  NewServiceActionInput: GQLNewServiceActionInput,
  UpdateDescriptionServiceActionInput: GQLUpdateDescriptionServiceActionInput,
  AddVersionServiceActionInput: GQLAddVersionServiceActionInput,
  RenameFieldTypeActionInput: GQLRenameFieldTypeActionInput,
  RequiredFieldTypeActionInput: GQLRequiredFieldTypeActionInput,
  OptionalFieldTypeActionInput: GQLOptionalFieldTypeActionInput,
  DeleteFieldTypeActionInput: GQLDeleteFieldTypeActionInput,
  SetDefaultFieldTypeActionInput: GQLSetDefaultFieldTypeActionInput,
  FieldDataInput: GQLFieldDataInput,
  RemoveDefaultFieldTypeActionInput: GQLRemoveDefaultFieldTypeActionInput,
  AddFieldTypeActionInput: GQLAddFieldTypeActionInput,
  UpdateDescriptionTypeActionInput: GQLUpdateDescriptionTypeActionInput,
  ReferenceFieldTypeActionInput: GQLReferenceFieldTypeActionInput,
  NewTypeActionInput: GQLNewTypeActionInput,
  NewLog: ResolverTypeWrapper<Omit<GQLNewLog, 'log'> & { log?: Maybe<Array<Maybe<GQLResolversTypes['LogAction']>>> }>,
  FieldTypes: GQLFieldTypes,
  Field: ResolverTypeWrapper<Omit<GQLField, '_default'> & { _default?: Maybe<GQLResolversTypes['FieldData']> }>,
  ReferenceField: ResolverTypeWrapper<GQLReferenceField>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = ResolversObject<{
  Query: {},
  String: Scalars['String'],
  LogAction: GQLResolversParentTypes['NewServiceAction'] | GQLResolversParentTypes['UpdateDescriptionServiceAction'] | GQLResolversParentTypes['AddVersionServiceAction'] | GQLResolversParentTypes['RenameFieldTypeAction'] | GQLResolversParentTypes['RequiredFieldTypeAction'] | GQLResolversParentTypes['OptionalFieldTypeAction'] | GQLResolversParentTypes['DeleteFieldTypeAction'] | GQLResolversParentTypes['SetDefaultFieldTypeAction'] | GQLResolversParentTypes['RemoveDefaultFieldTypeAction'] | GQLResolversParentTypes['AddFieldTypeAction'] | GQLResolversParentTypes['UpdateDescriptionTypeAction'] | GQLResolversParentTypes['ReferenceFieldTypeAction'] | GQLResolversParentTypes['NewTypeAction'] | GQLResolversParentTypes['GroupAction'],
  NewServiceAction: GQLNewServiceAction,
  Action: GQLAction,
  Int: Scalars['Int'],
  Boolean: Scalars['Boolean'],
  UpdateDescriptionServiceAction: GQLUpdateDescriptionServiceAction,
  AddVersionServiceAction: GQLAddVersionServiceAction,
  RenameFieldTypeAction: GQLRenameFieldTypeAction,
  RequiredFieldTypeAction: GQLRequiredFieldTypeAction,
  OptionalFieldTypeAction: GQLOptionalFieldTypeAction,
  DeleteFieldTypeAction: GQLDeleteFieldTypeAction,
  SetDefaultFieldTypeAction: Omit<GQLSetDefaultFieldTypeAction, '_default'> & { _default?: Maybe<GQLResolversParentTypes['FieldData']> },
  FieldData: GQLResolversParentTypes['StringField'] | GQLResolversParentTypes['IntField'] | GQLResolversParentTypes['FloatField'] | GQLResolversParentTypes['BooleanField'],
  StringField: GQLStringField,
  IntField: GQLIntField,
  FloatField: GQLFloatField,
  Float: Scalars['Float'],
  BooleanField: GQLBooleanField,
  RemoveDefaultFieldTypeAction: GQLRemoveDefaultFieldTypeAction,
  AddFieldTypeAction: Omit<GQLAddFieldTypeAction, '_default'> & { _default?: Maybe<GQLResolversParentTypes['FieldData']> },
  UpdateDescriptionTypeAction: GQLUpdateDescriptionTypeAction,
  ReferenceFieldTypeAction: GQLReferenceFieldTypeAction,
  NewTypeAction: GQLNewTypeAction,
  GroupAction: GQLGroupAction,
  GroupVersion: GQLGroupVersion,
  Service: GQLService,
  ServiceVersion: GQLServiceVersion,
  VersionType: GQLVersionType,
  Type: GQLType,
  Version: GQLVersion,
  FieldObject: GQLFieldObject,
  BaseField: GQLBaseField,
  ChangeSet: Omit<GQLChangeSet, 'log'> & { log?: Maybe<Array<Maybe<GQLResolversParentTypes['LogAction']>>> },
  Mutation: {},
  ChangeSetInput: GQLChangeSetInput,
  LogActionInput: GQLLogActionInput,
  NewServiceActionInput: GQLNewServiceActionInput,
  UpdateDescriptionServiceActionInput: GQLUpdateDescriptionServiceActionInput,
  AddVersionServiceActionInput: GQLAddVersionServiceActionInput,
  RenameFieldTypeActionInput: GQLRenameFieldTypeActionInput,
  RequiredFieldTypeActionInput: GQLRequiredFieldTypeActionInput,
  OptionalFieldTypeActionInput: GQLOptionalFieldTypeActionInput,
  DeleteFieldTypeActionInput: GQLDeleteFieldTypeActionInput,
  SetDefaultFieldTypeActionInput: GQLSetDefaultFieldTypeActionInput,
  FieldDataInput: GQLFieldDataInput,
  RemoveDefaultFieldTypeActionInput: GQLRemoveDefaultFieldTypeActionInput,
  AddFieldTypeActionInput: GQLAddFieldTypeActionInput,
  UpdateDescriptionTypeActionInput: GQLUpdateDescriptionTypeActionInput,
  ReferenceFieldTypeActionInput: GQLReferenceFieldTypeActionInput,
  NewTypeActionInput: GQLNewTypeActionInput,
  NewLog: Omit<GQLNewLog, 'log'> & { log?: Maybe<Array<Maybe<GQLResolversParentTypes['LogAction']>>> },
  FieldTypes: GQLFieldTypes,
  Field: Omit<GQLField, '_default'> & { _default?: Maybe<GQLResolversParentTypes['FieldData']> },
  ReferenceField: GQLReferenceField,
}>;

export type GQLActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Action'] = GQLResolversParentTypes['Action']> = ResolversObject<{
  __resolveType: TypeResolveFn<'NewServiceAction' | 'UpdateDescriptionServiceAction' | 'AddVersionServiceAction' | 'RenameFieldTypeAction' | 'RequiredFieldTypeAction' | 'OptionalFieldTypeAction' | 'DeleteFieldTypeAction' | 'SetDefaultFieldTypeAction' | 'RemoveDefaultFieldTypeAction' | 'AddFieldTypeAction' | 'UpdateDescriptionTypeAction' | 'ReferenceFieldTypeAction' | 'NewTypeAction' | 'GroupAction', ParentType, ContextType>,
  changeLog?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  hash?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  version?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
  unhashed?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
}>;

export type GQLAddFieldTypeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['AddFieldTypeAction'] = GQLResolversParentTypes['AddFieldTypeAction']> = ResolversObject<{
  changeLog?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  hash?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  version?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
  unhashed?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
  typeName?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  type?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  optional?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
  _default?: Resolver<Maybe<GQLResolversTypes['FieldData']>, ParentType, ContextType>,
}>;

export type GQLAddVersionServiceActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['AddVersionServiceAction'] = GQLResolversParentTypes['AddVersionServiceAction']> = ResolversObject<{
  changeLog?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  hash?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  version?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
  unhashed?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
  serviceName?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  inputType?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  outputType?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  inputVersion?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
  inputHash?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  outputVersion?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
  outputHash?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
}>;

export type GQLBaseFieldResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['BaseField'] = GQLResolversParentTypes['BaseField']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Field' | 'ReferenceField', ParentType, ContextType>,
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  changeLog?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  optional?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
}>;

export type GQLBooleanFieldResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['BooleanField'] = GQLResolversParentTypes['BooleanField']> = ResolversObject<{
  value?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
}>;

export type GQLChangeSetResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ChangeSet'] = GQLResolversParentTypes['ChangeSet']> = ResolversObject<{
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  baseHash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  log?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['LogAction']>>>, ParentType, ContextType>,
}>;

export type GQLDeleteFieldTypeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['DeleteFieldTypeAction'] = GQLResolversParentTypes['DeleteFieldTypeAction']> = ResolversObject<{
  changeLog?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  hash?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  version?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
  unhashed?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
  typeName?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
}>;

export type GQLFieldResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Field'] = GQLResolversParentTypes['Field']> = ResolversObject<{
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  changeLog?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  optional?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
  _default?: Resolver<Maybe<GQLResolversTypes['FieldData']>, ParentType, ContextType>,
  _type?: Resolver<Maybe<GQLResolversTypes['FieldTypes']>, ParentType, ContextType>,
}>;

export type GQLFieldDataResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FieldData'] = GQLResolversParentTypes['FieldData']> = ResolversObject<{
  __resolveType: TypeResolveFn<'StringField' | 'IntField' | 'FloatField' | 'BooleanField', ParentType, ContextType>
}>;

export type GQLFieldObjectResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FieldObject'] = GQLResolversParentTypes['FieldObject']> = ResolversObject<{
  key?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  field?: Resolver<Maybe<GQLResolversTypes['BaseField']>, ParentType, ContextType>,
}>;

export type GQLFloatFieldResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FloatField'] = GQLResolversParentTypes['FloatField']> = ResolversObject<{
  value?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>,
}>;

export type GQLGroupActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['GroupAction'] = GQLResolversParentTypes['GroupAction']> = ResolversObject<{
  changeLog?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  hash?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  version?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
  unhashed?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
  groupedActions?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['Action']>>>, ParentType, ContextType>,
  versions?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['GroupVersion']>>>, ParentType, ContextType>,
}>;

export type GQLGroupVersionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['GroupVersion'] = GQLResolversParentTypes['GroupVersion']> = ResolversObject<{
  typeName?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  version?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
  unhashed?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
}>;

export type GQLIntFieldResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['IntField'] = GQLResolversParentTypes['IntField']> = ResolversObject<{
  value?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type GQLLogActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['LogAction'] = GQLResolversParentTypes['LogAction']> = ResolversObject<{
  __resolveType: TypeResolveFn<'NewServiceAction' | 'UpdateDescriptionServiceAction' | 'AddVersionServiceAction' | 'RenameFieldTypeAction' | 'RequiredFieldTypeAction' | 'OptionalFieldTypeAction' | 'DeleteFieldTypeAction' | 'SetDefaultFieldTypeAction' | 'RemoveDefaultFieldTypeAction' | 'AddFieldTypeAction' | 'UpdateDescriptionTypeAction' | 'ReferenceFieldTypeAction' | 'NewTypeAction' | 'GroupAction', ParentType, ContextType>
}>;

export type GQLMutationResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Mutation'] = GQLResolversParentTypes['Mutation']> = ResolversObject<{
  updateChangeSet?: Resolver<Maybe<GQLResolversTypes['ChangeSet']>, ParentType, ContextType, RequireFields<GQLMutationUpdateChangeSetArgs, 'changeSet'>>,
  commitChangeSet?: Resolver<Maybe<GQLResolversTypes['NewLog']>, ParentType, ContextType, RequireFields<GQLMutationCommitChangeSetArgs, 'changeSetId'>>,
  deleteChangeSet?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['ChangeSet']>>>, ParentType, ContextType, RequireFields<GQLMutationDeleteChangeSetArgs, 'changeSetId'>>,
}>;

export type GQLNewLogResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['NewLog'] = GQLResolversParentTypes['NewLog']> = ResolversObject<{
  log?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['LogAction']>>>, ParentType, ContextType>,
  services?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['Service']>>>, ParentType, ContextType>,
  types?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['Type']>>>, ParentType, ContextType>,
  changeSets?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['ChangeSet']>>>, ParentType, ContextType>,
}>;

export type GQLNewServiceActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['NewServiceAction'] = GQLResolversParentTypes['NewServiceAction']> = ResolversObject<{
  changeLog?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  hash?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  version?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
  unhashed?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
  serviceName?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
}>;

export type GQLNewTypeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['NewTypeAction'] = GQLResolversParentTypes['NewTypeAction']> = ResolversObject<{
  changeLog?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  hash?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  version?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
  unhashed?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
  typeName?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
}>;

export type GQLOptionalFieldTypeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['OptionalFieldTypeAction'] = GQLResolversParentTypes['OptionalFieldTypeAction']> = ResolversObject<{
  changeLog?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  hash?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  version?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
  unhashed?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
  typeName?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
}>;

export type GQLQueryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']> = ResolversObject<{
  log?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['LogAction']>>>, ParentType, ContextType, GQLQueryLogArgs>,
  services?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['Service']>>>, ParentType, ContextType, GQLQueryServicesArgs>,
  types?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['Type']>>>, ParentType, ContextType, GQLQueryTypesArgs>,
  changeSets?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['ChangeSet']>>>, ParentType, ContextType>,
}>;

export type GQLReferenceFieldResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ReferenceField'] = GQLResolversParentTypes['ReferenceField']> = ResolversObject<{
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  changeLog?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  optional?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
  referenceType?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  referenceHash?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  referenceVersion?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type GQLReferenceFieldTypeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ReferenceFieldTypeAction'] = GQLResolversParentTypes['ReferenceFieldTypeAction']> = ResolversObject<{
  changeLog?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  hash?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  version?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
  unhashed?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
  typeName?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  optional?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
  referenceType?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  referenceHash?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  referenceVersion?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type GQLRemoveDefaultFieldTypeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['RemoveDefaultFieldTypeAction'] = GQLResolversParentTypes['RemoveDefaultFieldTypeAction']> = ResolversObject<{
  changeLog?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  hash?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  version?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
  unhashed?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
  typeName?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
}>;

export type GQLRenameFieldTypeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['RenameFieldTypeAction'] = GQLResolversParentTypes['RenameFieldTypeAction']> = ResolversObject<{
  changeLog?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  hash?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  version?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
  unhashed?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
  typeName?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  _from?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  to?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
}>;

export type GQLRequiredFieldTypeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['RequiredFieldTypeAction'] = GQLResolversParentTypes['RequiredFieldTypeAction']> = ResolversObject<{
  changeLog?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  hash?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  version?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
  unhashed?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
  typeName?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
}>;

export type GQLServiceResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Service'] = GQLResolversParentTypes['Service']> = ResolversObject<{
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  changeLog?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['String']>>>, ParentType, ContextType>,
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  versions?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['ServiceVersion']>>>, ParentType, ContextType>,
}>;

export type GQLServiceVersionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ServiceVersion'] = GQLResolversParentTypes['ServiceVersion']> = ResolversObject<{
  inputs?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['VersionType']>>>, ParentType, ContextType>,
  output?: Resolver<Maybe<GQLResolversTypes['VersionType']>, ParentType, ContextType>,
}>;

export type GQLSetDefaultFieldTypeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SetDefaultFieldTypeAction'] = GQLResolversParentTypes['SetDefaultFieldTypeAction']> = ResolversObject<{
  changeLog?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  hash?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  version?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
  unhashed?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
  typeName?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  _default?: Resolver<Maybe<GQLResolversTypes['FieldData']>, ParentType, ContextType>,
}>;

export type GQLStringFieldResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['StringField'] = GQLResolversParentTypes['StringField']> = ResolversObject<{
  value?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
}>;

export type GQLTypeResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Type'] = GQLResolversParentTypes['Type']> = ResolversObject<{
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  versions?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['Version']>>>, ParentType, ContextType>,
  latest?: Resolver<Maybe<GQLResolversTypes['Version']>, ParentType, ContextType>,
  changeLog?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['String']>>>, ParentType, ContextType>,
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
}>;

export type GQLUpdateDescriptionServiceActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['UpdateDescriptionServiceAction'] = GQLResolversParentTypes['UpdateDescriptionServiceAction']> = ResolversObject<{
  changeLog?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  hash?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  version?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
  unhashed?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
  serviceName?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
}>;

export type GQLUpdateDescriptionTypeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['UpdateDescriptionTypeAction'] = GQLResolversParentTypes['UpdateDescriptionTypeAction']> = ResolversObject<{
  changeLog?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  hash?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  version?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
  unhashed?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
  typeName?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
}>;

export type GQLVersionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Version'] = GQLResolversParentTypes['Version']> = ResolversObject<{
  _type?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  version?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
  hash?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  fields?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['FieldObject']>>>, ParentType, ContextType>,
}>;

export type GQLVersionTypeResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['VersionType'] = GQLResolversParentTypes['VersionType']> = ResolversObject<{
  _type?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  version?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
  hash?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
}>;

export type GQLResolvers<ContextType = any> = ResolversObject<{
  Action?: GQLActionResolvers,
  AddFieldTypeAction?: GQLAddFieldTypeActionResolvers<ContextType>,
  AddVersionServiceAction?: GQLAddVersionServiceActionResolvers<ContextType>,
  BaseField?: GQLBaseFieldResolvers,
  BooleanField?: GQLBooleanFieldResolvers<ContextType>,
  ChangeSet?: GQLChangeSetResolvers<ContextType>,
  DeleteFieldTypeAction?: GQLDeleteFieldTypeActionResolvers<ContextType>,
  Field?: GQLFieldResolvers<ContextType>,
  FieldData?: GQLFieldDataResolvers,
  FieldObject?: GQLFieldObjectResolvers<ContextType>,
  FloatField?: GQLFloatFieldResolvers<ContextType>,
  GroupAction?: GQLGroupActionResolvers<ContextType>,
  GroupVersion?: GQLGroupVersionResolvers<ContextType>,
  IntField?: GQLIntFieldResolvers<ContextType>,
  LogAction?: GQLLogActionResolvers,
  Mutation?: GQLMutationResolvers<ContextType>,
  NewLog?: GQLNewLogResolvers<ContextType>,
  NewServiceAction?: GQLNewServiceActionResolvers<ContextType>,
  NewTypeAction?: GQLNewTypeActionResolvers<ContextType>,
  OptionalFieldTypeAction?: GQLOptionalFieldTypeActionResolvers<ContextType>,
  Query?: GQLQueryResolvers<ContextType>,
  ReferenceField?: GQLReferenceFieldResolvers<ContextType>,
  ReferenceFieldTypeAction?: GQLReferenceFieldTypeActionResolvers<ContextType>,
  RemoveDefaultFieldTypeAction?: GQLRemoveDefaultFieldTypeActionResolvers<ContextType>,
  RenameFieldTypeAction?: GQLRenameFieldTypeActionResolvers<ContextType>,
  RequiredFieldTypeAction?: GQLRequiredFieldTypeActionResolvers<ContextType>,
  Service?: GQLServiceResolvers<ContextType>,
  ServiceVersion?: GQLServiceVersionResolvers<ContextType>,
  SetDefaultFieldTypeAction?: GQLSetDefaultFieldTypeActionResolvers<ContextType>,
  StringField?: GQLStringFieldResolvers<ContextType>,
  Type?: GQLTypeResolvers<ContextType>,
  UpdateDescriptionServiceAction?: GQLUpdateDescriptionServiceActionResolvers<ContextType>,
  UpdateDescriptionTypeAction?: GQLUpdateDescriptionTypeActionResolvers<ContextType>,
  Version?: GQLVersionResolvers<ContextType>,
  VersionType?: GQLVersionTypeResolvers<ContextType>,
}>;


