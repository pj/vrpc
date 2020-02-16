import {
    Resolver, 
    Query, 
    Arg, 
    Mutation, 
    Ctx, 
    InputType, 
    ObjectType,
    Field,
    FieldResolver,
    Root,
    createUnionType
} from 'type-graphql';
import {Type, Service, VersionType, Version, ReferenceField, ScalarField, BaseField} from './generate';
import {ActionUnion, ChangeSet, GroupAction, NewServiceChangeAction, UpdateDescriptionServiceChangeAction, AddVersionServiceChangeAction, RenameFieldTypeChangeAction, RequiredFieldTypeChangeAction, OptionalFieldTypeChangeAction, DeleteFieldTypeChangeAction, SetDefaultFieldTypeChangeAction, RemoveDefaultFieldTypeChangeAction, AddFieldTypeChangeAction, UpdateDescriptionTypeChangeAction, ReferenceFieldTypeChangeAction, NewTypeChangeAction, ChangeAction, FieldDefaultsUnion, FieldDefaults, FieldTypes, StringField, BooleanField, FloatField, IntegerField, SetDefaultFieldTypeAction, AddFieldTypeAction } from './action';
import { Backend } from './backend';
import { version } from 'punycode';

@InputType()
export class FieldDataInput {
  @Field({nullable: true})
  stringValue?: string;

  @Field({nullable: true})
  integerValue?: number;

  @Field({nullable: true})
  floatValue?: number;

  @Field({nullable: true})
  booleanValue?: boolean;
}

@InputType()
export class NewTypeInputAction {
  actionType: 'NewTypeAction';
  @Field()
  changeLog: string;

  @Field()
  typeName: string;

  @Field()
  description: string;
}

@InputType()
export class RenameFieldTypeInputAction {
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

@InputType()
export class RequiredFieldTypeInputAction {
  @Field()
  changeLog: string;
  actionType: 'RequiredFieldTypeAction';

  @Field()
  typeName: string;

  @Field()
  name: string;
}

@InputType()
export class OptionalFieldTypeInputAction {
  @Field()
  changeLog: string;
  actionType: 'OptionalFieldTypeAction';

  @Field()
  typeName: string;

  @Field()
  name: string;
}

@InputType()
export class DeleteFieldTypeInputAction {
  @Field()
  changeLog: string;
  actionType: 'DeleteFieldTypeAction';

  @Field()
  typeName: string;

  @Field()
  name: string;
}

@InputType()
export class SetDefaultFieldTypeInputAction {
  @Field()
  changeLog: string;

  actionType: 'SetDefaultFieldTypeAction';

  @Field()
  typeName: string;

  @Field()
  name: string;

  @Field(type => FieldDataInput)
  _default: FieldDataInput
}

@InputType()
export class RemoveDefaultFieldTypeInputAction {
  @Field()
  changeLog: string;

  actionType: 'RemoveDefaultFieldTypeAction';

  @Field()
  typeName: string;

  @Field()
  name: string;
}

@InputType()
export class AddFieldTypeInputAction {
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

  @Field(type => FieldDataInput)
  _default: FieldDataInput
}

@InputType()
export class UpdateDescriptionTypeInputAction {
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

@InputType()
export class ReferenceFieldTypeInputAction {
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
@InputType()
export class NewServiceInputAction {
  actionType: 'NewServiceAction';

  @Field()
  changeLog: string;

  @Field()
  serviceName: string;

  @Field()
  description: string;
}

@InputType()
export class UpdateDescriptionServiceInputAction {
  @Field()
  changeLog: string;

  actionType: 'UpdateDescriptionServiceAction';

  @Field()
  serviceName: string;

  @Field()
  description: string;
}

@InputType()
export class AddVersionServiceInputAction {
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

@InputType()
class ChangeSetAction {
  @Field(type => NewServiceInputAction, { nullable: true })
  newService?: NewServiceInputAction;

  @Field(type => UpdateDescriptionServiceInputAction, { nullable: true })
  updateServiceDescription?: UpdateDescriptionServiceInputAction;

  @Field(type => AddVersionServiceInputAction, { nullable: true })
  addVersion?: AddVersionServiceInputAction;

  @Field(type => RenameFieldTypeInputAction, { nullable: true })
  renameField?: RenameFieldTypeInputAction;

