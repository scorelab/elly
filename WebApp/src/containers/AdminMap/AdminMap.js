import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import HomeMap from "../../components/HomeMap/HomeMap";
import { generateResult } from "../../firebase/dataHandling";
// import { Button } from "@material-ui/core";
import firebase from "firebase/app";
import Copyright from "../../components/Copyright/Copyright";
import Grid from "@material-ui/core/Grid";
import { Typography, Container } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
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

export default class AdminDiscover extends Component {
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
        let total = 0;
        let rejected = 0;
        let pending = 0;
        let approved = 0;
        let count = 0;
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
          total: total,
          rejected: rejected,
          pending: pending,
          approved: approved,
          observations: observations,
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
    // const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    return (
      <Container style={{ marginTop: 60 }}>
        <div>
          <div
            style={{
              display: "inline-flex",
              flexWrap: "wrap",
            }}
          >
            <Grid item container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h5" component="h5">
                  Observations
                </Typography>
              </Grid>
              <Grid item md={12} lg={12} xs={12}>
                <HomeMap data={this.state.observations} />
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    );
  }
}
