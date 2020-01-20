"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
const core_1 = require("@material-ui/core");
const TypeSelector = (props) => {
    const typeNames = props.types.map(t => t.name);
    return (react_1.default.createElement(FormControl_1.default, null,
        react_1.default.createElement(core_1.InputLabel, { htmlFor: "select-type" }, "Type name"),
        react_1.default.createElement(core_1.Select, { value: props.value, onChange: props.handleChange, inputProps: { id: 'select-type' } }, typeNames.map(name => react_1.default.createElement(core_1.MenuItem, { key: name, value: name }, name)))));
};
exports.default = TypeSelector;
