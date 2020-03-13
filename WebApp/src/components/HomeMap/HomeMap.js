import React from "react";
import Grid from "@material-ui/core/Grid";
import MapContainer from "../../components/Map/Map";

export default function HomeMap(props) {
  return (
    <Grid
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Grid
        item
        sm={12}
        md={12}
        style={{
          position: "relative",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <MapContainer data={props.data} />
      </Grid>
    </Grid>
  );
}
