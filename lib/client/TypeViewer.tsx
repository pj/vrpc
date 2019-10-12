import React from 'react';
import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Paper from '@material-ui/core/Paper';

import {ALL_DATA, ACTIONS_FRAGMENT, GET_LOG} from './Fragments';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles(theme => ({
  root: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    margin: "20px",
    padding: "20px"
  },
  table: {
  },
  tableCell: {
  }
}));

const RenderType = (props: any) => {
  console.log(props);
  let fields = [];
  for (let field of props.version.fields) {
    const _type = (
      field.field._type === 'stringType' ? 'string' : (field.field._type === 'booleanType' ? 'boolean' : 'number')
    );
    const _optional = field.field.optional ? ' | null' : '';
    fields.push(
` // ${field.field.description}
   // ${field.field.changeLog}
   ${field.field.name}: ${_type}${_optional};`);
  }

  let code = `// ${props._type.description}
type ${props.version._type} {
  ${fields}
}`;

  return (<pre>{code}</pre>);
};

const RenderService = (props: any) => {
  console.log(props);
  const inputTypes = props.version.inputs.map(
    input => `${input._type}_V${input.version}`,
  ).join(' | ');

  let code = `// ${props.service.description}
function ${props.service.name}(
  input: ${inputTypes}
): ${props.version.output._type}_V${props.version.output.version} {
  ...
}`;

  return (<pre>{code}</pre>);
};

const TypeViewer = (props: any) => {
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
  const [selectedType, setSelectedType] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("");
  const [validVersions, setValidVersions] = useState([]);

  function handleTypeChange(event) {
    setSelectedType(event.target.value);
    setSelectedVersion("");
    const versions = versionsByType.get(event.target.value);
    if (versions) {
      const versionNumbers = Array.from(versions.keys());
      setValidVersions(versionNumbers);
    } else {
      setValidVersions([]);
    }
  }

  function handleVersionChange(event) {
    setSelectedVersion(event.target.value);
  }

  let product = null;
  if (selectedType !== "") {
    const typeVersions = versionsByType.get(
      selectedType
    );
    if (typeVersions){
      if (selectedVersion !== "") {
        const version = typeVersions.get(parseInt(selectedVersion, 10));

        const _type = typesByName.get(selectedType);
        product = (<RenderType version={version} _type={_type} />);
      }
    } else {
      const service = servicesByName.get(selectedType);

      product = (
        <RenderService
          service={service}
          version={service.versions[service.versions.length-1]}
        />);
    }
  }

  return (
    <Paper className={classes.root}>
      <FormControl>
        <InputLabel htmlFor="selected-type">Selected Type/Version</InputLabel>
        <Select
          value={selectedType}
          onChange={handleTypeChange}
          inputProps={{id: 'selected-type'}}
        >
          {
            Array.from(versionsByType.keys()).map(name =>
              <MenuItem key={name} value={name}>{name}</MenuItem>
            )
          }
          {
            Array.from(servicesByName.keys()).map(name =>
              <MenuItem key={name} value={name}>{name}</MenuItem>
            )
          }
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="selected-version">Selected Version</InputLabel>
        <Select
          value={selectedVersion}
          onChange={handleVersionChange}
          inputProps={{id: 'selected-version'}}
        >
          {
            validVersions.map(version =>
              <MenuItem key={version} value={version}>{version}</MenuItem>)
          }
        </Select>
      </FormControl>
      <div>{product}</div>
    </Paper>
  );
}

export default TypeViewer;
