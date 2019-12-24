import React from "react";
import { generateResult } from "../../firebase/dataHandling";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import firebase from "firebase/app";
import ObservationDialog from "../../components/ObservationDialog/ObservationDialog";
import { Container, Typography, Grid } from "@material-ui/core";
class Rejected extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      observations: [],
      showModal: false,
      item: 0
    };
  }
  componentDidMount() {
    firebase
      .database()
      .ref("usersObservations")
      .on("value", snapshot => {
        const result = snapshot.val();
        let observations = [];
        for (let i in result) {
          console.log(result[i].verified);
          if (result[i].verified !== "rejected") {
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
          observations.push([user, userPhoto, obPhoto, time, results, i, uid]);
          this.setState({ observations: observations });
        }
        console.log(observations);
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
    return (
      <Container style={{ marginTop: 60 }}>
        <Typography variant="h5" component="h5">
          Rejected Observations
        </Typography>
        <Grid container spacing={1}>
          {this.state.observations.map((ob, i) => {
            let component = [];
            if (
              i === 0 ||
              this.state.observations[i - 1][3].split(" ")[1] !==
                ob[3].split(" ")[1]
            ) {
              component.push(
                <Grid item xs={12} key={i + this.state.observations.length}>
                  <Typography
                    variant="h6"
                    component="h6"
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: "20px"
                    }}
                  >
                    {ob[3].split(" ")[3] + " " + ob[3].split(" ")[1]}
                  </Typography>
                </Grid>
              );
            }
            component.push(
              <Grid item xs={4}>
                <ReviewCard
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
            />
          ) : null}
        </Grid>
      </Container>
    );
  }
}

export default Rejected;
