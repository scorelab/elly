import React from "react";
import { generateResult } from "../../firebase/dataHandling";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import firebase from "firebase/app";
import Grid from "@material-ui/core/Grid";
import ObservationDialog from "../../components/ObservationDialog/ObservationDialog";
import SmallCard from "../../components/SmallCard/SmallCard";
import { Typography, Container } from "@material-ui/core";
import DataTable from "../../components/DataTable/DataTable";
import DashboardCount from "../../components/DashbordCount/DashboardCount";

import Downloader from "js-file-downloader";

class Pending extends React.Component {
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
    firebase
      .database()
      .ref("usersObservations")
      .orderByChild("time")
      .on("value", (snapshot) => {
        const result = snapshot.val();
        let observations = [];
        let count = 0;
        for (let i in result) {
          if (result[i].verified !== "pending") {
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
  bulkDownload = (data) => {
    var a = document.createElement("a");
    a.href = data[0].photoURL;
    a.download = "output.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  render() {
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
                  Pending Observations
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <DataTable
                  grouping={true}
                  selection={true}
                  title=""
                  columns={[
                    { title: "Date", field: "time" },
                    { title: "Address", field: "address" },
                    { title: "Alive or Dead", field: "isAlive" },
                    { title: "Living status", field: "isSingle" },
                    { title: "Tusk status", field: "tusksStatus" },
                    { title: "Gender", field: "sex" },
                    { title: "Verified", field: "verified" },
                  ]}
                  data={this.state.observations}
                  // onRowAdd={(item) => firestore.collection("available_items").add(item)}
                  // onRowUpdate={(newData, oldData) =>
                  //   firestore.collection("available_items").doc(oldData.id).update(newData)
                  // }
                  // onRowDelete={(oldDate) =>
                  //   firestore.collection("available_items").doc(oldDate.id).delete()
                  // }
                  actions={[
                    {
                      isFreeAction: false,
                      icon: "visibility",
                      tooltip: "View",
                      onClick: (event, rowData) => {
                        console.log(rowData);
                        this.setState({
                          showModal: true,
                          item: rowData[0].tableData.id,
                        });
                      },
                    },
                    {
                      icon: "cloud-download",
                      tooltip: "download",
                      onClick: (event, rowData) => {
                        console.log(rowData);
                        this.bulkDownload(rowData);
                      },
                    },
                  ]}
                />
              </Grid>
              {this.state.observations.length > 0 ? (
                <ObservationDialog
                  data={this.state.observations[this.state.item]}
                  open={this.state.showModal}
                  onClose={this.handleClose}
                  index={this.state.item}
                  verified={false}
                  parentCallback={this.observationDialog}
                  max={this.state.observations.length}
                />
              ) : null}
            </Grid>
          </div>
        </div>
      </Container>
    );
  }
}

export default Pending;
