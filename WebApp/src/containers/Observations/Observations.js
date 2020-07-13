import React from "react";
import { generateResult } from "../../firebase/dataHandling";
import firebase from "firebase/app";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import TileImage from "../../components/TileImage/TileImage";
// import ObservationDialog from "../../components/ObservationDialog/ObservationDialog";
import ReactLoading from "react-loading";
// import { Button } from "@material-ui/core";
// import Copyright from "../../components/Copyright/Copyright";
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
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
class Approved extends React.Component {
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
      done: false,
    };
  }
  componentDidMount() {
    firebase
      .database()
      .ref("usersObservations")
      .orderByChild("time")
      .on("value", (snapshot) => {
        const result = snapshot.val();
        let observations = [];
        let count = 0;
        for (let i in result) {
          console.log(i);
          if (result[i].verified !== "verified") {
            continue;
          }

          let results = generateResult(result[i]);

          let objj = {};
          for (let testObj in results) {
            objj[testObj] = results[testObj].value;
          }
          objj["item_id"] = i;
          objj["id"] = count;
          observations.unshift(objj);
          count = count + 1;
        }
        console.log(observations);
        this.setState({
          observations: observations,
          done: true,
        });
      });
  }

  reviewCard = (child) => {
    this.setState({
      showModal: child[0],
      item: child[1],
    });
  };

  observationDialog = (child) => {
    console.log(child);
    this.setState({
      item: child,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const classes = useStyles;
    return (
      <React.Fragment>
        <CssBaseline />
        <HomeHeader />

        <main style={{ width: "100%", marginTop: 10 }}>
          <Container className={classes.cardGrid} maxWidth="100%">
            {!this.state.done ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ReactLoading type={"bars"} color={"black"} />
              </div>
            ) : (
              <Grid
                item
                container
                style={{
                  width: "100%",
                  padding: 0,
                  // backgroundColor: "#9b7653",
                  borderRadius: 10,
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
                        obPhoto={ob.photoURL}
                        time={ob[3]}
                        result={ob[4]}
                        key={i}
                        index={i}
                        wp={100}
                        hp={100}
                        parentCallback={this.reviewCard}
                      />
                    </Grid>
                  );

                  return component;
                })}
                {/* {this.state.observations.length > 0 ? (
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
                ) : null} */}
              </Grid>
            )}
          </Container>
        </main>
        {/* Footer */}
        {/* <footer className={classes.footer}>
          <Copyright />
        </footer> */}
        {/* End footer */}
      </React.Fragment>
    );
  }
}

export default Approved;
