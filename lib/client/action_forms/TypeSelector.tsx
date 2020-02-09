import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import { Type } from "~client/hooks";

type TypeSelectorProps = {
  types: TypeFieldsFragment[],
  value: string,
  handleChange: (event: React.ChangeEvent<any>) => void
}

const TypeSelector = (props: TypeFieldsFragmentSelectorProps) => {
  const typeNames = props.types.map(t => t.name);

  return (
    <FormControl>
      <InputLabel htmlFor="select-type">Type name</InputLabel>
      <Select
        value={props.value}
        onChange={props.handleChange}
        inputProps={{id: 'select-type'}}
      >
      {
        typeNames.map(name =>
          <MenuItem key={name} value={name} >
            {name}
          </MenuItem>
        )
      }
      </Select>
    </FormControl>
  );
}

export default TypeSelector;