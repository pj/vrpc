"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionForm_1 = require("./ActionForm");
const react_1 = __importDefault(require("react"));
const TypeSelector_1 = __importDefault(require("./TypeSelector"));
const FieldSelector_1 = __importDefault(require("./FieldSelector"));
const core_1 = require("@material-ui/core");
const RenameFieldTypeActionForm = ActionForm_1.ActionFormHOC(function (props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(TypeSelector_1.default, { types: props.types, handleChange: props.handleChange('typeName'), value: props.value.typeName }),
        react_1.default.createElement(FieldSelector_1.default, { types: props.types, handleChange: props.handleChange('_from'), value: props.value._from, selectedType: props.value.typeName }),
        react_1.default.createElement(core_1.FormControl, null,
            react_1.default.createElement(core_1.TextField, { id: "fieldName", label: "New Name", value: props.value.to, onChange: props.handleChange('to'), margin: "normal" }))));
});
exports.default = RenameFieldTypeActionForm;
