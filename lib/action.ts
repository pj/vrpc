import {
  createUnionType, 
  ObjectType, 
  Field, 
  Int, 
  Float, 
  registerEnumType
} from 'type-graphql';
import { isObjectType } from 'graphql';

export enum FieldTypes {
  STRING = 'string',
  BOOLEAN = 'boolean',
  INTEGER = 'integer',
  FLOAT = 'float'
} 

registerEnumType(FieldTypes, {
  name: "FieldTypes"
});

export const FieldTypeValues = ['string', 'boolean', 'integer', 'float'];

export type FieldDefaults = string | boolean | number;

@ObjectType()
export class StringField {
  @Field()
  value: string
}

@ObjectType()
export class BooleanField {
  @Field()
  value: boolean
}

@ObjectType()
export class FloatField {
  @Field(type => Float)
  value: number
}

@ObjectType()
export class IntegerField {
  @Field(type => Int)
  value: number
}

export const FieldDefaultsUnion = createUnionType({
  name: "FieldDefaults",
  types: () => [StringField, BooleanField, FloatField, IntegerField], 
});

export interface HashedAction {
  hash: string;
  version: number;
}

export interface ActionDefaults {
  actionType: string;
  changeLog: string;
}

// Types
@ObjectType()
export class NewTypeAction implements HashedAction, ActionDefaults {
  @Field()
  hash: string;

  @Field()
  version: number;

  actionType: 'NewTypeAction';

  @Field()
  changeLog: string;

  @Field()
  typeName: string;

  @Field()
  description: string;
}

@ObjectType()
export class NewTypeChangeAction implements ActionDefaults {
  actionType: 'NewTypeAction';
  @Field()
  changeLog: string;

  @Field()
  typeName: string;

  @Field()
  description: string;
}

@ObjectType()
export class RenameFieldTypeAction implements HashedAction, ActionDefaults {
  @Field()
  hash: string;

  @Field()
  version: number;

  @Field()
  changeLog: string;

  actionType: 'RenameFieldTypeAction';

  @Field()
  typeName: string;

  @Field()
  _from: string;

  @Field()
  to: string;
}

@ObjectType()
export class RenameFieldTypeChangeAction implements ActionDefaults {
  @Field()
  changeLog: string;

  actionType: 'RenameFieldTypeAction';

  @Field()
  typeName: string;

  @Field()
  _from: string;

  @Field()
  to: string;
}

@ObjectType()
export class RequiredFieldTypeAction implements HashedAction, ActionDefaults {
  @Field()
  hash: string;

  @Field()
  version: number;

  @Field()
  changeLog: string;
  actionType: 'RequiredFieldTypeAction';

  @Field()
  typeName: string;

  @Field()
  name: string;
}

@ObjectType()
export class RequiredFieldTypeChangeAction implements ActionDefaults {
  @Field()
  changeLog: string;
  actionType: 'RequiredFieldTypeAction';

  @Field()
  typeName: string;

  @Field()
  name: string;
}

@ObjectType()
export class OptionalFieldTypeAction implements HashedAction, ActionDefaults {
  @Field()
  hash: string;

  @Field()
  version: number;

  @Field()
  changeLog: string;
  actionType: 'OptionalFieldTypeAction';

  @Field()
  typeName: string;

  @Field()
  name: string;
}

@ObjectType()
export class OptionalFieldTypeChangeAction implements ActionDefaults {
  @Field()
  changeLog: string;
  actionType: 'OptionalFieldTypeAction';

  @Field()
  typeName: string;

  @Field()
  name: string;
}

@ObjectType()
export class DeleteFieldTypeAction implements HashedAction, ActionDefaults {
  @Field()
  hash: string;

  @Field()
  version: number;

  @Field()
  changeLog: string;
  actionType: 'DeleteFieldTypeAction';

  @Field()
  typeName: string;

  @Field()
  name: string;
}

@ObjectType()
export class DeleteFieldTypeChangeAction implements ActionDefaults {
  @Field()
  changeLog: string;
  actionType: 'DeleteFieldTypeAction';

  @Field()
  typeName: string;

  @Field()
  name: string;
}

