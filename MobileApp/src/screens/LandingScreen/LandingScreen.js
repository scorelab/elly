import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {LOGO} from '../../images/index';
import SplashScreen from 'react-native-splash-screen';

class LandingScreen extends React.Component {
  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('App');
      } else {
        this.props.navigation.navigate('SignIn');
      }
    });
    SplashScreen.hide();
    this.checkPermission();
  }

  checkPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('CAMERA');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.img} source={LOGO} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#004c21',
    width: Dimensions.get('window').width,
  },
  img: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
  },
});
export default LandingScreen;
