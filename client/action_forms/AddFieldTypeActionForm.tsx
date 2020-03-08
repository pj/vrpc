import { FormComponentProps, ActionFormHOC } from "./ActionForm"
import React from "react";
import { AddFieldTypeInputAction } from "../hooks";
import TypeSelector from "./TypeSelector";
import VersionSelector from "./VersionSelector";
import DefaultSelector from "./DefaultSelector";
import { FormControl, TextField, Checkbox, InputLabel, FormControlLabel } from "@material-ui/core";

const AddFieldTypeActionForm = ActionFormHOC(
  function (props: FormComponentProps<AddFieldTypeInputAction>) {
    return (
      <React.Fragment>
        <TypeSelector
          types={props.types}
          handleChange={props.handleChange('typeName')}
          value={props.value.typeName || ''}
        />
        <FormControl>
          <TextField
            id="fieldName"
            label="New field name"
            value={props.value.name}
            onChange={props.handleChange('name')}
            margin="normal"
          />
        </FormControl>
        <FormControl>
          <TextField
            id="description"
            label="Field description"
            value={props.value.description}
            onChange={props.handleChange('description')}
            margin="normal"
          />
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              id="add-field-is-optional"
              checked={props.value.optional}
              onChange={props.handleBooleanChange('optional')}
            />
          } 
          label="Is Optional"
        />
        <DefaultSelector
          _default={props.value._default}
          handleChange={props.handleDefaultChange('_default')}
        />
      </React.Fragment>
    );
  },
  'addField',
  {
    optional: false
  }
);

export default AddFieldTypeActionForm;