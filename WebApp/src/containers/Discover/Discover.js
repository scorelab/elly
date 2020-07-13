import React from "react";
import { generateResult } from "../../firebase/dataHandling";
import firebase from "firebase/app";
import HomeMap from "../../components/HomeMap/HomeMap";
import Copyright from "../../components/Copyright/Copyright";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import { CssBaseline } from "@material-ui/core";

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
    };
  }
  componentDidMount() {
    // firebase
    // .database()
    // .ref("metadata/map")
    // .once("value")
    // .then((snapshot) => {
    //   let tempCord = {};
    //   tempCord["lat"] = snapshot.val().initialCenter.lat;
    //   tempCord["lng"] = snapshot.val().initialCenter.lang;
    //   let tempZoom = snapshot.val().zoom;
    //   this.setState({ initCord: tempCord });
    //   this.setState({ zoom: tempZoom });
    //   console.log(tempCord);
    // });
    firebase
      .database()
      .ref("usersObservations")
      .orderByChild("time")
      .on("value", (snapshot) => {
        const result = snapshot.val();
        let observations = [];
        let count = 0;
        for (let i in result) {
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
        this.setState({
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
    return (
      <React.Fragment>
        <CssBaseline />
        <HomeHeader />

        <main style={{ width: "100%" }}>
          <HomeMap data={this.state.observations} />
        </main>
        {/* Footer */}
        {/* <footer>
          <Copyright />
        </footer> */}
        {/* End footer */}
      </React.Fragment>
    );
  }
}

export default Approved;