@ObjectType()
export class SetDefaultFieldTypeAction implements HashedAction, ActionDefaults {
  @Field()
  hash: string;

  @Field()
  version: number;

  @Field()
  changeLog: string;
  actionType: 'SetDefaultFieldTypeAction';

  @Field()
  typeName: string;

  @Field()
  name: string;

  @Field(type => FieldDefaultsUnion)
  _default: FieldDefaults;
}

@ObjectType()
export class SetDefaultFieldTypeChangeAction implements ActionDefaults {
  @Field()
  changeLog: string;

  actionType: 'SetDefaultFieldTypeAction';

  @Field()
  typeName: string;

  @Field()
  name: string;

  @Field(type => FieldDefaultsUnion)
  _default: FieldDefaults;
}

@ObjectType()
export class RemoveDefaultFieldTypeAction implements HashedAction, ActionDefaults {
  @Field()
  hash: string;

  @Field()
  version: number;

  @Field()
  changeLog: string;
  actionType: 'RemoveDefaultFieldTypeAction';

  @Field()
  typeName: string;

  @Field()
  name: string;
}

@ObjectType()
export class RemoveDefaultFieldTypeChangeAction implements ActionDefaults {
  @Field()
  changeLog: string;

  actionType: 'RemoveDefaultFieldTypeAction';

  @Field()
  typeName: string;

  @Field()
  name: string;
}

@ObjectType()
export class AddFieldTypeAction implements HashedAction, ActionDefaults {
  @Field()
  hash: string;

  @Field()
  version: number;

  @Field()
  changeLog: string;
  actionType: 'AddFieldTypeAction';
  
  @Field()
  typeName: string;

  @Field()
  name: string;

  @Field(type => FieldTypes)
  _type: FieldTypes;
  
  @Field()
  description: string;

  @Field()
  optional: boolean;

  @Field(type => FieldDefaultsUnion, {nullable: true})
  _default?: FieldDefaults;
}

@ObjectType()
export class AddFieldTypeChangeAction implements ActionDefaults {
  @Field()
  changeLog: string;
  actionType: 'AddFieldTypeAction';

  @Field()
  typeName: string;

  @Field()
  name: string;

  @Field(type => FieldTypes)
  _type: FieldTypes;

  @Field()
  description: string;

  @Field()
  optional: boolean;

  @Field(type => FieldDefaultsUnion, {nullable: true})
  _default?: FieldDefaults;
}

@ObjectType()
export class UpdateDescriptionTypeAction implements HashedAction, ActionDefaults {
  @Field()
  hash: string;

  @Field()
  version: number;

  @Field()
  changeLog: string;
  actionType: 'UpdateDescriptionTypeAction';

  @Field()
  typeName: string;

  @Field()
  name: string;

  @Field()
  description: string;
}

@ObjectType()
export class UpdateDescriptionTypeChangeAction implements ActionDefaults {
  @Field()
  changeLog: string;

  actionType: 'UpdateDescriptionTypeAction';

  @Field()
  typeName: string;

  @Field()
  name: string;

  @Field()
  description: string;
}

@ObjectType()
export class ReferenceFieldTypeAction implements HashedAction, ActionDefaults {
  @Field()
  hash: string;

  @Field()
  version: number;

  @Field()
  changeLog: string;
  actionType: 'ReferenceFieldTypeAction';

  @Field()
  typeName: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  optional: boolean;

  @Field()
  referenceType: string;

  @Field()
  referenceHash: string;

  @Field()
  referenceVersion: number;
}

@ObjectType()
export class ReferenceFieldTypeChangeAction implements ActionDefaults {
  @Field()
  changeLog: string;

  actionType: 'ReferenceFieldTypeAction';

  @Field()
  typeName: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  optional: boolean;

  @Field()
  referenceType: string;

  @Field()
  referenceHash: string;

  @Field()
  referenceVersion: number;
}

// Service Definitions
@ObjectType()
export class NewServiceAction implements HashedAction, ActionDefaults {
  @Field()
  hash: string;

  @Field()
  version: number;
  actionType: 'NewServiceAction';

  @Field()
  changeLog: string;

  @Field()
  serviceName: string;

  @Field()
  description: string;
}

