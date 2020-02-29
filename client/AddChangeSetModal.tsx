import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {ChangeSet, useUpdateChangeSetMutation, AllDataDocument, ChangeSetFieldsFragment, ChangeSetFieldsFragmentDoc} from './hooks';
import { FormControl, Modal, TextField, Button, CircularProgress, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
  },
  modalStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '20px',
    width: 400
  },
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
    <React.Fragment>
      <FormControl> 
        <Button onClick={handleOpen} variant="contained" color="primary">
          Add ChangeSet
        </Button>
      </FormControl> 
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modalStyle}
      > 
          <Box display="flex" flexDirection="column" className={classes.paper}>
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
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default AddChangeSetModal;