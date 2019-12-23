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
        handleChange={handleRenameSetType}
        value={values.typeName}
      />
      <FieldSelector
        types={props.types}
        handleChange={handleChange('fieldName')}
        value={values.fieldName}
        selectedType={values.typeName}
      />
      <FormControl>
        <TextField
          id="fieldName"
          label="New Name"
          value={values.newFieldName}
          onChange={handleChange('newFieldName')}
          margin="normal"
        />
      </FormControl>
      </React.Fragment>
    )