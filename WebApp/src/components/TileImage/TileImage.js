import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
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
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
    marginRight: 10
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
}));

export default function TileImage(props) {
  const handleClickOpen = id => {
    props.parentCallback([true, id]);
  };
  const classes = useStyles();
  const time = props.time.split(" ");
  const day = time[3] + "-" + time[1] + "-" + time[2];
  const when = time[4];
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={props.obPhoto}
        title="Image title"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {"On " + day + " at " + when}
        </Typography>
        <Typography>{props.result[0][1]}</Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => handleClickOpen(props.index)}
          size="small"
          color="primary"
          variant="contained"
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
