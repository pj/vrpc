import React from 'react';
import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Paper from '@material-ui/core/Paper';

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
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    margin: "20px",
    width: "20%"
  },
  table: {
  },
  tableCell: {
    verticalAlign: 'top'
  }
}));

const DEFAULT_TYPES = [
  "number",
  "string",
  "boolean"
];


const FieldSelector = (props: any) => {
  const fieldNamesByType = new Map();
  for (let _type of props.types) {
    const lastVersion = _type.versions[_type.versions.length-1];

    const fields = lastVersion.fields.map(f => f.key);
    fieldNamesByType.set(_type.name, fields);
  }

  return (
    <FormControl>
      <InputLabel htmlFor="select-field">Field name</InputLabel>
      <Select
        value={props.value}
        onChange={props.handleChange}
        inputProps={{id: 'select-field'}}
      >
      {
        props.selectedType !== "" && fieldNamesByType.get(props.selectedType).map(
          fieldName =>
            <MenuItem key={fieldName} value={fieldName} >
              {fieldName}
            </MenuItem>
        )
      }
      </Select>
    </FormControl>
  );
}

const DefaultSelector = (props: any) => {
  return (
    <React.Fragment>
      <FormControl>
        <InputLabel htmlFor="select-field">Default Type</InputLabel>
        <Select
          value={props.defaultType}
          onChange={props.handleTypeChange}
          inputProps={{id: 'select-field'}}
        >
        {
          DEFAULT_TYPES.map(
            defaultType =>
              <MenuItem key={defaultType} value={defaultType} >
                {defaultType}
              </MenuItem>
          )
        }
        </Select>
      </FormControl>
      <FormControl>
        <TextField
          id="defaultValue"
          label="Value of default"
          value={props.defaultValue}
          onChange={props.handleValueChange}
          margin="normal"
        />
      </FormControl>
    </React.Fragment>
  );
}

const ServiceSelector = (props: any) => {
  const serviceNames = props.services.map(s => s.name);

  return (
    <FormControl>
      <InputLabel htmlFor="select-service">Service name</InputLabel>
      <Select
        value={props.value}
        onChange={props.handleChange}
        inputProps={{id: 'select-service'}}
      >
      {
        serviceNames.map(name =>
          <MenuItem key={name} value={name} >
            {name}
          </MenuItem>
        )
      }
      </Select>
    </FormControl>
  );
}

const VersionSelector = (props: any) => {
  let versions = [];
  for (let _type of props.types) {
    if (_type.name === props.typeName) {
      versions = _type.versions.map(t => t.version);
      break;
    }
  }

  return (
    <FormControl>
      <InputLabel htmlFor="select-version">Select Version</InputLabel>
      <Select
        value={props.value}
        onChange={props.handleChange}
        inputProps={{id: 'select-version'}}
      >
      {
        versions.map(name =>
          <MenuItem key={name} value={name} >
            {name}
          </MenuItem>
        )
      }
      </Select>
    </FormControl>
  );
}

type NewServiceActionFormProps = {
  
}

const NewServiceActionForm = (props: NewServiceActionFormProps) => {

  const [values, setValues] = useState({
    logType: "",
    changeLog: "",
    typeName: "",
    description: "",
    serviceName: "",
    fieldName: "",
    newFieldName: "",
    defaultType: "",
    defaultValue: "",
    fieldDescription: "",
    optional: true,
    outputName: "",
    inputName: "",
    inputVersion: "",
    outputVersion: "",
    referenceName: "",
    referenceVersion: "",
  } as any);
      <React.Fragment>
      <FormControl>
        <TextField
          id="serviceName"
          label="Name of new Service"
          value={values.typeName}
          onChange={handleChange('serviceName')}
          margin="normal"
        />
      </FormControl>
      <FormControl>
        <TextField
          id="description"
          label="Description of new service"
          value={values.description}
          onChange={handleChange('description')}
          margin="normal"
        />
      </FormControl>
      </React.Fragment>
    );
}

export default NewServiceActionForm;
