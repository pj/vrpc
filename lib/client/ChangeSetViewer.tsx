import React from 'react';
import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import {GQLChangeSet} from './hooks';
import ActionList from './ActionList';
import { FormControl, InputLabel, Select, MenuItem, Modal } from '@material-ui/core';
import AddChangeSetModal from './AddChangeSetModal';

const useStyles = makeStyles(theme => ({
  root: {
  },
}));

type ChangeSetViewerProps = {
  changeSets: GQLChangeSet[]
}

const ChangeSetViewer = (props: ChangeSetViewerProps) => {
  const [changeSetId, setChangeSetId] = useState(null);

  const idToChangeSet = new Map<string, GQLChangeSet>();
  for (let changeSet of props.changeSets) {
    idToChangeSet.set(changeSet.id, changeSet);
  }

  const selectedChangeSet = null;
  if (changeSetId) {
    const selectedChangeSet = idToChangeSet.get(changeSetId);
  }

  return (
    <Paper>
      <FormControl>
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
      <AddChangeSetModal />
    </Paper>
  );
}

export default ChangeSetViewer;
