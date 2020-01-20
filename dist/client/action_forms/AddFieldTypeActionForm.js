"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionForm_1 = require("./ActionForm");
const react_1 = __importDefault(require("react"));
const TypeSelector_1 = __importDefault(require("./TypeSelector"));
const DefaultSelector_1 = __importDefault(require("./DefaultSelector"));
const core_1 = require("@material-ui/core");
const AddFieldTypeActionForm = ActionForm_1.ActionFormHOC(function (props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(TypeSelector_1.default, { types: props.types, handleChange: props.handleChange('typeName'), value: props.value.typeName }),
        react_1.default.createElement(core_1.FormControl, null,
            react_1.default.createElement(core_1.TextField, { id: "fieldName", label: "New field name", value: props.value.name, onChange: props.handleChange('name'), margin: "normal" })),
        react_1.default.createElement(core_1.FormControl, null,
            react_1.default.createElement(core_1.TextField, { id: "description", label: "Field description", value: props.value.description, onChange: props.handleChange('description'), margin: "normal" })),
        react_1.default.createElement(core_1.FormControl, null,
            react_1.default.createElement(core_1.Checkbox, { id: "optional", checked: props.value.optional, onChange: props.handleBooleanChange('optional') })),
        react_1.default.createElement(DefaultSelector_1.default, { _default: props.value._default, handleChange: props.handleDefaultChange('_default') }),
        react_1.default.createElement(core_1.FormControl, null,
            react_1.default.createElement(core_1.TextField, { id: "standard-name", label: "Change Log", value: props.value.changeLog, onChange: props.handleChange('changeLog'), margin: "normal" }))));
});
exports.default = AddFieldTypeActionForm;
