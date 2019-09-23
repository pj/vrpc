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
import ActionList from './ActionList';
import ActionCreator from './ActionCreator';

const ACTIONS_FRAGMENT = gql`
fragment DataFragment on FieldData {
  ... on StringField {
    __typename
    stringValue: value
  }

  ... on IntField {
    __typename
    intValue: value
  }

  ... on FloatField {
    __typename
    floatValue: value
  }

  ... on BooleanField {
    __typename
    booleanValue: value
  }
}

fragment ActionsFragment on Action {
  __typename
  changeLog
  hash
  version

  ... on NewServiceAction {
    serviceName
    description
  }

  ... on UpdateDescriptionServiceAction {
    serviceName
    description
  }

  ... on AddVersionServiceAction {
    serviceName
    inputType
    outputType
    inputVersion
    inputHash
    outputVersion
    outputHash
  }

  ... on RenameFieldTypeAction {
    typeName
    _from
    to
  }

  ... on RequiredFieldTypeAction {
    typeName
    name
  }

  ... on OptionalFieldTypeAction {
    typeName
    name
  }

  ... on DeleteFieldTypeAction {
    typeName
    name
  }

  ... on SetDefaultFieldTypeAction {
    typeName
    name
    _default {
      ...DataFragment
    }
  }

  ... on RemoveDefaultFieldTypeAction {
    typeName
    name
  }

  ... on AddFieldTypeAction {
    typeName
    name
    type
    description
    optional
    _default {
      ...DataFragment
    }
  }

  ... on UpdateDescriptionTypeAction {
    typeName
    name
    description
  }

  ... on ReferenceFieldTypeAction {
    typeName
    name
    description
    optional
    referenceType
    referenceHash
    referenceVersion
  }

  ... on NewTypeAction {
    typeName
    description
  }
}
`;

const GET_LOG = gql`
{
  log {
    ...ActionsFragment
    ... on GroupAction {
      __typename
      changeLog
      groupedActions {
         ...ActionsFragment
      }
      versions {
        typeName,
        version
      }
    }
  }

  types {
    name
    versions {
      version
      fields {
        key
      }
    }
  }
}
${ACTIONS_FRAGMENT}
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
        <ActionCreator types={data.types}/>
        <ActionList actions={data.log} />
      </main>
    </div>
  );
}

export default App;
