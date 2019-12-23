export function handleChange<A>(setValues: React.Dispatch<React.SetStateAction<A>>, key: string) {
    function innerHandleChange(event) {
        setValues(values => ({...values, [key]: event.target.value}));
    }

    return innerHandleChange;
}

export function handleBooleanChange<A>(setValues: React.Dispatch<React.SetStateAction<A>>, key: string) {
    function innerHandleChange(event) {
        setValues(values => ({...values, [key]: !values[key]}));
    }

    return innerHandleChange;
}
