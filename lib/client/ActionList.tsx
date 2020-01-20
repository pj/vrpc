import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import classNames from 'classnames';

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

import {GQLLogAction, GQLLogActionChange} from './hooks';

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

type ActionListProps = {
  log: GQLLogAction[],
  changeLog: GQLLogActionChange[]
};

const ActionList = (props: ActionListProps) => {
  const classes = useStyles(props);

  const tableRows = [];
  for (let [idx, logAction] of props.log.entries()) {
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

    // FIXME: fix any type.
    const options = [];
    for (let [key, value] of Object.entries(logAction)) {
      if (
        [
          '__typename',
          'version',
          'changeLog',
          'hash',
          'typeName',
          'serviceName',
          '_id',
        ].indexOf(key) === -1
      ) {
        options.push(
          <ListItem key={key} alignItems="flex-start">
            <ListItemText primary={key}/>
            <ListItemText primary={value as any}/>
          </ListItem>
        );
      }
    }

    const tableClasses = classNames({
      [`${classes.tableCell}`]: true,
    });
    tableRows.push(
      <TableRow key={logAction.hash}>
        <TableCell className={tableClasses}>
          {isService ? "Service" : "Type"}
        </TableCell>
        <TableCell className={tableClasses}>{name}</TableCell>
        <TableCell className={tableClasses}>{logAction.__typename}</TableCell>
        <TableCell className={tableClasses}>
          <Tooltip title={`hash: ${logAction.hash}`} placement="top">
            <span>
              {logAction.version}
            </span>
          </Tooltip> : "change set"
        </TableCell>
        <TableCell className={tableClasses}>{logAction.changeLog}</TableCell>
        <TableCell className={tableClasses}>
          <List dense={true}>
            {options}
          </List>
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
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.reverse()}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default ActionList;
