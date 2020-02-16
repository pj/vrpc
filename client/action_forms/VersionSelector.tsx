import { Type, TypeFieldsFragment } from "../hooks";

import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import React from "react";

type VersionSelectorProps = {
  types: TypeFieldsFragment[],
  typeName: string,
  version: number | null,
  handleChange: (version: number) => void
}

const VersionSelector = (props: VersionSelectorProps) => {
  let versions: number[] = [];
  for (let _type of props.types) {
    if (_type.name === props.typeName) {
      versions = _type.versions.map(t => t.version);
      break;
    }
  }

  return (
    <FormControl>
      <InputLabel htmlFor="select-version">Select Version</InputLabel>
      <Select
        value={props.version}
        onChange={
          event => {props.handleChange(parseInt(event.target.value as string))}
        }
        inputProps={{id: 'select-version'}}
      >
      {
        versions.map(name =>
          <MenuItem key={name} value={name} >
            {name}
          </MenuItem>
        )
      }
      </Select>
    </FormControl>
  );
}

export default VersionSelector;