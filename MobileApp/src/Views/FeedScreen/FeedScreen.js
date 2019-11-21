import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native'
import { Avatar, Card } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {NavigationEvents} from 'react-navigation';
import ActivityIndicator from '../../components/ActivityIndicator/ActivityIndicator'
import {CardComponent} from '../../components/CardComponent/CardComponent'

class FeedScreen extends React.Component{

    static navigationOptions = ({navigation})=>{
        const {params=[]} = navigation.state
        return {
            headerTitle: 'Home',
            headerStyle: {
              backgroundColor: '#4b8b3b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
            headerLeft: ()=><Avatar.Image style={{marginLeft: 5}} size={40} source={{ uri: params.userPhoto }} />,
        }
    }

    constructor(props){
        super(props)
        this.state={
            observations: [],
            activityIndicator: true
        }
    }

    componentDidMount(){
        this.getUserData()
        database().ref('/users/').on("value", snapshot=>{
            this.getObservations()
        })
    }

    getUserData = async function() {
        const uid = auth().currentUser.uid;
       
        // Create a reference
        const ref = database().ref(`/users/${uid}`);
       
        // Fetch the data snapshot
        const snapshot = await ref.once('value');

        await this.props.navigation.setParams({
            userPhoto: snapshot.val().photo
        })
    }

    getObservations = async function (){
        const ref = database().ref('/users/');
        
        // Fetch the data snapshot
        const snapshot = await ref.once('value');

        const val = snapshot.val()

        let observations = []

        for(let i in val){
            let name = val[i].name
            let photo = val[i].photo
            let userNick = val[i].name.toLowerCase().replace(/ /g, '')
            let obs = val[i].observations
            if(obs!==undefined){
                for(let j in obs){
                    let photUrl = obs[j].photoURL
                    let location = obs[j].location
                    let time = new Date(obs[j].time)
    
                    observations.push([name, photo, photUrl, location, time, userNick])
                }
            }
            
        }
        await this.setState({
            observations: observations,
            activityIndicator: false
        })
    }

    render() {
        
        return (
            
            <View style={styles.container}>
                <View style={{width: "100%", backgroundColor: 'grey'}}>
                {/* <NavigationEvents onDidFocus={() => this.render()} /> */}
                    <ActivityIndicator title={"Loading"} showIndicator={this.state.activityIndicator}/>
                </View>
                <ScrollView style={{width: "100%"}}>
                    {this.state.observations.map((val,i)=>{
                        return (
                            <CardComponent key={i} showPhoto={this.props.navigation} title={val[0]} subtitle={"@"+val[5]} user={val[1]} image={val[2]} content={[['clock' ,val[4].toString()],['map-marker', val[3].toString()] ]}/>
                           
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
    },
    welcome: {
        fontSize: 25
    }
})
export default FeedScreen;

