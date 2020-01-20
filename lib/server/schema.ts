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
  UpdateDescriptionServiceAction: ResolverTypeWrapper<GQLUpdateDescriptionServiceAction>,
  AddVersionServiceAction: ResolverTypeWrapper<GQLAddVersionServiceAction>,
  RenameFieldTypeAction: ResolverTypeWrapper<GQLRenameFieldTypeAction>,
  RequiredFieldTypeAction: ResolverTypeWrapper<GQLRequiredFieldTypeAction>,
  OptionalFieldTypeAction: ResolverTypeWrapper<GQLOptionalFieldTypeAction>,
  DeleteFieldTypeAction: ResolverTypeWrapper<GQLDeleteFieldTypeAction>,
  SetDefaultFieldTypeAction: ResolverTypeWrapper<Omit<GQLSetDefaultFieldTypeAction, 'newDefault'> & { newDefault: GQLResolversTypes['FieldData'] }>,
  FieldData: GQLResolversTypes['StringField'] | GQLResolversTypes['IntField'] | GQLResolversTypes['FloatField'] | GQLResolversTypes['BooleanField'],
  StringField: ResolverTypeWrapper<GQLStringField>,
  IntField: ResolverTypeWrapper<GQLIntField>,
  FloatField: ResolverTypeWrapper<GQLFloatField>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  BooleanField: ResolverTypeWrapper<GQLBooleanField>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  RemoveDefaultFieldTypeAction: ResolverTypeWrapper<GQLRemoveDefaultFieldTypeAction>,
  AddFieldTypeAction: ResolverTypeWrapper<Omit<GQLAddFieldTypeAction, '_default'> & { _default?: Maybe<GQLResolversTypes['FieldData']> }>,
  FieldTypes: GQLFieldTypes,
  UpdateDescriptionTypeAction: ResolverTypeWrapper<GQLUpdateDescriptionTypeAction>,
  ReferenceFieldTypeAction: ResolverTypeWrapper<GQLReferenceFieldTypeAction>,
  NewTypeAction: ResolverTypeWrapper<GQLNewTypeAction>,
  GroupAction: ResolverTypeWrapper<Omit<GQLGroupAction, 'groupedActions'> & { groupedActions: Array<GQLResolversTypes['LogAction']> }>,
  GroupVersion: ResolverTypeWrapper<GQLGroupVersion>,
  Service: ResolverTypeWrapper<GQLService>,
  ServiceVersion: ResolverTypeWrapper<GQLServiceVersion>,
  VersionType: ResolverTypeWrapper<GQLVersionType>,
  Type: ResolverTypeWrapper<GQLType>,
  Version: ResolverTypeWrapper<GQLVersion>,
  FieldObject: ResolverTypeWrapper<GQLFieldObject>,
  BaseField: ResolverTypeWrapper<GQLBaseField>,
  ChangeSet: ResolverTypeWrapper<Omit<GQLChangeSet, 'log'> & { log: Array<GQLResolversTypes['LogActionChange']> }>,
  LogActionChange: GQLResolversTypes['NewServiceChangeAction'] | GQLResolversTypes['UpdateDescriptionServiceChangeAction'] | GQLResolversTypes['AddVersionServiceChangeAction'] | GQLResolversTypes['RenameFieldTypeChangeAction'] | GQLResolversTypes['RequiredFieldTypeChangeAction'] | GQLResolversTypes['OptionalFieldTypeChangeAction'] | GQLResolversTypes['DeleteFieldTypeChangeAction'] | GQLResolversTypes['SetDefaultFieldTypeChangeAction'] | GQLResolversTypes['RemoveDefaultFieldTypeChangeAction'] | GQLResolversTypes['AddFieldTypeChangeAction'] | GQLResolversTypes['UpdateDescriptionTypeChangeAction'] | GQLResolversTypes['ReferenceFieldTypeChangeAction'] | GQLResolversTypes['NewTypeChangeAction'],
  NewServiceChangeAction: ResolverTypeWrapper<GQLNewServiceChangeAction>,
  ChangeAction: ResolverTypeWrapper<GQLChangeAction>,
  UpdateDescriptionServiceChangeAction: ResolverTypeWrapper<GQLUpdateDescriptionServiceChangeAction>,
  AddVersionServiceChangeAction: ResolverTypeWrapper<GQLAddVersionServiceChangeAction>,
  RenameFieldTypeChangeAction: ResolverTypeWrapper<GQLRenameFieldTypeChangeAction>,
  RequiredFieldTypeChangeAction: ResolverTypeWrapper<GQLRequiredFieldTypeChangeAction>,
  OptionalFieldTypeChangeAction: ResolverTypeWrapper<GQLOptionalFieldTypeChangeAction>,
  DeleteFieldTypeChangeAction: ResolverTypeWrapper<GQLDeleteFieldTypeChangeAction>,
  SetDefaultFieldTypeChangeAction: ResolverTypeWrapper<Omit<GQLSetDefaultFieldTypeChangeAction, 'newDefault'> & { newDefault: GQLResolversTypes['FieldData'] }>,
  RemoveDefaultFieldTypeChangeAction: ResolverTypeWrapper<GQLRemoveDefaultFieldTypeChangeAction>,
  AddFieldTypeChangeAction: ResolverTypeWrapper<Omit<GQLAddFieldTypeChangeAction, '_default'> & { _default?: Maybe<GQLResolversTypes['FieldData']> }>,
  UpdateDescriptionTypeChangeAction: ResolverTypeWrapper<GQLUpdateDescriptionTypeChangeAction>,
  ReferenceFieldTypeChangeAction: ResolverTypeWrapper<GQLReferenceFieldTypeChangeAction>,
  NewTypeChangeAction: ResolverTypeWrapper<GQLNewTypeChangeAction>,
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
  NewLog: ResolverTypeWrapper<Omit<GQLNewLog, 'log'> & { log: Array<GQLResolversTypes['LogAction']> }>,
  Field: ResolverTypeWrapper<Omit<GQLField, '_default'> & { _default: GQLResolversTypes['FieldData'] }>,
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
  UpdateDescriptionServiceAction: GQLUpdateDescriptionServiceAction,
  AddVersionServiceAction: GQLAddVersionServiceAction,
  RenameFieldTypeAction: GQLRenameFieldTypeAction,
  RequiredFieldTypeAction: GQLRequiredFieldTypeAction,
  OptionalFieldTypeAction: GQLOptionalFieldTypeAction,
  DeleteFieldTypeAction: GQLDeleteFieldTypeAction,
  SetDefaultFieldTypeAction: Omit<GQLSetDefaultFieldTypeAction, 'newDefault'> & { newDefault: GQLResolversParentTypes['FieldData'] },
  FieldData: GQLResolversParentTypes['StringField'] | GQLResolversParentTypes['IntField'] | GQLResolversParentTypes['FloatField'] | GQLResolversParentTypes['BooleanField'],
  StringField: GQLStringField,
  IntField: GQLIntField,
  FloatField: GQLFloatField,
  Float: Scalars['Float'],
  BooleanField: GQLBooleanField,
  Boolean: Scalars['Boolean'],
  RemoveDefaultFieldTypeAction: GQLRemoveDefaultFieldTypeAction,
  AddFieldTypeAction: Omit<GQLAddFieldTypeAction, '_default'> & { _default?: Maybe<GQLResolversParentTypes['FieldData']> },
  FieldTypes: GQLFieldTypes,
  UpdateDescriptionTypeAction: GQLUpdateDescriptionTypeAction,
  ReferenceFieldTypeAction: GQLReferenceFieldTypeAction,
  NewTypeAction: GQLNewTypeAction,
  GroupAction: Omit<GQLGroupAction, 'groupedActions'> & { groupedActions: Array<GQLResolversParentTypes['LogAction']> },
  GroupVersion: GQLGroupVersion,
  Service: GQLService,
  ServiceVersion: GQLServiceVersion,
  VersionType: GQLVersionType,
  Type: GQLType,
  Version: GQLVersion,
  FieldObject: GQLFieldObject,
  BaseField: GQLBaseField,
  ChangeSet: Omit<GQLChangeSet, 'log'> & { log: Array<GQLResolversParentTypes['LogActionChange']> },
  LogActionChange: GQLResolversParentTypes['NewServiceChangeAction'] | GQLResolversParentTypes['UpdateDescriptionServiceChangeAction'] | GQLResolversParentTypes['AddVersionServiceChangeAction'] | GQLResolversParentTypes['RenameFieldTypeChangeAction'] | GQLResolversParentTypes['RequiredFieldTypeChangeAction'] | GQLResolversParentTypes['OptionalFieldTypeChangeAction'] | GQLResolversParentTypes['DeleteFieldTypeChangeAction'] | GQLResolversParentTypes['SetDefaultFieldTypeChangeAction'] | GQLResolversParentTypes['RemoveDefaultFieldTypeChangeAction'] | GQLResolversParentTypes['AddFieldTypeChangeAction'] | GQLResolversParentTypes['UpdateDescriptionTypeChangeAction'] | GQLResolversParentTypes['ReferenceFieldTypeChangeAction'] | GQLResolversParentTypes['NewTypeChangeAction'],
  NewServiceChangeAction: GQLNewServiceChangeAction,
  ChangeAction: GQLChangeAction,
  UpdateDescriptionServiceChangeAction: GQLUpdateDescriptionServiceChangeAction,
  AddVersionServiceChangeAction: GQLAddVersionServiceChangeAction,
  RenameFieldTypeChangeAction: GQLRenameFieldTypeChangeAction,
  RequiredFieldTypeChangeAction: GQLRequiredFieldTypeChangeAction,
  OptionalFieldTypeChangeAction: GQLOptionalFieldTypeChangeAction,
  DeleteFieldTypeChangeAction: GQLDeleteFieldTypeChangeAction,
  SetDefaultFieldTypeChangeAction: Omit<GQLSetDefaultFieldTypeChangeAction, 'newDefault'> & { newDefault: GQLResolversParentTypes['FieldData'] },
  RemoveDefaultFieldTypeChangeAction: GQLRemoveDefaultFieldTypeChangeAction,
  AddFieldTypeChangeAction: Omit<GQLAddFieldTypeChangeAction, '_default'> & { _default?: Maybe<GQLResolversParentTypes['FieldData']> },
  UpdateDescriptionTypeChangeAction: GQLUpdateDescriptionTypeChangeAction,
  ReferenceFieldTypeChangeAction: GQLReferenceFieldTypeChangeAction,
  NewTypeChangeAction: GQLNewTypeChangeAction,
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
  NewLog: Omit<GQLNewLog, 'log'> & { log: Array<GQLResolversParentTypes['LogAction']> },
  Field: Omit<GQLField, '_default'> & { _default: GQLResolversParentTypes['FieldData'] },
  ReferenceField: GQLReferenceField,
}>;

