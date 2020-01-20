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
const TableHead_1 = __importDefault(require("@material-ui/core/TableHead"));
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
    }
}));
const ActionList = (props) => {
    const classes = useStyles(props);
    const tableRows = [];
    for (let [idx, logAction] of props.log.entries()) {
        let isService = false;
        let name = 'Group';
        if (logAction.__typename === "RenameFieldTypeAction"
            || logAction.__typename === "RequiredFieldTypeAction"
            || logAction.__typename === "OptionalFieldTypeAction"
            || logAction.__typename === "DeleteFieldTypeAction"
            || logAction.__typename === "SetDefaultFieldTypeAction"
            || logAction.__typename === "RemoveDefaultFieldTypeAction"
            || logAction.__typename === "AddFieldTypeAction"
            || logAction.__typename === "UpdateDescriptionTypeAction"
            || logAction.__typename === "ReferenceFieldTypeAction"
            || logAction.__typename === "NewTypeAction") {
            name = logAction.typeName;
        }
        else if (logAction.__typename === "UpdateDescriptionServiceAction"
            || logAction.__typename === "AddVersionServiceAction"
            || logAction.__typename === "NewServiceAction") {
            name = logAction.serviceName;
            isService = true;
        }
        // FIXME: fix any type.
        const options = [];
        for (let [key, value] of Object.entries(logAction)) {
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
        tableRows.push(react_1.default.createElement(TableRow_1.default, { key: logAction.hash },
            react_1.default.createElement(TableCell_1.default, { className: tableClasses }, isService ? "Service" : "Type"),
            react_1.default.createElement(TableCell_1.default, { className: tableClasses }, name),
            react_1.default.createElement(TableCell_1.default, { className: tableClasses }, logAction.__typename),
            react_1.default.createElement(TableCell_1.default, { className: tableClasses },
                react_1.default.createElement(Tooltip_1.default, { title: `hash: ${logAction.hash}`, placement: "top" },
                    react_1.default.createElement("span", null, logAction.version)),
                " : \"change set\""),
            react_1.default.createElement(TableCell_1.default, { className: tableClasses }, logAction.changeLog),
            react_1.default.createElement(TableCell_1.default, { className: tableClasses },
                react_1.default.createElement(List_1.default, { dense: true }, options))));
    }
    return (react_1.default.createElement(Paper_1.default, null,
        react_1.default.createElement(Table_1.default, { className: classes.table },
            react_1.default.createElement(TableHead_1.default, null,
                react_1.default.createElement(TableRow_1.default, null,
                    react_1.default.createElement(TableCell_1.default, null),
                    react_1.default.createElement(TableCell_1.default, null, "Name"),
                    react_1.default.createElement(TableCell_1.default, null, "Action"),
                    react_1.default.createElement(TableCell_1.default, null, "Version"),
                    react_1.default.createElement(TableCell_1.default, null, "Change"),
                    react_1.default.createElement(TableCell_1.default, null, "Options"))),
            react_1.default.createElement(TableBody_1.default, null, tableRows.reverse()))));
};
exports.default = ActionList;
