import { ActionFormProps } from "./ActionForm";
import React, { useState } from "react";
import TypeSelector from "./TypeSelector";
import { handleChange } from "./utils";
import { GQLAddVersionServiceActionInput } from "../hooks";
import VersionSelector from "./VersionSelector";

const AddVersionServiceActionForm = (props: ActionFormProps) => {
  const [values, setValues] = useState<GQLAddVersionServiceActionInput>({});
  return (
    <React.Fragment>
      <TypeSelector
        types={props.types}
        handleChange={handleChange(setValues, 'inputType')}
        value={values.inputType}
      />
      <VersionSelector
        types={props.types}
        handleChange={handleChange(setValues, 'inputVersion')}
        typeName={values.outputType}
        version={values.inputVersion}
      />
      <TypeSelector
        types={props.types}
        handleChange={handleChange(setValues, 'outputType')}
        value={values.outputType}
      />
      <VersionSelector
        types={props.types}
        handleChange={handleChange(setValues, 'outputVersion')}
        typeName={values.outputType}
        version={values.outputVersion}
      />
    </React.Fragment>
  )
}

export default AddVersionServiceActionForm;