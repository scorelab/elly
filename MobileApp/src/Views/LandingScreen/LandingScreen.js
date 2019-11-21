import * as React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class LandingScreen extends React.Component{
    componentDidMount() {
        
        if(this.getUserData()){
            this._interval = setInterval(() => {
                this.props.navigation.navigate('SignIn')
            }, 2000);
        }else{
            this._interval = setInterval(() => {
                this.props.navigation.navigate('SignIn')
            }, 2000);
        }
        
      }

    getUserData = async function () {
        const uid = auth().currentUser.uid;
       
        // Create a reference
        const ref = database().ref(`/users/${uid}`);
       
        // Fetch the data snapshot
        const snapshot = await ref.once('value');

        let obs = snapshot.val()
        if(obs.name!==undefined){
            return true
        }
        return false
    }
      
      componentWillUnmount() {
        clearInterval(this._interval);
      }

    render() {
        return (
            <View style={styles.container}>
                <Image style={{width: 80, height: 58}} source={require('../../Assets/landing2.png')}/>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4b8b3b',
        width: Dimensions.get('window').width
    },
    welcome: {
        fontSize: 25
    }
})
export default LandingScreen;

