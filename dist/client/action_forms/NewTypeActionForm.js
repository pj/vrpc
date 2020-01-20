"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionForm_1 = require("./ActionForm");
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const NewTypeActionForm = ActionForm_1.ActionFormHOC(function (props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.FormControl, null,
            react_1.default.createElement(core_1.TextField, { id: "typeName", label: "Name of new Type", value: props.value.typeName, onChange: props.handleChange('typeName'), margin: "normal" })),
        react_1.default.createElement(core_1.FormControl, null,
            react_1.default.createElement(core_1.TextField, { id: "description", label: "Description of new type", value: props.value.description, onChange: props.handleChange('description'), margin: "normal" }))));
});
exports.default = NewTypeActionForm;