  @Field(type => RequiredFieldTypeInputAction, { nullable: true })
  requiredField?: RequiredFieldTypeInputAction;

  @Field(type => OptionalFieldTypeInputAction, { nullable: true })
  optionalField?: OptionalFieldTypeInputAction;

  @Field(type => DeleteFieldTypeInputAction, { nullable: true })
  deleteField?: DeleteFieldTypeInputAction;

  @Field(type => SetDefaultFieldTypeInputAction, { nullable: true })
  setDefault?: SetDefaultFieldTypeInputAction;

  @Field(type => RemoveDefaultFieldTypeInputAction, { nullable: true })
  removeDefault?: RemoveDefaultFieldTypeInputAction;

  @Field(type => AddFieldTypeInputAction, { nullable: true })
  addField?: AddFieldTypeInputAction;

  @Field(type => UpdateDescriptionTypeInputAction, { nullable: true })
  updateTypeDescription?: UpdateDescriptionTypeInputAction;

  @Field(type => ReferenceFieldTypeInputAction, { nullable: true })
  referenceField?: ReferenceFieldTypeInputAction;

  @Field(type => NewTypeInputAction, { nullable: true })
  newType?: NewTypeInputAction;
}

@InputType()
class ChangeSetInput {
  @Field()
  id: string;

  @Field({nullable: true})
  baseHash?: string;

  @Field(type => [ChangeSetAction])
  log: ChangeSetAction[]
}

function fieldInputToDefault(
  inputDefault?: FieldDataInput
): FieldDefaults | undefined {
  if (!inputDefault) {
    return undefined;
  }
  if (inputDefault.booleanValue) {
    return inputDefault.booleanValue;
  } else if (inputDefault.stringValue) {
    return inputDefault.stringValue;
  } else if (inputDefault.integerValue) {
    return inputDefault.integerValue;
  } else if (inputDefault.floatValue) {
    return inputDefault.floatValue;
  } else {
    throw new Error(`Unknown field data input ${inputDefault}`);
  }
}

export function actionInputToChangeAction(
    logAction: ChangeSetAction
): ChangeAction {
  if (logAction.newService) {
    return ({
      actionType: 'NewServiceAction',
      changeLog: logAction.newService.changeLog,
      serviceName: logAction.newService.serviceName,
      description: logAction.newService.description
    });
  } else if (logAction.updateServiceDescription) {
    return ({
      actionType: 'UpdateDescriptionServiceAction',
      changeLog: logAction.updateServiceDescription.changeLog,
      serviceName: logAction.updateServiceDescription.serviceName,
      description: logAction.updateServiceDescription.description
    });
  } else if (logAction.addVersion) {
    return ({
      actionType: 'AddVersionServiceAction',
      changeLog: logAction.addVersion.changeLog,
      serviceName: logAction.addVersion.serviceName,
      inputType: logAction.addVersion.inputType,
      outputType: logAction.addVersion.outputType,
      inputVersion: logAction.addVersion.inputVersion,
      inputHash: logAction.addVersion.inputHash,
      outputVersion: logAction.addVersion.outputVersion,
      outputHash: logAction.addVersion.outputHash,
    });
  } else if (logAction.renameField) {
    return ({
      actionType: 'RenameFieldTypeAction',
      changeLog: logAction.renameField.changeLog,
      typeName: logAction.renameField.typeName,
      _from: logAction.renameField._from,
      to: logAction.renameField.to
    });
  } else if (logAction.requiredField) {
    return ({
      actionType: 'RequiredFieldTypeAction',
      changeLog: logAction.requiredField.changeLog,
      typeName: logAction.requiredField.typeName,
      name: logAction.requiredField.name
    });
  } else if (logAction.optionalField) {
    return ({
      actionType: 'OptionalFieldTypeAction',
      changeLog: logAction.optionalField.changeLog,
      typeName: logAction.optionalField.typeName,
      name: logAction.optionalField.name
    });
  } else if (logAction.deleteField) {
    return ({
      actionType: 'DeleteFieldTypeAction',
      changeLog: logAction.deleteField.changeLog,
      typeName: logAction.deleteField.typeName,
      name: logAction.deleteField.name
    });
  } else if (logAction.setDefault) {
    const _default = fieldInputToDefault(logAction.setDefault._default);
    if (!_default) {
      throw new Error('should not happen');
    }
    return ({
      actionType: 'SetDefaultFieldTypeAction',
      changeLog: logAction.setDefault.changeLog,
      typeName: logAction.setDefault.typeName,
      name: logAction.setDefault.name,
      _default: _default
    });
  } else if (logAction.removeDefault) {
    return ({
      actionType: 'RemoveDefaultFieldTypeAction',
      changeLog: logAction.removeDefault.changeLog,
      typeName: logAction.removeDefault.typeName,
      name: logAction.removeDefault.name
    });
  } else if (logAction.addField) {
    let _default = undefined;
    if (logAction.addField._default) {
      _default = fieldInputToDefault(logAction.addField._default);
    }
    return ({
      actionType: 'AddFieldTypeAction',
      changeLog: logAction.addField.changeLog,
      typeName: logAction.addField.typeName,
      name: logAction.addField.name,
      _type: logAction.addField._type,
      description: logAction.addField.description,
      optional: logAction.addField.optional,
      _default
    });
  } else if (logAction.updateTypeDescription) {
    return ({
      actionType: 'UpdateDescriptionTypeAction',
      changeLog: logAction.updateTypeDescription.changeLog,
      typeName: logAction.updateTypeDescription.typeName,
      name: logAction.updateTypeDescription.name,
      description: logAction.updateTypeDescription.description
    });
  } else if (logAction.referenceField) {
    return ({
      actionType: 'ReferenceFieldTypeAction',
      changeLog: logAction.referenceField.changeLog,
      typeName: logAction.referenceField.typeName,
      name: logAction.referenceField.name,
      description: logAction.referenceField.description,
      optional: logAction.referenceField.optional,
      referenceType: logAction.referenceField.referenceType,
      referenceHash: logAction.referenceField.referenceHash,
      referenceVersion: logAction.referenceField.referenceVersion
    });
  } else if (logAction.newType) {
    return ({
      actionType: 'NewTypeAction',
      changeLog: logAction.newType.changeLog,
      typeName: logAction.newType.typeName,
      description: logAction.newType.description
    });
  }

  throw new Error("Change action must contain one action input");
}

export function inputChangesetToChangeSet(
    changeSet: ChangeSetInput
): ChangeSet {
  const log = changeSet.log.map(c => actionInputToChangeAction(c));
  return ({
    id: changeSet.id,
    baseHash: changeSet.baseHash,
    log: log
  });
}

@ObjectType()
export class CommitOutput {
    @Field(type => [GroupAction])
    log: GroupAction[];

