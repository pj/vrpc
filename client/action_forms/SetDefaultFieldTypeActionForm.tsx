import { FormComponentProps, ActionFormHOC } from "./ActionForm"
import React from "react";
import TypeSelector from "./TypeSelector";
import DefaultSelector from "./DefaultSelector";
import FieldSelector from "./FieldSelector";
import { SetDefaultFieldTypeInputAction } from "../hooks";

const SetDefaultFieldTypeActionForm = ActionFormHOC(
  function (props: FormComponentProps<SetDefaultFieldTypeInputAction>) {
    return (
      <React.Fragment>
        <TypeSelector
          types={props.types}
          handleChange={props.handleChange('typeName')}
          value={props.value.typeName}
        />
        <FieldSelector
          types={props.types}
          handleChange={props.handleChange('name')}
          value={props.value.name}
          selectedType={props.value.typeName}
        />
        <DefaultSelector
          _default={props.value.newDefault}
          handleChange={props.handleDefaultChange('newDefault')}
        />
      </React.Fragment>
    );
  }
);

export default SetDefaultFieldTypeActionForm;