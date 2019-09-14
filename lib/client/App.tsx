import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_LOG = gql`
  {
    log {
      __typename
      ... on Action {
        changeLog
        hash
        version
      }
      ... on NewServiceAction {
        serviceName
      }
    }
  }
`;

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
  toolbar: theme.mixins.toolbar,
}));

const App = () => {
  const classes = useStyles();
  const { loading, data } = useQuery(GET_LOG);
  if (loading) {
    return null;
  }
  console.log(data);
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
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography>
      </main>
    </div>
  );
}

export default App;
