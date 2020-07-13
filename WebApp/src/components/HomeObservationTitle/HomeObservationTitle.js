import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

export default function HomeObservationTitle(props) {
  return (
    <Grid
      container
      style={{
        width: "100%",
        height: 400,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={12} sm={6} md={5}>
        <img
          alt="logo"
          style={{ width: 500, height: 300, borderBottomLeftRadius: 100 }}
          src={require("../../images/banner.jpeg")}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} justify="center">
        <Typography
          component="h2"
          variant="h2"
          align="left"
          color="textPrimary"
          style={{ fontFamily: "Montserrat-Regular" }}
        >
          User Observations
        </Typography>
        <Typography
          variant="body1"
          align="left"
          color="textSecondary"
          paragraph
          style={{
            fontSize: 22,
            textAlign: "left",
            fontFamily: "Montserrat-Regular",
          }}
        >
          Any user around the world is capable of uploading elephant images to
          the data collection we are gathering. Just you can download the mobile
          app from given link and start capturing. Below you can see some
          observations uploaded by users.
        </Typography>

        <Button
          variant="contained"
          color="inherit"
          component={NavLink}
          to={"/observations"}
        >
          View images
        </Button>
      </Grid>
    </Grid>
  );
}
