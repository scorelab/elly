import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import SignInIcon from "@material-ui/icons/AccountBox";
import { NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  icon: {
    width: 35,
    height: 35
  }
}));

export default function HomeHeader(props) {
  const classes = useStyles();

  return (
    <AppBar style={{ backgroundColor: "black" }} position="relative">
      <Toolbar>
        <div style={{ borderRadius: 2, marginRight: 5 }}>
          <img
            alt="logo"
            className={classes.icon}
            src={require("../../images/logo/logo.png")}
          />
        </div>

        <Typography style={{ flex: 1 }} variant="button" color="inherit" noWrap>
          EleWatch
        </Typography>
        {/* <SignInIcon /> */}
        <Button
          style={{ fontFamily: "roboto" }}
          variant="button"
          color="inherit"
          noWrap
          style={{ backgroundColor: "green" }}
          component={NavLink}
          to={"/login"}
        >
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
}
