
const TypeSelector = (props: any) => {
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