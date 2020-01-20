"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionForm_1 = require("./ActionForm");
const react_1 = __importDefault(require("react"));
const TypeSelector_1 = __importDefault(require("./TypeSelector"));
const FieldSelector_1 = __importDefault(require("./FieldSelector"));
function FieldTypeActionFormHOC() {
    const InnerComponent = ActionForm_1.ActionFormHOC(function (props) {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(TypeSelector_1.default, { types: props.types, handleChange: props.handleRenameSetType, value: props.value.typeName }),
            react_1.default.createElement(FieldSelector_1.default, { types: props.types, handleChange: props.handleChange('name'), value: props.value.name, selectedType: props.value.typeName })));
    });
    return InnerComponent;
}
exports.default = FieldTypeActionFormHOC;
