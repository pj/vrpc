"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionForm_1 = require("./ActionForm");
const react_1 = __importDefault(require("react"));
const TypeSelector_1 = __importDefault(require("./TypeSelector"));
const VersionSelector_1 = __importDefault(require("./VersionSelector"));
const AddVersionServiceActionForm = ActionForm_1.ActionFormHOC(function (props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(TypeSelector_1.default, { types: props.types, handleChange: props.handleChange('inputType'), value: props.value.inputType }),
        react_1.default.createElement(VersionSelector_1.default, { types: props.types, handleChange: props.handleVersionChange('inputVersion'), typeName: props.value.outputType, version: props.value.inputVersion }),
        react_1.default.createElement(TypeSelector_1.default, { types: props.types, handleChange: props.handleChange('outputType'), value: props.value.outputType }),
        react_1.default.createElement(VersionSelector_1.default, { types: props.types, handleChange: props.handleVersionChange('outputVersion'), typeName: props.value.outputType, version: props.value.outputVersion })));
});
exports.default = AddVersionServiceActionForm;
