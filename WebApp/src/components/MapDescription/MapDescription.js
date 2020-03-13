import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";

export default function HomeMap(props) {
  return (
    <Grid
      style={{
        width: "100%",
        height: 600,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        paddingTop: 20,
        backgroundImage: `url(${require("../../images/discover.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
        // backgroundColor: "#B5651E"
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        style={{
          position: "relative",
          marginLeft: 20,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography
          component="h2"
          variant="h2"
          align="left"
          color="textPrimary"
          style={{ color: "white", fontFamily: "Montserrat-Regular" }}
        >
          Find Locations...
        </Typography>
        <Typography
          variant="body1"
          align="left"
          color="textSecondary"
          paragraph
          style={{
            color: "white",
            fontSize: 22,
            fontFamily: "Montserrat-Regular"
          }}
        >
          Each elephant's locations will collected at the time user captured the
          elephants images. So those data can be used to track down the
          elephants and tourists will be easily locate elephants with the usuall
          time when elephants are arriving.
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          component={NavLink}
          to={"/discover"}
        >
          Find more
        </Button>
      </Grid>
      <Grid
        item
        sm={12}
        md={8}
        style={{
          position: "relative",
          height: "60vh",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 20
        }}
      >
        {/* <img
          href="https://www.scorelab.org"
          alt="SCoRe Lab"
          style={{ width: 600, height: 400, borderRadius: 20 }}
          src={
            "https://p1.pxfuel.com/preview/995/462/332/map-search-travel-direction.jpg"
          }
        /> */}
      </Grid>
    </Grid>
  );
}
