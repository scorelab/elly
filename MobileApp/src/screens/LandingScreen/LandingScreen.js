import * as React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import auth from '@react-native-firebase/auth';
import {LOGO} from '../../images/index'
class LandingScreen extends React.Component {
    componentDidMount() {
        const user = auth().currentUser

        if (user !== null) {
            this._interval = setInterval(() => {
                this.props.navigation.navigate('App')
            }, 2000);
        } else {
            this._interval = setInterval(() => {
                this.props.navigation.navigate('SignIn')
            }, 2000);
        }



    }


    componentWillUnmount() {
        clearInterval(this._interval);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={{ width: 80, height: 58 }} source={LOGO} />
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