@ObjectType()
export class NewServiceChangeAction implements ActionDefaults {
  actionType: 'NewServiceAction';

  @Field()
  changeLog: string;

  @Field()
  serviceName: string;

  @Field()
  description: string;
}

@ObjectType()
export class UpdateDescriptionServiceAction implements HashedAction, ActionDefaults {
  @Field()
  hash: string;

  @Field()
  version: number;

  @Field()
  changeLog: string;
  actionType: 'UpdateDescriptionServiceAction';

  @Field()
  serviceName: string;

  @Field()
  description: string;
}

@ObjectType()
export class UpdateDescriptionServiceChangeAction implements ActionDefaults {
  @Field()
  changeLog: string;

  actionType: 'UpdateDescriptionServiceAction';

  @Field()
  serviceName: string;

  @Field()
  description: string;
}

@ObjectType()
export class AddVersionServiceAction implements HashedAction, ActionDefaults {
  @Field()
  hash: string;

  @Field()
  version: number;

  @Field()
  changeLog: string;
  actionType: 'AddVersionServiceAction';

  @Field()
  serviceName: string;

  @Field()
  inputType: string;

  @Field()
  outputType: string;

  @Field()
  inputVersion: number;

  @Field()
  inputHash: string;

  @Field()
  outputVersion: number;

  @Field()
  outputHash: string;
}

@ObjectType()
export class AddVersionServiceChangeAction implements ActionDefaults {
  @Field()
  changeLog: string;

  actionType: 'AddVersionServiceAction';

  @Field()
  serviceName: string;

  @Field()
  inputType: string;
  
  @Field()
  outputType: string;

  @Field()
  inputVersion: number;

  @Field()
  inputHash: string;

  @Field()
  outputVersion: number;

  @Field()
  outputHash: string;
};

export type Action = NewTypeAction | RenameFieldTypeAction 
  | RequiredFieldTypeAction | OptionalFieldTypeAction | DeleteFieldTypeAction 
  | SetDefaultFieldTypeAction | RemoveDefaultFieldTypeAction | AddFieldTypeAction 
  | UpdateDescriptionTypeAction | ReferenceFieldTypeAction | NewServiceAction
  | UpdateDescriptionServiceAction | AddVersionServiceAction;

export const ActionUnion = createUnionType({
  name: "Action",
  types: () => [NewTypeAction, RenameFieldTypeAction, RequiredFieldTypeAction, 
    OptionalFieldTypeAction, DeleteFieldTypeAction , SetDefaultFieldTypeAction, 
    RemoveDefaultFieldTypeAction, AddFieldTypeAction, 
    UpdateDescriptionTypeAction, ReferenceFieldTypeAction, NewServiceAction, 
    UpdateDescriptionServiceAction, AddVersionServiceAction
  ],
  resolveType: (value: Action) => {
    return value.actionType;
  }
});

export type ChangeAction = NewTypeChangeAction | RenameFieldTypeChangeAction 
  | RequiredFieldTypeChangeAction | OptionalFieldTypeChangeAction 
  | DeleteFieldTypeChangeAction | SetDefaultFieldTypeChangeAction 
  | RemoveDefaultFieldTypeChangeAction | AddFieldTypeChangeAction 
  | UpdateDescriptionTypeChangeAction | ReferenceFieldTypeChangeAction 
  | NewServiceChangeAction | UpdateDescriptionServiceChangeAction 
  | AddVersionServiceChangeAction;

