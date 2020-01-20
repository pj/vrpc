import { FormComponentProps, ActionFormHOC } from "./ActionForm"
import React from "react";
import { GQLAddVersionServiceActionInput } from "../hooks";
import TypeSelector from "./TypeSelector";
import VersionSelector from "./VersionSelector";

const AddVersionServiceActionForm = ActionFormHOC(
  function (props: FormComponentProps<GQLAddVersionServiceActionInput>) {
    return (
    <React.Fragment>
      <TypeSelector
        types={props.types}
        handleChange={props.handleChange('inputType')}
        value={props.value.inputType}
      />
      <VersionSelector
        types={props.types}
        handleChange={props.handleVersionChange('inputVersion')}
        typeName={props.value.outputType}
        version={props.value.inputVersion}
      />
      <TypeSelector
        types={props.types}
        handleChange={props.handleChange('outputType')}
        value={props.value.outputType}
      />
      <VersionSelector
        types={props.types}
        handleChange={props.handleVersionChange('outputVersion')}
        typeName={props.value.outputType}
        version={props.value.outputVersion}
      />
    </React.Fragment>

    );
  }
);

export default AddVersionServiceActionForm;