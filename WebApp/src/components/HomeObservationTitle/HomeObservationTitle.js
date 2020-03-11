import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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
      </Grid>
      <Grid
        item
        y
        xs={12}
        sm={6}
        md={3}
        style={{ backgroundColor: "brown", padding: 20, borderRadius: 10 }}
      >
        <Typography
          variant="body1"
          align="left"
          color="textSecondary"
          paragraph
          style={{ fontSize: 22, color: "white", textAlign: "center" }}
        >
          Any user around the world is capable of uploading elephant images to
          the data collection we are gathering. Just you can download the mobile
          app from given link and start cpturing. Below you can see some
          observations uploaded by users.
        </Typography>
      </Grid>
    </Grid>
  );
}
