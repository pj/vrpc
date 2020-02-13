import React from 'react';
import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import AddFieldTypeActionForm from "./AddFieldTypeActionForm";
import ActionTypeSelector from './ActionTypeSelector';
import { TypeFieldsFragment, ServiceFieldsFragment, RequiredFieldTypeInputAction, OptionalFieldTypeInputAction, DeleteFieldTypeInputAction, RemoveDefaultFieldTypeInputAction } from '../hooks';
import AddVersionServiceActionForm from './AddVersionServiceActionForm';
import NewServiceActionForm from './NewServiceActionForm';
import RenameFieldTypeActionForm from './RenameFieldTypeActionForm';
import FieldTypeActionFormHOC from './FieldTypeActionFormHOC';
import SetDefaultFieldTypeActionForm from './SetDefaultFieldTypeActionForm';
import UpdateDescriptionTypeActionForm from './UpdateDescriptionTypeActionForm';
import ReferenceFieldTypeActionForm from './ReferenceFieldTypeActionForm';
import NewTypeActionForm from './NewTypeActionForm';
import UpdateDescriptionServiceActionForm from './UpdateDescriptionServiceActionForm';
import { Modal } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    margin: "20px",
    width: "20%"
  },
  table: {
  },
  tableCell: {
    verticalAlign: 'top'
  },
  modal: {
    backgroundColor: 'white'
  }
}));

type ActionFormProps = {
  logType: string,
  types: TypeFieldsFragment[],
  services: ServiceFieldsFragment[]
};

const ActionForm = (props: ActionFormProps) => {
  switch (props.logType) {
  case "RenameFieldTypeAction":
    return (
      <RenameFieldTypeActionForm 
        types={props.types} 
        services={props.services} 
      />
    );
  case "RequiredFieldTypeAction":
    let RequiredFieldTypeActionForm = FieldTypeActionFormHOC<RequiredFieldTypeInputAction>();
    return (
      <RequiredFieldTypeActionForm 
        types={props.types}
        services={props.services}
      />
    );
  case "OptionalFieldTypeAction":
    let OptionalFieldTypeActionForm = FieldTypeActionFormHOC<OptionalFieldTypeInputAction>();
    return (
      <OptionalFieldTypeActionForm 
        types={props.types}
        services={props.services}
      />
    );
  case "DeleteFieldTypeAction":
    let DeleteFieldTypeActionForm = FieldTypeActionFormHOC<DeleteFieldTypeInputAction>();
    return (
      <DeleteFieldTypeActionForm 
        types={props.types}
        services={props.services}
      />
    );
  case "RemoveDefaultFieldTypeAction":
    let RemoveDefaultFieldTypeActionForm = FieldTypeActionFormHOC<RemoveDefaultFieldTypeInputAction>();
    return (
      <RemoveDefaultFieldTypeActionForm 
        types={props.types}
        services={props.services}
      />
    );
  case "SetDefaultFieldTypeAction":
    return (
      <SetDefaultFieldTypeActionForm
        types={props.types}
        services={props.services}
      />
    );
  case "AddFieldTypeAction":
    return (
    <AddFieldTypeActionForm
        types={props.types}
        services={props.services}
      />
    );
  case "UpdateDescriptionTypeAction":
    return (
    <UpdateDescriptionTypeActionForm
        types={props.types}
        services={props.services}
      />
    );
  case "ReferenceFieldTypeAction":
    return (
    <ReferenceFieldTypeActionForm
        types={props.types}
        services={props.services}
      />
    );
  case "NewTypeAction":
    return (
    <NewTypeActionForm
        types={props.types}
        services={props.services}
      />
    );
  case "UpdateDescriptionServiceAction":
    return (
    <UpdateDescriptionServiceActionForm
        types={props.types}
        services={props.services}
      />
    );
  case "AddVersionServiceAction":
    return (
    <AddVersionServiceActionForm
        types={props.types}
        services={props.services}
      />
    );
  case "NewServiceAction":
    return (
    <NewServiceActionForm
        types={props.types}
        services={props.services}
      />
    );
    default:
      throw new Error('Unknown form type');
  }
}

type ActionCreatorModalProps = {
  types: TypeFieldsFragment[],
  services: ServiceFieldsFragment[]
}

const ActionCreatorModal = (props: ActionCreatorModalProps) => {
  const classes = useStyles(props);
  const [actionType, setActionType] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setActionType("");
  };

  const handleClose = () => {
    setOpen(false);
    setActionType("");
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Add Action
      </button>
      <Modal
        open={open}
        onClose={handleClose}> 
        <div className={classes.modal}>
          <ActionTypeSelector 
            onChange={(actionType: string) => setActionType(actionType)}
            logType={actionType}
          />
          {
            actionType && (<ActionForm 
              logType={actionType} 
              types={props.types} 
              services={props.services} 
            />
          )}
        </div>
      </Modal>
    </div> 
  );
}

export default ActionCreatorModal;
