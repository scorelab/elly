import * as React from 'react';
import { View, Text, StyleSheet,ScrollView, Image, Dimensions, ImageBackground } from 'react-native'
import { facebookLogin } from '../../components/FaceBookLogin/FaceBookLogin'
import { googleLogin } from '../../components/GoogleLogin/GoogleLogin'
import Icon from 'react-native-vector-icons/FontAwesome';
import {COVER, LOGO} from '../../images/index'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
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

    componentDidMount(){
        auth().onAuthStateChanged(async user => {
            if (user) {
                console.log(user)
                const uid = user.uid
                let username = user.displayName
                let photo = user.photoURL!==null?user.photoURL:''
                const email = user.email
                const ref = database().ref('/users/').child(uid);
                
                await ref.set({
                    name: username,
                    email: email,
                    photo: photo,
                    profile: 'user'
                });
                await this.setState({activityIndicator: false})
                await this.props.navigation.navigate('App')
               
            }
            
        })
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
                    <ScrollView contentContainerStyle={{flexGrow: 1}} style={{marginTop: 80,marginBottom: 80,flex:1,height: Dimensions.get('window').height}}>
                    <View style={styles.logoBtnCntner}>
                        <View style={styles.logoIconContainer}>
                            <Image source={LOGO} style={styles.logo} />
                            <Text style={styles.logoText}>Elly</Text>
                        </View>
                        <View style={styles.btnContainer}>
                            <Icon.Button
                                style={styles.btn}
                                name="facebook"
                                backgroundColor="#3b5998"
                                onPress={() => this.facebookLoginBtnHandler(navigate)}
                            >
                                SignUp with Facebook
                            </Icon.Button>
                        </View>
                        <View style={styles.btnContainer}>
                            <Icon.Button
                                style={styles.btn}
                                name="google"
                                backgroundColor="#DD4B39"
                                onPress={() => this.GoogleLoginBtnHandler(navigate)}
                            >
                                SignUp with Google
                            </Icon.Button>
                        </View>
                        <View style={styles.btnContainer}>
                            <Icon.Button
                                style={styles.btn}
                                name="envelope"
                                backgroundColor="grey"
                                onPress={() => this.emailLoginBtnHandler()}
                            >
                                SignUp with Email
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
        padding: 3,
        marginBottom: 3,
        borderRadius: 10
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
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'stretch',
        alignItems: 'center',
        marginBottom: 20
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
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        width: Dimensions.get('window').width - 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    }
})
export default LoginScreen;