export type GQLActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Action'] = GQLResolversParentTypes['Action']> = ResolversObject<{
  __resolveType: TypeResolveFn<'NewServiceAction' | 'UpdateDescriptionServiceAction' | 'AddVersionServiceAction' | 'RenameFieldTypeAction' | 'RequiredFieldTypeAction' | 'OptionalFieldTypeAction' | 'DeleteFieldTypeAction' | 'SetDefaultFieldTypeAction' | 'RemoveDefaultFieldTypeAction' | 'AddFieldTypeAction' | 'UpdateDescriptionTypeAction' | 'ReferenceFieldTypeAction' | 'NewTypeAction' | 'GroupAction', ParentType, ContextType>,
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  hash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  version?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
}>;

export type GQLAddFieldTypeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['AddFieldTypeAction'] = GQLResolversParentTypes['AddFieldTypeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  hash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  version?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  typeName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  type?: Resolver<GQLResolversTypes['FieldTypes'], ParentType, ContextType>,
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  optional?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>,
  _default?: Resolver<Maybe<GQLResolversTypes['FieldData']>, ParentType, ContextType>,
}>;

export type GQLAddFieldTypeChangeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['AddFieldTypeChangeAction'] = GQLResolversParentTypes['AddFieldTypeChangeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  typeName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  type?: Resolver<GQLResolversTypes['FieldTypes'], ParentType, ContextType>,
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  optional?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>,
  _default?: Resolver<Maybe<GQLResolversTypes['FieldData']>, ParentType, ContextType>,
}>;

