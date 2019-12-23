
  const [values, setValues] = useState({
    logType: "",
    changeLog: "",
    typeName: "",
    description: "",
    serviceName: "",
    fieldName: "",
    newFieldName: "",
    defaultType: "",
    defaultValue: "",
    fieldDescription: "",
    optional: true,
    outputName: "",
    inputName: "",
    inputVersion: "",
    outputVersion: "",
    referenceName: "",
    referenceVersion: "",
  } as any);
    editor = (
      <FormControl>
      <ServiceSelector
        types={props.services}
        handleChange={handleChange('serviceName')}
        value={values.serviceName}
      />
      <TextField
        id="description"
        label="Description of service"
        value={values.description}
        onChange={handleChange('description')}
        margin="normal"
      />
      </FormControl>
    );