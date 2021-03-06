import React from "react";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Swal from "sweetalert2";
import firebase from "firebase/app";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
// import Fade from "@material-ui/core/Fade";
import {
  Grid,
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  CardContent,
  CardActions,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    justifyContent: "center",
    alignItems: "center",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "red",
  },
  card: {
    display: "flex",
    boxShadow: "none",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    // backgroundColor: "#9b7653"
  },
  cover: {
    width: 700,
    minHeight: 300,
  },
  listItem: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 0,
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();

  const verifyHandler = (id, userId) => {
    console.log(id);
    props.onClose();
    Swal.fire({
      title: "Are you sure?",
      text: "You can reject accidentaly verified stuff from the approved page!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, verify it!",
    }).then((result) => {
      if (result.value) {
        firebase
          .database()
          .ref()
          .child("usersObservations")
          .child(id)
          .child("verified")
          .set("verified");
        props.parentCallback(0);
        Swal.fire("Verified!", "Your file has been verified.", "success");
      }
    });
  };

  const deleteHandler = (id, userId) => {
    props.onClose();
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.value) {
        firebase
          .database()
          .ref()
          .child("usersObservations")
          .child(id)
          .child("verified")
          .set("rejected");
        props.parentCallback(0);
        Swal.fire("Rejected!", "Your file has been rejected.", "success");
      }
    });
  };

  const showPrev = () => {
    if (props.index > 0) {
      props.parentCallback(props.index - 1);
    }
  };

  const showNext = () => {
    console.log(props.index, props.max);
    if (props.index < props.max - 1) {
      props.parentCallback(props.index + 1);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 200,
        }}
        // style={{ backgroundColor: "white", height: "100%", width: "100%" }}
      >
        <Paper className={classes.paper}>
          <Grid container alignItems="center" justify="center">
            <Grid item xs={12} style={{ textAlign: "right", marginBottom: 40 }}>
              <IconButton
                aria-label="close"
                color="secondary"
                style={{ backgroundColor: "white", margin: 10 }}
                onClick={props.onClose}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item xs={1} style={{ textAlign: "center" }}>
              <ArrowBackIos
                style={{
                  margin: 10,
                  width: 50,
                  height: 50,
                  cursor: "pointer",
                }}
                onClick={showPrev}
              />
            </Grid>

            <Grid item xs={10}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cover}
                  image={props.data.photoURL}
                  title="scorelab.org"
                />
                <div className={classes.details}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" src={props.data.uimg} />
                    }
                    title={props.data.uname}
                    subheader={props.data.time}
                  />
                  <CardContent className={classes.content}>
                    <List style={{ display: "inline-block", margin: 10 }}>
                      {Object.keys(props.data).map(
                        (item, i) =>
                          [
                            "address",
                            "time",
                            "uname",
                            "location",
                            "isSingle",
                            "isAlive",
                            "sex",
                            "cause",
                            "accidentKind",
                            "intentionalKind",
                            "tuskStatus",
                            "haveTusks",
                            "howManyTusks",
                            "noOfDeaths",
                            "noOfIndividuals",
                            "noOfTusks",
                          ].includes(item) && (
                            <ListItem
                              button
                              key={i}
                              className={classes.listItem}
                            >
                              <ListItemText
                                primary={props.data[item].toString()}
                              />
                            </ListItem>
                          )
                      )}
                    </List>
                  </CardContent>
                  <CardActions style={{ textAlign: "right" }}>
                    {props.data.verified === "verified" ? (
                      <Button
                        style={{ margin: 2 }}
                        variant="outlined"
                        onClick={() => deleteHandler(props.id, props.userId)}
                        color="secondary"
                      >
                        Reject
                      </Button>
                    ) : (
                      <div>
                        <Button
                          style={{ margin: 2 }}
                          variant="outlined"
                          onClick={() => verifyHandler(props.id, props.userId)}
                          color="primary"
                        >
                          Verify
                        </Button>
                        <Button
                          style={{ margin: 2 }}
                          variant="outlined"
                          onClick={() => deleteHandler(props.id, props.userId)}
                          color="secondary"
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </CardActions>
                </div>
              </Card>
            </Grid>
            <Grid item xs={1} style={{ textAlign: "center" }}>
              <ArrowForwardIosIcon
                style={{
                  margin: 10,
                  width: 50,
                  height: 50,
                  cursor: "pointer",
                }}
                onClick={showNext}
              />
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </div>
  );
}
