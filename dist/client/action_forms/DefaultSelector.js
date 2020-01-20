"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// FIXME: fix types of NumberFormat.
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const react_number_format_1 = __importDefault(require("react-number-format"));
const DEFAULT_TYPES = [
    "integer",
    "float",
    "string",
    "boolean"
];
const DefaultSelector = (props) => {
    let defaultType = null;
    let valueEditor = null;
    if (!props._default) {
        valueEditor = null;
    }
    else if (props._default.stringValue) {
        defaultType = "string";
        valueEditor = (react_1.default.createElement(core_1.TextField, { id: "defaultValue", label: "Value of default", value: props._default.stringValue, onChange: (event) => { props.handleChange({ stringValue: event.target.value }); }, margin: "normal" }));
    }
    else if (props._default.integerValue) {
        defaultType = "integer";
        valueEditor = (react_1.default.createElement(react_number_format_1.default, { decimalScale: 0, inputRef: (el) => this.inputElem = el, customInput: core_1.TextField, onValueChange: values => { props.handleChange({ integerValue: values.floatValue }); }, value: props._default.integerValue }));
    }
    else if (props._default.floatValue) {
        defaultType = "float";
        valueEditor = (react_1.default.createElement(react_number_format_1.default, { inputRef: (el) => this.inputElem = el, customInput: core_1.TextField, onValueChange: values => { props.handleChange({ integerValue: values.floatValue }); }, value: props._default.floatValue }));
    }
    else if (props._default.booleanValue) {
        defaultType = "boolean";
        valueEditor = (react_1.default.createElement(core_1.Checkbox, { id: "optional", onChange: event => { props.handleChange({ booleanValue: !event.target.value }); }, checked: props._default.booleanValue }));
    }
    function changeType(event) {
        if (event.target.value === "string") {
            props.handleChange({ stringValue: "" });
        }
        else if (event.target.value === "integer") {
            props.handleChange({ integerValue: 0 });
        }
        else if (event.target.value === "float") {
            props.handleChange({ floatValue: 0 });
        }
        else if (event.target.value === "boolean") {
            props.handleChange({ booleanValue: true });
        }
        else {
            props.handleChange({});
        }
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.FormControl, null,
            react_1.default.createElement(core_1.InputLabel, { htmlFor: "select-field" }, "Default Type"),
            react_1.default.createElement(core_1.Select, { value: defaultType, onChange: changeType, inputProps: { id: 'select-field' } }, DEFAULT_TYPES.map(defaultType => react_1.default.createElement(core_1.MenuItem, { key: defaultType, value: defaultType }, defaultType)))),
        react_1.default.createElement(core_1.FormControl, null, valueEditor)));
};
exports.default = DefaultSelector;
