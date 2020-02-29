import React from 'react';
import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import {ChangeSet, useCommitChangeSetMutation, Type, Service, ChangeSetFieldsFragment, TypeFieldsFragment, ServiceFieldsFragment} from './hooks';
import {ChangeSetActionList} from './ActionList';
import { FormControl, InputLabel, Select, MenuItem, Modal, Button, CircularProgress, Box } from '@material-ui/core';
import AddChangeSetModal from './AddChangeSetModal';
import ActionCreatorModal from './action_forms/ActionCreatorModal';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '20px',
    padding: '20px'
  },
  changeSetControls: {
  },
  selectChangesetFormControl: {
    minWidth: '160px'
  }
}));

type ChangeSetViewerProps = {
  currentBaseHash: string | null,
  changeSets: ChangeSetFieldsFragment[],
  types: TypeFieldsFragment[],
  services: ServiceFieldsFragment[]
}

const ChangeSetViewer = (props: ChangeSetViewerProps) => {
  const classes = useStyles();
  const [changeSetId, setChangeSetId] = useState<string>("");
  const [commitChangeSetMutation, {loading, error}] = useCommitChangeSetMutation();

  if (loading) {
    return (<Paper><CircularProgress /></Paper>);
  }

  if (error) {
    return (<Paper>{error.toString()}</Paper>);
  }

  const idToChangeSet = new Map<string, ChangeSetFieldsFragment>();
  for (let changeSet of props.changeSets) {
    idToChangeSet.set(changeSet.id, changeSet);
  }

  let selectedChangeSet = null;
  if (changeSetId) {
    selectedChangeSet = idToChangeSet.get(changeSetId);
  }

  function commitChangeSet() {
    if (!changeSetId) {
      throw new Error('Change set id is null, should never happen.');
    }
    commitChangeSetMutation(
      {variables: {changeSetId}}
    );
  }

  const changeSetSelectorItems = [];
  for (let id of idToChangeSet.keys()) {
    changeSetSelectorItems.push(
      <MenuItem key={id} value={id} >
        {id}
      </MenuItem>
    );
  }

  return (
    <Paper className={classes.root}>
      <Box className={classes.changeSetControls} display="flex" alignItems="center" justifyContent="space-between" 
        flexDirection="row">
        <FormControl className={classes.selectChangesetFormControl}>
          <InputLabel id="select-changeset-label">Select Change Set</InputLabel>
          <Select
            labelId="select-changeset-label"
            value={changeSetId}
            onChange={
              (event: React.ChangeEvent<HTMLInputElement>) => 
                setChangeSetId(event.target.value)
            }
            inputProps={{id: 'select-change-set'}}
          >
          {changeSetSelectorItems}
          </Select>
        </FormControl>
        <AddChangeSetModal 
          currentBaseHash={props.currentBaseHash} 
          changeSets={props.changeSets}
        />
      </Box>
      {selectedChangeSet && <ChangeSetActionList actions={selectedChangeSet.log} />}
      <Box display="flex" alignItems="center" flexDirection="row">
        {
          selectedChangeSet && <ActionCreatorModal 
            types={props.types} 
            services={props.services}
            changeSetId={changeSetId}
          />
        }
        {selectedChangeSet && selectedChangeSet.log.length > 0 && 
          <FormControl>
            <Button variant="contained" color="primary" onClick={commitChangeSet}>
              Commit ChangeSet
            </Button>
          </FormControl>
        }
      </Box>
    </Paper>
  );
}

export default ChangeSetViewer;
