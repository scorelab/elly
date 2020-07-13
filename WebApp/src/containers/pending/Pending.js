import React from "react";
import { generateResult } from "../../firebase/dataHandling";
import firebase from "firebase/app";
import Grid from "@material-ui/core/Grid";
import ObservationDialog from "../../components/ObservationDialog/ObservationDialog";
import { Typography, Container } from "@material-ui/core";
import DataTable from "../../components/DataTable/DataTable";
import DashboardCount from "../../components/DashbordCount/DashboardCount";
import Swal from "sweetalert2";

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
    data.map((item, i) => {
      var httpsReference = firebase.storage().refFromURL(item.photoURL);
      httpsReference
        .getDownloadURL()
        .then(function (url) {
          // console.log(url);
          var xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = function (event) {
            var blob = xhr.response;
            console.log(blob);
            var a = document.createElement("a");
            a.href = window.URL.createObjectURL(blob);
            a.download = `${i}.jpeg`;
            a.dispatchEvent(new MouseEvent("click"));
          };
          xhr.open("GET", url);
          xhr.send();
          console.log(xhr);
        })
        .catch(function (error) {
          // Handle any errors
          alert(error.message);
          console.log(error);
        });
    });
  };

  rejectHandler = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        let tempObj = {};
        data.map((item, i) => {
          tempObj[`usersObservations/${item.item_id}/verified`] = "rejected";
        });
        console.log(tempObj);
        firebase
          .database()
          .ref()
          .update(tempObj)
          .then(() => {
            Swal.fire("Rejected!", "", "success");
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  };

  verifyHandler = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        let tempObj = {};
        data.map((item, i) => {
          tempObj[`usersObservations/${item.item_id}/verified`] = "verified";
        });
        console.log(tempObj);
        firebase
          .database()
          .ref()
          .update(tempObj)
          .then(() => {
            Swal.fire("Verified!", "", "success");
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  };
  showMapHandler = (data) => {
    let tempObj = {};
    data.map((item, i) => {
      tempObj[`usersObservations/${item.item_id}/showMap`] = true;
    });
    console.log(tempObj);
    firebase
      .database()
      .ref()
      .update(tempObj)
      .then(() => {
        Swal.fire("Location visibility on!", "", "success");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  hideMapHandler = (data) => {
    let tempObj = {};
    data.map((item, i) => {
      tempObj[`usersObservations/${item.item_id}/showMap`] = false;
    });
    console.log(tempObj);
    firebase
      .database()
      .ref()
      .update(tempObj)
      .then(() => {
        Swal.fire("Location visibility off!", "", "success");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    return (
      <Container style={{ marginTop: 60 }}>
        <Typography variant="h5" component="h5"></Typography>

        <div>
          <div
            style={{
              display: "inline-flex",
              flexWrap: "wrap",
              marginTop: 50,
            }}
          >
            <Grid item container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h5" component="h5">
                  Observations
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
                  actions={[
                    {
                      isFreeAction: false,
                      icon: "visibility",
                      tooltip: "View",
                      onClick: (event, rowData) => {
                        // console.log(rowData);
                        this.setState({
                          showModal: true,
                          item: rowData[0].tableData.id,
                        });
                      },
                    },
                    {
                      icon: "cloud_download",
                      tooltip: "download",
                      onClick: (event, rowData) => {
                        // console.log(rowData);
                        this.bulkDownload(rowData);
                      },
                    },
                    {
                      icon: "close",
                      tooltip: "reject",
                      onClick: (event, rowData) => {
                        // console.log(rowData);
                        this.rejectHandler(rowData);
                      },
                    },
                    {
                      icon: "check",
                      tooltip: "verify",
                      onClick: (event, rowData) => {
                        // console.log(rowData);
                        this.verifyHandler(rowData);
                      },
                    },
                    {
                      icon: "location_on",
                      tooltip: "show on map",
                      onClick: (event, rowData) => {
                        // console.log(rowData);
                        this.showMapHandler(rowData);
                      },
                    },
                    {
                      icon: "location_off",
                      tooltip: "hide on map",
                      onClick: (event, rowData) => {
                        // console.log(rowData);
                        this.hideMapHandler(rowData);
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
