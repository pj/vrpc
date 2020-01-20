"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_boost_1 = __importDefault(require("apollo-boost"));
const App_1 = __importDefault(require("./App"));
const react_1 = __importDefault(require("react"));
const ReactDOM = __importStar(require("react-dom"));
const react_hooks_1 = require("@apollo/react-hooks");
const apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
const apollo_cache_inmemory_2 = require("apollo-cache-inmemory");
const introspection_result_1 = __importDefault(require("../client/introspection_result"));
const fragmentMatcher = new apollo_cache_inmemory_2.IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspection_result_1.default
});
const cache = new apollo_cache_inmemory_1.InMemoryCache({ fragmentMatcher });
const client = new apollo_boost_1.default({
    cache,
    uri: 'http://localhost:4000',
});
ReactDOM.render(react_1.default.createElement(react_hooks_1.ApolloProvider, { client: client },
    react_1.default.createElement(App_1.default, null)), document.getElementById('root'));
