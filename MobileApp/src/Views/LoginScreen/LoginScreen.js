import * as React from 'react';
import {View, StyleSheet, Dimensions, ImageBackground} from 'react-native'
import {facebookLogin} from '../../components/FaceBookLogin/FaceBookLogin'
import {googleLogin} from '../../components/GoogleLogin/GoogleLogin'
import Icon from 'react-native-vector-icons/FontAwesome';

class LoginScreen extends React.Component{
    
    static navigationOptions = ({navigation})=>{
        return {
            headerTitle: 'Sign In',
            headerStyle: {
              backgroundColor: '#4b8b3b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
        }
    }

    facebookLoginBtnHandler = (navigate) =>{
        facebookLogin(navigate)
    }

    GoogleLoginBtnHandler = (navigate) => {
        googleLogin(navigate)        
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={{uri: 'https://i.pinimg.com/originals/bf/61/c0/bf61c043f06d0f7e8e1a545cb84dbd93.jpg'}}
                    style={styles.imgConatiner}
                >
                    <View style={styles.bottom}>
                        <View style={styles.btnContainer}>
                            <Icon.Button
                                style={styles.btn}
                                name="facebook"
                                backgroundColor="#4b8b3b"
                                onPress={() => this.facebookLoginBtnHandler(navigate)}
                            >
                                Login with Facebook
                            </Icon.Button>
                        </View>
                        <View>
                            <Icon.Button
                                style={styles.btn}
                                name="google"
                                backgroundColor="#4b8b3b"
                                onPress={() => this.GoogleLoginBtnHandler(navigate)}
                            >
                                Login with Google
                            </Icon.Button>
                        </View>
                    </View>

                </ImageBackground>
                
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
    btnContainer: {
        margin: 5
    },
    btn: {
        width: Dimensions.get('window').width-80,
        height: 50
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'stretch',
        alignItems: 'center',
        marginBottom: 50
      },
    imgConatiner:{
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height,
    },
})
export default LoginScreen;

