import * as React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native'
import {List, Avatar} from 'react-native-paper'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
class ProfileScreen extends React.Component{

    static navigationOptions = ({navigation})=>{
        return {
            headerTitle: 'Profile',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
        }
    }

    constructor(props){
        super(props)
        this.state={
            userName: '',
            userPhoto: '',
            userNick: ''
        }
    }

    componentDidMount(){
        this.getUserData()
    }

    getUserData = async function () {
        // Get the users ID
        const uid = auth().currentUser.uid;
       
        // Create a reference
        const ref = database().ref(`/users/${uid}`);
       
        // Fetch the data snapshot
        const snapshot = await ref.once('value');
       
        console.log(snapshot.val().name);
        await this.setState({
            userName: snapshot.val().name,
            userPhoto: snapshot.val().photo,
            userNick: snapshot.val().name.toLowerCase()
        })
      }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profileConatiner}>
                    <Text style={styles.userNick}>{this.state.userNick}</Text>
                    <Image style={styles.userPhoto} source={{uri: this.state.userPhoto}}></Image>
                    <Text style={styles.userName}>{this.state.userName}</Text>
                </View>
                <View style={styles.observationConatiner}>
                    <Text>Observations</Text>
                    <List.Item
                        title="First Item"
                        description="Item description"
                        left={props => <Avatar.Icon {...props} icon="folder" />}
                    />
                </View>
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
        width: '100%'
        //backgroundColor: getRandomColor(),
    },
    profileConatiner:{
        backgroundColor: 'grey',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    observationConatiner:{
        width: '100%',
    },
    userNick: {

    },
    userName: {

    },
    userPhoto: {
        width: 100, 
        height: 100,
        borderRadius: 100
    },
    welcome: {
        fontSize: 25
    }
})
export default ProfileScreen;

