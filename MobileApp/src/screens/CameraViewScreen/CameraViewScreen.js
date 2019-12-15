import React from 'react';
import { View, StyleSheet } from 'react-native'
import Camera from '../../components/Camera/Camera'

class CameraViewScreen extends React.Component {
    state = {
        dataUri: "",
        snaped: false
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Take a Snapshot',
            headerStyle: {
                backgroundColor: '#0b6623',
            },
            headerTintColor: '#fff',
        }
    }

    CameracallbackFunction = (childData) => {
        this.setState({ snaped: childData[0], dataUri: childData[1] })
        if (this.state.snaped) {
            this.setState({
                snaped: false
            })
            console.log(this.state.dataUri)
            this.props.navigation.navigate('FormScreenStack', { dataUri: this.state.dataUri })
        }

    }

    render() {
        const { navigate } = this.props.navigation;
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
        alignItems: 'center',
    },
    cameraView: {
        width: "100%",
        height: "100%"
    }
})
export default CameraViewScreen;

