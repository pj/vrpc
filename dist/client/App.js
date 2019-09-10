"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const App = () => {
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement("header", { className: "App-header" },
            react_1.default.createElement("h1", { className: "App-title" }, "Welcome to React")),
        react_1.default.createElement("p", { className: "App-intro" },
            "To get started, edit ",
            react_1.default.createElement("code", null, "src/App.js"),
            " and save to reload.")));
};
exports.default = App;
