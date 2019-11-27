import * as React from 'react';
import {View,Text, StyleSheet, ScrollView,RefreshControl, TouchableOpacity} from 'react-native'
import { Avatar, Menu} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import ActivityIndicator from '../../components/ActivityIndicator/ActivityIndicator'
import {CardComponent} from '../../components/CardComponent/CardComponent'
import {generateResult} from '../../components/UserDataHandling/UserDataHandling'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {googleMapAPIKey} from '../../config/config'
// database().setPersistenceEnabled(true);
// database().setPersistenceCacheSizeBytes(2000000); // 2MB
const ref = database().ref('/users/').orderByKey();
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
            headerRight: ()=><Menu
                                visible={params.menuVisible}
                                onDismiss={()=>params.closeMenu()}
                                anchor={
                                    <TouchableOpacity
                                        onPress={()=>params.openMenu()}
                                    >
                                        <Icon color='white' style={{marginRight: 5}} name='dots-vertical' size={24}/>
                                    </TouchableOpacity>
                                }
                            >
                                <Menu.Item onPress={() => params.onPressMenu()} title="About" />
                            </Menu>,
            headerLeft: ()=><TouchableOpacity
                                onPress={()=>navigation.navigate("Profile")}
                            >
                                <Avatar.Image 
                                    style={{marginLeft: 5, marginRight: 0, padding: 0}} 
                                    size={35} source={{ uri: params.userPhoto }} 
                                />
                            </TouchableOpacity>,
        }
    }
    
    constructor(props){
        super(props)
        this.state={
            observations: [],
            activityIndicator: true,
            refreshing: false,
        }
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.getObservations().then(() => {
          this.setState({refreshing: false});
        });
      }

    componentDidMount(){
        this.getUserData()
        // database().ref('/users/').on("value", snapshot=>{
        //     this.getObservations()
        // })
        this.getObservations()
        this.props.navigation.setParams({
            closeMenu: ()=>this._closeMenu(),
            openMenu: ()=>this._openMenu(),
            onPressMenu: ()=>{
                this.props.navigation.navigate("AboutScreen")
                this._closeMenu()
            },
            menuVisible: this.state.aboutMenu
        })
    }

    _openMenu = () => this.props.navigation.setParams({menuVisible: true})

    _closeMenu = () => this.props.navigation.setParams({menuVisible: false})

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
                    console.log(obs[j].verified)
                    if(!obs[j].verified){continue}
                    let photUrl = obs[j].photoURL
                    let location = obs[j].location
                    let time = new Date(obs[j].time)
                    time = time.toString().split(" ")
                    time = time.splice(0,time.length-1)
                    time = time.toString().replace(/,/g, ' ')
                    let result = generateResult(obs[j])
                    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + location[1] + ',' + location[0] + '&key=' + googleMapAPIKey)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson.results[0].formatted_address));
                        let address = responseJson.results.length>0?responseJson.results[0].formatted_address.split(","):"Unnamed location"
                        observations.push([name, photo, photUrl, location, time, userNick, result, address])
                        this.setState({
                            observations: observations,
                        })
                    })
                }
                
            }
            this.setState({
                activityIndicator: false
            })
            
        }
        
    }

    render() {
        
        return (
            
            <View style={styles.container}>
                {this.state.activityIndicator?
                    <View style={{width: "100%", backgroundColor: 'grey'}}>
                        <ActivityIndicator title={"Please wait..."} showIndicator={this.state.activityIndicator}/>
                    </View>
                :
                    <View>
                        
                        <View>
                            <ScrollView 
                                style={{width: "100%"}}
                                refreshControl={<RefreshControl
                                                    refreshing={this.state.refreshing}
                                                    onRefresh={this._onRefresh.bind(this)}
                                                    colors={['#4b8b3b']}
                                                    title={'Fetching...'}
                                                />}
                            >
                            {this.state.observations.length>0?
                                this.state.observations.map((val,i)=>{
                                    return (
                                        <CardComponent isNavigate={true} key={i} result={val[6]} showPhoto={this.props.navigation} title={val[7]} subtitle={val[5]} user={val[1]} image={val[2]} content={[['calendar-clock' ,"On "+val[4].toString()],['map-marker', val[3].toString()] ]}/>
                                    
                                    )
                                })
                            :
                                <View></View>
                            }
                            </ScrollView>
                        </View>
                        
                    </View>
                }
                
                
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

