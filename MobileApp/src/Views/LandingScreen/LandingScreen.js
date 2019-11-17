import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native'

var RNFS = require('react-native-fs');

class LandingScreen extends React.Component{
    componentDidMount() {
        RNFS.readFile(RNFS.DocumentDirectoryPath+'/user.file')
        .then((success) => {
            console.log(success);
            this._interval = setInterval(() => {
                this.props.navigation.navigate('App')
            }, 2000);
        })
        .catch((err) => {
            this._interval = setInterval(() => {
                this.props.navigation.navigate('SignIn')
            }, 2000);
        });
        
      }
      
      componentWillUnmount() {
        clearInterval(this._interval);
      }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.welcome}>Splash Screen</Text>
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
        alignSelf: 'stretch',
        //backgroundColor: getRandomColor(),
    },
    welcome: {
        fontSize: 25
    }
})
export default LandingScreen;

