import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Grid from "@material-ui/core/Grid";
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { ownPosition: "", initCord: { lat: 0, lang: 0 } };
  }

  displayMarkers = () => {
    return this.props.data.map((store, index) => {
      console.log(store);
      const cord = store.location;
      console.log(cord);
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lng: parseFloat(cord[0]),
            lat: parseFloat(cord[1]),
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };
  componentDidMount() {
    const initCord = {};
    for (let i in this.props.data) {
      if (this.props.data[i].location[0] !== "") {
        initCord["lat"] = this.props.data[i].location[0];
        initCord["lang"] = this.props.data[i].location[1];
        this.setState({ initCord: initCord });
      }
    }
  }
  render() {
    return (
      <Grid
        item
        sm={12}
        md={12}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Map
          google={this.props.google}
          zoom={8}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          style={{ overflow: "y" }}
        >
          {this.displayMarkers()}
        </Map>
      </Grid>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAzZ0St9RVLUhRW9m6I9A-ULfWmjbycX5g",
})(MapContainer);
