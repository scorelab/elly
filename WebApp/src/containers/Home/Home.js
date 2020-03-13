import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import HomeBanner from "../../components/HomeBanner/HomeBanner";
import HomeMap from "../../components/HomeMap/HomeMap";
import { generateResult } from "../../firebase/dataHandling";
import TileImage from "../../components/TileImage/TileImage";
import firebase from "firebase/app";
import ObservationDialog from "../../components/ObservationDialog/ObservationDialog";
import ReactLoading from "react-loading";
import HomeSocial from "../../components/HomeSocial/HomeSocial";
import HomeObservationTitle from "../../components/HomeObservationTitle/HomeObservationTitle";
// import { Button } from "@material-ui/core";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.scorelab.org">
        www.SCoReLab.org
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    width: "100%"
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      observations: [],
      showModal: false,
      item: 0,
      total: 0,
      rejected: 0,
      pending: 0,
      approved: 0,
      done: false
    };
  }
  componentDidMount() {
    firebase
      .database()
      .ref("usersObservations")
      .limitToFirst(10)
      .on("value", snapshot => {
        const result = snapshot.val();
        let observations = [];
        let total = 0;
        let rejected = 0;
        let pending = 0;
        let approved = 0;
        for (let i in result) {
          console.log(i);
          total = total + 1;
          if (result[i].verified === "verified") {
            approved = approved + 1;
          } else if (result[i].verified === "pending") {
            pending = pending + 1;
            continue;
          } else if (result[i].verified === "rejected") {
            rejected = rejected + 1;
            continue;
          } else {
            continue;
          }
          let user = result[i].uname;
          let uid = result[i].uid;
          let userPhoto = result[i].uimg;
          let obPhoto = result[i].photoURL;
          let time = new Date(result[i].time);
          time = time.toString().split(" ");
          time = time.splice(0, time.length - 4);
          time = time.toString().replace(/,/g, " ");
          let results = generateResult(result[i]);
          observations.unshift([
            user,
            userPhoto,
            obPhoto,
            time,
            results,
            i,
            uid
          ]);
          this.setState({ observations: observations });
        }
        this.setState({
          total: total,
          rejected: rejected,
          pending: pending,
          approved: approved,
          done: true
        });
      });
  }

  reviewCard = child => {
    this.setState({
      showModal: child[0],
      item: child[1]
    });
  };

  observationDialog = child => {
    console.log(child);
    this.setState({
      item: child
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false
    });
  };
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
          <HomeMap data={this.state.observations} />
          <HomeObservationTitle />
          <Container className={classes.cardGrid} maxWidth="100%">
            {!this.state.done ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <ReactLoading type={"bars"} color={"black"} />
              </div>
            ) : (
              <Grid
                container
                style={{
                  width: "100%",
                  // backgroundColor: "#9b7653",
                  borderRadius: 10
                }}
              >
                {this.state.observations.map((ob, i) => {
                  let component = [];
                  component.push(
                    <Grid item key={i} xs={12} sm={6} md={4}>
                      <TileImage
                        verified={false}
                        userId={ob[6]}
                        id={ob[5]}
                        user={ob[0]}
                        userPhoto={ob[1]}
                        obPhoto={ob[2]}
                        time={ob[3]}
                        result={ob[4]}
                        key={i}
                        index={i}
                        wp={300}
                        hp={300}
                        parentCallback={this.reviewCard}
                      />
                    </Grid>
                  );

                  return component;
                })}
                {this.state.observations.length > 0 ? (
                  <ObservationDialog
                    userPhoto={this.state.observations[this.state.item][1]}
                    user={this.state.observations[this.state.item][0]}
                    time={this.state.observations[this.state.item][3]}
                    verified={false}
                    userId={this.state.observations[this.state.item][6]}
                    id={this.state.observations[this.state.item][5]}
                    img={this.state.observations[this.state.item][2]}
                    result={this.state.observations[this.state.item][4]}
                    open={this.state.showModal}
                    onClose={this.handleClose}
                    index={this.state.item}
                    parentCallback={this.observationDialog}
                    max={this.state.observations.length}
                    showBtns={false}
                  />
                ) : null}
              </Grid>
            )}
          </Container>
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
