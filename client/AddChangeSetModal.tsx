import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {ChangeSet, useUpdateChangeSetMutation, AllDataDocument, ChangeSetFieldsFragment, ChangeSetFieldsFragmentDoc} from './hooks';
import { FormControl, Modal, TextField, Button, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
  },
  modalStyle: {
    backgroundColor: 'white'
  }
}));

type AddChangeSetModalProps = {
  currentBaseHash: string | null,
  changeSets: ChangeSetFieldsFragment[]
}

const AddChangeSetModal = (props: AddChangeSetModalProps) => {
  const classes = useStyles(props);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleOpen = () => {
    setOpen(true);
    setName("");
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  // FIXME: fix types.
  const [updateChangeSet, { loading, error }] = useUpdateChangeSetMutation(
    {
      // @ts-ignore
      update(cache, { data: { updateChangeSet } }) {
        // @ts-ignore
        const { changeSets } = cache.readQuery({ query: ChangeSetFieldsFragmentDoc });
        cache.writeQuery({
          query: ChangeSetFieldsFragmentDoc,
          data: { changeSets: changeSets.concat([updateChangeSet]) },
        });
        setOpen(false);
        setName("");
      }
    }
  );

  const handleUpdateChangeSet = () => {
    updateChangeSet(
      {
        variables: {
          changeSet: {
            id: name,
            baseHash: props.currentBaseHash,
            log: []
          }
        }, 
      }
    );
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Add ChangeSet
      </button>
      <Modal
        open={open}
        onClose={handleClose}
      > 
        <div className={classes.modalStyle}>
          {!error && loading && <CircularProgress />}
          {error && !loading && <div>{error}</div>}
          {!error && !loading && 
            <React.Fragment>
              <h2 id="simple-modal-title">Add Change Set</h2>

              <FormControl>
                <TextField
                  id="name"
                  label="Change Set Name"
                  value={name}
                  onChange={event => setName(event.target.value)}
                  margin="normal"
                />
              </FormControl>
              <FormControl>
                <Button variant="contained" color="primary" onClick={handleUpdateChangeSet}>
                  Add
                </Button>
              </FormControl>
            </React.Fragment>
          }
        </div>
      </Modal>
    </div> 
  );
}

export default AddChangeSetModal;