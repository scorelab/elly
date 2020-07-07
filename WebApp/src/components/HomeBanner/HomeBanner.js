import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  cover: {
    width: "100%"
    // height: 300,
    // backgroundImage: `url(${Cover})`
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: 10,
    width: "100%"
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

export default function HomeBanner(props) {
  const classes = useStyles();

  return (
    <Grid
      container
      style={{
        width: "100%",
        height: 600,
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${require("../../images/banner.jpeg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        style={{
          padding: 100,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%"
        }}
      >
        <Typography
          component="h2"
          variant="h2"
          align="left"
          color="textPrimary"
          style={{ color: "white", fontFamily: "Montserrat-Regular" }}
        >
          What is Ele Watch?
        </Typography>
        <Typography
          variant="body1"
          align="left"
          color="textSecondary"
          paragraph
          style={{
            fontSize: 22,
            color: "white",
            fontFamily: "Montserrat-Regular"
          }}
        >
          Welcome to the EleWatch platform. We are collecting a lot of elephants
          images captured from all over the world. You can contribute to us by
          using the mobile app. These data will be used for elephant
          conservation purposes.
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              href={"https://www.scorelab.org/elly/"}
              variant="contained"
              color="primary"
            >
              Download app
            </Button>
          </Grid>
          <Grid item>
            <Button
              href={
                "https://www.trunksnleaves.org/support-our-work-266094.html"
              }
              variant="contained"
            >
              Contact us
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        style={{
          padding: 100,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img
          alt="logo"
          className={classes.icon}
          src={require("../../images/logo/logo.png")}
        />
      </Grid>
    </Grid>
  );
}
