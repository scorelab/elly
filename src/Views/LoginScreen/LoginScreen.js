import * as React from 'react';
import { Button } from 'react-native-paper';
import {View, StyleSheet} from 'react-native'
import getRandomColor from '../../components/RandomColorGenerator/RandomColorGenerator'

class LoginScreen extends React.Component{
    
    render() {
        const {navigate} = this.props.navigation;
        console.log(this.props.navigation)
        return (
            <View style={styles.container}>
                <View>
                    <Button style={styles.lFBBtn} icon="facebook" mode="contained" onPress={() => navigate('App', {name: 'Jane'})}>Login with Facebook</Button>
                    <Button style={styles.lGoogleBtn} icon="google" mode="contained" onPress={() => console.log('Pressed')}>Login with Google</Button>
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
    },
    lFBBtn: {
        marginBottom: 5,
        width: 350,
        height: 50,
        justifyContent: 'center'
    },
    lGoogleBtn: {
        marginBottom: 10,
        width: 350,
        height: 50,
        justifyContent: 'center'
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        //backgroundColor: getRandomColor(),
        alignSelf: 'stretch',
        alignItems: 'center',
      }
})
export default LoginScreen;

