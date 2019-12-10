import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CheckBoxRounded from '@material-ui/icons/CheckBoxRounded';
import InfoRounded from '@material-ui/icons/InfoRounded';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import Pending from '../../containers/pending/Pending';
import Approved from '../../containers/Approved/Approved';
import { Divider } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,

    marginTop: 57
  },
  toolbar: theme.mixins.toolbar,
}));

const routes = [
  {
    path: "/home/approved",
    sidebar: () => <div></div>,
    main: () => <Approved />
  },
  {
    path: "/home/pending",
    sidebar: () => <div></div>,
    main: () => <Pending />
  }
];

export const SideBar = () => {
  const classes = useStyles();
  return <Router>
    <div style={{ display: "flex" }}>
      <div>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <List component={'nav'} aria-label="main mailbox folders">
            <ListItem style={{backgroundColor: 'green', color:'white'}} component={Link}  to={"/home/approved"} key={'approved'}>
              <ListItemAvatar>
                <Avatar>
                  <CheckBoxRounded style={{backgroundColor: 'green', color:'white'}}/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={'APPROVED'} />
            </ListItem>
            <Divider/>
            <ListItem style={{backgroundColor: 'green', color:'white'}} component={Link} to={"/home/pending"} key={'pending'}>
              <ListItemAvatar>
                <Avatar>
                  <InfoRounded style={{backgroundColor: 'green', color:'white'}}/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={'PENDING'} />
            </ListItem>
          </List>
        </Drawer>

        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.sidebar />}
            />
          ))}
        </Switch>
      </div>

      <div style={{ flex: 1, padding: "10px" }}>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.main />}
            />
          ))}
        </Switch>

      </div>
    </div>
  </Router>


}