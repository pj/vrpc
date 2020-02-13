import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import React from "react";

const ACTION_NAMES = [
  "RenameFieldTypeAction",
  "RequiredFieldTypeAction",
  "OptionalFieldTypeAction",
  "DeleteFieldTypeAction",
  "SetDefaultFieldTypeAction",
  "RemoveDefaultFieldTypeAction",
  "AddFieldTypeAction",
  "UpdateDescriptionTypeAction",
  "ReferenceFieldTypeAction",
  "NewTypeAction",
  "UpdateDescriptionServiceAction",
  "AddVersionServiceAction",
  "NewServiceAction"
]

type ActionTypeSelectorProps = {
  logType: string,
  onChange: (actionType: string) => void
}

const ActionTypeSelector = (props: ActionTypeSelectorProps) => {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    props.onChange(event.target.value);
  }

  return (
    <FormControl>
      <InputLabel htmlFor="action-type">Action Type</InputLabel>
      <Select
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