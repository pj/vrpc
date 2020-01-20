import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { GQLService } from "../hooks";
import React from "react";

type ServiceSelectorProps<V> = {
  services: GQLService[]
  value: V,
  handleChange: (event: React.ChangeEvent<any>) => void
};

export default function ServiceSelector<V>(props: ServiceSelectorProps<V>) {
  const serviceNames = props.services.map(s => s.name);

  return (
    <FormControl>
      <InputLabel htmlFor="select-service">Service name</InputLabel>
      <Select
        value={props.value}
        onChange={props.handleChange}
        inputProps={{id: 'select-service'}}
      >
      {
        serviceNames.map(name =>
          <MenuItem key={name} value={name} >
            {name}
          </MenuItem>
        )
      }
      </Select>
    </FormControl>
  );
}