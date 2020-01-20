// export function handleChange<A>(
//   setValues: React.Dispatch<React.SetStateAction<A>>, 
//   key: string
// ) {
//   function innerHandleChange(event: React.ChangeEvent<HTMLInputElement>) {
//      setValues(values => ({...values, [key]: event.target.value}));
//   }
//   return innerHandleChange;
// }
// export function handleBooleanChange<A extends { [key: string]: any }>(
//   setValues: React.Dispatch<React.SetStateAction<A>>, 
//   key: string
// ) {
//     function innerHandleChange(event: React.ChangeEvent<HTMLInputElement>) {
//         setValues(values => ({...values, [key]: !values[key]}));
//     }
//     return innerHandleChange;
// }
// export function handleVersionChange<A>(
//   setValues: React.Dispatch<React.SetStateAction<A>>, 
//   key: string
// ) {
//   function innerHandleChange(event: number) {
//      setValues(values => ({...values, [key]: event}));
//   }
//   return innerHandleChange;
// }
