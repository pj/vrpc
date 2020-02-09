import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { Type } from "../hooks";
import React, { ReactNode } from "react";

type FieldSelectorProps<V> = {
  selectedType: string,
  types: TypeFieldsFragment[],
  value: V,
  handleChange: (event: React.ChangeEvent<any>) => void
};

export default function FieldSelector<V>(props: FieldSelectorProps<V>) {
  const fieldNamesByType = new Map<string, string[]>();
  for (let _type of props.types) {
    const lastVersion = _type.versions[_type.versions.length-1];

    const fields = lastVersion.fields.map(f => f.key);
    fieldNamesByType.set(_type.name, fields);
  }

  return (
    <FormControl>
      <InputLabel htmlFor="select-field">Field name</InputLabel>
      <Select
        value={props.value}
        onChange={props.handleChange}
        inputProps={{id: 'select-field'}}
      >
      {
        props.selectedType !== "" 
        && (fieldNamesByType.get(props.selectedType) || []).map(
          fieldName =>
            <MenuItem key={fieldName} value={fieldName} >
              {fieldName}
            </MenuItem>
        )
      }
      </Select>
    </FormControl>
  );
}