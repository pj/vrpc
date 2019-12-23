import React from 'react';
import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import {GQLChangeSet} from './hooks';
import ActionList from './ActionList';
import { FormControl, InputLabel, Select, MenuItem, Modal, Button } from '@material-ui/core';
import AddChangeSetModal from './AddChangeSetModal';
import ActionCreatorModal from './ActionCreatorModal';

const useStyles = makeStyles(theme => ({
  root: {
  },
}));

type ChangeSetViewerProps = {
  currentBaseHash: string | null,
  changeSets: GQLChangeSet[]
}

const ChangeSetViewer = (props: ChangeSetViewerProps) => {
  const [changeSetId, setChangeSetId] = useState(null);

  const idToChangeSet = new Map<string, GQLChangeSet>();
  for (let changeSet of props.changeSets) {
    idToChangeSet.set(changeSet.id, changeSet);
  }

  let selectedChangeSet = null;
  if (changeSetId) {
    selectedChangeSet = idToChangeSet.get(changeSetId);
  }

  return (
    <Paper>
      <FormControl>
        <AddChangeSetModal currentBaseHash={props.currentBaseHash} changeSets={props.changeSets}/>
        <InputLabel htmlFor="select-change-set">Select ChangeSet</InputLabel>
        <Select
          value={changeSetId}
          onChange={event => setChangeSetId(event.target.value)}
          inputProps={{id: 'select-change-set'}}
        >
        {
          idToChangeSet.keys().map(
            id =>
              <MenuItem key={id} value={id} >
                {id}
              </MenuItem>
          )
        }
        </Select>
      </FormControl>
      {selectedChangeSet && <ActionList log={selectedChangeSet.log} />}
      {selectedChangeSet && <ActionCreatorModal />}
      {selectedChangeSet && selectedChangeSet.log.length > 0 && 
        <FormControl>
          <Button variant="contained" color="primary" onClick={handleUpdateChangeSet}>
            Commit ChangeSet
          </Button>
        </FormControl>
      }
    </Paper>
  );
}

export default ChangeSetViewer;
