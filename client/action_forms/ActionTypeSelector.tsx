import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, makeStyles } from "@material-ui/core";
import React from "react";

const ACTION_NAMES = [
  "RenameFieldTypeAction",
  "RequiredFieldTypeAction",
  "OptionalFieldTypeAction",
  "DeleteFieldTypeAction",
  "SetDefaultFieldTypeAction",
  "RemoveDefaultFieldTypeAction",
  "AddFieldTypeAction",
  "UpdateFieldDescriptionTypeAction",
  "ReferenceFieldTypeAction",
  "NewTypeAction",
  "UpdateDescriptionServiceAction",
  "AddVersionServiceAction",
  "NewServiceAction"
]
const useStyles = makeStyles(theme => ({
  formControl: {
    width: '200px'
  },
}));

type ActionTypeSelectorProps = {
  logType: string,
  onChange: (actionType: string) => void
}

const ActionTypeSelector = (props: ActionTypeSelectorProps) => {
  const classes = useStyles(props);
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    props.onChange(event.target.value);
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="action-type-label">Action Type</InputLabel>
      <Select
        labelId="action-type-label"
        value={props.logType}
        onChange={handleChange}
        inputProps={{id: 'action-type'}}
      >
        {ACTION_NAMES.map(name => 
          <MenuItem key={name} value={name} >{name}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
}

export default ActionTypeSelector;