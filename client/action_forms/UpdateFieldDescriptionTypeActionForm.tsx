import { FormComponentProps, ActionFormHOC } from "./ActionForm"
import { UpdateFieldDescriptionTypeInputAction } from "../hooks";
import TypeSelector from "./TypeSelector";
import { FormControl, TextField } from "@material-ui/core";
import React from "react";
import FieldSelector from "./FieldSelector";

const UpdateFieldDescriptionTypeActionForm = ActionFormHOC(
  function (props: FormComponentProps<UpdateFieldDescriptionTypeInputAction>) {
    return (
      <React.Fragment>
        <TypeSelector
          types={props.types}
          handleChange={props.handleChange('typeName')}
          value={props.value.typeName}
        />
        <FieldSelector
          types={props.types}
          handleChange={props.handleChange('name')}
          value={props.value.name}
          selectedType={props.value.name}
        />
        <FormControl>
          <TextField
            id="description"
            label="Field Description"
            value={props.value.description}
            onChange={props.handleChange('description')}
            margin="normal"
          />
        </FormControl>
      </React.Fragment>
    );
  },
  'updateTypeDescription'
);

export default UpdateFieldDescriptionTypeActionForm;