import { FormComponentProps, ActionFormHOC } from "./ActionForm"
import React from "react";
import { AddFieldTypeInputAction } from "../hooks";
import TypeSelector from "./TypeSelector";
import VersionSelector from "./VersionSelector";
import DefaultSelector from "./DefaultSelector";
import { FormControl, TextField, Checkbox } from "@material-ui/core";

const AddFieldTypeActionForm = ActionFormHOC(
  function (props: FormComponentProps<AddFieldTypeInputAction>) {
    return (
      <React.Fragment>
        <TypeSelector
          types={props.types}
          handleChange={props.handleChange('typeName')}
          value={props.value.typeName}
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
        <FormControl>
          <Checkbox
            id="optional"
            checked={props.value.optional}
            onChange={props.handleBooleanChange('optional')}
          />
        </FormControl>
        <DefaultSelector
          _default={props.value._default}
          handleChange={props.handleDefaultChange('_default')}
        />
        <FormControl>
          <TextField
              id="standard-name"
              label="Change Log"
              value={props.value.changeLog}
              onChange={props.handleChange('changeLog')}
              margin="normal"
          />
        </FormControl>
      </React.Fragment>
    );
  }
);

export default AddFieldTypeActionForm;