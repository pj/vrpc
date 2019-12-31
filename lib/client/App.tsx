import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ActionList from './ActionList';
import ChangeSetViewer from './ChangeSetViewer'

import { useAllDataQuery } from './hooks';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  topSection: {
    display: 'flex',
    flexDirection: 'row',
    width: "100%"
  },
  toolbar: theme.mixins.toolbar,
}));

const App = (props: any) => {
  const classes = useStyles(props);
  const { loading, data } = useAllDataQuery();
  if (loading || !data) {
    return null;
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            VRPC editing
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <ChangeSetViewer 
          changeSets={data.changeSets} 
          currentBaseHash={data.log.length > 0 ? data.log[0].hash : null}
          types={data.types}
          services={data.services}
        />
        <ActionList log={data.log} />
      </main>
    </div>
  );
}

export default App;
