"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("../hooks");
const react_1 = require("react");
const core_1 = require("@material-ui/core");
const react_2 = __importDefault(require("react"));
const useStyles = core_1.makeStyles(theme => ({
    root: {},
}));
function ActionFormHOC(FormComponent) {
    function ActionForm(props) {
        const classes = useStyles(props);
        const [updateChangeSetMutation, { loading, error }] = hooks_1.useUpdateChangeSetMutation();
        const [value, setValue] = react_1.useState({});
        function handleChange(key) {
            function innerHandleChange(event) {
                setValue(Object.assign(Object.assign({}, value), { [key]: event.target.value }));
            }
            return innerHandleChange;
        }
        function handleBooleanChange(key) {
            function innerHandleChange(event) {
                setValue(Object.assign(Object.assign({}, value), { [key]: !value[key] }));
            }
            return innerHandleChange;
        }
        function handleDefaultChange(key) {
            function innerHandleChange(_default) {
                setValue(Object.assign(Object.assign({}, value), { [key]: _default }));
            }
            return innerHandleChange;
        }
        function handleRenameSetType(event) {
            setValue(Object.assign(Object.assign({}, value), { typeName: event.target.value, fieldName: "" }));
        }
        function handleVersionChange(key) {
            function innerHandleChange(version) {
                setValue(Object.assign(Object.assign({}, value), { [key]: version }));
            }
            return innerHandleChange;
        }
        function updateChangeSet() {
        }
        return (react_2.default.createElement(core_1.Paper, { className: classes.root }, loading ? react_2.default.createElement(core_1.CircularProgress, null) :
            error ? react_2.default.createElement("div", null, error.toString()) :
                react_2.default.createElement(react_2.default.Fragment, null,
                    react_2.default.createElement(core_1.FormControl, null,
                        react_2.default.createElement(FormComponent, { value: value, types: props.types, services: props.services, handleChange: handleChange, handleBooleanChange: handleBooleanChange, handleRenameSetType: handleRenameSetType, handleDefaultChange: handleDefaultChange, handleVersionChange: handleVersionChange }),
                        react_2.default.createElement(core_1.Button, { variant: "contained", color: "primary", onClick: updateChangeSet }, "Add To Log")))));
    }
    ;
    return ActionForm;
}
exports.ActionFormHOC = ActionFormHOC;
