import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { red } from "@material-ui/core/colors";
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 300
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    width: 300
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
    backgroundColor: red[500]
  }
}));

export default function ReviewCard(props) {
  const classes = useStyles();

  const handleClickOpen = id => {
    props.parentCallback([true, id]);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={props.userPhoto}
          />
        }
        title={props.user}
        subheader={props.time}
      />
      <CardMedia
        className={classes.media}
        image={props.obPhoto}
        title={props.user}
      />
      <CardContent>
        <Button
          onClick={() => handleClickOpen(props.index)}
          variant="outlined"
          color="primary"
        >
          View
        </Button>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}
