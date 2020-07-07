import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import HomeBanner from "../../components/HomeBanner/HomeBanner";
import MapDescription from "../../components/MapDescription/MapDescription";
import HomeSocial from "../../components/HomeSocial/HomeSocial";
import HomeObservationTitle from "../../components/HomeObservationTitle/HomeObservationTitle";
import Copyright from "../../components/Copyright/Copyright";
// import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    width: "100%",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default class Home extends Component {
  render() {
    const classes = useStyles;
    // const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    return (
      <React.Fragment>
        <CssBaseline />
        <HomeHeader />

        <main style={{ width: "100%" }}>
          <HomeBanner />
          <HomeSocial />
          <MapDescription />
          <HomeObservationTitle />
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Copyright />
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
}
