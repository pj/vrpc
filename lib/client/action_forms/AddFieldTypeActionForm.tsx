import { ActionFormProps } from "./ActionForm";
import React, { useState } from "react";
import TypeSelector from "./TypeSelector";
import { FormControl, TextField, Checkbox } from "@material-ui/core";
import { GQLAddFieldTypeActionInput } from "../hooks";
import { handleChange, handleBooleanChange } from "./utils";
import DefaultSelector from "./DefaultSelector";

const AddFieldTypeActionForm = (props: ActionFormProps) => {
  const [values, setValues] = useState<GQLAddFieldTypeActionInput>({
    changeLog: null,
    typeName: null,
    description: null,
    optional: true,
    _default: null,
    name: null,
    type: null
  });

  return (
    <React.Fragment>
      <TypeSelector
        types={props.types}
        handleChange={handleChange(setValues, 'typeName')}
        value={values.typeName}
      />
      <FormControl>
        <TextField
          id="fieldName"
          label="New field name"
          value={values.name}
          onChange={handleChange(setValues, 'name')}
          margin="normal"
        />
      </FormControl>
      <FormControl>
        <TextField
          id="description"
          label="Field description"
          value={values.description}
          onChange={handleChange(setValues, 'description')}
          margin="normal"
        />
      </FormControl>
      <FormControl>
        <Checkbox
          id="optional"
          checked={values.optional}
          onChange={handleBooleanChange(setValues, 'optional')}
        />
      </FormControl>
      <DefaultSelector
        _default={values._default}
        onChange={handleChange(setValues, '_default')}
      />
      <FormControl>
        <TextField
            id="standard-name"
            label="Change Log"
            value={values.changeLog}
            onChange={handleChange(setValues, 'changeLog')}
            margin="normal"
        />
      </FormControl>
    </React.Fragment>
    )
}

export default AddFieldTypeActionForm;