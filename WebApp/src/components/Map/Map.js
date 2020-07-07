import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { ownPosition: "" };
  }

  displayMarkers = () => {
    return this.props.data.map((store, index) => {
      const cord = store[4][1][1].split(",");
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lng: parseFloat(cord[0]),
            lat: parseFloat(cord[1])
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  //   async componentDidMount() {
  //     if (navigator.geolocation) {
  //       await navigator.geolocation.getCurrentPosition(function(position) {
  //         var pos = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude
  //         };

  //         this.setState({ ownPosition: pos });
  //       });
  //     }
  //     await console.log(this.state.ownPosition);
  //   }

  render() {
    console.log(this.state.ownPosition);
    return (
      <Map
        google={this.props.google}
        zoom={8}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        yesIWantToUseGoogleMapApiInternals
        initialCenter={{ lat: 47.444, lng: -122.176 }}
        style={{ borderRadius: 10, margin: 15 }}
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAzZ0St9RVLUhRW9m6I9A-ULfWmjbycX5g"
})(MapContainer);
