import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import HomeMap from "../../components/HomeMap/HomeMap";
import { generateResult } from "../../firebase/dataHandling";
// import { Button } from "@material-ui/core";
import firebase from "firebase/app";
import Copyright from "../../components/Copyright/Copyright";

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

export default class Discover extends Component {
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
          <HomeMap data={this.state.observations} />
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
