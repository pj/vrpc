
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
(
      <React.Fragment>
      <FormControl>
        <TextField
          id="typeName"
          label="Name of new Type"
          value={values.typeName}
          onChange={handleChange('typeName')}
          margin="normal"
        />
      </FormControl>
      <FormControl>
        <TextField
          id="description"
          label="Description of new type"
          value={values.description}
          onChange={handleChange('description')}
          margin="normal"
        />
      </FormControl>
      </React.Fragment>
    )