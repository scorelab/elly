import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native'
import MapView from 'react-native-maps';  
import { Marker } from 'react-native-maps';  
import database from '@react-native-firebase/database';

class DiscoverScreen extends React.Component{
    
    static navigationOptions = ({navigation})=>{
        return {
            headerTitle: 'Explore',
            headerStyle: {
              backgroundColor: '#f4511e',
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
                let location = obs[j].location
                observations.push(location)
            }
        }

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
                    <MapView.Marker  
                        coordinate={{ latitude: 6.8896966, longitude: 80.0384521 }}  
                        title={"JavaTpoint"}  
                        description={"Java Training Institute"}  
                    /> 
                {/* {this.state.observations.map((val,i)=>(
                    <MapView.Marker  
                        key={i}
                        coordinate={{ latitude: val[0], longitude: val[1] }}  
                        title={"JavaTpoint"}  
                        description={"Java Training Institute"}  
                    />  
                ))
                })} */}
               
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

