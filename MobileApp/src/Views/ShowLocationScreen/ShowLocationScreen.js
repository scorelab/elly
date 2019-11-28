import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native'
import MapView from 'react-native-maps';  
import { Marker } from 'react-native-maps';  
var MapStyle = require('../../config/map.json')
class ShowLocationScreen extends React.Component{
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation})=>{
        return {
            headerTitle: 'Observation',
            headerStyle: {
              backgroundColor: '#4b8b3b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
        }
    }


    render() {
        return (
            <View style={styles.MainContainer}>  
  
                <MapView  
                    customMapStyle={MapStyle}
                    style={styles.mapStyle}  
                    showsUserLocation={true}  
                    zoomEnabled={true}  
                    zoomControlEnabled={true}  
                    initialRegion={{  
                        latitude: parseFloat(this.props.navigation.getParam('location').split(",")[1]),   
                        longitude: parseFloat(this.props.navigation.getParam('location').split(",")[0]),  
                        latitudeDelta: 1.2922,  
                        longitudeDelta: 0.0421,  
                }}>  
                    <Marker
                        coordinate={{
                            latitude: parseFloat(this.props.navigation.getParam('location').split(",")[1]), 
                            longitude: parseFloat(this.props.navigation.getParam('location').split(",")[0])
                        }}
                        title={this.props.navigation.getParam('location').split(",")[1]+", "+this.props.navigation.getParam('location').split(",")[0]}
                        // description={"Hello"}
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