"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const react_1 = __importDefault(require("react"));
const ACTION_NAMES = [
    "RenameFieldTypeAction",
    "RequiredFieldTypeAction",
    "OptionalFieldTypeAction",
    "DeleteFieldTypeAction",
    "SetDefaultFieldTypeAction",
    "RemoveDefaultFieldTypeAction",
    "AddFieldTypeAction",
    "UpdateDescriptionTypeAction",
    "ReferenceFieldTypeAction",
    "NewTypeAction",
    "UpdateDescriptionServiceAction",
    "AddVersionServiceAction",
    "NewServiceAction"
];
const ActionTypeSelector = (props) => {
    function handleChange(event) {
        props.onChange(event.target.value);
    }
    return (react_1.default.createElement(core_1.FormControl, null,
        react_1.default.createElement(core_1.InputLabel, { htmlFor: "action-type" }, "Action Type"),
        react_1.default.createElement(core_1.Select, { value: props.logType, onChange: handleChange, inputProps: { id: 'action-type' } }, ACTION_NAMES.map(name => react_1.default.createElement(core_1.MenuItem, { value: name }, name)))));
};
exports.default = ActionTypeSelector;
