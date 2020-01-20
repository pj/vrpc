"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const styles_1 = require("@material-ui/core/styles");
const Paper_1 = __importDefault(require("@material-ui/core/Paper"));
const InputLabel_1 = __importDefault(require("@material-ui/core/InputLabel"));
const MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
const FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
const Select_1 = __importDefault(require("@material-ui/core/Select"));
const useStyles = styles_1.makeStyles(theme => ({
    root: {
        width: "30%",
        display: "flex",
        flexDirection: "column",
        margin: "20px",
        padding: "20px"
    },
    table: {},
    tableCell: {}
}));
const RenderType = (props) => {
    console.log(props);
    let fields = [];
    for (let field of props.version.fields) {
        const _type = (field.field._type === 'stringType' ? 'string' : (field.field._type === 'booleanType' ? 'boolean' : 'number'));
        const _optional = field.field.optional ? ' | null' : '';
        fields.push(` // ${field.field.description}
   // ${field.field.changeLog}
   ${field.field.name}: ${_type}${_optional};`);
    }
    let code = `// ${props._type.description}
type ${props.version._type} {
  ${fields}
}`;
    return (react_1.default.createElement("pre", null, code));
};
const RenderService = (props) => {
    console.log(props);
    const inputTypes = props.version.inputs.map(input => `${input._type}_V${input.version}`).join(' | ');
    let code = `// ${props.service.description}
function ${props.service.name}(
  input: ${inputTypes}
): ${props.version.output._type}_V${props.version.output.version} {
  ...
}`;
    return (react_1.default.createElement("pre", null, code));
};
const TypeViewer = (props) => {
    if (!props.types) {
        return null;
    }
    const versionsByType = new Map();
    const servicesByName = new Map();
    const typesByName = new Map();
    for (let _type of props.types) {
        const versions = new Map();
        for (let version of _type.versions) {
            versions.set(version.version, version);
        }
        versionsByType.set(_type.name, versions);
        typesByName.set(_type.name, _type);
    }
    for (let service of props.services) {
        servicesByName.set(service.name, service);
    }
    const classes = useStyles();
    const [selectedType, setSelectedType] = react_2.useState("");
    const [selectedVersion, setSelectedVersion] = react_2.useState("");
    const [validVersions, setValidVersions] = react_2.useState([]);
    function handleTypeChange(event) {
        setSelectedType(event.target.value);
        setSelectedVersion("");
        const versions = versionsByType.get(event.target.value);
        if (versions) {
            const versionNumbers = Array.from(versions.keys());
            setValidVersions(versionNumbers);
        }
        else {
            setValidVersions([]);
        }
    }
    function handleVersionChange(event) {
        setSelectedVersion(event.target.value);
    }
    let product = null;
    if (selectedType !== "") {
        const typeVersions = versionsByType.get(selectedType);
        if (typeVersions) {
            if (selectedVersion !== "") {
                const version = typeVersions.get(parseInt(selectedVersion, 10));
                const _type = typesByName.get(selectedType);
                product = (react_1.default.createElement(RenderType, { version: version, _type: _type }));
            }
        }
        else {
            const service = servicesByName.get(selectedType);
            product = (react_1.default.createElement(RenderService, { service: service, version: service.versions[service.versions.length - 1] }));
        }
    }
    return (react_1.default.createElement(Paper_1.default, { className: classes.root },
        react_1.default.createElement(FormControl_1.default, null,
            react_1.default.createElement(InputLabel_1.default, { htmlFor: "selected-type" }, "Selected Type/Version"),
            react_1.default.createElement(Select_1.default, { value: selectedType, onChange: handleTypeChange, inputProps: { id: 'selected-type' } },
                Array.from(versionsByType.keys()).map(name => react_1.default.createElement(MenuItem_1.default, { key: name, value: name }, name)),
                Array.from(servicesByName.keys()).map(name => react_1.default.createElement(MenuItem_1.default, { key: name, value: name }, name)))),
        react_1.default.createElement(FormControl_1.default, null,
            react_1.default.createElement(InputLabel_1.default, { htmlFor: "selected-version" }, "Selected Version"),
            react_1.default.createElement(Select_1.default, { value: selectedVersion, onChange: handleVersionChange, inputProps: { id: 'selected-version' } }, validVersions.map(version => react_1.default.createElement(MenuItem_1.default, { key: version, value: version }, version)))),
        react_1.default.createElement("div", null, product)));
};
exports.default = TypeViewer;
