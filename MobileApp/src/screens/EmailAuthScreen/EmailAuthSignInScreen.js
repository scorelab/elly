import * as React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground, Alert } from 'react-native'
import {TextInput,HelperText, Button} from 'react-native-paper'
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
        }
    }

    checkSignInValidity(){
        if(this.state.password.match(this.state.passwordPattern) &&
            this.state.email.match(this.state.emailPattern)
        ){
            return true
        }
        return false
       
    }

    signInBtnHandler = async () => {
        this.setState({signIn: true, activityIndicator: true})
        try{
            
            if(this.checkSignInValidity()){
                await auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => { console.log("error0") })
                .catch((err) => {
                    console.log(err.message.split(" ").splice(1,err.message.length).toString())
                    alert(err.message.split(" ").splice(1,err.message.length).join(" "))
                })
            }else{
                alert("Re-check the input fields!")
            }
            this.setState({activityIndicator: false})
        }catch(err){
            console.log(err)
            this.setState({activityIndicator: false})
            alert(err.message)
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
                        style={{marginTop: 80,marginBottom: 80,flex:1,height: Dimensions.get('window').height}}
                        showsVerticalScrollIndicator={false}
                    >
                    <View style={styles.logoBtnCntner}>
                        <View style={styles.logoIconContainer}>
                            <Image source={LOGO} style={styles.logo} />
                            <Text style={styles.logoText}>SignIn</Text>
                        </View>

                        <View style={styles.btnContainer}>
                            <TextInput
                                value={this.state.email}
                                onChangeText={text => this.setState({ email: text })}
                                placeholder={'Eg. abc@gmail.com'}
                                mode='flat'
                                style={{borderRadius: 0}}
                                inlineImageLeft={'email'}
                                inlineImagePadding={20}
                                autoCompleteType={'email'}
                            />
                            <HelperText
                                type="error"
                                visible={!this.state.email.match(this.state.emailPattern)}
                            >
                                Email is invalid!
                            </HelperText>
                        </View>

                        <View style={styles.btnContainer}>
                            <TextInput
                                value={this.state.password}
                                onChangeText={text => this.setState({ password: text })}
                                placeholder={'Password'}
                                mode='flat'
                                inlineImageLeft={'lock'}
                                secureTextEntry={true}
                                inlineImagePadding={20}
                                style={{borderRadius: 0}}
                                autoCompleteType={'password'}
                            />
                            <HelperText
                                type="error"
                                visible={!this.state.password.match(this.state.passwordPattern)}
                            >
                                Password is invalid
                            </HelperText>
                        </View>

                        <View style={[styles.btnContainer, {backgroundColor: 'none'}]}>
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
        padding: 3,
        marginBottom: 3,
        borderRadius: 10,
        justifyContent: 'center',
    },
    btn: {
        width: "100%",
        height: 60,
        justifyContent:'center'
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
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 20,
        width: Dimensions.get('window').width - 40,
    }
})

