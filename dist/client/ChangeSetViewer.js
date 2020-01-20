"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const styles_1 = require("@material-ui/core/styles");
const Paper_1 = __importDefault(require("@material-ui/core/Paper"));
const hooks_1 = require("./hooks");
const ActionList_1 = __importDefault(require("./ActionList"));
const core_1 = require("@material-ui/core");
const AddChangeSetModal_1 = __importDefault(require("./AddChangeSetModal"));
const ActionCreatorModal_1 = __importDefault(require("./action_forms/ActionCreatorModal"));
const useStyles = styles_1.makeStyles(theme => ({
    root: {},
}));
const ChangeSetViewer = (props) => {
    const [changeSetId, setChangeSetId] = react_2.useState(null);
    const [commitChangeSetMutation, { loading, error }] = hooks_1.useCommitChangeSetMutation();
    if (loading) {
        return (react_1.default.createElement(Paper_1.default, null,
            react_1.default.createElement(core_1.CircularProgress, null)));
    }
    if (error) {
        return (react_1.default.createElement(Paper_1.default, null, error.toString()));
    }
    const idToChangeSet = new Map();
    for (let changeSet of props.changeSets) {
        idToChangeSet.set(changeSet.id, changeSet);
    }
    let selectedChangeSet = null;
    if (changeSetId) {
        selectedChangeSet = idToChangeSet.get(changeSetId);
    }
    function commitChangeSet() {
        if (!changeSetId) {
            throw new Error('Change set id is null, should never happen.');
        }
        commitChangeSetMutation({ variables: { changeSetId } });
    }
    const changeSetSelectorItems = [];
    for (let id of idToChangeSet.keys()) {
        changeSetSelectorItems.push(react_1.default.createElement(core_1.MenuItem, { key: id, value: id }, id));
    }
    return (react_1.default.createElement(Paper_1.default, null,
        react_1.default.createElement(core_1.FormControl, null,
            react_1.default.createElement(AddChangeSetModal_1.default, { currentBaseHash: props.currentBaseHash, changeSets: props.changeSets }),
            react_1.default.createElement(core_1.InputLabel, { htmlFor: "select-change-set" }, "Select ChangeSet"),
            react_1.default.createElement(core_1.Select, { value: changeSetId, onChange: (event) => setChangeSetId(event.target.value), inputProps: { id: 'select-change-set' } }, changeSetSelectorItems)),
        selectedChangeSet && react_1.default.createElement(ActionList_1.default, { log: selectedChangeSet.log }),
        selectedChangeSet && react_1.default.createElement(ActionCreatorModal_1.default, { types: props.types, services: props.services }),
        selectedChangeSet && selectedChangeSet.log.length > 0 &&
            react_1.default.createElement(core_1.FormControl, null,
                react_1.default.createElement(core_1.Button, { variant: "contained", color: "primary", onClick: commitChangeSet }, "Commit ChangeSet"))));
};
exports.default = ChangeSetViewer;
