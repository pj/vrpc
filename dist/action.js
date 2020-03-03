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
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
var FieldTypes;
(function (FieldTypes) {
    FieldTypes["STRING"] = "string";
    FieldTypes["BOOLEAN"] = "boolean";
    FieldTypes["INTEGER"] = "integer";
    FieldTypes["FLOAT"] = "float";
})(FieldTypes = exports.FieldTypes || (exports.FieldTypes = {}));
type_graphql_1.registerEnumType(FieldTypes, {
    name: "FieldTypes"
});
exports.FieldTypeValues = ['string', 'boolean', 'integer', 'float'];
let StringField = class StringField {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], StringField.prototype, "value", void 0);
StringField = __decorate([
    type_graphql_1.ObjectType()
], StringField);
exports.StringField = StringField;
let BooleanField = class BooleanField {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], BooleanField.prototype, "value", void 0);
BooleanField = __decorate([
    type_graphql_1.ObjectType()
], BooleanField);
exports.BooleanField = BooleanField;
let FloatField = class FloatField {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Float),
    __metadata("design:type", Number)
], FloatField.prototype, "value", void 0);
FloatField = __decorate([
    type_graphql_1.ObjectType()
], FloatField);
exports.FloatField = FloatField;
let IntegerField = class IntegerField {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int),
    __metadata("design:type", Number)
], IntegerField.prototype, "value", void 0);
IntegerField = __decorate([
    type_graphql_1.ObjectType()
], IntegerField);
exports.IntegerField = IntegerField;
exports.FieldDefaultsUnion = type_graphql_1.createUnionType({
    name: "FieldDefaults",
    types: () => [StringField, BooleanField, FloatField, IntegerField],
});
// Types
let NewTypeAction = class NewTypeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewTypeAction.prototype, "hash", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], NewTypeAction.prototype, "version", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewTypeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewTypeAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewTypeAction.prototype, "description", void 0);
NewTypeAction = __decorate([
    type_graphql_1.ObjectType()
], NewTypeAction);
exports.NewTypeAction = NewTypeAction;
let NewTypeChangeAction = class NewTypeChangeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewTypeChangeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewTypeChangeAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewTypeChangeAction.prototype, "description", void 0);
NewTypeChangeAction = __decorate([
    type_graphql_1.ObjectType()
], NewTypeChangeAction);
exports.NewTypeChangeAction = NewTypeChangeAction;
let RenameFieldTypeAction = class RenameFieldTypeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RenameFieldTypeAction.prototype, "hash", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], RenameFieldTypeAction.prototype, "version", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RenameFieldTypeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RenameFieldTypeAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RenameFieldTypeAction.prototype, "_from", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RenameFieldTypeAction.prototype, "to", void 0);
RenameFieldTypeAction = __decorate([
    type_graphql_1.ObjectType()
], RenameFieldTypeAction);
exports.RenameFieldTypeAction = RenameFieldTypeAction;
let RenameFieldTypeChangeAction = class RenameFieldTypeChangeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RenameFieldTypeChangeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RenameFieldTypeChangeAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RenameFieldTypeChangeAction.prototype, "_from", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RenameFieldTypeChangeAction.prototype, "to", void 0);
RenameFieldTypeChangeAction = __decorate([
    type_graphql_1.ObjectType()
], RenameFieldTypeChangeAction);
exports.RenameFieldTypeChangeAction = RenameFieldTypeChangeAction;
let RequiredFieldTypeAction = class RequiredFieldTypeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RequiredFieldTypeAction.prototype, "hash", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], RequiredFieldTypeAction.prototype, "version", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RequiredFieldTypeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RequiredFieldTypeAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RequiredFieldTypeAction.prototype, "name", void 0);
RequiredFieldTypeAction = __decorate([
    type_graphql_1.ObjectType()
], RequiredFieldTypeAction);
exports.RequiredFieldTypeAction = RequiredFieldTypeAction;
let RequiredFieldTypeChangeAction = class RequiredFieldTypeChangeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RequiredFieldTypeChangeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RequiredFieldTypeChangeAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RequiredFieldTypeChangeAction.prototype, "name", void 0);
RequiredFieldTypeChangeAction = __decorate([
    type_graphql_1.ObjectType()
], RequiredFieldTypeChangeAction);
exports.RequiredFieldTypeChangeAction = RequiredFieldTypeChangeAction;
let OptionalFieldTypeAction = class OptionalFieldTypeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], OptionalFieldTypeAction.prototype, "hash", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], OptionalFieldTypeAction.prototype, "version", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], OptionalFieldTypeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], OptionalFieldTypeAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], OptionalFieldTypeAction.prototype, "name", void 0);
OptionalFieldTypeAction = __decorate([
    type_graphql_1.ObjectType()
], OptionalFieldTypeAction);
exports.OptionalFieldTypeAction = OptionalFieldTypeAction;
let OptionalFieldTypeChangeAction = class OptionalFieldTypeChangeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], OptionalFieldTypeChangeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], OptionalFieldTypeChangeAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], OptionalFieldTypeChangeAction.prototype, "name", void 0);
OptionalFieldTypeChangeAction = __decorate([
    type_graphql_1.ObjectType()
], OptionalFieldTypeChangeAction);
exports.OptionalFieldTypeChangeAction = OptionalFieldTypeChangeAction;
let DeleteFieldTypeAction = class DeleteFieldTypeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], DeleteFieldTypeAction.prototype, "hash", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], DeleteFieldTypeAction.prototype, "version", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], DeleteFieldTypeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], DeleteFieldTypeAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], DeleteFieldTypeAction.prototype, "name", void 0);
DeleteFieldTypeAction = __decorate([
    type_graphql_1.ObjectType()
], DeleteFieldTypeAction);
exports.DeleteFieldTypeAction = DeleteFieldTypeAction;
let DeleteFieldTypeChangeAction = class DeleteFieldTypeChangeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], DeleteFieldTypeChangeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], DeleteFieldTypeChangeAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], DeleteFieldTypeChangeAction.prototype, "name", void 0);
DeleteFieldTypeChangeAction = __decorate([
    type_graphql_1.ObjectType()
], DeleteFieldTypeChangeAction);
exports.DeleteFieldTypeChangeAction = DeleteFieldTypeChangeAction;
let SetDefaultFieldTypeAction = class SetDefaultFieldTypeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SetDefaultFieldTypeAction.prototype, "hash", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], SetDefaultFieldTypeAction.prototype, "version", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SetDefaultFieldTypeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SetDefaultFieldTypeAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SetDefaultFieldTypeAction.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(type => exports.FieldDefaultsUnion),
    __metadata("design:type", Object)
], SetDefaultFieldTypeAction.prototype, "_default", void 0);
SetDefaultFieldTypeAction = __decorate([
    type_graphql_1.ObjectType()
], SetDefaultFieldTypeAction);
exports.SetDefaultFieldTypeAction = SetDefaultFieldTypeAction;
let SetDefaultFieldTypeChangeAction = class SetDefaultFieldTypeChangeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SetDefaultFieldTypeChangeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SetDefaultFieldTypeChangeAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SetDefaultFieldTypeChangeAction.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(type => exports.FieldDefaultsUnion),
    __metadata("design:type", Object)
], SetDefaultFieldTypeChangeAction.prototype, "_default", void 0);
SetDefaultFieldTypeChangeAction = __decorate([
    type_graphql_1.ObjectType()
], SetDefaultFieldTypeChangeAction);
exports.SetDefaultFieldTypeChangeAction = SetDefaultFieldTypeChangeAction;
let RemoveDefaultFieldTypeAction = class RemoveDefaultFieldTypeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RemoveDefaultFieldTypeAction.prototype, "hash", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], RemoveDefaultFieldTypeAction.prototype, "version", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RemoveDefaultFieldTypeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RemoveDefaultFieldTypeAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RemoveDefaultFieldTypeAction.prototype, "name", void 0);
RemoveDefaultFieldTypeAction = __decorate([
    type_graphql_1.ObjectType()
], RemoveDefaultFieldTypeAction);
exports.RemoveDefaultFieldTypeAction = RemoveDefaultFieldTypeAction;
let RemoveDefaultFieldTypeChangeAction = class RemoveDefaultFieldTypeChangeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RemoveDefaultFieldTypeChangeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RemoveDefaultFieldTypeChangeAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RemoveDefaultFieldTypeChangeAction.prototype, "name", void 0);
RemoveDefaultFieldTypeChangeAction = __decorate([
    type_graphql_1.ObjectType()
], RemoveDefaultFieldTypeChangeAction);
exports.RemoveDefaultFieldTypeChangeAction = RemoveDefaultFieldTypeChangeAction;
let AddFieldTypeAction = class AddFieldTypeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddFieldTypeAction.prototype, "hash", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], AddFieldTypeAction.prototype, "version", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddFieldTypeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddFieldTypeAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddFieldTypeAction.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(type => FieldTypes),
    __metadata("design:type", String)
], AddFieldTypeAction.prototype, "_type", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddFieldTypeAction.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], AddFieldTypeAction.prototype, "optional", void 0);
__decorate([
    type_graphql_1.Field(type => exports.FieldDefaultsUnion, { nullable: true }),
    __metadata("design:type", Object)
], AddFieldTypeAction.prototype, "_default", void 0);
AddFieldTypeAction = __decorate([
    type_graphql_1.ObjectType()
], AddFieldTypeAction);
exports.AddFieldTypeAction = AddFieldTypeAction;
let AddFieldTypeChangeAction = class AddFieldTypeChangeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddFieldTypeChangeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddFieldTypeChangeAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddFieldTypeChangeAction.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(type => FieldTypes),
    __metadata("design:type", String)
], AddFieldTypeChangeAction.prototype, "_type", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddFieldTypeChangeAction.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], AddFieldTypeChangeAction.prototype, "optional", void 0);
__decorate([
    type_graphql_1.Field(type => exports.FieldDefaultsUnion, { nullable: true }),
    __metadata("design:type", Object)
], AddFieldTypeChangeAction.prototype, "_default", void 0);
AddFieldTypeChangeAction = __decorate([
    type_graphql_1.ObjectType()
], AddFieldTypeChangeAction);
exports.AddFieldTypeChangeAction = AddFieldTypeChangeAction;
let UpdateFieldDescriptionTypeAction = class UpdateFieldDescriptionTypeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateFieldDescriptionTypeAction.prototype, "hash", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], UpdateFieldDescriptionTypeAction.prototype, "version", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateFieldDescriptionTypeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateFieldDescriptionTypeAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateFieldDescriptionTypeAction.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateFieldDescriptionTypeAction.prototype, "description", void 0);
UpdateFieldDescriptionTypeAction = __decorate([
    type_graphql_1.ObjectType()
], UpdateFieldDescriptionTypeAction);
exports.UpdateFieldDescriptionTypeAction = UpdateFieldDescriptionTypeAction;
let UpdateFieldDescriptionTypeChangeAction = class UpdateFieldDescriptionTypeChangeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateFieldDescriptionTypeChangeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateFieldDescriptionTypeChangeAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateFieldDescriptionTypeChangeAction.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateFieldDescriptionTypeChangeAction.prototype, "description", void 0);
UpdateFieldDescriptionTypeChangeAction = __decorate([
    type_graphql_1.ObjectType()
], UpdateFieldDescriptionTypeChangeAction);
exports.UpdateFieldDescriptionTypeChangeAction = UpdateFieldDescriptionTypeChangeAction;
let ReferenceFieldTypeAction = class ReferenceFieldTypeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ReferenceFieldTypeAction.prototype, "hash", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ReferenceFieldTypeAction.prototype, "version", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ReferenceFieldTypeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ReferenceFieldTypeAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ReferenceFieldTypeAction.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ReferenceFieldTypeAction.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], ReferenceFieldTypeAction.prototype, "optional", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ReferenceFieldTypeAction.prototype, "referenceType", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ReferenceFieldTypeAction.prototype, "referenceHash", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ReferenceFieldTypeAction.prototype, "referenceVersion", void 0);
ReferenceFieldTypeAction = __decorate([
    type_graphql_1.ObjectType()
], ReferenceFieldTypeAction);
exports.ReferenceFieldTypeAction = ReferenceFieldTypeAction;
let ReferenceFieldTypeChangeAction = class ReferenceFieldTypeChangeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ReferenceFieldTypeChangeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ReferenceFieldTypeChangeAction.prototype, "typeName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ReferenceFieldTypeChangeAction.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ReferenceFieldTypeChangeAction.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], ReferenceFieldTypeChangeAction.prototype, "optional", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ReferenceFieldTypeChangeAction.prototype, "referenceType", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ReferenceFieldTypeChangeAction.prototype, "referenceHash", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ReferenceFieldTypeChangeAction.prototype, "referenceVersion", void 0);
ReferenceFieldTypeChangeAction = __decorate([
    type_graphql_1.ObjectType()
], ReferenceFieldTypeChangeAction);
exports.ReferenceFieldTypeChangeAction = ReferenceFieldTypeChangeAction;
// Service Definitions
let NewServiceAction = class NewServiceAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewServiceAction.prototype, "hash", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], NewServiceAction.prototype, "version", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewServiceAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewServiceAction.prototype, "serviceName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewServiceAction.prototype, "description", void 0);
NewServiceAction = __decorate([
    type_graphql_1.ObjectType()
], NewServiceAction);
exports.NewServiceAction = NewServiceAction;
let NewServiceChangeAction = class NewServiceChangeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewServiceChangeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewServiceChangeAction.prototype, "serviceName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewServiceChangeAction.prototype, "description", void 0);
NewServiceChangeAction = __decorate([
    type_graphql_1.ObjectType()
], NewServiceChangeAction);
exports.NewServiceChangeAction = NewServiceChangeAction;
let UpdateDescriptionServiceAction = class UpdateDescriptionServiceAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateDescriptionServiceAction.prototype, "hash", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], UpdateDescriptionServiceAction.prototype, "version", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateDescriptionServiceAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateDescriptionServiceAction.prototype, "serviceName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateDescriptionServiceAction.prototype, "description", void 0);
UpdateDescriptionServiceAction = __decorate([
    type_graphql_1.ObjectType()
], UpdateDescriptionServiceAction);
exports.UpdateDescriptionServiceAction = UpdateDescriptionServiceAction;
let UpdateDescriptionServiceChangeAction = class UpdateDescriptionServiceChangeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateDescriptionServiceChangeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateDescriptionServiceChangeAction.prototype, "serviceName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateDescriptionServiceChangeAction.prototype, "description", void 0);
UpdateDescriptionServiceChangeAction = __decorate([
    type_graphql_1.ObjectType()
], UpdateDescriptionServiceChangeAction);
exports.UpdateDescriptionServiceChangeAction = UpdateDescriptionServiceChangeAction;
let AddVersionServiceAction = class AddVersionServiceAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddVersionServiceAction.prototype, "hash", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], AddVersionServiceAction.prototype, "version", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddVersionServiceAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddVersionServiceAction.prototype, "serviceName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddVersionServiceAction.prototype, "inputType", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddVersionServiceAction.prototype, "outputType", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], AddVersionServiceAction.prototype, "inputVersion", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddVersionServiceAction.prototype, "inputHash", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], AddVersionServiceAction.prototype, "outputVersion", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddVersionServiceAction.prototype, "outputHash", void 0);
AddVersionServiceAction = __decorate([
    type_graphql_1.ObjectType()
], AddVersionServiceAction);
exports.AddVersionServiceAction = AddVersionServiceAction;
let AddVersionServiceChangeAction = class AddVersionServiceChangeAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddVersionServiceChangeAction.prototype, "changeLog", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddVersionServiceChangeAction.prototype, "serviceName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddVersionServiceChangeAction.prototype, "inputType", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddVersionServiceChangeAction.prototype, "outputType", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], AddVersionServiceChangeAction.prototype, "inputVersion", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddVersionServiceChangeAction.prototype, "inputHash", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], AddVersionServiceChangeAction.prototype, "outputVersion", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddVersionServiceChangeAction.prototype, "outputHash", void 0);
AddVersionServiceChangeAction = __decorate([
    type_graphql_1.ObjectType()
], AddVersionServiceChangeAction);
exports.AddVersionServiceChangeAction = AddVersionServiceChangeAction;
;
exports.ActionUnion = type_graphql_1.createUnionType({
    name: "Action",
    types: () => [NewTypeAction, RenameFieldTypeAction, RequiredFieldTypeAction,
        OptionalFieldTypeAction, DeleteFieldTypeAction, SetDefaultFieldTypeAction,
        RemoveDefaultFieldTypeAction, AddFieldTypeAction,
        UpdateFieldDescriptionTypeAction, ReferenceFieldTypeAction, NewServiceAction,
        UpdateDescriptionServiceAction, AddVersionServiceAction
    ],
    resolveType: (value) => {
        return value.actionType;
    }
});
exports.ChangeActionUnion = type_graphql_1.createUnionType({
    name: "ChangeAction",
    types: () => [NewTypeChangeAction, RenameFieldTypeChangeAction,
        RequiredFieldTypeChangeAction, OptionalFieldTypeChangeAction,
        DeleteFieldTypeChangeAction, SetDefaultFieldTypeChangeAction,
        RemoveDefaultFieldTypeChangeAction, AddFieldTypeChangeAction,
        UpdateFieldDescriptionTypeChangeAction, ReferenceFieldTypeChangeAction,
        NewServiceChangeAction, UpdateDescriptionServiceChangeAction,
        AddVersionServiceChangeAction
    ],
    resolveType: (value) => {
        switch (value.actionType) {
            case 'AddVersionServiceAction':
                return 'AddVersionServiceChangeAction';
            case 'UpdateDescriptionServiceAction':
                return 'UpdateDescriptionServiceChangeAction';
            case 'NewServiceAction':
                return 'NewServiceChangeAction';
            case 'ReferenceFieldTypeAction':
                return 'ReferenceFieldTypeChangeAction';
            case 'UpdateFieldDescriptionTypeAction':
                return 'UpdateFieldDescriptionTypeChangeAction';
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
                throw new Error(`Can't find change action type for ${JSON.stringify(value)}`);
        }
    }
});
let GroupAction = class GroupAction {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], GroupAction.prototype, "hash", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], GroupAction.prototype, "version", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], GroupAction.prototype, "actionType", void 0);
__decorate([
    type_graphql_1.Field(type => [exports.ActionUnion]),
    __metadata("design:type", Array)
], GroupAction.prototype, "actions", void 0);
GroupAction = __decorate([
    type_graphql_1.ObjectType()
], GroupAction);
exports.GroupAction = GroupAction;
class GroupChangeAction {
}
exports.GroupChangeAction = GroupChangeAction;
function fieldsToHash(action) {
    switch (action.actionType) {
        case 'AddVersionServiceAction':
            return `${action.changeLog}_${action.serviceName}_${action.inputType}_${action.outputType}_${action.inputVersion}_${action.outputVersion}`;
        case 'UpdateDescriptionServiceAction':
            return `${action.changeLog}_${action.serviceName}_${action.description}`;
        case 'NewServiceAction':
            return `${action.changeLog}_${action.serviceName}_${action.description}`;
        case 'ReferenceFieldTypeAction':
            return `${action.changeLog}_${action.typeName}_${action.name}_${action.description}_${action.optional}_${action.referenceType}_${action.referenceHash}_${action.referenceVersion}`;
        case 'UpdateFieldDescriptionTypeAction':
            return `${action.changeLog}_${action.typeName}_${action.name}_${action.description}`;
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
            const subHashes = [];
            for (const subAction of action.actions) {
                subHashes.push(fieldsToHash(subAction));
            }
            return subHashes.join('_');
        default:
            throw new Error(`Can't hash ${JSON.stringify(action, null, 4)}`);
    }
}
exports.fieldsToHash = fieldsToHash;
;
let ChangeSet = class ChangeSet {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ChangeSet.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(type => [exports.ChangeActionUnion]),
    __metadata("design:type", Array)
], ChangeSet.prototype, "log", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], ChangeSet.prototype, "baseHash", void 0);
ChangeSet = __decorate([
    type_graphql_1.ObjectType()
], ChangeSet);
exports.ChangeSet = ChangeSet;
;
