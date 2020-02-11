import { Type, Service, useUpdateChangeSetMutation, FieldDataInput, LogActionChange } from "../hooks";
import { useState } from "react";
import { makeStyles, Paper, CircularProgress, FormControl, TextField, Button } from "@material-ui/core";
import React from "react";
import { ChangeAction } from "~server/schema";

export type ActionFormProps = {
    types: TypeFieldsFragment[],
    services: ServiceFieldsFragment[]
};

export type FormComponentProps<I> = {
    types: TypeFieldsFragment[],
    services: ServiceFieldsFragment[],
    value: I,
    handleChange(key: keyof I): (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleBooleanChange(key: keyof I): (event: React.ChangeEvent<HTMLInputElement>) => void
    handleDefaultChange(key: keyof I): (_default: FieldDataInput) => void
    handleRenameSetType: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleVersionChange(key: keyof I): (version: number) => void,
};

const useStyles = makeStyles(theme => ({
  root: {
  },
}));

export function ActionFormHOC<I extends LogActionChange>(
    FormComponent: React.FunctionComponent<FormComponentProps<Partial<I>>>
) {
    function ActionForm(props: ActionFormProps) {
        const classes = useStyles(props);
        const [updateChangeSetMutation, {loading, error}] = useUpdateChangeSetMutation();
        const [value, setValue] = useState<Partial<I>>({});

        function handleChange(key: keyof I) {
            function innerHandleChange(event: React.ChangeEvent<HTMLInputElement>): void {
                setValue({...value, [key]: event.target.value});
            }

            return innerHandleChange;
        }

        function handleBooleanChange(key: keyof I) {
            function innerHandleChange(event: React.ChangeEvent<HTMLInputElement>) {
                setValue({...value, [key]: !value[key]});
            }

            return innerHandleChange;
        }

        function handleDefaultChange(key: keyof I) {
            function innerHandleChange(_default: FieldDataInput) {
                setValue({...value, [key]: _default});
            }

            return innerHandleChange;
        }

        function handleRenameSetType(event: React.ChangeEvent<HTMLInputElement>) {
            setValue({...value, typeName: event.target.value, fieldName: ""});
        }

        function handleVersionChange(key: keyof I) {
            function innerHandleChange(version: number) {
                setValue({...value, [key]: version});
            }

            return innerHandleChange;
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
                          handleVersionChange={handleVersionChange}
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