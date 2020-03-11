import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MapContainer from "../../components/Map/Map";

export default function HomeMap(props) {
  return (
    <Grid
      style={{
        width: "100%",
        height: 700,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        paddingTop: 20,
        backgroundImage:
          "url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Uda_Walawe_safari_track.jpg/1024px-Uda_Walawe_safari_track.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
        // backgroundColor: "#B5651E"
      }}
    >
      <Grid
        item
        sm={12}
        md={8}
        style={{
          position: "relative",
          height: "60vh",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          marginLeft: 10,
          borderRadius: 10
        }}
      >
        <MapContainer data={props.data} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        style={{
          position: "relative",
          marginLeft: 20,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography
          component="h6"
          variant="h1"
          align="left"
          color="textPrimary"
          style={{ color: "white" }}
        >
          Find Locations...
        </Typography>
        <Typography
          variant="body1"
          align="left"
          color="textSecondary"
          paragraph
          style={{ color: "white", fontSize: 22 }}
        >
          Each elephant's locations will collected at the time user captured the
          elephants images. So those data can be used to track down the
          elephants and tourists will be easily locate elephants with the usuall
          time when elephants are arriving.
        </Typography>
      </Grid>
    </Grid>
  );
}
