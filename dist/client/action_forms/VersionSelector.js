"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const react_1 = __importDefault(require("react"));
const VersionSelector = (props) => {
    let versions = [];
    for (let _type of props.types) {
        if (_type.name === props.typeName) {
            versions = _type.versions.map(t => t.version);
            break;
        }
    }
    return (react_1.default.createElement(core_1.FormControl, null,
        react_1.default.createElement(core_1.InputLabel, { htmlFor: "select-version" }, "Select Version"),
        react_1.default.createElement(core_1.Select, { value: props.version, onChange: event => { props.handleChange(parseInt(event.target.value)); }, inputProps: { id: 'select-version' } }, versions.map(name => react_1.default.createElement(core_1.MenuItem, { key: name, value: name }, name)))));
};
exports.default = VersionSelector;
