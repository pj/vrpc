import { FormComponentProps, ActionFormHOC } from "./ActionForm"
import React from "react";
import TypeSelector from "./TypeSelector";
import FieldSelector from "./FieldSelector";
import { GQLRenameFieldTypeActionInput } from "../hooks";
import { FormControl, TextField } from "@material-ui/core";

const RenameFieldTypeActionForm = ActionFormHOC(
  function (props: FormComponentProps<GQLRenameFieldTypeActionInput>) {
    return (
      <React.Fragment>
        <TypeSelector
          types={props.types}
          handleChange={props.handleChange('typeName')}
          value={props.value.typeName}
        />
        <FieldSelector
          types={props.types}
          handleChange={props.handleChange('_from')}
          value={props.value._from}
          selectedType={props.value.typeName}
        />
        <FormControl>
          <TextField
            id="fieldName"
            label="New Name"
            value={props.value.to}
            onChange={props.handleChange('to')}
            margin="normal"
          />
        </FormControl>
      </React.Fragment>
    );
  }
);

export default RenameFieldTypeActionForm;