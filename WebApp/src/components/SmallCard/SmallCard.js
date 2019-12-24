import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { red } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
const useStyles = makeStyles(theme => ({
  card: {
    margin: 0,
    height: 70,
    maxWidth: 900,
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function SmallCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Icon style={{ fontSize: 40 }} color="action">
            {props.icon}
          </Icon>
        }
        title={props.type}
        subheader={props.count}
      />
    </Card>
  );
}
