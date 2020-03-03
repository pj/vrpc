import { useUpdateChangeSetMutation, TypeFieldsFragment, ServiceFieldsFragment, NewServiceInputAction, UpdateDescriptionServiceInputAction, AddVersionServiceInputAction, RenameFieldTypeInputAction, RequiredFieldTypeInputAction, OptionalFieldTypeInputAction, DeleteFieldTypeInputAction, SetDefaultFieldTypeInputAction, RemoveDefaultFieldTypeInputAction, AddFieldTypeInputAction, UpdateFieldDescriptionTypeInputAction, ReferenceFieldTypeInputAction, NewTypeInputAction, FieldDataInput, useAppendChangeSetMutation, ChangeSetAction } from "../hooks";
import { useState } from "react";
import { makeStyles, Paper, CircularProgress, FormControl, Button, TextField } from "@material-ui/core";
import React from "react";

type InputAction = NewServiceInputAction | UpdateDescriptionServiceInputAction 
| AddVersionServiceInputAction | RenameFieldTypeInputAction 
| RequiredFieldTypeInputAction | OptionalFieldTypeInputAction 
| DeleteFieldTypeInputAction | SetDefaultFieldTypeInputAction 
| RemoveDefaultFieldTypeInputAction | AddFieldTypeInputAction 
| UpdateFieldDescriptionTypeInputAction | ReferenceFieldTypeInputAction 
| NewTypeInputAction;

export type ActionFormProps = {
    types: TypeFieldsFragment[],
    services: ServiceFieldsFragment[],
    changeSetId: string
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

export function ActionFormHOC<I extends InputAction>(
    FormComponent: React.FunctionComponent<FormComponentProps<Partial<I>>>,
    changeActionKey: keyof ChangeSetAction
) {
    function ActionForm(props: ActionFormProps) {
        const classes = useStyles(props);
        const [
            appendChangeSetMutation, 
            {loading, error}
        ] = useAppendChangeSetMutation();
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

        function handleAppendChangeSet() {
            appendChangeSetMutation(
                {
                    variables: {
                        changeSet: {
                            id: props.changeSetId,
                            action: {
                                [changeActionKey]: value
                            }
                        }
                    }
                }
            );
        }

        return (
            <React.Fragment>
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
                    </FormControl>
                    <FormControl>
                        <TextField
                            id="changeLog"
                            label="Description of change"
                            value={value.changeLog}
                            onChange={handleChange('changeLog')}
                            margin="normal"
                        />
                    </FormControl>
                    <FormControl>
                        <Button 
                          variant="contained" 
                          color="primary" 
                          onClick={handleAppendChangeSet}
                        >
                            Add To Log
                        </Button>
                    </FormControl>
                </React.Fragment>
            }
            </React.Fragment>
        );
    };
    return ActionForm;
}