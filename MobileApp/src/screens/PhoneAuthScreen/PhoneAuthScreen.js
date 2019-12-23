import * as React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground, Alert } from 'react-native'
import {TextInput,HelperText, Button} from 'react-native-paper'
import {COVER, LOGO} from '../../images/index'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class PhoneAuthScreen extends React.Component {

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
            phone: '',
            nextClicked:false,
            confirm: '',
            phonePattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
            usernamePattern:/^[a-zA-Z]+ [a-zA-Z]+$/,
            username: ''
        }
    }

    

    nextBtnHandler = async () => {
        await auth().signInWithPhoneNumber(this.state.phone).then((err)=>{
            console.log(err)
        });
        await this.setState({nextClicked: true})
    }

    confirmBtnHandler = async () => {
        try {
            await confirmation.confirm(this.state.confirm); // User entered code
           
            // Successful login - onAuthStateChanged is triggered
          } catch (e) {
            console.error(e); // Invalid code
            Alert.alert(
                "Login Failed",
                'Invalid confirmation code',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') },],
                { cancelable: false },
              );
          }
    }

    componentDidMount(){
        auth().onAuthStateChanged(async user => {
            if (user) {
                const uid = user.uid;
                const ref = database().ref('/users/').child(uid);
                
                const name = this.state.username
                const email = user.email!==null?user.email:''
                const photo = user.photoURL!==null?user.photoURL:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                const phone = user.phoneNumber!==null?user.phoneNumber:''

                await ref.set({
                    name: name,
                    email: email,
                    photo: photo,
                    phone: phone,
                    profile: 'user'
                });

                this.props.navigation.navigate('App')
            }
            
        })
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={COVER}
                    style={styles.imgConatiner}
                >
                    <View style={styles.logoBtnCntner}>
                        <View style={styles.logoIconContainer}>
                            {/* <Image source={LOGO} style={styles.logo} /> */}
                            <Text style={styles.logoText}>Elly</Text>
                        </View>
                        {!this.state.nextClicked?
                            <View>
                                <View style={styles.btnContainer}>
                                    <TextInput
                                        label={'Username'}
                                        value={this.state.username}
                                        onChangeText={text => this.setState({ username: text })}
                                        placeholder={'Eg. Nimal Perera'}
                                        mode='flat'
                                        style={{borderRadius: 0}}
                                    />
                                    <HelperText
                                        type="error"
                                        visible={!this.state.username.match(this.state.usernamePattern)}
                                    >
                                        Username is invalid!
                                    </HelperText>
                                </View>
                                <View style={styles.btnContainer}>
                                    <TextInput
                                        label={'Mobile Phone Number'}
                                        value={this.state.phone}
                                        onChangeText={text => this.setState({ phone: text })}
                                        placeholder={'Eg. +94123456789'}
                                        mode='flat'
                                        style={{borderRadius: 0}}
                                    />
                                    <HelperText
                                        type="error"
                                        visible={!this.state.phone.match(this.state.phonePattern)}
                                    >
                                        Mobile number is invalid!
                                    </HelperText>
                                </View>
                                <View style={[styles.btnContainer, {backgroundColor: 'none'}]}>
                                    <Button
                                        style={styles.btn}
                                        backgroundColor="#6a0dad"
                                        onPress={()=>this.nextBtnHandler()}
                                        mode='contained'
                                    >
                                        Next
                                    </Button>
                                </View>
                            </View>
                        :
                            <View>
                                <View style={styles.btnContainer}>
                                    <TextInput
                                        value={this.state.confirm}
                                        onChangeText={text => this.setState({ confirm: text })}
                                        placeholder={'Enter the confirmation code'}
                                        mode='outlined'
                                    />
                                </View>
                                <View style={[styles.btnContainer, {backgroundColor: 'none'}]}>
                                    <Button
                                        style={styles.btn}
                                        backgroundColor="#6a0dad"
                                        onPress={() => this.confirmBtnHandler()}
                                        mode='contained'
                                    >
                                        Confirm
                                    </Button>
                                </View>
                            </View>

                        }
                        
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
        padding: 3,
        marginBottom: 3,
        backgroundColor: 'white',
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
        height: 400,
        borderRadius: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 20,
        width: Dimensions.get('window').width - 40
    }
})
export default PhoneAuthScreen;

