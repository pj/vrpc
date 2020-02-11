"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const classnames_1 = __importDefault(require("classnames"));
const Paper_1 = __importDefault(require("@material-ui/core/Paper"));
const Table_1 = __importDefault(require("@material-ui/core/Table"));
const TableBody_1 = __importDefault(require("@material-ui/core/TableBody"));
const TableCell_1 = __importDefault(require("@material-ui/core/TableCell"));
const TableRow_1 = __importDefault(require("@material-ui/core/TableRow"));
const Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
const List_1 = __importDefault(require("@material-ui/core/List"));
const ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
const ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
const useStyles = styles_1.makeStyles(theme => ({
    root: {},
    table: {},
    tableCell: {
        verticalAlign: 'top'
    },
    actionButtons: {
        display: 'flex'
    },
    spacerRow: {},
    headerRow: {},
    metadataRow: {}
}));
const MetaDataRow = (props) => {
    const classes = useStyles(props);
    return (react_1.default.createElement(TableRow_1.default, { className: classes.metadataRow },
        react_1.default.createElement(TableCell_1.default, null)));
};
const HeaderRow = (props) => {
    const classes = useStyles(props);
    return (react_1.default.createElement(TableRow_1.default, { className: classes.headerRow },
        react_1.default.createElement(TableCell_1.default, null),
        react_1.default.createElement(TableCell_1.default, null, "Name"),
        react_1.default.createElement(TableCell_1.default, null, "Action"),
        react_1.default.createElement(TableCell_1.default, null, "Version"),
        react_1.default.createElement(TableCell_1.default, null, "Change"),
        react_1.default.createElement(TableCell_1.default, null, "Options")));
};
const SpacerRow = (props) => {
    const classes = useStyles(props);
    return (react_1.default.createElement(TableRow_1.default, { className: classes.spacerRow },
        react_1.default.createElement(TableCell_1.default, null)));
};
function getTypeOrServiceName(action) {
    if (action.__typename === "RenameFieldTypeAction"
        || action.__typename === "RequiredFieldTypeAction"
        || action.__typename === "OptionalFieldTypeAction"
        || action.__typename === "DeleteFieldTypeAction"
        || action.__typename === "SetDefaultFieldTypeAction"
        || action.__typename === "RemoveDefaultFieldTypeAction"
        || action.__typename === "AddFieldTypeAction"
        || action.__typename === "UpdateDescriptionTypeAction"
        || action.__typename === "ReferenceFieldTypeAction"
        || action.__typename === "NewTypeAction"
        || action.__typename === "RenameFieldTypeChangeAction"
        || action.__typename === "RequiredFieldTypeChangeAction"
        || action.__typename === "OptionalFieldTypeChangeAction"
        || action.__typename === "DeleteFieldTypeChangeAction"
        || action.__typename === "SetDefaultFieldTypeChangeAction"
        || action.__typename === "RemoveDefaultFieldTypeChangeAction"
        || action.__typename === "AddFieldTypeChangeAction"
        || action.__typename === "UpdateDescriptionTypeChangeAction"
        || action.__typename === "ReferenceFieldTypeChangeAction"
        || action.__typename === "NewTypeChangeAction") {
        return [action.typeName, false];
    }
    else if (action.__typename === "UpdateDescriptionServiceAction"
        || action.__typename === "AddVersionServiceAction"
        || action.__typename === "NewServiceAction"
        || action.__typename === "UpdateDescriptionServiceChangeAction"
        || action.__typename === "AddVersionServiceChangeAction"
        || action.__typename === "NewServiceChangeAction") {
        return [action.serviceName, true];
    }
    throw new Error(`Unable to get type or service name for action ${action}`);
}
const OptionsCell = (props) => {
    const classes = useStyles(props);
    const options = [];
    for (let [key, value] of Object.entries(props.action)) {
        if ([
            '__typename',
            'version',
            'changeLog',
            'hash',
            'typeName',
            'serviceName',
            '_id',
        ].indexOf(key) === -1) {
            options.push(react_1.default.createElement(ListItem_1.default, { key: key, alignItems: "flex-start" },
                react_1.default.createElement(ListItemText_1.default, { primary: key }),
                react_1.default.createElement(ListItemText_1.default, { primary: value })));
        }
    }
    const tableClasses = classnames_1.default({
        [`${classes.tableCell}`]: true,
    });
    return (react_1.default.createElement(TableCell_1.default, { className: tableClasses },
        react_1.default.createElement(List_1.default, { dense: true }, options)));
};
exports.ActionList = (props) => {
    const classes = useStyles(props);
    const tableRows = [];
    for (let groupAction of props.log) {
        for (let action of groupAction.actions) {
            tableRows.push(react_1.default.createElement(MetaDataRow, null));
            tableRows.push(react_1.default.createElement(HeaderRow, null));
            const [name, isService] = getTypeOrServiceName(action);
            const tableClasses = classnames_1.default({
                [`${classes.tableCell}`]: true,
            });
            tableRows.push(react_1.default.createElement(TableRow_1.default, { key: action.hash },
                react_1.default.createElement(TableCell_1.default, { className: tableClasses }, isService ? "Service" : "Type"),
                react_1.default.createElement(TableCell_1.default, { className: tableClasses }, name),
                react_1.default.createElement(TableCell_1.default, { className: tableClasses }, action.__typename),
                react_1.default.createElement(TableCell_1.default, { className: tableClasses },
                    react_1.default.createElement(Tooltip_1.default, { title: `hash: ${action.hash}`, placement: "top" },
                        react_1.default.createElement("span", null, action.version))),
                react_1.default.createElement(TableCell_1.default, { className: tableClasses }, action.changeLog),
                react_1.default.createElement(OptionsCell, { action: action })));
        }
        tableRows.push(react_1.default.createElement(SpacerRow, null));
    }
    return (react_1.default.createElement(Paper_1.default, null,
        react_1.default.createElement(Table_1.default, { className: classes.table },
            react_1.default.createElement(TableBody_1.default, null, tableRows.reverse()))));
};
exports.ChangeSetActionList = (props) => {
    const classes = useStyles(props);
    const tableRows = [];
    const tableClasses = classnames_1.default({
        [`${classes.tableCell}`]: true,
    });
    for (let changeAction of props.actions) {
        const [name, isService] = getTypeOrServiceName(changeAction);
        tableRows.push(react_1.default.createElement(TableRow_1.default, null,
            react_1.default.createElement(TableCell_1.default, { className: tableClasses }, isService ? "Service" : "Type"),
            react_1.default.createElement(TableCell_1.default, { className: tableClasses }, name),
            react_1.default.createElement(TableCell_1.default, { className: tableClasses }, changeAction.__typename)
        // @ts-ignore
        ,
            "// @ts-ignore",
            react_1.default.createElement(TableCell_1.default, { className: tableClasses }, changeAction.changeLog),
            react_1.default.createElement(OptionsCell, { action: changeAction })));
    }
    return (react_1.default.createElement(Paper_1.default, null,
        react_1.default.createElement(Table_1.default, { className: classes.table },
            react_1.default.createElement(TableBody_1.default, null, tableRows.reverse()))));
};
