import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native'
import MapView from 'react-native-maps';  
import { Marker } from 'react-native-maps';  
import database from '@react-native-firebase/database';

var MapStyle = require('./map.json')

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
            observations: []
        }
    }

    componentDidMount(){
        this.getObservations()  
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
                let isSingle = obs[j].isSingle===0?
                "Single Elephant":obs[j].isSingle===1?
                "Group of Elephant with Calves":obs[j].isSingle===2?
                "Group of Elephant with out Calves":""
                let marker = 
                {
                    title: isSingle,
                    cordinates: 
                    {
                        latitude: obs[j].location[1],
                        longitude: obs[j].location[0]
                    },
                    description: ''
                   
                }
                
                observations.push(marker)
            }
        }
        console.log(observations)

        await this.setState({
            observations: observations
        })
    }

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
                    latitude: 6.8896966,   
                    longitude: 80.0384521,  
                    latitudeDelta: 0.0922,  
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

