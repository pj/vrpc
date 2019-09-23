import React from 'react';
import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Paper from '@material-ui/core/Paper';

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
    maxWidth: "400px"
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
    optional: true
  } as any);

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
      logType: event.target.value
    });
  }

  function handleChange(key) {
    function innerHandleChange(event) {
      setValues({...values, [key]: event.target.value});
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
          onChange={handleChange('optional')}
        />
      </FormControl>
      <DefaultSelector
        defaultType={values.defaultType}
        defaultValue={values.defaultValue}
        handleTypeChange={handleChange('defaultType')}
        handleValueChange={handleChange('defaultValue')}
      />
    </React.Fragment>
  } else if( values.logType === "UpdateDescriptionTypeAction") {
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
  } else if( values.logType === "ReferenceFieldTypeAction") {

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
        <Button variant="contained" color="primary">
          Add To Log
        </Button>
      </FormControl>
    </Paper>
  );
}

export default ActionCreator;
