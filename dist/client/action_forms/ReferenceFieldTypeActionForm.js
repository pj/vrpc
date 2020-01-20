"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionForm_1 = require("./ActionForm");
const react_1 = __importDefault(require("react"));
const TypeSelector_1 = __importDefault(require("./TypeSelector"));
const core_1 = require("@material-ui/core");
const VersionSelector_1 = __importDefault(require("./VersionSelector"));
const ReferencedFieldTypeActionForm = ActionForm_1.ActionFormHOC(function (props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(TypeSelector_1.default, { types: props.types, handleChange: props.handleChange('typeName'), value: props.value.typeName }),
        react_1.default.createElement(core_1.FormControl, null,
            react_1.default.createElement(core_1.TextField, { id: "fieldName", label: "New field name", value: props.value.name, onChange: props.handleChange('name'), margin: "normal" })),
        react_1.default.createElement(core_1.FormControl, null,
            react_1.default.createElement(core_1.TextField, { id: "description", label: "Field description", value: props.value.description, onChange: props.handleChange('description'), margin: "normal" })),
        react_1.default.createElement(core_1.FormControl, null,
            react_1.default.createElement(core_1.Checkbox, { id: "optional", checked: props.value.optional, onChange: props.handleBooleanChange('optional') })),
        react_1.default.createElement(TypeSelector_1.default, { types: props.types, handleChange: props.handleChange('referenceType'), value: props.value.referenceType }),
        react_1.default.createElement(VersionSelector_1.default, { types: props.types, typeName: props.value.referenceType, handleChange: props.handleVersionChange('referenceVersion'), version: props.value.referenceVersion })));
});
exports.default = ReferencedFieldTypeActionForm;
