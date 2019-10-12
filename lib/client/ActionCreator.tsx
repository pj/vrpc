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

const TypeSelector = (props: any) => {
  const typeNames = props.types.map(t => t.name);

  return (
    <FormControl>
      <InputLabel htmlFor="select-type">Type name</InputLabel>
      <Select
        value={props.value}
        onChange={props.handleChange}
        inputProps={{id: 'select-type'}}
      >
      {
        typeNames.map(name =>
          <MenuItem key={name} value={name} >
            {name}
          </MenuItem>
        )
      }
      </Select>
    </FormControl>
  );
}

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


const ADD_TO_LOG = gql`
mutation AddToLog($input: LogActionInput!) {
  addToLog(input: $input) {
    ${ALL_DATA}
  }
}
${ACTIONS_FRAGMENT}
`;


const ActionCreator = (props: any) => {
  if (!props.types) {
    return null;
  }

  const classes = useStyles();
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

  function updateCacheFromAdd(cache: any, mutationResult: any) {
    try {
      console.log(mutationResult);
      const data = cache.readQuery({ query: GET_LOG });
      data.log = mutationResult.data.addToLog.log;
      data.types = mutationResult.data.addToLog.types;
      data.services = mutationResult.data.addToLog.services;
      cache.writeQuery({query: GET_LOG, data});
    } catch (e) {
      console.error(e);
    }
  }

  function completeUpdate() {
    setValues({
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
      logType: ""
    });
  }

  const [
   addToLog,
   { loading: mutationLoading, error: mutationError },
  ] = useMutation(
    ADD_TO_LOG,
    {
      //update: updateCacheFromAdd,
      refetchQueries: ['GetLog'],
      onCompleted: completeUpdate,
    }
  );

  if (mutationLoading) {
    return <CircularProgress />;
  }

  function handleAddToLog(event) {
    addToLog({variables: {input: values}});
  }

  function handleTypeChange(event) {
    setValues({
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
      logType: event.target.value
    });
  }

  function handleChange(key) {
    function innerHandleChange(event) {
      setValues({...values, [key]: event.target.value});
    }

    return innerHandleChange;
  }

  function handleBooleanChange(key) {
    function innerHandleChange(event) {
      setValues({...values, [key]: !values[key]});
    }

    return innerHandleChange;
  }

  function handleRenameSetType(event) {
    setValues({...values, typeName: event.target.value, fieldName: ""});
  }

  let editor = null;

  if (values.logType === "RenameFieldTypeAction") {
    editor = (
      <React.Fragment>
      <TypeSelector
        types={props.types}
        handleChange={handleRenameSetType}
        value={values.typeName}
      />
      <FieldSelector
        types={props.types}
        handleChange={handleChange('fieldName')}
        value={values.fieldName}
        selectedType={values.typeName}
      />
      <FormControl>
        <TextField
          id="fieldName"
          label="New Name"
          value={values.newFieldName}
          onChange={handleChange('newFieldName')}
          margin="normal"
        />
      </FormControl>
      </React.Fragment>
    );
  } else if(
    values.logType === "RequiredFieldTypeAction"
    || values.logType === "OptionalFieldTypeAction"
    || values.logType === "DeleteFieldTypeAction"
    || values.logType === "RemoveDefaultFieldTypeAction"
  ) {
    editor = (
      <React.Fragment>
      <TypeSelector
        types={props.types}
        handleChange={handleRenameSetType}
        value={values.typeName}
      />
      <FieldSelector
        types={props.types}
        handleChange={handleChange('fieldName')}
        value={values.fieldName}
        selectedType={values.typeName}
      />
      </React.Fragment>
    );
  } else if( values.logType === "SetDefaultFieldTypeAction") {
    editor = (
      <React.Fragment>
      <TypeSelector
        types={props.types}
        handleChange={handleRenameSetType}
        value={values.typeName}
      />
      <FieldSelector
        types={props.types}
        handleChange={handleChange('fieldName')}
        value={values.fieldName}
        selectedType={values.typeName}
      />
      <DefaultSelector
        defaultType={values.defaultType}
        defaultValue={values.defaultValue}
        handleTypeChange={handleChange('defaultType')}
        handleValueChange={handleChange('defaultValue')}
      />
      </React.Fragment>
    );
  } else if( values.logType === "AddFieldTypeAction") {
    editor = (
    <React.Fragment>
      <TypeSelector
        types={props.types}
        handleChange={handleChange('typeName')}
        value={values.typeName}
      />
      <FormControl>
        <TextField
          id="fieldName"
          label="New field name"
          value={values.fieldName}
          onChange={handleChange('fieldName')}
          margin="normal"
        />
      </FormControl>
      <FormControl>
        <TextField
          id="description"
          label="Field description"
          value={values.fieldDescription}
          onChange={handleChange('fieldDescription')}
          margin="normal"
        />
      </FormControl>
      <FormControl>
        <Checkbox
          id="optional"
          label="Field Optional"
          checked={values.optional}
          onChange={handleBooleanChange('optional')}
        />
      </FormControl>
      <DefaultSelector
        defaultType={values.defaultType}
        defaultValue={values.defaultValue}
        handleTypeChange={handleChange('defaultType')}
        handleValueChange={handleChange('defaultValue')}
      />
    </React.Fragment>
    );
  } else if( values.logType === "UpdateDescriptionTypeAction") {
    editor = (
      <React.Fragment>
        <TypeSelector
          types={props.types}
          handleChange={handleChange('typeName')}
          value={values.typeName}
        />
        <FormControl>
          <TextField
            id="description"
            label="Type Description"
            value={values.description}
            onChange={handleChange('description')}
            margin="normal"
          />
        </FormControl>
      </React.Fragment>
    );
  } else if( values.logType === "ReferenceFieldTypeAction") {
    editor = (
      <React.Fragment>
        <TypeSelector
          types={props.types}
          handleChange={handleChange('typeName')}
          value={values.typeName}
        />
        <FormControl>
          <TextField
            id="fieldName"
            label="New field name"
            value={values.fieldName}
            onChange={handleChange('fieldName')}
            margin="normal"
          />
        </FormControl>
        <FormControl>
          <TextField
            id="description"
            label="Field description"
            value={values.fieldDescription}
            onChange={handleChange('fieldDescription')}
            margin="normal"
          />
        </FormControl>
        <FormControl>
          <Checkbox
            id="optional"
            label="Field Optional"
            checked={values.optional}
            onChange={handleBooleanChange('optional')}
          />
        </FormControl>
        <TypeSelector
          types={props.types}
          handleChange={handleChange('referenceName')}
          value={values.referenceName}
        />
        <VersionSelector
          types={props.types}
          handleChange={handleChange('referenceVersion')}
          value={values.referenceVersion}
        />
      </React.Fragment>
    );

  } else if( values.logType === "NewTypeAction") {
    editor = (
      <React.Fragment>
      <FormControl>
        <TextField
          id="typeName"
          label="Name of new Type"
          value={values.typeName}
          onChange={handleChange('typeName')}
          margin="normal"
        />
      </FormControl>
      <FormControl>
        <TextField
          id="description"
          label="Description of new type"
          value={values.description}
          onChange={handleChange('description')}
          margin="normal"
        />
      </FormControl>
      </React.Fragment>
    );
  } else if( values.logType === "UpdateDescriptionServiceAction") {
    editor = (
      <FormControl>
      <ServiceSelector
        types={props.services}
        handleChange={handleChange('serviceName')}
        value={values.serviceName}
      />
      <TextField
        id="description"
        label="Description of service"
        value={values.description}
        onChange={handleChange('description')}
        margin="normal"
      />
      </FormControl>
    );
  } else if( values.logType === "AddVersionServiceAction") {
    editor = (
      <React.Fragment>
      <TypeSelector
        types={props.types}
        handleChange={handleChange('inputName')}
        value={values.inputName}
      />
      <VersionSelector
        types={props.types}
        handleChange={handleChange('inputName')}
        value={values.inputVersion}
      />
      <TypeSelector
        types={props.types}
        handleChange={handleChange('outputName')}
        value={values.outputName}
      />
      <VersionSelector
        types={props.types}
        handleChange={handleChange('outputVersion')}
        value={values.outputVersion}
      />
      </React.Fragment>
    );

  } else if( values.logType === "NewServiceAction") {
    editor = (
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

  return (
    <Paper className={classes.root}>
      {
        mutationError && (
          <div>
            {mutationError.toString()}
          </div>
        )
      }
      <FormControl>
        <InputLabel htmlFor="action-type">Action Type</InputLabel>
        <Select
          value={values.logType}
          onChange={handleTypeChange}
          inputProps={{id: 'action-type'}}
        >
          <MenuItem value={"RenameFieldTypeAction"} >RenameFieldTypeAction</MenuItem>
          <MenuItem value={"RequiredFieldTypeAction"} >RequiredFieldTypeAction</MenuItem>
          <MenuItem value={"OptionalFieldTypeAction"} >OptionalFieldTypeAction</MenuItem>
          <MenuItem value={"DeleteFieldTypeAction"} >DeleteFieldTypeAction</MenuItem>
          <MenuItem value={"SetDefaultFieldTypeAction"} >SetDefaultFieldTypeAction</MenuItem>
          <MenuItem value={"RemoveDefaultFieldTypeAction"} >RemoveDefaultFieldTypeAction</MenuItem>
          <MenuItem value={"AddFieldTypeAction"} >AddFieldTypeAction</MenuItem>
          <MenuItem value={"UpdateDescriptionTypeAction"} >UpdateDescriptionTypeAction</MenuItem>
          <MenuItem value={"ReferenceFieldTypeAction"} >ReferenceFieldTypeAction</MenuItem>
          <MenuItem value={"NewTypeAction"} >NewTypeAction</MenuItem>
          <MenuItem value={"UpdateDescriptionServiceAction"} >UpdateDescriptionServiceAction</MenuItem>
          <MenuItem value={"AddVersionServiceAction"} >AddVersionServiceAction</MenuItem>
          <MenuItem value={"NewServiceAction"} >NewServiceAction</MenuItem>
        </Select>
      </FormControl>
      {editor}
      {values.logType !== "" && <FormControl>
        <TextField
            id="standard-name"
            label="Change Log"
            value={values.changeLog}
            onChange={handleChange('changeLog')}
            margin="normal"
        />
      </FormControl>
      }
      <FormControl>
        <Button variant="contained" color="primary" onClick={handleAddToLog}>
          Add To Log
        </Button>
      </FormControl>
    </Paper>
  );
}

export default ActionCreator;
