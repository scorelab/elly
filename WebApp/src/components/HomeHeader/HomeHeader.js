import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import SignInIcon from "@material-ui/icons/AccountBox";
import { NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";

export default function HomeHeader(props) {
  return (
    <AppBar style={{ backgroundColor: "#014421" }} position="relative">
      <Toolbar>
        <div
          style={{
            flex: 1,
            color: "white",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          {/* <div
            style={{
              borderRadius: 2,
              marginRight: 5
            }}
          >
            <img
              alt="logo"
              className={classes.icon}
              src={require("../../images/logo/logo.png")}
            />
          </div> */}

          <Typography
            variant="button"
            color="inherit"
            href={"/"}
            style={{ fontSize: 24, fontFamily: "Montserrat-Regular" }}
          >
            EleWatch
          </Typography>
        </div>
        {/* <SignInIcon /> */}
        <Button
          variant="outlined"
          color="inherit"
          component={NavLink}
          to={"/login"}
        >
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
}
