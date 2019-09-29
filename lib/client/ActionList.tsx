import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { ACTIONS_FRAGMENT, ALL_DATA } from './Fragments';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Tooltip from '@material-ui/core/Tooltip';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  root: {
  },
  table: {
  },
  tableCell: {
    verticalAlign: 'top'
  },
  actionButtons: {
    display: 'flex'
  }
}));

const TRUNCATE_TO = gql`
mutation TruncateTo($input: TruncationInput!) {
  truncateTo(input: $input) {
    ${ALL_DATA}
  }
}
${ACTIONS_FRAGMENT}
`;

const DELETE = gql`
mutation Delete($input: DeleteInput!) {
  _delete(input: $input) {
    ${ALL_DATA}
  }
}
${ACTIONS_FRAGMENT}
`;

const HASH_TO = gql`
mutation HashTo($input: HashInput!) {
  hashTo(input: $input) {
    ${ALL_DATA}
  }
}
${ACTIONS_FRAGMENT}
`;

const GROUP_AND_HASH = gql`
mutation GroupAndHash($input: GroupAndHashInput!) {
  groupAndHash(input: $input) {
    ${ALL_DATA}
  }
}
${ACTIONS_FRAGMENT}
`;

const ActionList = (props: any) => {
  const classes = useStyles();

  function updateCacheFromMutation(cache: any, mutationResult: any) {
    console.log(mutationResult);
  }

  const [
   truncateTo,
   { loading: truncateMutationLoading, error: truncateError },
  ] = useMutation(TRUNCATE_TO, {update: updateCacheFromMutation});

  const [
   _delete,
   { loading: deleteMutationLoading, error: deleteError },
  ] = useMutation(DELETE, {update: updateCacheFromMutation});

  const [
   hashTo,
   { loading: hashMutationLoading, error: hashError },
  ] = useMutation(HASH_TO, {update: updateCacheFromMutation});

  const [
   groupAndHash,
   { loading: groupMutationLoading, error: groupError },
  ] = useMutation(GROUP_AND_HASH, {update: updateCacheFromMutation});

  if (
    truncateMutationLoading
    || deleteMutationLoading
    || hashMutationLoading
    || groupMutationLoading
  ) {
    return <CircularProgress />;
  }

  if (truncateError || deleteError || hashError || groupError) {
    return (
      <div>
        {truncateError && truncateError.toString()}
        {deleteError && deleteError.toString()}
        {hashError && hashError.toString()}
        {groupError && groupError.toString()}
      </div>
    );
  }

  function handleTruncateTo(idx) {
    function innerTruncate(event) {
      truncateTo({variables: {input: {to: idx}}});
    }

    return innerTruncate;
  }
  function handleDelete(idx) {
    function innerDelete(event) {
      _delete({variables: {input: {to: idx}}});
    }

    return innerDelete;
  }
  function handleHashTo(idx) {
    function innerHashTo(event) {
      hashTo({variables: {input: {to: idx}}});
    }

    return innerHashTo;
  }
  function handleGroupAndHash(idx) {
    function innerGroupAndHash(event) {
      groupAndHash({variables: {input: {to: idx}}});
    }

    return innerGroupAndHash;
  }

  const tableRows = [];
  for (let [idx, logAction] of props.actions.entries()) {
    let isService = false;
    let name = 'Group';
    if (
      logAction.__typename === "RenameFieldTypeAction"
      || logAction.__typename === "RequiredFieldTypeAction"
      || logAction.__typename === "OptionalFieldTypeAction"
      || logAction.__typename === "DeleteFieldTypeAction"
      || logAction.__typename === "SetDefaultFieldTypeAction"
      || logAction.__typename === "RemoveDefaultFieldTypeAction"
      || logAction.__typename === "AddFieldTypeAction"
      || logAction.__typename === "UpdateDescriptionTypeAction"
      || logAction.__typename === "ReferenceFieldTypeAction"
      || logAction.__typename === "NewTypeAction"
    ) {
      name = logAction.typeName;
    } else if (
      logAction.__typename === "UpdateDescriptionServiceAction"
      || logAction.__typename === "AddVersionServiceAction"
      || logAction.__typename === "NewServiceAction"
    ) {
      name = logAction.serviceName;
      isService = true;
    }

    const options = [];
    for (let [key, value] of Object.entries(logAction)) {
      if (
        [
          '__typename',
          'version',
          'changeLog',
          'hash',
          'typeName',
          'serviceName'
        ].indexOf(key) === -1
      ) {
        options.push(
          <ListItem key={key} alignItems="flex-start">
            <ListItemText primary={key}/>
            <ListItemText primary={value}/>
          </ListItem>
        );
      }
    }

    tableRows.push(
      <TableRow key={logAction.hash}>
        <TableCell className={classes.tableCell}>
          {isService ? "Service" : "Type"}
        </TableCell>
        <TableCell className={classes.tableCell}>{name}</TableCell>
        <TableCell className={classes.tableCell}>{logAction.__typename}</TableCell>
        <TableCell className={classes.tableCell}>
          <Tooltip title={`hash: ${logAction.hash}`} placement="top">
            <span>
              {logAction.version}
            </span>
          </Tooltip>
        </TableCell>
        <TableCell className={classes.tableCell}>{logAction.changeLog}</TableCell>
        <TableCell className={classes.tableCell}>
          <List dense={true}>
            {options}
          </List>
        </TableCell>
        <TableCell className={classes.tableCell}>
          {
            !(logAction.hash || logAction.version) &&
            <React.Fragment>
              <Button 
                variant="contained" color="primary" 
                onClick={handleDelete(idx)}>
                Delete
              </Button>
              <Button variant="contained" color="primary" onClick={handleTruncateTo(idx)}>
                Truncate
              </Button>
              <Button variant="contained" color="primary" onClick={handleHashTo(idx)}>
                Hash To Entry
              </Button>
              <Button variant="contained" color="primary" onClick={handleGroupAndHash(idx)}>
                Group and Hash
              </Button>
            </React.Fragment>
          }
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Paper>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Version</TableCell>
            <TableCell>Change</TableCell>
            <TableCell>Options</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default ActionList;
