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
    return (
      <Container style={{ marginTop: 60 }}>
        <Typography variant="h5" component="h5"></Typography>
        <Grid container spacing={1} style={{ marginTop: 10 }}>
          <DashboardCount
            total={this.state.total}
            approved={this.state.approved}
            pending={this.state.pending}
            rejected={this.state.rejected}
          />
        </Grid>

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
                      icon: "visibility",
                      tooltip: "Confirm pickup",
                      onClick: (event, rowData) => {
                        console.log(rowData);
                        this.setState({
                          showModal: true,
                          item: rowData.tableData.id,
                        });
                      },
                    },
                  ]}
                />
              </Grid>

              {/* {this.state.observations.map((ob, i) => {
                let component = [];
                if (
                  i === 0 ||
                  this.state.observations[i - 1][3].split(" ")[1] !==
                    ob[3].split(" ")[1]
                ) {
                  component.push(
                    <Grid item xs={12} key={i}>
                      <Typography
                        variant="h6"
                        component="h6"
                        style={{
                          display: "block",
                          width: "100%",
                          marginTop: "20px",
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
            </Grid> */}
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

export default Approved;
