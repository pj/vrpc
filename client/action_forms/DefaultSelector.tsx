// FIXME: fix types of NumberFormat.
import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, TextField, Checkbox, FormControlLabel } from "@material-ui/core";
import { FieldDataInput, FieldTypes } from "../hooks";
import NumberFormat from 'react-number-format';

const DEFAULT_TYPES = [
  "integer",
  "float",
  "string",
  "boolean"
];

type DEFAULT_TYPE_TYPE = "integer" | "float" | "string" | "boolean" | null;

type DefaultSelectorProps = {
  _default: FieldDataInput | null | undefined,
  handleChange: (_default: FieldDataInput, _type: FieldTypes) => void
};

const DefaultSelector = (props: DefaultSelectorProps) => {
  let defaultType: DEFAULT_TYPE_TYPE = null;
  let valueEditor = null;

  if (!props._default) {
    valueEditor = null;
  } else if (props._default.stringValue != null) {
    defaultType = "string";
      valueEditor = (
        <TextField
          id="defaultValue"
          label="Default"
          value={props._default.stringValue}
          onChange={(event) => {
            props.handleChange(
              {
                stringValue: event.target.value, 
              }, FieldTypes.String
            )
          }}
          margin="normal"
        />
      );
  } else if (props._default.integerValue != null) {
    defaultType = "integer";
    valueEditor = (
        <NumberFormat 
          decimalScale={0}
          label="Default"
          inputRef={(el: any) => (this as any).inputElem = el} 
          customInput={TextField} 
          onValueChange={values => {
            props.handleChange(
              {
                integerValue: values.floatValue
              },
              FieldTypes.Integer
            )
          }}
          value={props._default.integerValue}
        />
      );
  } else if (props._default.floatValue != null) {
    defaultType = "float";
    valueEditor = (
        <NumberFormat 
          inputRef={(el: any) => (this as any).inputElem = el} 
          label="Default"
          customInput={TextField} 
          onValueChange={values => {
            props.handleChange(
              {
                integerValue: values.floatValue
              },
              FieldTypes.Float
            )
          }}
          value={props._default.floatValue}
        />
      );
  } else if (props._default.booleanValue != null) {
    defaultType = "boolean";
    valueEditor = (
      <FormControlLabel
        control={
          <Checkbox
            id="optional"
            onChange={event => {
              props.handleChange(
                  {
                    booleanValue: !event.target.value
                  },
                  FieldTypes.String
                )
            }}
            checked={props._default.booleanValue}
          />
        }
        label="Default"
      />
    )
  }

  function changeType(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value === "string") {
      props.handleChange({stringValue: ""}, FieldTypes.String);
    } else if (event.target.value === "integer") {
      props.handleChange({integerValue: 0}, FieldTypes.Integer);
    } else if (event.target.value === "float") {
      props.handleChange({floatValue: 0}, FieldTypes.Float);
    } else if (event.target.value === "boolean") {
      props.handleChange({booleanValue: true}, FieldTypes.Boolean);
    }
  }

  return (
    <React.Fragment>
      <FormControl>
        <InputLabel id="type-selector">Type</InputLabel>
        <Select
          value={defaultType}
          labelId="type-selector"
          onChange={changeType}
          inputProps={{id: 'select-field'}}
        >
        {
          DEFAULT_TYPES.map(
            defaultType =>
              <MenuItem key={defaultType} value={defaultType} >
                {defaultType}
              </MenuItem>
          )
        }
        </Select>
      </FormControl>
      <FormControl>{valueEditor}</FormControl>
    </React.Fragment>
  );
}

export default DefaultSelector;