"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const styles_1 = require("@material-ui/core/styles");
const hooks_1 = require("./hooks");
const core_1 = require("@material-ui/core");
const useStyles = styles_1.makeStyles(theme => ({
    root: {}
}));
const AddChangeSetModal = (props) => {
    const classes = useStyles(props);
    const [open, setOpen] = react_2.useState(false);
    const [name, setName] = react_2.useState("");
    const handleOpen = () => {
        setOpen(true);
        setName("");
    };
    const handleClose = () => {
        setOpen(false);
        setName("");
    };
    // FIXME: fix types.
    const [updateChangeSet, { loading, error }] = hooks_1.useUpdateChangeSetMutation({
        // @ts-ignore
        update(cache, { data: { updateChangeSet } }) {
            // @ts-ignore
            const { changeSets } = cache.readQuery({ query: hooks_1.AllDataDocument });
            cache.writeQuery({
                query: hooks_1.AllDataDocument,
                data: { changeSets: changeSets.concat([updateChangeSet]) },
            });
        }
    });
    const handleUpdateChangeSet = () => {
        updateChangeSet({ variables: { changeSet: {
                    id: name,
                    baseHash: props.currentBaseHash,
                    log: []
                } } });
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("button", { type: "button", onClick: handleOpen }, "Add ChangeSet"),
        react_1.default.createElement(core_1.Modal, { open: open, onClose: handleClose },
            react_1.default.createElement("div", null,
                !error && loading && react_1.default.createElement(core_1.CircularProgress, null),
                error && !loading && react_1.default.createElement("div", null, error),
                !error && !loading &&
                    react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("h2", { id: "simple-modal-title" }, "Add Change Set"),
                        react_1.default.createElement(core_1.FormControl, null,
                            react_1.default.createElement(core_1.TextField, { id: "name", label: "Change Set Name", value: name, onChange: event => setName(event.target.value), margin: "normal" })),
                        react_1.default.createElement(core_1.FormControl, null,
                            react_1.default.createElement(core_1.Button, { variant: "contained", color: "primary", onClick: handleUpdateChangeSet }, "Add")))))));
};
exports.default = AddChangeSetModal;
