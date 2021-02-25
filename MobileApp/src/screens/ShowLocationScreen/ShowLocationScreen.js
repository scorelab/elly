import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {MAPMARKER} from '../../images/index';

var MapStyle = require('../../config/map.json');

class ShowLocationScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Observation',
      headerStyle: {
        backgroundColor: '#004c21',
      },
      headerTintColor: '#fff',
    };
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <MapView
          // customMapStyle={MapStyle}
          style={styles.mapStyle}
          showsUserLocation={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          initialRegion={{
            latitude: parseFloat(
              this.props.navigation.getParam('location').split(',')[1],
            ),
            longitude: parseFloat(
              this.props.navigation.getParam('location').split(',')[0],
            ),
            latitudeDelta: 1.2922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: parseFloat(
                this.props.navigation.getParam('location').split(',')[1],
              ),
              longitude: parseFloat(
                this.props.navigation.getParam('location').split(',')[0],
              ),
            }}
            image={MAPMARKER}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default ShowLocationScreen;
