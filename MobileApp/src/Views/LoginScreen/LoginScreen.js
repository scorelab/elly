import * as React from 'react';
import {View,Text, StyleSheet,Image, Dimensions, ImageBackground} from 'react-native'
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
                    source={require('../../Assets/cover.jpg')}
                    style={styles.imgConatiner}
                >
                    <View style={{height: 400, borderRadius: 50,backgroundColor: 'rgba(0, 0, 0, 0.3)', padding: 20, width: Dimensions.get('window').width-40}}>
                        <View style={styles.logoIconContainer}>
                            {/* <Image source={require('../../Assets/landing2W.png')} style={styles.logo}/> */}
                            <Text style={styles.logoText}>Elly</Text>
                        </View>
                        <View style={{flexDirection: 'row-reverse', width: Dimensions.get('window').width-80, marginBottom: 15}}>
                            <Icon style={{flexDirection: 'row'}} color='white' name='question-circle-o' size={24}/>
                        </View>
                        
                        <View style={styles.btnContainer}>
                            <Icon.Button
                                style={styles.btn}
                                name="facebook"
                                backgroundColor="#3b5998"
                                onPress={() => this.facebookLoginBtnHandler(navigate)}
                            >
                                Login with Facebook
                            </Icon.Button>
                        </View>
                        <View style={styles.btnContainer}>
                            <Icon.Button
                                style={styles.btn}
                                name="google"
                                backgroundColor="#DD4B39"
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'stretch',
        width: Dimensions.get('window').width
    },
    btnContainer: {
        marginBottom: 8,
    },
    btn: {
        width: Dimensions.get('window').width-80,
        height: 60,
    },
    logoIconContainer: {
        justifyContent: 'center', 
        alignItems: "center",
        marginBottom: 25
    },
    logo: {
        width: 70,
        height: 50
    },
    logoText: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'stretch',
        alignItems: 'center',
        marginBottom: 20
      },
    imgConatiner:{
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height,
    },
})
export default LoginScreen;

