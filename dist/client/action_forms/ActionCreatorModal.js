"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const styles_1 = require("@material-ui/core/styles");
const AddFieldTypeActionForm_1 = __importDefault(require("./AddFieldTypeActionForm"));
const ActionTypeSelector_1 = __importDefault(require("./ActionTypeSelector"));
const AddVersionServiceActionForm_1 = __importDefault(require("./AddVersionServiceActionForm"));
const NewServiceActionForm_1 = __importDefault(require("./NewServiceActionForm"));
const RenameFieldTypeActionForm_1 = __importDefault(require("./RenameFieldTypeActionForm"));
const FieldTypeActionFormHOC_1 = __importDefault(require("./FieldTypeActionFormHOC"));
const SetDefaultFieldTypeActionForm_1 = __importDefault(require("./SetDefaultFieldTypeActionForm"));
const UpdateDescriptionTypeActionForm_1 = __importDefault(require("./UpdateDescriptionTypeActionForm"));
const ReferenceFieldTypeActionForm_1 = __importDefault(require("./ReferenceFieldTypeActionForm"));
const NewTypeActionForm_1 = __importDefault(require("./NewTypeActionForm"));
const UpdateDescriptionServiceActionForm_1 = __importDefault(require("./UpdateDescriptionServiceActionForm"));
const core_1 = require("@material-ui/core");
const useStyles = styles_1.makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        margin: "20px",
        width: "20%"
    },
    table: {},
    tableCell: {
        verticalAlign: 'top'
    }
}));
const ActionForm = (props) => {
    switch (props.logType) {
        case "RenameFieldTypeAction":
            return (react_1.default.createElement(RenameFieldTypeActionForm_1.default, { types: props.types, services: props.services }));
        case "RequiredFieldTypeAction":
            let RequiredFieldTypeActionForm = FieldTypeActionFormHOC_1.default();
            return (react_1.default.createElement(RequiredFieldTypeActionForm, { types: props.types, services: props.services }));
        case "OptionalFieldTypeAction":
            let OptionalFieldTypeActionForm = FieldTypeActionFormHOC_1.default();
            return (react_1.default.createElement(OptionalFieldTypeActionForm, { types: props.types, services: props.services }));
        case "DeleteFieldTypeAction":
            let DeleteFieldTypeActionForm = FieldTypeActionFormHOC_1.default();
            return (react_1.default.createElement(DeleteFieldTypeActionForm, { types: props.types, services: props.services }));
        case "RemoveDefaultFieldTypeAction":
            let RemoveDefaultFieldTypeActionForm = FieldTypeActionFormHOC_1.default();
            return (react_1.default.createElement(RemoveDefaultFieldTypeActionForm, { types: props.types, services: props.services }));
        case "SetDefaultFieldTypeAction":
            return (react_1.default.createElement(SetDefaultFieldTypeActionForm_1.default, { types: props.types, services: props.services }));
        case "AddFieldTypeAction":
            return (react_1.default.createElement(AddFieldTypeActionForm_1.default, { types: props.types, services: props.services }));
        case "UpdateDescriptionTypeAction":
            return (react_1.default.createElement(UpdateDescriptionTypeActionForm_1.default, { types: props.types, services: props.services }));
        case "ReferenceFieldTypeAction":
            return (react_1.default.createElement(ReferenceFieldTypeActionForm_1.default, { types: props.types, services: props.services }));
        case "NewTypeAction":
            return (react_1.default.createElement(NewTypeActionForm_1.default, { types: props.types, services: props.services }));
        case "UpdateDescriptionServiceAction":
            return (react_1.default.createElement(UpdateDescriptionServiceActionForm_1.default, { types: props.types, services: props.services }));
        case "AddVersionServiceAction":
            return (react_1.default.createElement(AddVersionServiceActionForm_1.default, { types: props.types, services: props.services }));
        case "NewServiceAction":
            return (react_1.default.createElement(NewServiceActionForm_1.default, { types: props.types, services: props.services }));
        default:
            throw new Error('Unknown form type');
    }
};
const ActionCreatorModal = (props) => {
    const classes = useStyles(props);
    const [actionType, setActionType] = react_2.useState(null);
    const [open, setOpen] = react_2.useState(false);
    const handleOpen = () => {
        setOpen(true);
        setActionType(null);
    };
    const handleClose = () => {
        setOpen(false);
        setActionType(null);
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("button", { type: "button", onClick: handleOpen }, "Add Action"),
        react_1.default.createElement(core_1.Modal, { open: open, onClose: handleClose },
            react_1.default.createElement("div", null,
                react_1.default.createElement(ActionTypeSelector_1.default, { onChange: (actionType) => setActionType(actionType), logType: actionType }),
                actionType && (react_1.default.createElement(ActionForm, { logType: actionType, types: props.types, services: props.services }))))));
};
exports.default = ActionCreatorModal;
