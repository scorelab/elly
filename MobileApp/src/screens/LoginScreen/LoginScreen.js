import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {facebookLogin} from '../../components/FaceBookLogin/FaceBookLogin';
import {googleLogin} from '../../components/GoogleLogin/GoogleLogin';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COVER, TREES, LOGO} from '../../images/index';

class LoginScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Sign In',
      headerStyle: {
        backgroundColor: '#004c21',
      },
      headerTintColor: '#fff',
    };
  };

  constructor(props) {
    super(props);
  }

  facebookLoginBtnHandler = navigate => {
    facebookLogin(navigate);
  };

  GoogleLoginBtnHandler = navigate => {
    googleLogin(navigate);
  };

  emailLoginBtnHandler = () => {
    this.props.navigation.navigate('Email');
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <ImageBackground source={COVER} style={styles.backgroundImage}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            style={styles.scrollView}>
            <View style={styles.logoBtnCntner}>
              <View style={styles.logoIconContainer}>
                <View style={styles.logoImgContainer}>
                  <Image source={LOGO} style={styles.logo} />
                </View>
                <Text style={styles.logoText}>Ele Watch</Text>
              </View>

              <View style={styles.btnContainer}>
                <Text style={styles.introText}>
                  Hello there! Please sign in.
                </Text>
                <Icon.Button
                  style={styles.btn}
                  name="facebook-box"
                  backgroundColor="#3b5998"
                  onPress={() => this.facebookLoginBtnHandler(navigate)}
                  loading={true}
                  size={30}>
                  Sign In with Facebook
                </Icon.Button>
              </View>
              <View style={styles.btnContainer}>
                <Icon.Button
                  style={styles.btn}
                  name="google-plus-box"
                  backgroundColor="#DD4B39"
                  onPress={() => this.GoogleLoginBtnHandler(navigate)}
                  size={30}>
                  Sign In with Google
                </Icon.Button>
              </View>
              <View style={styles.btnContainer}>
                <Icon.Button
                  style={styles.btn}
                  name="email-box"
                  backgroundColor="#2ecc71"
                  onPress={() => this.emailLoginBtnHandler()}
                  size={30}>
                  Sign Up Using Email
                </Icon.Button>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 0,
    marginBottom: 4,
    borderRadius: 4,
  },
  btn: {
    width: Dimensions.get('window').width - 150,
    height: 45,
    justifyContent: 'flex-start',
    fontWeight: 'bold',
  },
  logoIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'stretch',
  },
  logoText: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 10,
  },
  imgConatiner: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
  },
  backgroundImage: {},
  introText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'left',
  },
  logoBtnCntner: {
    flex: 1,
    width: Dimensions.get('window').width - 40,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 20,
  },
  scrollView: {
    marginTop: 60,
    marginBottom: 60,
    flex: 1,
    height: Dimensions.get('window').height,
  },
  logoImgContainer: {
    borderRadius: 100,
    // backgroundColor: 'white'
  },
});
export default LoginScreen;
