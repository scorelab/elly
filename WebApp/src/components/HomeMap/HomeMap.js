import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import Grid from "@material-ui/core/Grid";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";

export class MapContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }

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
          onClick={() =>
            Swal.fire(
              "",
              `Captured by ${store.uname} at ${store.address} on ${store.time}`,
              "info"
            )
          }
        >
          <InfoWindow visible={true}>
            <div>
              <p>
                Click on the map or drag the marker to select location where the
                incident occurred
              </p>
            </div>
          </InfoWindow>
        </Marker>
      );
    });
  };

  render() {
    return (
      <Grid
        item
        sm={12}
        md={12}
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {this.props.data ? (
          <Map
            google={this.props.google}
            zoom={4}
            yesIWantToUseGoogleMapApiInternals
            initialCenter={{
              lat: 21.0,
              lng: 78.0,
            }}
            gestureHandling="cooperative"
            // center={this.initCord}
            style={{ overflow: "y" }}
          >
            {this.displayMarkers()}
          </Map>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <ReactLoading type={"bars"} color={"black"} />
          </div>
        )}
      </Grid>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAzZ0St9RVLUhRW9m6I9A-ULfWmjbycX5g",
})(MapContainer);
