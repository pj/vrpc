import { FormComponentProps, ActionFormHOC } from "./ActionForm"
import React from "react";
import TypeSelector from "./TypeSelector";
import { GQLReferenceFieldTypeActionInput } from "../hooks";
import { FormControl, TextField, Checkbox } from "@material-ui/core";
import VersionSelector from "./VersionSelector";

const ReferencedFieldTypeActionForm = ActionFormHOC(
  function (props: FormComponentProps<GQLReferenceFieldTypeActionInput>) {
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
        <TypeSelector
          types={props.types}
          handleChange={props.handleChange('referenceType')}
          value={props.value.referenceType}
        />
        <VersionSelector
          types={props.types}
          typeName={props.value.referenceType}
          handleChange={props.handleChange('referenceVersion')}
          version={props.value.referenceVersion}
        />
      </React.Fragment>
    );
  }
);

export default ReferencedFieldTypeActionForm;