export type GQLAddVersionServiceActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['AddVersionServiceAction'] = GQLResolversParentTypes['AddVersionServiceAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  hash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  version?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  serviceName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  inputType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  outputType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  inputVersion?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  inputHash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  outputVersion?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  outputHash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLAddVersionServiceChangeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['AddVersionServiceChangeAction'] = GQLResolversParentTypes['AddVersionServiceChangeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  serviceName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  inputType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  outputType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  inputVersion?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  inputHash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  outputVersion?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  outputHash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLBaseFieldResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['BaseField'] = GQLResolversParentTypes['BaseField']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Field' | 'ReferenceField', ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  optional?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type GQLBooleanFieldResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['BooleanField'] = GQLResolversParentTypes['BooleanField']> = ResolversObject<{
  value?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
}>;

export type GQLChangeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ChangeAction'] = GQLResolversParentTypes['ChangeAction']> = ResolversObject<{
  __resolveType: TypeResolveFn<'NewServiceChangeAction' | 'UpdateDescriptionServiceChangeAction' | 'AddVersionServiceChangeAction' | 'RenameFieldTypeChangeAction' | 'RequiredFieldTypeChangeAction' | 'OptionalFieldTypeChangeAction' | 'DeleteFieldTypeChangeAction' | 'SetDefaultFieldTypeChangeAction' | 'RemoveDefaultFieldTypeChangeAction' | 'AddFieldTypeChangeAction' | 'UpdateDescriptionTypeChangeAction' | 'ReferenceFieldTypeChangeAction' | 'NewTypeChangeAction', ParentType, ContextType>,
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLChangeSetResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ChangeSet'] = GQLResolversParentTypes['ChangeSet']> = ResolversObject<{
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  baseHash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  log?: Resolver<Array<GQLResolversTypes['LogActionChange']>, ParentType, ContextType>,
}>;

export type GQLDeleteFieldTypeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['DeleteFieldTypeAction'] = GQLResolversParentTypes['DeleteFieldTypeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  hash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  version?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  typeName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLDeleteFieldTypeChangeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['DeleteFieldTypeChangeAction'] = GQLResolversParentTypes['DeleteFieldTypeChangeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  typeName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLFieldResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Field'] = GQLResolversParentTypes['Field']> = ResolversObject<{
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  optional?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>,
  _default?: Resolver<GQLResolversTypes['FieldData'], ParentType, ContextType>,
  _type?: Resolver<GQLResolversTypes['FieldTypes'], ParentType, ContextType>,
}>;

export type GQLFieldDataResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FieldData'] = GQLResolversParentTypes['FieldData']> = ResolversObject<{
  __resolveType: TypeResolveFn<'StringField' | 'IntField' | 'FloatField' | 'BooleanField', ParentType, ContextType>
}>;

export type GQLFieldObjectResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FieldObject'] = GQLResolversParentTypes['FieldObject']> = ResolversObject<{
  key?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  field?: Resolver<GQLResolversTypes['BaseField'], ParentType, ContextType>,
}>;

export type GQLFloatFieldResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FloatField'] = GQLResolversParentTypes['FloatField']> = ResolversObject<{
  value?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>,
}>;

export type GQLGroupActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['GroupAction'] = GQLResolversParentTypes['GroupAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  hash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  version?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  groupedActions?: Resolver<Array<GQLResolversTypes['LogAction']>, ParentType, ContextType>,
  versions?: Resolver<Array<GQLResolversTypes['GroupVersion']>, ParentType, ContextType>,
}>;

export type GQLGroupVersionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['GroupVersion'] = GQLResolversParentTypes['GroupVersion']> = ResolversObject<{
  typeName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  version?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
}>;