    @Field(type => [Type])
    types: Type[];

    @Field(type => [Service])
    services: Service[];

    @Field(type => [ChangeSet])
    changeSets: ChangeSet[];
}

@ObjectType('ServiceVersionType')
export class GQLVersionType {
  @Field(type => VersionType)
  output: VersionType;

  @Field(type => [VersionType])
  inputs: VersionType[];
}

@Resolver(of => Service)
export class ServiceResolver {
  @FieldResolver(type => [GQLVersionType])
  versions(@Root() service: Service): GQLVersionType[] {
    const versionTypes = [];
    for (let serviceVersion of Object.values(service.versions)) {
      const gqlVersionType = new GQLVersionType();
      gqlVersionType.output = serviceVersion.output;
      gqlVersionType.inputs = serviceVersion.inputs;
      versionTypes.push(gqlVersionType);
    }

    return versionTypes;
  }
}

export const FieldUnion = createUnionType({
  name: "FieldUnion",
  types: () => [ReferenceField, ScalarField]
});

@Resolver(of => Version)
export class VersionResolver {
  @FieldResolver(type => [FieldUnion])
  fields(@Root() version: Version): Array<BaseField> {
    const fields = [];
    for (let field of Object.values(version.fields)) {
      fields.push(field);
    }

    return fields;
  }
}

function defaultToField(
  _default?: FieldDefaults
): StringField | BooleanField | FloatField | IntegerField | undefined  {
  if (_default === undefined) {
    return undefined;
  } else if (typeof _default === 'string') {
      return ({
        value: _default
      });
  } else if (typeof _default === 'number') {
      return ({
        value: _default
      });
  } else if (typeof _default === 'boolean') {
      return ({
        value: _default
      });
  }

  throw new Error(`Unknown type of _default ${_default}`);
}

@Resolver(of => ScalarField)
export class ScalarFieldResolver {
  @FieldResolver(type => [FieldDefaultsUnion], {nullable: true})
  _default(
    @Root() scalarField: ScalarField
  ): StringField | BooleanField | FloatField | IntegerField | undefined {
    return defaultToField(scalarField._default);
  }
}

@Resolver(of => SetDefaultFieldTypeAction)
export class SetDefaultFieldTypeActionResolver {
  @FieldResolver(type => [FieldDefaultsUnion], {nullable: true})
  _default(
    @Root() action: SetDefaultFieldTypeAction
  ): StringField | BooleanField | FloatField | IntegerField | undefined {
    return defaultToField(action._default);
  }
}

@Resolver(of => SetDefaultFieldTypeChangeAction)
export class SetDefaultFieldTypeChangeActionResolver {
  @FieldResolver(type => [FieldDefaultsUnion], {nullable: true})
  _default(
    @Root() action: SetDefaultFieldTypeChangeAction
  ): StringField | BooleanField | FloatField | IntegerField | undefined {
    return defaultToField(action._default);
  }
}

@Resolver(of => AddFieldTypeAction)
export class AddFieldTypeActionResolver {
  @FieldResolver(type => [FieldDefaultsUnion], {nullable: true})
  _default(
    @Root() action: AddFieldTypeAction
  ): StringField | BooleanField | FloatField | IntegerField | undefined {
    return defaultToField(action._default);
  }
}

@Resolver(of => AddFieldTypeChangeAction)
export class AddFieldTypeChangeActionResolver {
  @FieldResolver(type => [FieldDefaultsUnion], {nullable: true})
  _default(
    @Root() action: AddFieldTypeChangeAction
  ): StringField | BooleanField | FloatField | IntegerField | undefined {
    return defaultToField(action._default);
  }
}
export type VRPCContext = {
    backend: Backend;
}

@Resolver()
export class VRPCResolver {
  @Query(returns => [GroupAction])
  async log(
    @Ctx() context: VRPCContext
  ): Promise<Array<GroupAction>>{
    return (await context.backend.getLog());
  }

