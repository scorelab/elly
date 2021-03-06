import * as React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Card, Text, Avatar} from 'react-native-paper';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {MAPMARKER} from '../../images/index';

var MapStyle = require('../../config/map.json');
class CardComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.content.reverse();
  }

  render() {
    return (
      <View style={styles.container}>
        <Card style={{borderRadius: 0}}>
          <Card.Title
            title={this.props.subtitle}
            subtitle={this.props.title}
            left={() => (
              <Avatar.Image size={40} source={{uri: this.props.user}} />
            )}
            // right={() => (
            //   <Avatar.Icon
            //     style={{backgroundColor: 'white'}}
            //     size={35}
            //     color="#004c21"
            //     icon="shield-check"
            //   />
            // )}
          />
          {this.props.isNavigate ? (
            <TouchableOpacity
              onPress={() =>
                this.props.showPhoto.navigate('showDetailedPhoto', {
                  img: this.props.image,
                  title: this.props.title,
                  subtitle: this.props.subtitle,
                  user: this.props.user,
                  content: this.props.result,
                  showPhoto: this.props.navigation,
                })
              }>
              <Card.Cover
                style={styles.cover}
                source={{uri: this.props.image}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Card.Cover
                style={styles.cover}
                source={{uri: this.props.image}}
              />
            </TouchableOpacity>
          )}
          {this.props.content.length > 0 && (
            <Card.Content>
              {this.props.content.map((val, i) => {
                return (
                  <View key={i} style={styles.content}>
                    <Avatar.Icon size={36} icon={val[0]} />
                    <Text> {val[1]}</Text>
                  </View>
                );
              })}
            </Card.Content>
          )}

          {this.props.content.length > 0 &&
            this.props.content.map((val, i) => {
              if (val[0] === 'map-marker') {
                return (
                  <View style={styles.MainContainer}>
                    <MapView
                      // customMapStyle={MapStyle}
                      style={styles.mapStyle}
                      showsUserLocation={true}
                      zoomEnabled={true}
                      zoomControlEnabled={true}
                      initialRegion={{
                        latitude: parseFloat(val[1].split(',')[1]),
                        longitude: parseFloat(val[1].split(',')[0]),
                        latitudeDelta: 1.2922,
                        longitudeDelta: 0.0421,
                      }}>
                      <Marker
                        coordinate={{
                          latitude: parseFloat(val[1].split(',')[1]),
                          longitude: parseFloat(val[1].split(',')[0]),
                        }}
                        image={MAPMARKER}
                        onPress={() =>
                          this.props.showPhoto.navigate('showLocationScreen', {
                            location: val[1],
                          })
                        }
                      />
                    </MapView>
                  </View>
                );
              } else {
                return null;
              }
            })}

          {/* <Card.Actions></Card.Actions> */}
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    width: Dimensions.get('window').width,
  },
  cover: {
    height: 300,
  },
  content: {
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  MainContainer: {
    width: Dimensions.get('window').width,
    height: 300,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: 300,
  },
});

export {CardComponent};
