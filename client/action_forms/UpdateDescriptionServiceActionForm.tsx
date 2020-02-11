import { FormComponentProps, ActionFormHOC } from "./ActionForm"
import ServiceSelector from "./ServiceSelector";
import { UpdateDescriptionServiceInputAction } from "../hooks";
import React from "react";
import { FormControl, TextField } from "@material-ui/core";

const UpdateDescriptionServiceActionForm = ActionFormHOC(
  function (props: FormComponentProps<UpdateDescriptionServiceInputAction>) {
    return (
      <React.Fragment>
        <ServiceSelector
          services={props.services}
          handleChange={props.handleChange('serviceName')}
          value={props.value.serviceName}
        />
        <FormControl>
          <TextField
            id="description"
            label="Description of service"
            value={props.value.description}
            onChange={props.handleChange('description')}
            margin="normal"
          />
        </FormControl>
      </React.Fragment>
    );
  }
);

export default UpdateDescriptionServiceActionForm;