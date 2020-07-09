import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { blue } from "@material-ui/core/colors";
// import Icon from "@material-ui/core/Icon";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  card: {
    margin: 0,
    height: 100,
    maxWidth: 900,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: blue[500],
  },
}));

export default function SmallCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        // avatar={() => (
        //   <Icon style={{ fontSize: 120, color: "white" }} color="action">
        //     {props.icon}
        //   </Icon>
        // )}
        title={
          <Typography
            style={{ fontFamily: "Montserrat-Regular" }}
            component="h2"
            variant="h5"
          >
            {props.type}
          </Typography>
        }
        subheader={
          <Typography
            style={{ fontFamily: "Montserrat-Regular" }}
            component="h2"
            variant="h3"
          >
            {props.count}
          </Typography>
        }
        style={{ fontSize: 50 }}
      />
    </Card>
  );
}
