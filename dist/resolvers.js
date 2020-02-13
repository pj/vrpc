"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const generate_1 = require("./generate");
const action_1 = require("./action");
let FieldDataInput = class FieldDataInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], FieldDataInput.prototype, "stringValue", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], FieldDataInput.prototype, "integerValue", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], FieldDataInput.prototype, "floatValue", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Boolean)
], FieldDataInput.prototype, "booleanValue", void 0);
FieldDataInput = __decorate([
    type_graphql_1.InputType()
], FieldDataInput);
exports.FieldDataInput = FieldDataInput;
let NewTypeInputAction = class NewTypeInputAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewTypeInputAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewTypeInputAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewTypeInputAction.prototype, "description", void 0);
NewTypeInputAction = __decorate([
    type_graphql_1.InputType()
], NewTypeInputAction);
exports.NewTypeInputAction = NewTypeInputAction;
let RenameFieldTypeInputAction = class RenameFieldTypeInputAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RenameFieldTypeInputAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RenameFieldTypeInputAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RenameFieldTypeInputAction.prototype, "_from", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RenameFieldTypeInputAction.prototype, "to", void 0);
RenameFieldTypeInputAction = __decorate([
    type_graphql_1.InputType()
], RenameFieldTypeInputAction);
exports.RenameFieldTypeInputAction = RenameFieldTypeInputAction;
let RequiredFieldTypeInputAction = class RequiredFieldTypeInputAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RequiredFieldTypeInputAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RequiredFieldTypeInputAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RequiredFieldTypeInputAction.prototype, "name", void 0);
RequiredFieldTypeInputAction = __decorate([
    type_graphql_1.InputType()
], RequiredFieldTypeInputAction);
exports.RequiredFieldTypeInputAction = RequiredFieldTypeInputAction;
let OptionalFieldTypeInputAction = class OptionalFieldTypeInputAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], OptionalFieldTypeInputAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], OptionalFieldTypeInputAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], OptionalFieldTypeInputAction.prototype, "name", void 0);
OptionalFieldTypeInputAction = __decorate([
    type_graphql_1.InputType()
], OptionalFieldTypeInputAction);
exports.OptionalFieldTypeInputAction = OptionalFieldTypeInputAction;
let DeleteFieldTypeInputAction = class DeleteFieldTypeInputAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], DeleteFieldTypeInputAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], DeleteFieldTypeInputAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], DeleteFieldTypeInputAction.prototype, "name", void 0);
DeleteFieldTypeInputAction = __decorate([
    type_graphql_1.InputType()
], DeleteFieldTypeInputAction);
exports.DeleteFieldTypeInputAction = DeleteFieldTypeInputAction;
let SetDefaultFieldTypeInputAction = class SetDefaultFieldTypeInputAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SetDefaultFieldTypeInputAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SetDefaultFieldTypeInputAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SetDefaultFieldTypeInputAction.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(type => FieldDataInput),
    __metadata("design:type", FieldDataInput)
], SetDefaultFieldTypeInputAction.prototype, "_default", void 0);
SetDefaultFieldTypeInputAction = __decorate([
    type_graphql_1.InputType()
], SetDefaultFieldTypeInputAction);
exports.SetDefaultFieldTypeInputAction = SetDefaultFieldTypeInputAction;
let RemoveDefaultFieldTypeInputAction = class RemoveDefaultFieldTypeInputAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RemoveDefaultFieldTypeInputAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RemoveDefaultFieldTypeInputAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RemoveDefaultFieldTypeInputAction.prototype, "name", void 0);
RemoveDefaultFieldTypeInputAction = __decorate([
    type_graphql_1.InputType()
], RemoveDefaultFieldTypeInputAction);
exports.RemoveDefaultFieldTypeInputAction = RemoveDefaultFieldTypeInputAction;
let AddFieldTypeInputAction = class AddFieldTypeInputAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddFieldTypeInputAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddFieldTypeInputAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddFieldTypeInputAction.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(type => action_1.FieldTypes),
    __metadata("design:type", String)
], AddFieldTypeInputAction.prototype, "_type", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddFieldTypeInputAction.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], AddFieldTypeInputAction.prototype, "optional", void 0);
__decorate([
    type_graphql_1.Field(type => FieldDataInput),
    __metadata("design:type", FieldDataInput)
], AddFieldTypeInputAction.prototype, "_default", void 0);
AddFieldTypeInputAction = __decorate([
    type_graphql_1.InputType()
], AddFieldTypeInputAction);
exports.AddFieldTypeInputAction = AddFieldTypeInputAction;
let UpdateDescriptionTypeInputAction = class UpdateDescriptionTypeInputAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateDescriptionTypeInputAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateDescriptionTypeInputAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateDescriptionTypeInputAction.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateDescriptionTypeInputAction.prototype, "description", void 0);
UpdateDescriptionTypeInputAction = __decorate([
    type_graphql_1.InputType()
], UpdateDescriptionTypeInputAction);
exports.UpdateDescriptionTypeInputAction = UpdateDescriptionTypeInputAction;
let ReferenceFieldTypeInputAction = class ReferenceFieldTypeInputAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ReferenceFieldTypeInputAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ReferenceFieldTypeInputAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ReferenceFieldTypeInputAction.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ReferenceFieldTypeInputAction.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], ReferenceFieldTypeInputAction.prototype, "optional", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ReferenceFieldTypeInputAction.prototype, "referenceType", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ReferenceFieldTypeInputAction.prototype, "referenceHash", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ReferenceFieldTypeInputAction.prototype, "referenceVersion", void 0);
ReferenceFieldTypeInputAction = __decorate([
    type_graphql_1.InputType()
], ReferenceFieldTypeInputAction);
exports.ReferenceFieldTypeInputAction = ReferenceFieldTypeInputAction;
// Service Definitions
let NewServiceInputAction = class NewServiceInputAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewServiceInputAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewServiceInputAction.prototype, "serviceName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewServiceInputAction.prototype, "description", void 0);
NewServiceInputAction = __decorate([
    type_graphql_1.InputType()
], NewServiceInputAction);
exports.NewServiceInputAction = NewServiceInputAction;
let UpdateDescriptionServiceInputAction = class UpdateDescriptionServiceInputAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateDescriptionServiceInputAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateDescriptionServiceInputAction.prototype, "serviceName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateDescriptionServiceInputAction.prototype, "description", void 0);
UpdateDescriptionServiceInputAction = __decorate([
    type_graphql_1.InputType()
], UpdateDescriptionServiceInputAction);
exports.UpdateDescriptionServiceInputAction = UpdateDescriptionServiceInputAction;
let AddVersionServiceInputAction = class AddVersionServiceInputAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddVersionServiceInputAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddVersionServiceInputAction.prototype, "serviceName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddVersionServiceInputAction.prototype, "inputType", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddVersionServiceInputAction.prototype, "outputType", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], AddVersionServiceInputAction.prototype, "inputVersion", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddVersionServiceInputAction.prototype, "inputHash", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], AddVersionServiceInputAction.prototype, "outputVersion", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddVersionServiceInputAction.prototype, "outputHash", void 0);
AddVersionServiceInputAction = __decorate([
    type_graphql_1.InputType()
], AddVersionServiceInputAction);
exports.AddVersionServiceInputAction = AddVersionServiceInputAction;
;
let ChangeSetAction = class ChangeSetAction {
};
__decorate([
    type_graphql_1.Field(type => NewServiceInputAction, { nullable: true }),
    __metadata("design:type", NewServiceInputAction)
], ChangeSetAction.prototype, "newService", void 0);
__decorate([
    type_graphql_1.Field(type => UpdateDescriptionServiceInputAction, { nullable: true }),
    __metadata("design:type", UpdateDescriptionServiceInputAction)
], ChangeSetAction.prototype, "updateServiceDescription", void 0);
__decorate([
    type_graphql_1.Field(type => AddVersionServiceInputAction, { nullable: true }),
    __metadata("design:type", AddVersionServiceInputAction)
], ChangeSetAction.prototype, "addVersion", void 0);
__decorate([
    type_graphql_1.Field(type => RenameFieldTypeInputAction, { nullable: true }),
    __metadata("design:type", RenameFieldTypeInputAction)
], ChangeSetAction.prototype, "renameField", void 0);
__decorate([
    type_graphql_1.Field(type => RequiredFieldTypeInputAction, { nullable: true }),
    __metadata("design:type", RequiredFieldTypeInputAction)
], ChangeSetAction.prototype, "requiredField", void 0);
__decorate([
    type_graphql_1.Field(type => OptionalFieldTypeInputAction, { nullable: true }),
    __metadata("design:type", OptionalFieldTypeInputAction)
], ChangeSetAction.prototype, "optionalField", void 0);
__decorate([
    type_graphql_1.Field(type => DeleteFieldTypeInputAction, { nullable: true }),
    __metadata("design:type", DeleteFieldTypeInputAction)
], ChangeSetAction.prototype, "deleteField", void 0);
__decorate([
    type_graphql_1.Field(type => SetDefaultFieldTypeInputAction, { nullable: true }),
    __metadata("design:type", SetDefaultFieldTypeInputAction)
], ChangeSetAction.prototype, "setDefault", void 0);
__decorate([
    type_graphql_1.Field(type => RemoveDefaultFieldTypeInputAction, { nullable: true }),
    __metadata("design:type", RemoveDefaultFieldTypeInputAction)
], ChangeSetAction.prototype, "removeDefault", void 0);
__decorate([
    type_graphql_1.Field(type => AddFieldTypeInputAction, { nullable: true }),
    __metadata("design:type", AddFieldTypeInputAction)
], ChangeSetAction.prototype, "addField", void 0);
__decorate([
    type_graphql_1.Field(type => UpdateDescriptionTypeInputAction, { nullable: true }),
    __metadata("design:type", UpdateDescriptionTypeInputAction)
], ChangeSetAction.prototype, "updateTypeDescription", void 0);
__decorate([
    type_graphql_1.Field(type => ReferenceFieldTypeInputAction, { nullable: true }),
    __metadata("design:type", ReferenceFieldTypeInputAction)
], ChangeSetAction.prototype, "referenceField", void 0);
__decorate([
    type_graphql_1.Field(type => NewTypeInputAction, { nullable: true }),
    __metadata("design:type", NewTypeInputAction)
], ChangeSetAction.prototype, "newType", void 0);
ChangeSetAction = __decorate([
    type_graphql_1.InputType()
], ChangeSetAction);
let ChangeSetInput = class ChangeSetInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ChangeSetInput.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], ChangeSetInput.prototype, "baseHash", void 0);
__decorate([
    type_graphql_1.Field(type => [ChangeSetAction]),
    __metadata("design:type", Array)
], ChangeSetInput.prototype, "log", void 0);
ChangeSetInput = __decorate([
    type_graphql_1.InputType()
], ChangeSetInput);
function actionInputToChangeAction(logAction) {
    if (logAction.newService) {
        return ({
            actionType: 'NewServiceAction',
            changeLog: logAction.newService.changeLog,
            serviceName: logAction.newService.serviceName,
            description: logAction.newService.description
        });
    }
    else if (logAction.updateServiceDescription) {
        return ({
            actionType: 'UpdateDescriptionServiceAction',
            changeLog: logAction.updateServiceDescription.changeLog,
            serviceName: logAction.updateServiceDescription.serviceName,
            description: logAction.updateServiceDescription.description
        });
    }
    else if (logAction.addVersion) {
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
    }
    else if (logAction.renameField) {
        return ({
            actionType: 'RenameFieldTypeAction',
            changeLog: logAction.renameField.changeLog,
            typeName: logAction.renameField.typeName,
            _from: logAction.renameField._from,
            to: logAction.renameField.to
        });
    }
    else if (logAction.requiredField) {
        return ({
            actionType: 'RequiredFieldTypeAction',
            changeLog: logAction.requiredField.changeLog,
            typeName: logAction.requiredField.typeName,
            name: logAction.requiredField.name
        });
    }
    else if (logAction.optionalField) {
        return ({
            actionType: 'OptionalFieldTypeAction',
            changeLog: logAction.optionalField.changeLog,
            typeName: logAction.optionalField.typeName,
            name: logAction.optionalField.name
        });
    }
    else if (logAction.deleteField) {
        return ({
            actionType: 'DeleteFieldTypeAction',
            changeLog: logAction.deleteField.changeLog,
            typeName: logAction.deleteField.typeName,
            name: logAction.deleteField.name
        });
        //   } else if (logAction.setDefault) {
        //     const _default = gqlDefaultToDefaultField(logAction.setDefault._default);
        //     return ({
        //       actionType: 'SetDefaultFieldTypeAction',
        //       changeLog: logAction.setDefault.changeLog,
        //       typeName: logAction.setDefault.typeName,
        //       name: logAction.setDefault.name,
        //       _default: _default[0]
        //     });
    }
    else if (logAction.removeDefault) {
        return ({
            actionType: 'RemoveDefaultFieldTypeAction',
            changeLog: logAction.removeDefault.changeLog,
            typeName: logAction.removeDefault.typeName,
            name: logAction.removeDefault.name
        });
        //   } else if (logAction.addField) {
        //     let _default = null
        //     if (logAction.addField._default) {
        //       _default = gqlDefaultToDefaultField(logAction.addField._default)[0];
        //     }
        //     return ({
        //       actionType: 'AddFieldTypeAction',
        //       changeLog: logAction.addField.changeLog,
        //       typeName: logAction.addField.typeName,
        //       name: logAction.addField.name,
        //       gqlFieldTypesToFieldTypes(logAction.addField.type),
        //       description: logAction.addField.description,
        //       optional: logAction.addField.optional,
        //       _default
        //     });
    }
    else if (logAction.updateTypeDescription) {
        return ({
            actionType: 'UpdateDescriptionTypeAction',
            changeLog: logAction.updateTypeDescription.changeLog,
            typeName: logAction.updateTypeDescription.typeName,
            name: logAction.updateTypeDescription.name,
            description: logAction.updateTypeDescription.description
        });
    }
    else if (logAction.referenceField) {
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
    }
    else if (logAction.newType) {
        return ({
            actionType: 'NewTypeAction',
            changeLog: logAction.newType.changeLog,
            typeName: logAction.newType.typeName,
            description: logAction.newType.description
        });
    }
    throw new Error("Change action must contain one action input");
}
exports.actionInputToChangeAction = actionInputToChangeAction;
function inputChangesetToChangeSet(changeSet) {
    const log = changeSet.log.map(c => actionInputToChangeAction(c));
    return ({
        id: changeSet.id,
        baseHash: changeSet.baseHash,
        log: log
    });
}
exports.inputChangesetToChangeSet = inputChangesetToChangeSet;
let CommitOutput = class CommitOutput {
};
__decorate([
    type_graphql_1.Field(type => [action_1.GroupAction]),
    __metadata("design:type", Array)
], CommitOutput.prototype, "log", void 0);
__decorate([
    type_graphql_1.Field(type => [generate_1.Type]),
    __metadata("design:type", Array)
], CommitOutput.prototype, "types", void 0);
__decorate([
    type_graphql_1.Field(type => [generate_1.Service]),
    __metadata("design:type", Array)
], CommitOutput.prototype, "services", void 0);
__decorate([
    type_graphql_1.Field(type => [action_1.ChangeSet]),
    __metadata("design:type", Array)
], CommitOutput.prototype, "changeSets", void 0);
CommitOutput = __decorate([
    type_graphql_1.ObjectType()
], CommitOutput);
exports.CommitOutput = CommitOutput;
let VRPCResolver = class VRPCResolver {
    async log(context) {
        return (await context.backend.getLog());
    }
    async types(context) {
        return (await context.backend.getCurrentTypes());
    }
    async services(context) {
        return (await context.backend.getCurrentServices());
    }
    async changeSet(changeSetId, context) {
        return (await context.backend.getChangeSet("test", changeSetId));
    }
    async changeSets(context) {
        return (await context.backend.getChangeSets("test"));
    }
    async updateChangeSet(changeSet, context) {
        const updatedChangeSet = inputChangesetToChangeSet(changeSet);
        await context.backend.updateChangeSet("test", changeSet.id, updatedChangeSet);
        return (await context.backend.getChangeSet("test", changeSet.id));
    }
    async commitChangeSet(changeSetId, context) {
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
    async deleteChangeSet(changeSetId, context) {
        await context.backend.deleteChangeSet("test", changeSetId);
        return (await context.backend.getChangeSets("test"));
    }
};
__decorate([
    type_graphql_1.Query(returns => [action_1.GroupAction]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VRPCResolver.prototype, "log", null);
__decorate([
    type_graphql_1.Query(returns => [generate_1.Type]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VRPCResolver.prototype, "types", null);
__decorate([
    type_graphql_1.Query(returns => [generate_1.Service]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VRPCResolver.prototype, "services", null);
__decorate([
    type_graphql_1.Query(returns => action_1.ChangeSet),
    __param(0, type_graphql_1.Arg("changeSetId")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VRPCResolver.prototype, "changeSet", null);
__decorate([
    type_graphql_1.Query(returns => [action_1.ChangeSet]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VRPCResolver.prototype, "changeSets", null);
__decorate([
    type_graphql_1.Mutation(returns => action_1.ChangeSet),
    __param(0, type_graphql_1.Arg("changeSet")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ChangeSetInput, Object]),
    __metadata("design:returntype", Promise)
], VRPCResolver.prototype, "updateChangeSet", null);
__decorate([
    type_graphql_1.Mutation(returns => CommitOutput),
    __param(0, type_graphql_1.Arg("changeSetId")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VRPCResolver.prototype, "commitChangeSet", null);
__decorate([
    type_graphql_1.Mutation(returns => [action_1.ChangeSet]),
    __param(0, type_graphql_1.Arg("changeSetId")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VRPCResolver.prototype, "deleteChangeSet", null);
VRPCResolver = __decorate([
    type_graphql_1.Resolver()
], VRPCResolver);
exports.VRPCResolver = VRPCResolver;
