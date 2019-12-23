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
import { GQLService, GQLType, useUpdateChangeSetMutation } from './hooks';
import TypeSelector from './action_forms/TypeSelector';
import ActionForm from './action_forms/ActionForm';


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

type ActionCreatorModalProps = {
  types: GQLType,
  services: GQLService,
}

const ActionCreatorModal = (props: ActionCreatorModalProps) => {
  const classes = useStyles(props);
  const [updateChangeSet, {loading, error}] = useUpdateChangeSetMutation();
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

  return (
    <Paper className={classes.root}>
      {
        mutationError && (
          <div>
            {mutationError.toString()}
          </div>
        )
      }
      
      <ActionTypeSelector />
      <ActionForm />
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

export default ActionCreatorModal;