export type GQLIntFieldResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['IntField'] = GQLResolversParentTypes['IntField']> = ResolversObject<{
  value?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type GQLLogActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['LogAction'] = GQLResolversParentTypes['LogAction']> = ResolversObject<{
  __resolveType: TypeResolveFn<'NewServiceAction' | 'UpdateDescriptionServiceAction' | 'AddVersionServiceAction' | 'RenameFieldTypeAction' | 'RequiredFieldTypeAction' | 'OptionalFieldTypeAction' | 'DeleteFieldTypeAction' | 'SetDefaultFieldTypeAction' | 'RemoveDefaultFieldTypeAction' | 'AddFieldTypeAction' | 'UpdateDescriptionTypeAction' | 'ReferenceFieldTypeAction' | 'NewTypeAction' | 'GroupAction', ParentType, ContextType>
}>;

export type GQLLogActionChangeResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['LogActionChange'] = GQLResolversParentTypes['LogActionChange']> = ResolversObject<{
  __resolveType: TypeResolveFn<'NewServiceChangeAction' | 'UpdateDescriptionServiceChangeAction' | 'AddVersionServiceChangeAction' | 'RenameFieldTypeChangeAction' | 'RequiredFieldTypeChangeAction' | 'OptionalFieldTypeChangeAction' | 'DeleteFieldTypeChangeAction' | 'SetDefaultFieldTypeChangeAction' | 'RemoveDefaultFieldTypeChangeAction' | 'AddFieldTypeChangeAction' | 'UpdateDescriptionTypeChangeAction' | 'ReferenceFieldTypeChangeAction' | 'NewTypeChangeAction', ParentType, ContextType>
}>;

export type GQLMutationResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Mutation'] = GQLResolversParentTypes['Mutation']> = ResolversObject<{
  updateChangeSet?: Resolver<GQLResolversTypes['ChangeSet'], ParentType, ContextType, RequireFields<GQLMutationUpdateChangeSetArgs, 'changeSet'>>,
  commitChangeSet?: Resolver<GQLResolversTypes['NewLog'], ParentType, ContextType, RequireFields<GQLMutationCommitChangeSetArgs, 'changeSetId'>>,
  deleteChangeSet?: Resolver<Array<GQLResolversTypes['ChangeSet']>, ParentType, ContextType, RequireFields<GQLMutationDeleteChangeSetArgs, 'changeSetId'>>,
}>;

export type GQLNewLogResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['NewLog'] = GQLResolversParentTypes['NewLog']> = ResolversObject<{
  log?: Resolver<Array<GQLResolversTypes['LogAction']>, ParentType, ContextType>,
  services?: Resolver<Array<GQLResolversTypes['Service']>, ParentType, ContextType>,
  types?: Resolver<Array<GQLResolversTypes['Type']>, ParentType, ContextType>,
  changeSets?: Resolver<Array<GQLResolversTypes['ChangeSet']>, ParentType, ContextType>,
}>;

export type GQLNewServiceActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['NewServiceAction'] = GQLResolversParentTypes['NewServiceAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  hash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  version?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  serviceName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLNewServiceChangeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['NewServiceChangeAction'] = GQLResolversParentTypes['NewServiceChangeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  serviceName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLNewTypeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['NewTypeAction'] = GQLResolversParentTypes['NewTypeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  hash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  version?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  typeName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLNewTypeChangeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['NewTypeChangeAction'] = GQLResolversParentTypes['NewTypeChangeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  typeName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLOptionalFieldTypeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['OptionalFieldTypeAction'] = GQLResolversParentTypes['OptionalFieldTypeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  hash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  version?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  typeName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLOptionalFieldTypeChangeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['OptionalFieldTypeChangeAction'] = GQLResolversParentTypes['OptionalFieldTypeChangeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  typeName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLQueryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']> = ResolversObject<{
  log?: Resolver<Array<GQLResolversTypes['LogAction']>, ParentType, ContextType, GQLQueryLogArgs>,
  services?: Resolver<Array<GQLResolversTypes['Service']>, ParentType, ContextType, GQLQueryServicesArgs>,
  types?: Resolver<Array<GQLResolversTypes['Type']>, ParentType, ContextType, GQLQueryTypesArgs>,
  changeSets?: Resolver<Array<GQLResolversTypes['ChangeSet']>, ParentType, ContextType>,
}>;

export type GQLReferenceFieldResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ReferenceField'] = GQLResolversParentTypes['ReferenceField']> = ResolversObject<{
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  optional?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>,
  referenceType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  referenceHash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  referenceVersion?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
}>;

export type GQLReferenceFieldTypeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ReferenceFieldTypeAction'] = GQLResolversParentTypes['ReferenceFieldTypeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  hash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  version?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  typeName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  optional?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>,
  referenceType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  referenceHash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  referenceVersion?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
}>;

export type GQLReferenceFieldTypeChangeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ReferenceFieldTypeChangeAction'] = GQLResolversParentTypes['ReferenceFieldTypeChangeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  typeName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  optional?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>,
  referenceType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  referenceHash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  referenceVersion?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
}>;

export type GQLRemoveDefaultFieldTypeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['RemoveDefaultFieldTypeAction'] = GQLResolversParentTypes['RemoveDefaultFieldTypeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  hash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  version?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  typeName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLRemoveDefaultFieldTypeChangeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['RemoveDefaultFieldTypeChangeAction'] = GQLResolversParentTypes['RemoveDefaultFieldTypeChangeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  typeName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLRenameFieldTypeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['RenameFieldTypeAction'] = GQLResolversParentTypes['RenameFieldTypeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  hash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  version?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  typeName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  _from?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  to?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLRenameFieldTypeChangeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['RenameFieldTypeChangeAction'] = GQLResolversParentTypes['RenameFieldTypeChangeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  typeName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  _from?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  to?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLRequiredFieldTypeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['RequiredFieldTypeAction'] = GQLResolversParentTypes['RequiredFieldTypeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  hash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  version?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  typeName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLRequiredFieldTypeChangeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['RequiredFieldTypeChangeAction'] = GQLResolversParentTypes['RequiredFieldTypeChangeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  typeName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLServiceResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Service'] = GQLResolversParentTypes['Service']> = ResolversObject<{
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  changeLog?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  versions?: Resolver<Array<GQLResolversTypes['ServiceVersion']>, ParentType, ContextType>,
}>;

export type GQLServiceVersionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ServiceVersion'] = GQLResolversParentTypes['ServiceVersion']> = ResolversObject<{
  inputs?: Resolver<Array<GQLResolversTypes['VersionType']>, ParentType, ContextType>,
  output?: Resolver<GQLResolversTypes['VersionType'], ParentType, ContextType>,
}>;

export type GQLSetDefaultFieldTypeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SetDefaultFieldTypeAction'] = GQLResolversParentTypes['SetDefaultFieldTypeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  hash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  version?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  typeName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  newDefault?: Resolver<GQLResolversTypes['FieldData'], ParentType, ContextType>,
}>;

export type GQLSetDefaultFieldTypeChangeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SetDefaultFieldTypeChangeAction'] = GQLResolversParentTypes['SetDefaultFieldTypeChangeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  typeName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  newDefault?: Resolver<GQLResolversTypes['FieldData'], ParentType, ContextType>,
}>;

export type GQLStringFieldResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['StringField'] = GQLResolversParentTypes['StringField']> = ResolversObject<{
  value?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
}>;

