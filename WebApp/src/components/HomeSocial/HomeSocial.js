import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function HomeSocial(props) {
  return (
    <Grid
      container
      style={{
        width: "100%",
        height: 400,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        md={3}
        style={{
          padding: 20,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography
          component="h2"
          variant="h2"
          align="left"
          color="textPrimary"
        >
          Who are we?
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        style={{ backgroundColor: "brown", padding: 20, borderRadius: 10 }}
      >
        <Typography
          variant="body1"
          align="left"
          color="textSecondary"
          paragraph
          style={{ fontSize: 22, color: "white", textAlign: "left" }}
        >
          This platform is developing by the SCoRe Lab organization with the
          collaboration of Trunks & Leaves organizations.
        </Typography>
        <Grid container justify="center" style={{ width: "100%" }}>
          {" "}
          <Grid item xs={12} sm={6} md={6}>
            <img
              alt="logo"
              style={{ width: 280, height: 150, borderRadius: 5 }}
              src={require("../../images/score.jpg")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <img
              alt="logo"
              style={{ width: 200, height: 150, borderRadius: 5 }}
              src={require("../../images/trunks2.png")}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
