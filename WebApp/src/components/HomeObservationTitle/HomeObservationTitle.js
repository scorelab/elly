import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

export default function HomeObservationTitle(props) {
  return (
    <Grid
      container
      style={{
        width: "100%",
        height: 300,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Grid item xs={12} sm={6} md={4} justify="center">
        <Typography
          component="h2"
          variant="h2"
          align="left"
          color="textPrimary"
        >
          User Observations
        </Typography>
        <Typography
          variant="body1"
          align="left"
          color="textSecondary"
          paragraph
          style={{ fontSize: 22, textAlign: "left" }}
        >
          Any user around the world is capable of uploading elephant images to
          the data collection we are gathering. Just you can download the mobile
          app from given link and start cpturing. Below you can see some
          observations uploaded by users.
        </Typography>

        <Button variant="outlined">View More...</Button>
      </Grid>
      <Grid
        item
        y
        xs={12}
        sm={6}
        md={4}
        style={{ padding: 20, borderRadius: 10 }}
      >
        {" "}
        <img
          alt="logo"
          style={{ width: 350 }}
          src={
            "https://i1.pickpik.com/photos/675/179/715/man-guy-male-photographer-preview.jpg"
          }
        />
      </Grid>
    </Grid>
  );
}
