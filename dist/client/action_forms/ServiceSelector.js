"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const react_1 = __importDefault(require("react"));
function ServiceSelector(props) {
    const serviceNames = props.services.map(s => s.name);
    return (react_1.default.createElement(core_1.FormControl, null,
        react_1.default.createElement(core_1.InputLabel, { htmlFor: "select-service" }, "Service name"),
        react_1.default.createElement(core_1.Select, { value: props.value, onChange: props.handleChange, inputProps: { id: 'select-service' } }, serviceNames.map(name => react_1.default.createElement(core_1.MenuItem, { key: name, value: name }, name)))));
}
exports.default = ServiceSelector;
