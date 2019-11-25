import * as React from 'react';
import {View, StyleSheet, PermissionsAndroid} from 'react-native'
import MapView from 'react-native-maps';  
import { Marker } from 'react-native-maps';  
import database from '@react-native-firebase/database';
import Geolocation from '@react-native-community/geolocation';

var MapStyle = require('../../config/map.json')

class DiscoverScreen extends React.Component{
    
    static navigationOptions = ({navigation})=>{
        return {
            headerTitle: 'Explore',
            headerStyle: {
              backgroundColor: '#4b8b3b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
        }
    }

    constructor(props){
        super(props)
        this.state={
            observations: [],
            location: [82.0,6.8]
        }
    }

    componentDidMount(){
        this.findCoordinates()
        database().ref('/users/').on("value", snapshot=>{
            this.getObservations()
        })
        
    }

    componentDidUpdate(){
        
    }

    getObservations = async function (){
        const ref = database().ref('/users/');
        
        // Fetch the data snapshot
        const snapshot = await ref.once('value');

        const val = snapshot.val()

        let observations = []

        for(let i in val){
            let obs = val[i].observations
            for(let j in obs){
                let marker = 
                {
                    title: obs[j].isSingle===0?"Single":"Group",
                    cordinates: 
                    {
                        latitude: obs[j].location[1],
                        longitude: obs[j].location[0]
                    },
                    // description: ''
                   
                }
                
                observations.push(marker)
            }
        }
        //console.log(observations)

        await this.setState({
            observations: observations
        })
    }

    requestLocationPermission = async function () {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true
        } else {
            return false
        }
        } catch (err) {
            return false
        }
    }

    findCoordinates = () => {
        if(this.requestLocationPermission){
            Geolocation.getCurrentPosition(
                position => {
                    const initialPosition = position;
                    const lon = initialPosition['coords']['longitude']
                    const lat = initialPosition['coords']['latitude']
                    console.log(lon, lat)
                    this.setState({location: [lon, lat]});
                },
                error => console.log('Error', JSON.stringify(error)),
                {enableHighAccuracy: false},
              );
        }
        
    };

    render() {
        const {navigate} = this.props.navigation;
        console.log("Feed Screen")
        return (
            <View style={styles.MainContainer}>  
  
                <MapView  
                    customMapStyle={MapStyle}
                    style={styles.mapStyle}  
                    showsUserLocation={true}  
                    zoomEnabled={true}  
                    zoomControlEnabled={true}  
                    initialRegion={{  
                        latitude: this.state.location[1],   
                        longitude: this.state.location[0],  
                        latitudeDelta: 1.2922,  
                        longitudeDelta: 0.0421,  
                }}>  
                    {this.state.observations.map(marker => (
                        <Marker
                            key={marker.id}
                            coordinate={marker.cordinates}
                            title={marker.title}
                            description={marker.description}
                        />
                    ))}
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
export default DiscoverScreen;