export const ChangeActionUnion = createUnionType({
  name: "ChangeAction",
  types: () => [NewTypeChangeAction, RenameFieldTypeChangeAction, 
    RequiredFieldTypeChangeAction, OptionalFieldTypeChangeAction, 
    DeleteFieldTypeChangeAction, SetDefaultFieldTypeChangeAction, 
    RemoveDefaultFieldTypeChangeAction, AddFieldTypeChangeAction, 
    UpdateDescriptionTypeChangeAction, ReferenceFieldTypeChangeAction, 
    NewServiceChangeAction , UpdateDescriptionServiceChangeAction, 
    AddVersionServiceChangeAction
  ],
  resolveType: (value: ChangeAction) => {
    switch (value.actionType) {
    case 'AddVersionServiceAction':
      return 'AddVersionServiceChangeAction';
    case 'UpdateDescriptionServiceAction':
      return 'UpdateDescriptionServiceChangeAction';
    case 'NewServiceAction':
      return 'NewServiceChangeAction';
    case 'ReferenceFieldTypeAction':
      return 'ReferenceFieldTypeChangeAction';
    case 'UpdateDescriptionTypeAction':
      return 'UpdateDescriptionTypeChangeAction';
    case 'AddFieldTypeAction':
      return 'AddFieldTypeChangeAction';
    case 'RemoveDefaultFieldTypeAction':
      return 'RemoveDefaultFieldTypeChangeAction';
    case 'SetDefaultFieldTypeAction':
      return 'SetDefaultFieldTypeChangeAction';
    case 'DeleteFieldTypeAction':
      return 'DeleteFieldTypeChangeAction';
    case 'OptionalFieldTypeAction':
      return 'OptionalFieldTypeChangeAction';
    case 'RequiredFieldTypeAction':
      return 'RequiredFieldTypeChangeAction';
    case 'RenameFieldTypeAction':
      return 'RenameFieldTypeChangeAction';
    case 'NewTypeAction':
      return 'NewTypeChangeAction';
    default:
      throw new Error(
        `Can't find change action type for ${JSON.stringify(value)}`
      );
    }
  }
});

export type GroupVersions = {
  [key: string]: number;
};

@ObjectType()
export class GroupAction implements HashedAction {
  @Field()
  hash: string;

  @Field()
  version: number;

  @Field()
  actionType: 'GroupAction';

  @Field(type => [ActionUnion])
  actions: Action[];

  versions: GroupVersions;
}
export class GroupChangeAction {
  actionType: 'GroupAction';
  actions: Action[];
  versions: GroupVersions;
}

export function fieldsToHash(action: ChangeAction | GroupChangeAction) {
  switch (action.actionType) {
  case 'AddVersionServiceAction':
    return `${action.changeLog}_${action.serviceName}_${action.inputType}_${action.outputType}_${action.inputVersion}_${action.outputVersion}`;
  case 'UpdateDescriptionServiceAction':
    return `${action.changeLog}_${action.serviceName}_${action.description}`;
  case 'NewServiceAction':
    return `${action.changeLog}_${action.serviceName}_${action.description}`;
  case 'ReferenceFieldTypeAction':
    return `${action.changeLog}_${action.typeName}_${action.name}_${action.description}_${action.optional}_${action.referenceType}_${action.referenceHash}_${action.referenceVersion}`;
  case 'UpdateDescriptionTypeAction':
    return `${action.changeLog}_${action.typeName}_${action.description}`;
  case 'AddFieldTypeAction':
    return `${action.changeLog}_${action.typeName}_${action.name}_${action._type}_${action.description}_${action.optional}_${action._default}`;
  case 'RemoveDefaultFieldTypeAction':
    return `${action.changeLog}_${action.typeName}_${action.name}`;
  case 'SetDefaultFieldTypeAction':
    return `${action.changeLog}_${action.typeName}_${action.name}_${action._default}`;
  case 'DeleteFieldTypeAction':
    return `${action.changeLog}_${action.typeName}_${action.name}`; 
  case 'OptionalFieldTypeAction':
    return `${action.changeLog}_${action.typeName}_${action.name}`;
  case 'RequiredFieldTypeAction':
    return `${action.changeLog}_${action.typeName}_${action.name}`;
  case 'RenameFieldTypeAction':
    return `${action.changeLog}_${action.typeName}_${action._from}_${action.to}`;
  case 'NewTypeAction':
    return `${action.changeLog}_${action.typeName}_${action.description}`;
  case 'GroupAction':
    const subHashes: string[] = [];
    for (const subAction of action.actions) {
      subHashes.push(fieldsToHash(subAction));
    }
    return subHashes.join('_');
  default:
    throw new Error(`Can't hash ${JSON.stringify(action, null, 4)}`)
  }
};

@ObjectType()
export class ChangeSet {
  @Field()
  id: string;

  @Field(type => [ChangeActionUnion])
  log: ChangeAction[];

  @Field({nullable: true})
  baseHash?: string 
};