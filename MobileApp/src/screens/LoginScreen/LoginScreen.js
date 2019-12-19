import * as React from 'react';
import { View, Text, StyleSheet,ScrollView, Image, Dimensions, ImageBackground } from 'react-native'
import { facebookLogin } from '../../components/FaceBookLogin/FaceBookLogin'
import { googleLogin } from '../../components/GoogleLogin/GoogleLogin'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COVER, LOGO} from '../../images/index'

class LoginScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Sign In',
            headerStyle: {
                backgroundColor: '#4b8b3b',
            },
            headerTintColor: '#fff',
        }
    }

    constructor(props) {
        super(props)
    }

    facebookLoginBtnHandler = (navigate) => {
        facebookLogin(navigate)
    }

    GoogleLoginBtnHandler = (navigate) => {
        googleLogin(navigate)
    }

    emailLoginBtnHandler = ()=>{
        this.props.navigation.navigate('Email')
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={COVER}
                    style={styles.imgConatiner}
                >
                    <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.scrollView}>
                        <View style={styles.logoBtnCntner}>
                            <View style={styles.logoIconContainer}>
                                <View style={styles.logoImgContainer}>
                                    <Image source={LOGO} style={styles.logo} />
                                </View>
                                <Text style={styles.logoText}>Elly</Text>
                            </View>
                            <View style={styles.btnContainer}>
                                <Icon.Button
                                    style={styles.btn}
                                    name="facebook-box"
                                    backgroundColor="#3b5998"
                                    onPress={() => this.facebookLoginBtnHandler(navigate)}
                                    loading={true}
                                    size={45}
                                >
                                    SignIn with Facebook
                                </Icon.Button>
                            </View>
                            <View style={styles.btnContainer}>
                                <Icon.Button
                                    style={styles.btn}
                                    name="google-plus-box"
                                    backgroundColor="#DD4B39"
                                    onPress={() => this.GoogleLoginBtnHandler(navigate)}
                                    size={45}
                                >
                                    SignIn with Google
                                </Icon.Button>
                            </View>
                            <View style={styles.btnContainer}>
                                <Icon.Button
                                    style={styles.btn}
                                    name="email-box"
                                    backgroundColor="grey"
                                    onPress={() => this.emailLoginBtnHandler()}
                                    size={45}
                                >
                                    SignIn with Email
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
        padding: 0,
        marginBottom: 4,
        borderRadius: 10,
    },
    btn: {
        width: Dimensions.get('window').width - 80,
        height: 60,
        
    },
    logoIconContainer: {
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 25
    },
    logo: {
        width: 60,
        height: 60,
        resizeMode: 'stretch'
    },
    logoText: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
    },
    imgConatiner: {
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height,
    },
    logoBtnCntner: {
        flex: 1,
        borderRadius: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: Dimensions.get('window').width - 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    scrollView: {
        marginTop: 60,
        marginBottom: 60,
        flex:1,
        height: Dimensions.get('window').height
    },
    logoImgContainer: {
        padding: 20, 
        backgroundColor: 'black', 
        borderRadius: 100
    }
})
export default LoginScreen;