export type GQLTypeResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Type'] = GQLResolversParentTypes['Type']> = ResolversObject<{
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  versions?: Resolver<Array<GQLResolversTypes['Version']>, ParentType, ContextType>,
  latest?: Resolver<Maybe<GQLResolversTypes['Version']>, ParentType, ContextType>,
  changeLog?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLUpdateDescriptionServiceActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['UpdateDescriptionServiceAction'] = GQLResolversParentTypes['UpdateDescriptionServiceAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  hash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  version?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  serviceName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLUpdateDescriptionServiceChangeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['UpdateDescriptionServiceChangeAction'] = GQLResolversParentTypes['UpdateDescriptionServiceChangeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  serviceName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLUpdateDescriptionTypeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['UpdateDescriptionTypeAction'] = GQLResolversParentTypes['UpdateDescriptionTypeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  hash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  version?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  typeName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLUpdateDescriptionTypeChangeActionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['UpdateDescriptionTypeChangeAction'] = GQLResolversParentTypes['UpdateDescriptionTypeChangeAction']> = ResolversObject<{
  changeLog?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  typeName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLVersionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Version'] = GQLResolversParentTypes['Version']> = ResolversObject<{
  _type?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  version?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  hash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  fields?: Resolver<Array<GQLResolversTypes['FieldObject']>, ParentType, ContextType>,
}>;

export type GQLVersionTypeResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['VersionType'] = GQLResolversParentTypes['VersionType']> = ResolversObject<{
  _type?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  version?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  hash?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
}>;

export type GQLResolvers<ContextType = any> = ResolversObject<{
  Action?: GQLActionResolvers,
  AddFieldTypeAction?: GQLAddFieldTypeActionResolvers<ContextType>,
  AddFieldTypeChangeAction?: GQLAddFieldTypeChangeActionResolvers<ContextType>,
  AddVersionServiceAction?: GQLAddVersionServiceActionResolvers<ContextType>,
  AddVersionServiceChangeAction?: GQLAddVersionServiceChangeActionResolvers<ContextType>,
  BaseField?: GQLBaseFieldResolvers,
  BooleanField?: GQLBooleanFieldResolvers<ContextType>,
  ChangeAction?: GQLChangeActionResolvers,
  ChangeSet?: GQLChangeSetResolvers<ContextType>,
  DeleteFieldTypeAction?: GQLDeleteFieldTypeActionResolvers<ContextType>,
  DeleteFieldTypeChangeAction?: GQLDeleteFieldTypeChangeActionResolvers<ContextType>,
  Field?: GQLFieldResolvers<ContextType>,
  FieldData?: GQLFieldDataResolvers,
  FieldObject?: GQLFieldObjectResolvers<ContextType>,
  FloatField?: GQLFloatFieldResolvers<ContextType>,
  GroupAction?: GQLGroupActionResolvers<ContextType>,
  GroupVersion?: GQLGroupVersionResolvers<ContextType>,
  IntField?: GQLIntFieldResolvers<ContextType>,
  LogAction?: GQLLogActionResolvers,
  LogActionChange?: GQLLogActionChangeResolvers,
  Mutation?: GQLMutationResolvers<ContextType>,
  NewLog?: GQLNewLogResolvers<ContextType>,
  NewServiceAction?: GQLNewServiceActionResolvers<ContextType>,
  NewServiceChangeAction?: GQLNewServiceChangeActionResolvers<ContextType>,
  NewTypeAction?: GQLNewTypeActionResolvers<ContextType>,
  NewTypeChangeAction?: GQLNewTypeChangeActionResolvers<ContextType>,
  OptionalFieldTypeAction?: GQLOptionalFieldTypeActionResolvers<ContextType>,
  OptionalFieldTypeChangeAction?: GQLOptionalFieldTypeChangeActionResolvers<ContextType>,
  Query?: GQLQueryResolvers<ContextType>,
  ReferenceField?: GQLReferenceFieldResolvers<ContextType>,
  ReferenceFieldTypeAction?: GQLReferenceFieldTypeActionResolvers<ContextType>,
  ReferenceFieldTypeChangeAction?: GQLReferenceFieldTypeChangeActionResolvers<ContextType>,
  RemoveDefaultFieldTypeAction?: GQLRemoveDefaultFieldTypeActionResolvers<ContextType>,
  RemoveDefaultFieldTypeChangeAction?: GQLRemoveDefaultFieldTypeChangeActionResolvers<ContextType>,
  RenameFieldTypeAction?: GQLRenameFieldTypeActionResolvers<ContextType>,
  RenameFieldTypeChangeAction?: GQLRenameFieldTypeChangeActionResolvers<ContextType>,
  RequiredFieldTypeAction?: GQLRequiredFieldTypeActionResolvers<ContextType>,
  RequiredFieldTypeChangeAction?: GQLRequiredFieldTypeChangeActionResolvers<ContextType>,
  Service?: GQLServiceResolvers<ContextType>,
  ServiceVersion?: GQLServiceVersionResolvers<ContextType>,
  SetDefaultFieldTypeAction?: GQLSetDefaultFieldTypeActionResolvers<ContextType>,
  SetDefaultFieldTypeChangeAction?: GQLSetDefaultFieldTypeChangeActionResolvers<ContextType>,
  StringField?: GQLStringFieldResolvers<ContextType>,
  Type?: GQLTypeResolvers<ContextType>,
  UpdateDescriptionServiceAction?: GQLUpdateDescriptionServiceActionResolvers<ContextType>,
  UpdateDescriptionServiceChangeAction?: GQLUpdateDescriptionServiceChangeActionResolvers<ContextType>,
  UpdateDescriptionTypeAction?: GQLUpdateDescriptionTypeActionResolvers<ContextType>,
  UpdateDescriptionTypeChangeAction?: GQLUpdateDescriptionTypeChangeActionResolvers<ContextType>,
  Version?: GQLVersionResolvers<ContextType>,
  VersionType?: GQLVersionTypeResolvers<ContextType>,
}>;


