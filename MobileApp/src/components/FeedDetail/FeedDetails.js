import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Card, Text, Avatar} from 'react-native-paper';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {MAPMARKER} from '../../images/index';
import {toTitleCase} from '../../Utils/StringUtils';

var MapStyle = require('../../config/map.json');
class FeedDetails extends React.Component {
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
            title={toTitleCase(this.props.title)}
            subtitle={this.props.subtitle}
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
          <Card.Cover style={styles.cover} source={{uri: this.props.image}} />
          {this.props.content.length > 0 && (
            <Card.Content>
              {this.props.content.map((val, i) => {
                return (
                  <View key={'content' + i} style={styles.content}>
                    <Avatar.Icon size={36} icon={val[0]} />
                    <TextInput
                      editable={false}
                      multiline={true}
                      style={{color: 'black'}}>
                      {val[1]}
                    </TextInput>
                  </View>
                );
              })}
            </Card.Content>
          )}

          {this.props.content.length > 0 &&
            this.props.content.map((val, i) => {
              if (val[0] === 'map-marker') {
                return (
                  <View style={styles.MainContainer} key={'map' + i}>
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
    marginBottom: 1,
  },
  cover: {
    height: 200,
    // marginLeft: 73,
    // borderRadius: 10,
    // marginRight: 10,
    // marginBottom: 10,
    // width: Dimensions.get('window').width - 30,
  },
  content: {
    marginTop: 5,
    flexDirection: 'row',
    // flexWrap: 'wrap',
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

export {FeedDetails};
