const 
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
        <TypeSelector
          types={props.types}
          handleChange={handleChange('typeName')}
          value={values.typeName}
        />
        <FormControl>
          <TextField
            id="description"
            label="Type Description"
            value={values.description}
            onChange={handleChange('description')}
            margin="normal"
          />
        </FormControl>
      </React.Fragment>
    )