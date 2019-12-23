import { 
  GQLAddFieldTypeActionInput, GQLReferenceFieldTypeActionInput, GQLDeleteFieldTypeActionInput, 
  GQLUpdateDescriptionTypeActionInput, GQLNewServiceActionInput, GQLUpdateDescriptionServiceActionInput,
  GQLRenameFieldTypeActionInput, GQLRequiredFieldTypeActionInput, GQLOptionalFieldTypeActionInput, 
  GQLRemoveDefaultFieldTypeActionInput, GQLSetDefaultFieldTypeActionInput, GQLType, GQLService 
} from "../hooks";
import AddFieldTypeActionForm from "./AddFieldTypeActionForm";

export type GQLAllInput = GQLAddFieldTypeActionInput | GQLReferenceFieldTypeActionInput | GQLRenameFieldTypeActionInput 
    | GQLRequiredFieldTypeActionInput | GQLOptionalFieldTypeActionInput | GQLDeleteFieldTypeActionInput 
    | GQLRemoveDefaultFieldTypeActionInput | GQLSetDefaultFieldTypeActionInput | GQLAddFieldTypeActionInput 
    | GQLUpdateDescriptionServiceActionInput | GQLUpdateDescriptionTypeActionInput | GQLNewServiceActionInput 
    | GQLNewServiceActionInput | GQLUpdateDescriptionServiceActionInput;

export type ActionFormProps = {
    logType: string | null,
    onChange: (input: GQLAllInput) => void
    types: GQLType[],
    services: GQLService[]
}

const ActionForm = (props: ActionFormProps) => {
  switch (props.logType) {
  case "RenameFieldTypeAction":
    return (<RenameFieldTypeActionForm />);
  case "RequiredFieldTypeAction":
  case "OptionalFieldTypeAction":
  case "DeleteFieldTypeAction":
  case "RemoveDefaultFieldTypeAction":
    return (<FieldTypeActionForm />);
  case "SetDefaultFieldTypeAction":
    return (<SetDefaultFieldTypeActionForm />);
  case "AddFieldTypeAction":
    return (<AddFieldTypeActionForm />);
  case "UpdateDescriptionTypeAction":
    return (<UpdateDescriptionTypeActionForm />);
  case "ReferenceFieldTypeAction":
    return (<ReferenceFieldTypeActionForm />);
  case "NewTypeAction":
    return (<NewTypeActionForm />);
  case "UpdateDescriptionServiceAction":
    return (<UpdateDescriptionServiceActionForm />);
  case "AddVersionServiceAction":
    return (<AddVersionServiceActionForm />);
  case "NewServiceAction":
    return (<NewServiceActionForm />);
  default:
    return null;
  }
}

export default ActionForm;