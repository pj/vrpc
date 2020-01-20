"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const react_1 = __importDefault(require("react"));
function FieldSelector(props) {
    const fieldNamesByType = new Map();
    for (let _type of props.types) {
        const lastVersion = _type.versions[_type.versions.length - 1];
        const fields = lastVersion.fields.map(f => f.key);
        fieldNamesByType.set(_type.name, fields);
    }
    return (react_1.default.createElement(core_1.FormControl, null,
        react_1.default.createElement(core_1.InputLabel, { htmlFor: "select-field" }, "Field name"),
        react_1.default.createElement(core_1.Select, { value: props.value, onChange: props.handleChange, inputProps: { id: 'select-field' } }, props.selectedType !== ""
            && (fieldNamesByType.get(props.selectedType) || []).map(fieldName => react_1.default.createElement(core_1.MenuItem, { key: fieldName, value: fieldName }, fieldName)))));
}
exports.default = FieldSelector;
