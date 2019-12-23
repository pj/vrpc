<FormControl>
        <InputLabel htmlFor="action-type">Action Type</InputLabel>
        <Select
          value={values.logType}
          onChange={handleTypeChange}
          inputProps={{id: 'action-type'}}
        >
          <MenuItem value={"RenameFieldTypeAction"} >RenameFieldTypeAction</MenuItem>
          <MenuItem value={"RequiredFieldTypeAction"} >RequiredFieldTypeAction</MenuItem>
          <MenuItem value={"OptionalFieldTypeAction"} >OptionalFieldTypeAction</MenuItem>
          <MenuItem value={"DeleteFieldTypeAction"} >DeleteFieldTypeAction</MenuItem>
          <MenuItem value={"SetDefaultFieldTypeAction"} >SetDefaultFieldTypeAction</MenuItem>
          <MenuItem value={"RemoveDefaultFieldTypeAction"} >RemoveDefaultFieldTypeAction</MenuItem>
          <MenuItem value={"AddFieldTypeAction"} >AddFieldTypeAction</MenuItem>
          <MenuItem value={"UpdateDescriptionTypeAction"} >UpdateDescriptionTypeAction</MenuItem>
          <MenuItem value={"ReferenceFieldTypeAction"} >ReferenceFieldTypeAction</MenuItem>
          <MenuItem value={"NewTypeAction"} >NewTypeAction</MenuItem>
          <MenuItem value={"UpdateDescriptionServiceAction"} >UpdateDescriptionServiceAction</MenuItem>
          <MenuItem value={"AddVersionServiceAction"} >AddVersionServiceAction</MenuItem>
          <MenuItem value={"NewServiceAction"} >NewServiceAction</MenuItem>
        </Select>
      </FormControl>