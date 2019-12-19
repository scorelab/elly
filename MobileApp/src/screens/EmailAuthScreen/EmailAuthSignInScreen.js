import * as React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native'
import {TextInput,Snackbar, Button} from 'react-native-paper'
import {COVER, LOGO} from '../../images/index'
import auth from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';
import ActivityIndicator from '../../components/ActivityIndicator/ActivityIndicator'


export default class EmailAuthScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Sign In',
            headerStyle: {
                backgroundColor: '#0b6623',
            },
            headerTintColor: '#fff',
        }
    }

    constructor(props) {
        super(props)
        this.state={
            password: '',
            email: '',
            emailPattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@_#\$%\^&\*])(?=.{8,})/,
            activityIndicator: false,
            passwordErrMessage: 'Password is invalid',
            passwordErr: false,
            emailErrMessage: 'Email is invalid',
            emailErr: false,
        }
    }

    checkSignInValidity(){
        let valid = true
        if(!this.state.password.match(this.state.passwordPattern)){
            this.setState({
                passwordErr: true
            })
            valid = false
        }
        if(!this.state.email.match(this.state.emailPattern)){
            this.setState({
                emailErr: true
            })
            valid = false
        }
        if(!valid){
            return false
        }else{
            return true
        }
       
    }

    signInBtnHandler = async () => {
        this.setState({activityIndicator: true})
        if(this.checkSignInValidity()){
            await auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => { 
                // console.log(JSON.stringify(user.user.toJSON().uid))
                this.setState({activityIndicator: false})
            })  
            .catch((err) => {
                console.log(err.message)
                this.setState({activityIndicator: false})
                alert("SignUp Failed")
                
        })
        }else{
            this.setState({activityIndicator: false})
            alert("Re-check the input fields!")
        }
        
    }

    textInputCallback = (child) => {

    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator title={"Processing"} showIndicator={this.state.activityIndicator} />
                <ImageBackground
                    source={COVER}
                    style={styles.imgConatiner}
                >
                    <ScrollView 
                        contentContainerStyle={{flexGrow: 1}} 
                        style={{marginTop: 60,marginBottom: 60,flex:1,height: Dimensions.get('window').height}}
                        showsVerticalScrollIndicator={false}
                    >
                    <View style={styles.logoBtnCntner}>
                        <View style={styles.logoIconContainer}>
                            <View style={{padding: 20, backgroundColor: 'black', borderRadius: 100}}>
                                <Image source={LOGO} style={styles.logo} />
                            </View>
                            <Text style={styles.logoText}>SIGN IN</Text>
                        </View>

                        <View style={styles.btnContainer}>
                            <TextInput
                                value={this.state.email}
                                onChangeText={text => this.setState({ email: text })}
                                placeholder={'Eg. abc@gmail.com'}
                                mode='outlined'
                                style={{borderRadius: 0}}
                                inlineImageLeft={'email'}
                                inlineImagePadding={20}
                                autoCompleteType={'email'}
                            />
                            <Snackbar
                                visible={this.state.emailErr}
                                onDismiss={() => console.log("On dismiss")}
                                style={styles.snackbar}
                                action={{
                                    label: 'OK',
                                    onPress: () => {
                                        this.setState({ emailErr: false })
                                    },
                                    color: 'white'
                                  }}
                                >
                                {this.state.emailErrMessage}
                            </Snackbar>
                        </View>

                        <View style={styles.btnContainer}>
                            <TextInput
                                value={this.state.password}
                                onChangeText={text => this.setState({ password: text })}
                                placeholder={'Password'}
                                mode='outlined'
                                inlineImageLeft={'lock'}
                                secureTextEntry={true}
                                inlineImagePadding={20}
                                style={{borderRadius: 0}}
                                autoCompleteType={'password'}
                            />
                            <Snackbar
                                visible={this.state.passwordErr}
                                onDismiss={() => console.log("On dismiss")}
                                style={styles.snackbar}
                                action={{
                                    label: 'OK',
                                    onPress: () => {
                                        this.setState({ passwordErr: false })
                                    },
                                    color: 'white'
                                  }}
                                >
                                {this.state.passwordErrMessage}
                            </Snackbar>
                        </View>

                        <View style={[styles.btnContainer, {backgroundColor: 'none', marginTop: 20, marginBottom: 4}]}>
                            <Button
                                style={styles.btn}
                                onPress={()=>this.signInBtnHandler()}
                                mode='contained'
                            >
                                SignIn
                            </Button>
                        </View>
                        <View style={[styles.btnContainer, {backgroundColor: 'none'}]}>
                            <Button
                                style={[styles.btn,{backgroundColor: 'white', color: 'green'}]}
                                onPress={()=>this.props.navigation.navigate('EmailSignUp')}
                                mode='outlined'
                            >
                                SignUp
                            </Button>
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
        width: Dimensions.get('window').width
    },
    btnContainer: {
        borderRadius: 10,
        justifyContent: 'center',
    },
    btn: {
        width: "100%",
        height: 60,
        justifyContent:'center',
        borderRadius: 50,
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
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'ProximaNova-Regular'
    },
    imgConatiner: {
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
    },
    logoBtnCntner: {
        flex:1,
        height: "100%",
        borderRadius: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        width: Dimensions.get('window').width - 40,
    },
    snackbar: {
        backgroundColor: 'red',
        marginBottom: -30
    }
})

