"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionForm_1 = require("./ActionForm");
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const NewServiceActionForm = ActionForm_1.ActionFormHOC(function (props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.FormControl, null,
            react_1.default.createElement(core_1.TextField, { id: "serviceName", label: "Name of new Service", value: props.value.serviceName, onChange: props.handleChange('serviceName'), margin: "normal" })),
        react_1.default.createElement(core_1.FormControl, null,
            react_1.default.createElement(core_1.TextField, { id: "description", label: "Description of new service", value: props.value.description, onChange: props.handleChange('description'), margin: "normal" }))));
});
exports.default = NewServiceActionForm;
