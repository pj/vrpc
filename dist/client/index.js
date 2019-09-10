"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_boost_1 = require("apollo-boost");
const App_1 = require("./App");
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const client = new apollo_boost_1.default({
    uri: 'http://localhost:4000',
});
const apollo_boost_2 = require("apollo-boost");
client
    .query({
    query: apollo_boost_2.gql `
    {
      courses {
        title
      }
    }`
})
    .then(result => console.log(result));
react_dom_1.default.render(react_1.default.createElement(App_1.default, null), document.getElementById('root'));
