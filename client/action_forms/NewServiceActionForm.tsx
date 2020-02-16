import { FormComponentProps, ActionFormHOC } from "./ActionForm"
import React from "react";
import { NewServiceInputAction } from "../hooks";
import { FormControl, TextField } from "@material-ui/core";

const NewServiceActionForm = ActionFormHOC(
  function (props: FormComponentProps<NewServiceInputAction>) {
    return (
      <React.Fragment>
        <FormControl>
          <TextField
            id="serviceName"
            label="Name of new Service"
            value={props.value.serviceName}
            onChange={props.handleChange('serviceName')}
            margin="normal"
          />
        </FormControl>
        <FormControl>
          <TextField
            id="description"
            label="Description of new service"
            value={props.value.description}
            onChange={props.handleChange('description')}
            margin="normal"
          />
        </FormControl>
      </React.Fragment>
    );
  },
  'newService'
);

export default NewServiceActionForm;