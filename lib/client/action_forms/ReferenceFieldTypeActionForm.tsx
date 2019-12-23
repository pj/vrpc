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
            id="fieldName"
            label="New field name"
            value={values.fieldName}
            onChange={handleChange('fieldName')}
            margin="normal"
          />
        </FormControl>
        <FormControl>
          <TextField
            id="description"
            label="Field description"
            value={values.fieldDescription}
            onChange={handleChange('fieldDescription')}
            margin="normal"
          />
        </FormControl>
        <FormControl>
          <Checkbox
            id="optional"
            label="Field Optional"
            checked={values.optional}
            onChange={handleBooleanChange('optional')}
          />
        </FormControl>
        <TypeSelector
          types={props.types}
          handleChange={handleChange('referenceName')}
          value={values.referenceName}
        />
        <VersionSelector
          types={props.types}
          handleChange={handleChange('referenceVersion')}
          value={values.referenceVersion}
        />
      </React.Fragment>
    )