  @Query(returns => [Type])
  async types(
    @Ctx() context: VRPCContext
  ): Promise<Array<Type>> {
    return (await context.backend.getCurrentTypes());
  }

  @Query(returns => [Service])
  async services(
    @Ctx() context: VRPCContext
  ): Promise<Array<Service>> {
    return (await context.backend.getCurrentServices());
  }

  @Query(returns => ChangeSet)
  async changeSet(
    @Arg("changeSetId") changeSetId: string,
    @Ctx() context: VRPCContext
  ): Promise<ChangeSet> {
    return (await context.backend.getChangeSet("test", changeSetId));
  }

  @Query(returns => [ChangeSet])
  async changeSets(
    @Ctx() context: VRPCContext
  ): Promise<Array<ChangeSet>> {
    return (await context.backend.getChangeSets("test"));
  }

  @Mutation(returns => ChangeSet)
  async updateChangeSet(
      @Arg("changeSet") changeSet: ChangeSetInput, 
      @Ctx() context: VRPCContext
  ): Promise<ChangeSet> {
    const updatedChangeSet = inputChangesetToChangeSet(changeSet);
    await context.backend.updateChangeSet(
        "test", 
        changeSet.id, 
        updatedChangeSet
    );
    return (await context.backend.getChangeSet("test", changeSet.id));
  }

  @Mutation(returns => CommitOutput)
  async commitChangeSet(
    @Arg("changeSetId") changeSetId: string, 
    @Ctx() context: VRPCContext
  ): Promise<CommitOutput> {
    await context.backend.commitChangeSet("test", changeSetId);
    const log = await context.backend.getLog();
    const types = await context.backend.getCurrentTypes();
    const services = await context.backend.getCurrentServices();
    const changeSets = await context.backend.getChangeSets("test");
    return ({
        log: log, 
        types: types, 
        services: services, 
        changeSets: changeSets
    });
  }

  @Mutation(returns => [ChangeSet])
  async deleteChangeSet(
    @Arg("changeSetId") changeSetId: string, 
    @Ctx() context: VRPCContext
  ): Promise<Array<ChangeSet>> {
    await context.backend.deleteChangeSet("test", changeSetId);
    return (await context.backend.getChangeSets("test"));
  }
}