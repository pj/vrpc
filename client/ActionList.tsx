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

import { LogFieldsFragment, ChangeActionsFragmentFragment, ActionsFragmentFragment, ChangeSetFieldsFragment } from './hooks';

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
  },
  spacerRow: {

  },
  headerRow: {

  },
  metadataRow: {

  }

}));

type ActionListProps = {
  log: LogFieldsFragment[],
};


type MetaDataRowProps = {

}
const MetaDataRow = (props: MetaDataRowProps) => {
  const classes = useStyles(props);
  return (
    <TableRow className={classes.metadataRow}>
      <TableCell>
      </TableCell>
    </TableRow>
  );
}

type HeaderRowProps = {

}
const HeaderRow = (props: HeaderRowProps) => {
  const classes = useStyles(props);
  return (
    <TableRow className={classes.headerRow}>
      <TableCell>
      </TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Action</TableCell>
      <TableCell>Version</TableCell>
      <TableCell>Change</TableCell>
      <TableCell>Options</TableCell>
    </TableRow>
  );
}

type SpacerRowProps = {

}
const SpacerRow = (props: SpacerRowProps) => {
  const classes = useStyles(props);
  return (
    <TableRow className={classes.spacerRow}>
      <TableCell>
      </TableCell>
    </TableRow>
  );
}

function getTypeOrServiceName(
  action: ActionsFragmentFragment | ChangeActionsFragmentFragment
): [string, boolean] {
  if (
    action.__typename === "RenameFieldTypeAction"
    || action.__typename === "RequiredFieldTypeAction"
    || action.__typename === "OptionalFieldTypeAction"
    || action.__typename === "DeleteFieldTypeAction"
    || action.__typename === "SetDefaultFieldTypeAction"
    || action.__typename === "RemoveDefaultFieldTypeAction"
    || action.__typename === "AddFieldTypeAction"
    || action.__typename === "UpdateDescriptionTypeAction"
    || action.__typename === "ReferenceFieldTypeAction"
    || action.__typename === "NewTypeAction"
    || action.__typename === "RenameFieldTypeChangeAction"
    || action.__typename === "RequiredFieldTypeChangeAction"
    || action.__typename === "OptionalFieldTypeChangeAction"
    || action.__typename === "DeleteFieldTypeChangeAction"
    || action.__typename === "SetDefaultFieldTypeChangeAction"
    || action.__typename === "RemoveDefaultFieldTypeChangeAction"
    || action.__typename === "AddFieldTypeChangeAction"
    || action.__typename === "UpdateDescriptionTypeChangeAction"
    || action.__typename === "ReferenceFieldTypeChangeAction"
    || action.__typename === "NewTypeChangeAction"
  ) {
    return [action.typeName, false];
  } else if (
    action.__typename === "UpdateDescriptionServiceAction"
    || action.__typename === "AddVersionServiceAction"
    || action.__typename === "NewServiceAction"
    || action.__typename === "UpdateDescriptionServiceChangeAction"
    || action.__typename === "AddVersionServiceChangeAction"
    || action.__typename === "NewServiceChangeAction"
  ) {
    return [action.serviceName, true];
  }

  throw new Error(`Unable to get type or service name for action ${action}`);
}

type OptionsCellProps = {
  action: ActionsFragmentFragment | ChangeActionsFragmentFragment;
};

const OptionsCell = (props: OptionsCellProps) => {
  const classes = useStyles(props);
  const options = [];
  for (let [key, value] of Object.entries(props.action)) {
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
  return (
    <TableCell className={tableClasses}>
      <List dense={true}>
        {options}
      </List>
    </TableCell>
  );
}

export const ActionList = (props: ActionListProps) => {
  const classes = useStyles(props);

  const tableRows = [];
  for (let groupAction of props.log) {
    for (let action of groupAction.actions) {
      tableRows.push(<MetaDataRow />);
      tableRows.push(<HeaderRow />);
      const [name, isService] = getTypeOrServiceName(action);
      const tableClasses = classNames({
        [`${classes.tableCell}`]: true,
      });
      tableRows.push(
        <TableRow key={action.hash}>
          <TableCell className={tableClasses}>
            {isService ? "Service" : "Type"}
          </TableCell>
          <TableCell className={tableClasses}>{name}</TableCell>
          <TableCell className={tableClasses}>{action.__typename}</TableCell>
          <TableCell className={tableClasses}>
            <Tooltip title={`hash: ${action.hash}`} placement="top">
              <span>
                {action.version}
              </span>
            </Tooltip>
          </TableCell>
          <TableCell className={tableClasses}>{action.changeLog}</TableCell>
          <OptionsCell action={action} />
        </TableRow>
      );
    }
    tableRows.push(<SpacerRow />);
  }

  return (
    <Paper>
      <Table className={classes.table}>
        <TableBody>
          {tableRows.reverse()}
        </TableBody>
      </Table>
    </Paper>
  );
};

type ChangeSetActionListProps = {
  actions: ChangeActionsFragmentFragment[]
};

export const ChangeSetActionList = (props: ChangeSetActionListProps) => {
  const classes = useStyles(props);

  const tableRows = [];
  const tableClasses = classNames({
    [`${classes.tableCell}`]: true,
  });
  for (let changeAction of props.actions ) {
    const [name, isService] = getTypeOrServiceName(changeAction);
    tableRows.push(
      <TableRow>
        <TableCell className={tableClasses}>
          {isService ? "Service" : "Type"}
        </TableCell>
        <TableCell className={tableClasses}>{name}</TableCell>
        <TableCell className={tableClasses}>{changeAction.__typename}</TableCell>
        // @ts-ignore
        <TableCell className={tableClasses}>{changeAction.changeLog}</TableCell>
        <OptionsCell action={changeAction} />
      </TableRow>
    );
  }

  return (
    <Paper>
      <Table className={classes.table}>
        <TableBody>
          {tableRows.reverse()}
        </TableBody>
      </Table>
    </Paper>
  );
};