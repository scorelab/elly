import * as React from 'react';
import {View, StyleSheet, Text, Image, ScrollView} from 'react-native'
import {List, Avatar, Divider} from 'react-native-paper'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
class ProfileScreen extends React.Component{

    static navigationOptions = ({navigation})=>{
        return {
            headerTitle: 'Profile',
            headerStyle: {
              backgroundColor: '#4b8b3b',
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
            userNick: '',
            userObservations: []
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

        let obs = snapshot.val().observations
        let observations = []
        for(let i in obs){
            let photUrl = obs[i].photoURL
            let location = obs[i].location
            let time = obs[i].time
            let isSingle = obs[i].isSingle===0?
            "Single Elephant":obs[i].isSingle===1?
            "Group of Elephant with Calves":obs[i].isSingle===2?
            "Group of Elephant with out Calves":""
            observations.push([photUrl, location, time, isSingle])
        }

        await this.setState({
            userName: snapshot.val().name,
            userPhoto: snapshot.val().photo,
            userNick: snapshot.val().name.toLowerCase().replace(/ /g, ''),
            userObservations: observations
        })
      }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profileConatiner}>
                    <Text style={styles.userNick}>{this.state.userNick}</Text>
                    <Image style={styles.userPhoto} source={{uri: this.state.userPhoto}}></Image>
                    <Text style={styles.userName}>{this.state.userName}</Text>
                    <Text>Observations</Text>
                    <Text>2</Text>
                </View>
                <ScrollView style={styles.observationConatiner}>
                    {this.state.userObservations.map((val,i)=>{
                        return (
                            <View style={{margin: 10}}>
                                <List.Item
                                    key={i}
                                    title={val[3]}
                                    description={val[1][0]+", "+val[1][1]}
                                    left={props => <Avatar.Image size={50} source={{ uri: val[0] }} />}
                                />
                                <Divider/>
                            </View>
                        )
                        
                    })}
                    
                </ScrollView>
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
        padding: 10,
    },
    observationConatiner:{
        width: '100%',
    },
    userNick: {
        fontWeight: 'bold'
    },
    userName: {
        fontWeight: 'bold'
    },
    userPhoto: {
        width: 100, 
        height: 100,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'white'
    },
    welcome: {
        fontSize: 25
    }
})
export default ProfileScreen;

