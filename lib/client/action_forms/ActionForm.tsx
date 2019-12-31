import { GQLType, GQLService, useUpdateChangeSetMutation, GQLFieldDataInput } from "../hooks";
import { useState } from "react";
import { makeStyles, Paper, CircularProgress, FormControl, TextField, Button } from "@material-ui/core";
import React from "react";
import { GQLAllInput } from "./ActionCreatorModal";

export type ActionFormProps = {
    types: GQLType[],
    services: GQLService[]
};

export type FormComponentProps<I> = {
    types: GQLType[],
    services: GQLService[],
    value: I,
    handleChange(key: keyof I): (event: React.SyntheticEvent) => void,
    handleBooleanChange(key: keyof I): (event: React.SyntheticEvent) => void
    handleDefaultChange(key: keyof I): (_default: GQLFieldDataInput) => void
    handleRenameSetType: (event: React.SyntheticEvent) => void,
};

const useStyles = makeStyles(theme => ({
  root: {
  },
}));

export function ActionFormHOC<I extends GQLAllInput>(FormComponent: React.FunctionComponent<FormComponentProps<I>>) {
    function ActionForm(props: ActionFormProps) {
        const classes = useStyles(props);
        const [updateChangeSetMutation, {loading, error}] = useUpdateChangeSetMutation();
        const [value, setValue] = useState<I>();

        function handleChange(key: keyof I) {
            function innerHandleChange(event): void {
                setValue({...value, [key]: event.target.value});
            }

            return innerHandleChange;
        }

        function handleBooleanChange(key: keyof I) {
            function innerHandleChange(event) {
            setValue({...value, [key]: !value[key]});
            }

            return innerHandleChange;
        }

        function handleDefaultChange(key: keyof I) {
            function innerHandleChange(_default: GQLFieldDataInput) {
            setValue({...value, [key]: _default});
            }

            return innerHandleChange;
        }

        function handleRenameSetType(event) {
            setValue({...value, typeName: event.target.value, fieldName: ""});
        }

        function updateChangeSet() {

        }

        return (
            <Paper className={classes.root}>
            {
                loading ? <CircularProgress /> : 
                error ? <div>{error.toString()}</div> :
                <React.Fragment>
                    <FormControl>
                        <FormComponent 
                          value={value}
                          types={props.types} 
                          services={props.services} 
                          handleChange={handleChange} 
                          handleBooleanChange={handleBooleanChange} 
                          handleRenameSetType={handleRenameSetType}
                          handleDefaultChange={handleDefaultChange}
                        />
                        <Button variant="contained" color="primary" onClick={updateChangeSet}>
                            Add To Log
                        </Button>
                    </FormControl>
                </React.Fragment>
            }
            </Paper>
        );
    };
    return ActionForm;
}