
const ServiceSelector = (props: any) => {
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