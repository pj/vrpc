"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const AppBar_1 = __importDefault(require("@material-ui/core/AppBar"));
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const ActionList_1 = require("./ActionList");
const ChangeSetViewer_1 = __importDefault(require("./ChangeSetViewer"));
const hooks_1 = require("./hooks");
const drawerWidth = 240;
const useStyles = styles_1.makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    topSection: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%"
    },
    toolbar: theme.mixins.toolbar,
}));
const App = (props) => {
    const classes = useStyles(props);
    const { loading, data } = hooks_1.useAllDataQuery();
    if (loading || !data) {
        return null;
    }
    // FIXME: fix types: need to restructure so group actions aren't part of 
    // regular log actions.
    return (react_1.default.createElement("div", { className: classes.root },
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement(AppBar_1.default, { position: "fixed", className: classes.appBar },
            react_1.default.createElement(Toolbar_1.default, null,
                react_1.default.createElement(Typography_1.default, { variant: "h6", noWrap: true }, "VRPC editing"))),
        react_1.default.createElement("main", { className: classes.content },
            react_1.default.createElement("div", { className: classes.toolbar }),
            react_1.default.createElement(ChangeSetViewer_1.default, { changeSets: data.changeSets, currentBaseHash: data.log[0].hash, types: data.types, services: data.services }),
            react_1.default.createElement(ActionList_1.ActionList, { log: data.log }))));
};
exports.default = App;
