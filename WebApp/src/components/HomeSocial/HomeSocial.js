import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import { Button } from "@material-ui/core";

export default function HomeSocial(props) {
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
        <Typography
          variant="body1"
          align="left"
          color="textSecondary"
          paragraph
          style={{ fontSize: 22, textAlign: "left" }}
        >
          This platform is developing by the SCoRe Lab organization with the
          collaboration of Trunks & Leaves organizations.
        </Typography>
        {/* <Button variant="outlined">find more about SCoRe Lab.</Button>
        <Button variant="outlined">find more about</Button> */}
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={5}
        style={{ padding: 20, borderRadius: 10 }}
      >
        <Grid container justify="center" style={{ width: "100%" }}>
          {" "}
          <Grid item xs={12} sm={6} md={5}>
            <img
              href="https://www.scorelab.org"
              alt="SCoRe Lab"
              style={{ width: 280, height: 150, borderRadius: 5 }}
              src={require("../../images/score.jpg")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
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
