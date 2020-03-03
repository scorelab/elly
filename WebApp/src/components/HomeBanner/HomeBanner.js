import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Cover from "../../images/cover/cover.jpg";

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
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <div className={classes.cover}>
          <Typography
            component="h6"
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
            //   style={{ fontFamily: "Alegreya" }}
          >
            ELEWATCH
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="textSecondary"
            paragraph
          >
            Welcome to the EleWatch platform. We are collecting a lot of
            elephants images captured from all over the world. You can
            contribute to us by using the mobile app{" "}
            <a href="https://www.scorelab.org/elly/">here.</a>
          </Typography>
        </div>

        {/* <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button variant="contained" color="primary">
                Main call to action
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary">
                Secondary action
              </Button>
            </Grid>
          </Grid>
        </div> */}
      </Container>
    </div>
  );
}
