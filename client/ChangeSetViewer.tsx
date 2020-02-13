import React from 'react';
import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import {ChangeSet, useCommitChangeSetMutation, Type, Service, ChangeSetFieldsFragment, TypeFieldsFragment, ServiceFieldsFragment} from './hooks';
import {ChangeSetActionList} from './ActionList';
import { FormControl, InputLabel, Select, MenuItem, Modal, Button, CircularProgress } from '@material-ui/core';
import AddChangeSetModal from './AddChangeSetModal';
import ActionCreatorModal from './action_forms/ActionCreatorModal';

const useStyles = makeStyles(theme => ({
  root: {
  },
}));

type ChangeSetViewerProps = {
  currentBaseHash: string | null,
  changeSets: ChangeSetFieldsFragment[],
  types: TypeFieldsFragment[],
  services: ServiceFieldsFragment[]
}

const ChangeSetViewer = (props: ChangeSetViewerProps) => {
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
    <Paper>
      <FormControl>
        <AddChangeSetModal 
          currentBaseHash={props.currentBaseHash} 
          changeSets={props.changeSets}
        />
        <InputLabel htmlFor="select-change-set">Select ChangeSet</InputLabel>
        <Select
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
      {selectedChangeSet && <ChangeSetActionList actions={selectedChangeSet.log} />}
      {
        selectedChangeSet && <ActionCreatorModal 
          types={props.types} 
          services={props.services}
        />
      }
      {selectedChangeSet && selectedChangeSet.log.length > 0 && 
        <FormControl>
          <Button variant="contained" color="primary" onClick={commitChangeSet}>
            Commit ChangeSet
          </Button>
        </FormControl>
      }
    </Paper>
  );
}

export default ChangeSetViewer;
