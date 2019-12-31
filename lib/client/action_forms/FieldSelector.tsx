import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { GQLType } from "../hooks";

type FieldSelectorProps<V> = {
  types: GQLType[]
  value: V,
  handleChange: (event: React.SyntheticEvent): void
};

const FieldSelector = (props: FieldSelectorProps) => {
  const fieldNamesByType = new Map();
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
        props.selectedType !== "" && fieldNamesByType.get(props.selectedType).map(
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

export default FieldSelector;