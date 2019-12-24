import React from "react";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Swal from "sweetalert2";
import firebase from "firebase/app";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  Grid,
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  CardContent,
  CardActions,
  Paper
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    justifyContent: "center",
    alignItems: "center"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: "red"
  },
  card: {
    display: "flex",
    border: 0,
    borderRadius: 0,
    boxShadow: "none"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 700,
    minHeight: 300
  },
  listItem: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 0
  }
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
      confirmButtonText: "Yes, verify it!"
    }).then(result => {
      if (result.value) {
        firebase
          .database()
          .ref()
          .child("usersObservations")
          .child(id)
          .child("verified")
          .set("approved");
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
      confirmButtonText: "Yes, reject it!"
    }).then(result => {
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
          timeout: 200
        }}
      >
        <Fade in={props.open}>
          <Paper>
            <Grid
              container
              alignItems="center"
              justify="center"
              style={{ marginBottom: 40 }}
            >
              <Grid item xs={12} style={{ textAlign: "right" }}>
                <IconButton
                  aria-label="close"
                  color="secondary"
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
                    cursor: "pointer"
                  }}
                  onClick={showPrev}
                />
              </Grid>

              <Grid item xs={10}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cover}
                    image={props.img}
                    title="scorelab.org"
                  />
                  <div className={classes.details}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" src={props.userPhoto} />
                      }
                      title={props.user}
                      subheader={props.time}
                    />
                    <CardContent className={classes.content}>
                      <List style={{ display: "inline-block", margin: 10 }}>
                        {props.result.map(item => (
                          <ListItem
                            button
                            key={item[1]}
                            className={classes.listItem}
                          >
                            <ListItemText primary={item[1]} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                    <CardActions style={{ textAlign: "right" }}>
                      {props.verified === "approved" ? (
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
                            onClick={() =>
                              verifyHandler(props.id, props.userId)
                            }
                            color="primary"
                          >
                            Verify
                          </Button>
                          <Button
                            style={{ margin: 2 }}
                            variant="outlined"
                            onClick={() =>
                              deleteHandler(props.id, props.userId)
                            }
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
                    cursor: "pointer"
                  }}
                  onClick={showNext}
                />
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
