import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import Pending from "../../containers/pending/Pending";
import Approved from "../../containers/Approved/Approved";
import Rejected from "../../containers/Rejected/Rejected";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: -6
  },

  root: {
    display: "flex"
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },

  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
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
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <div>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.toolbar} />
            <List>
              <ListItem
                button
                component={NavLink}
                to={"/home/approved"}
                selected={false}
                key={1}
              >
                <ListItemIcon>
                  <ThumbUpIcon />
                </ListItemIcon>
                <ListItemText primary={"Approved"} />
              </ListItem>
              <ListItem button component={NavLink} to={"/home/pending"} key={2}>
                <ListItemIcon>
                  <HourglassEmptyIcon />
                </ListItemIcon>
                <ListItemText primary={"Pending"} />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to={"/home/rejected"}
                key={3}
              >
                <ListItemIcon>
                  <ThumbDownIcon />
                </ListItemIcon>
                <ListItemText primary={"Rejected"} />
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
  );
};
