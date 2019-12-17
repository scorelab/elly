import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import Icon from '@material-ui/core/Icon';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import Pending from '../../containers/pending/Pending';
import Approved from '../../containers/Approved/Approved';
import Rejected from '../../containers/Rejected/Rejected'

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
  },
  {
    path: "/home/rejected",
    sidebar: () => <div></div>,
    main: () => <Rejected />
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
                <Icon style={{ fontSize: 50, color: 'white' }} >thumb_up</Icon>
              </ListItemAvatar>
              <ListItemText primary={'APPROVED'} />
            </ListItem>
            <Divider/>
            <ListItem style={{backgroundColor: 'green', color:'white'}} component={Link} to={"/home/pending"} key={'pending'}>
              <ListItemAvatar>
                <Icon style={{ fontSize: 50, color: 'white' }}>hourglass_empty</Icon>
              </ListItemAvatar>
              <ListItemText primary={'PENDING'} />
            </ListItem>
            <Divider/>
            <ListItem style={{backgroundColor: 'green', color:'white'}} component={Link} to={"/home/rejected"} key={'rejected'}>
              <ListItemAvatar>
                <Icon style={{ fontSize: 50, color: 'white' }}>thumb_down</Icon>
              </ListItemAvatar>
              <ListItemText primary={'REJECTED'} />
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