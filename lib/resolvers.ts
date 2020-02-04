import {
    Resolver, 
    Query, 
    Arg, 
    Mutation, 
    Ctx, 
    InputType, 
    Field
} from 'type-graphql';
import {Type, Service} from './generate';
import {ActionUnion, ChangeSet, NewServiceChangeAction, 
    UpdateDescriptionServiceChangeAction, AddVersionServiceChangeAction, 
    RenameFieldTypeChangeAction, RequiredFieldTypeChangeAction, 
    OptionalFieldTypeChangeAction, DeleteFieldTypeChangeAction, 
    SetDefaultFieldTypeChangeAction, RemoveDefaultFieldTypeChangeAction, 
    AddFieldTypeChangeAction, UpdateDescriptionTypeChangeAction, 
    ReferenceFieldTypeChangeAction, NewTypeChangeAction} from './action';
import { Backend } from './backend';

// @InputType()
// class ChangeSetInput {
//   @Field()
//   id: string;

//   @Field()
//   baseHash: string;

//   @Field({ nullable: true })
//   newService?: NewServiceChangeAction;

//   @Field({ nullable: true })
//   updateServiceDescription?: UpdateDescriptionServiceChangeAction;

//   @Field({ nullable: true })
//   addVersion?: AddVersionServiceChangeAction;

//   @Field({ nullable: true })
//   renameField?: RenameFieldTypeChangeAction;

//   @Field({ nullable: true })
//   requiredField?: RequiredFieldTypeChangeAction;

//   @Field({ nullable: true })
//   optionalField?: OptionalFieldTypeChangeAction;

//   @Field({ nullable: true })
//   deleteField?: DeleteFieldTypeChangeAction;

//   @Field({ nullable: true })
//   setDefault?: SetDefaultFieldTypeChangeAction;

//   @Field({ nullable: true })
//   removeDefault?: RemoveDefaultFieldTypeChangeAction;

//   @Field({ nullable: true })
//   addField?: AddFieldTypeChangeAction;

//   @Field({ nullable: true })
//   updateTypeDescription?: UpdateDescriptionTypeChangeAction;

//   @Field({ nullable: true })
//   referenceField?: ReferenceFieldTypeChangeAction;

//   @Field({ nullable: true })
//   newType?: NewTypeChangeAction;
// }

export type VRPCContext = {
    backend: Backend;
}

@Resolver()
export class VRPCResolver {
  @Query(returns => [ActionUnion])
  async log(
    @Ctx() context: VRPCContext
  ): Promise<Array<typeof ActionUnion>>{
    return [];
  }

  @Query(returns => [Type])
  async types(
    @Ctx() context: VRPCContext
  ): Promise<Array<Type>> {
    return [];
  }

//   @Query(returns => [Service])
//   async services(
//     @Ctx() context: VRPCContext
//   ): Promise<Array<Service>> {
//     return [];
//   }

//   @Query(returns => ChangeSet)
//   async changeSet(
//     @Arg("changeSetId") changeSetId: string,
//     @Ctx() context: VRPCContext
//   ): Promise<ChangeSet> {
//     return null;
//   }

//   @Query(returns => [ChangeSet])
//   async changeSets(
//     @Ctx() context: VRPCContext
//   ): Promise<Array<ChangeSet>> {
//     return [];
//   }

//   @Mutation()
//   updateChangeSet(
//       @Arg("changeSet") changeSet: ChangeSetInput, 
//       @Ctx() ctx: VRPCContext
//   ): ChangeSet {
//     return null;
//   }

//   @Mutation()
//   commitChangeSet(
//     @Arg("changeSetId") changeSetId: string, 
//     @Ctx() ctx: VRPCContext
//   ): ChangeSet {
//     return null;
//   }

//   @Mutation()
//   deleteChangeSet(
//     @Arg("changeSetId") changeSet: string, 
//     @Ctx() ctx: VRPCContext
//   ): ChangeSet[] {
//     return [];
//   }
}