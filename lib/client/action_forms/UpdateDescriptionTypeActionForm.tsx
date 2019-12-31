import { FormComponentProps, ActionFormHOC } from "./ActionForm"
import { GQLUpdateDescriptionTypeActionInput } from "../hooks";
import TypeSelector from "./TypeSelector";
import { FormControl, TextField } from "@material-ui/core";
import React from "react";

const UpdateDescriptionTypeActionForm = ActionFormHOC(
  function (props: FormComponentProps<GQLUpdateDescriptionTypeActionInput>) {
    return (
      <React.Fragment>
        <TypeSelector
          types={props.types}
          handleChange={props.handleChange('typeName')}
          value={props.value.typeName}
        />
        <FormControl>
          <TextField
            id="description"
            label="Type Description"
            value={props.value.description}
            onChange={props.handleChange('description')}
            margin="normal"
          />
        </FormControl>
      </React.Fragment>
    );
  }
);

export default UpdateDescriptionTypeActionForm;