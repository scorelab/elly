import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native'
import Camera from '../../components/Camera/Camera'
import { IconButton, Colors } from 'react-native-paper';

class CameraViewScreen extends React.Component{
    state = {
        dataUri: "",
        snaped: false
    }
    
    CameracallbackFunction = (childData) => {
        this.setState({snaped: childData[0], dataUri: childData[1]})
        if(this.state.snaped){
            this.setState({
                snaped: false
            })
            this.props.navigation.navigate('Details', {dataUri: this.state.dataUri})
        }
        
    }

    render() {
        const {navigate} = this.props.navigation;
        //const next_route = navigate('Details', {name: 'Jane'})
        return (
            <View style={styles.container}>
                <View style={styles.cameraView}>
                    <Camera parentCallback={this.CameracallbackFunction} takePicture={this.state.takePicture} />
                    
                </View>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    swipeBtn: {
        width: "40%",
        height: 50,
        justifyContent: 'center',
        marginBottom: 10,
        alignItems: 'center',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        // backgroundColor: getRandomColor(),
        alignItems: 'center',
    },
    cameraView: {
        width: "100%",
        height: "100%"
    }
})
export default CameraViewScreen;

