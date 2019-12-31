import { FormComponentProps, ActionFormHOC } from "./ActionForm"
import React from "react";
import { GQLReferenceFieldTypeActionInput } from "../hooks";
import { FormControl, TextField } from "@material-ui/core";

const NewTypeActionForm = ActionFormHOC(
  function (props: FormComponentProps<GQLReferenceFieldTypeActionInput>) {
    return (
      <React.Fragment>
        <FormControl>
          <TextField
            id="typeName"
            label="Name of new Type"
            value={props.value.typeName}
            onChange={props.handleChange('typeName')}
            margin="normal"
          />
        </FormControl>
        <FormControl>
          <TextField
            id="description"
            label="Description of new type"
            value={props.value.description}
            onChange={props.handleChange('description')}
            margin="normal"
          />
        </FormControl>
      </React.Fragment>
    );
  }
);

export default NewTypeActionForm;