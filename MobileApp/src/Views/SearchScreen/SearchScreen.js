import * as React from 'react';
import {View, StyleSheet,ScrollView,RefreshControl, TouchableOpacity, Text,Image, Dimensions} from 'react-native'
import { Searchbar, Chip } from 'react-native-paper';
import database from '@react-native-firebase/database';
import {generateResult} from '../../components/UserDataHandling/UserDataHandling'
import ActivityIndicator from '../../components/ActivityIndicator/ActivityIndicator'

class SearchScreen extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            firstQuery: '',
            observations: []
        }
    }

    static navigationOptions = ({navigation})=>{
        const {params = {}} = navigation.state;
        return {
            
            headerStyle: {
              backgroundColor: '#4b8b3b',
            },
            headerTintColor: '#fff',
            headerRight: ()=><Searchbar
                placeholder="Search"
                style={{width: Dimensions.get('window').width-10, margin: 5}}
                onChangeText={(query) => params.handleText(query)}
                value={params.query}
            />,
            
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            handleText: (text)=>this.onTextChangeHandler(text),
            query: this.state.firstQuery
        });
        // database().ref('/users/').on("value", snapshot=>{
        //     this.getObservations('all')
        // })
        this.getObservations('all')
    }

    onTextChangeHandler=(text)=>{
        this.setState({
            firstQuery: text
        })  
        this.getObservations(text.toLowerCase())
        this.props.navigation.setParams({
            query: text
        });
    }

    getObservations = async function (type){
        await this.setState({
            activityIndicator: true
        })
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
                    if(!obs[j].verified){continue}
                    let photUrl = obs[j].photoURL
                    let location = obs[j].location
                    let time = new Date(obs[j].time)
                    time = time.toString().split(" ")
                    time = time.splice(0,time.length-1)
                    time = time.toString().replace(/,/g, ' ')
                    let result = generateResult(obs[j])

                    type.split(" ").map((keywd)=>{
                        let found = result.map((val)=>{
                            //console.log(val[1].toLowerCase(), type, val[1].toLowerCase().includes(type))
                            return val[1].toLowerCase().includes(keywd)
                        })
                        if(found.includes(true)){  

                            observations.push([name, photo, photUrl, location, time, userNick, result])
                        }else if(type==='all'){
                            observations.push([name, photo, photUrl, location, time, userNick, result])
                        }
                        })
                    this.setState({
                        observations: observations,
                    })
                }
            }
        }

        this.setState({
            activityIndicator: false
        })
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.getObservations('all').then(() => {
          this.setState({refreshing: false});
        });
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
                        <View style={styles.chipContainer}>
                        <Chip style={styles.chip} icon="information" onPress={() => this.getObservations('all')}>All</Chip>
                        <Chip style={styles.chip} icon="information" onPress={() => this.getObservations('male')}>Male</Chip>
                        <Chip style={styles.chip} icon="information" onPress={() => this.getObservations('female')}>Female</Chip>
                        <Chip style={styles.chip} icon="information" onPress={() => this.getObservations('tuskers')}>Tuskers</Chip>
                        <Chip style={styles.chip} icon="information" onPress={() => this.getObservations('dead')}>Dead</Chip>
                        <Chip style={styles.chip} icon="information" onPress={() => this.getObservations('group')}>Groups</Chip>
                        <Chip style={styles.chip} icon="information" onPress={() => this.getObservations('single')}>Single</Chip>
                        
                    </View>
                    <ScrollView 
                        style={styles.scrollView}
                        refreshControl={<RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            colors={['#4b8b3b']}
                            title={'Fetching...'}
                        />}
                    >
                        <View style={styles.imgConatiner}>
                            {this.state.observations.length>0?
                                this.state.observations.map((val,i)=>{
                                    return(
                                        <TouchableOpacity 
                                            key={i}
                                            onPress={()=>this.props.navigation.navigate('showDetailedPhoto',
                                                {
                                                    img: val[2],
                                                    title: val[0],
                                                    subtitle:val[5],
                                                    user: val[1],
                                                    content: val[6],
                                                    showPhoto: this.props.navigation
                                                }
                                                )}
                                        >
                                            <Image style={styles.img} source={{uri: val[2]}}/>
                                        </TouchableOpacity>
                                    )
                                
                                })
                                :
                                <Text style={{fontSize: 20, color: 'grey'}}>Sorry! We couldn't find anything</Text>
                            }
                        </View>
                    </ScrollView>
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
        marginTop: 10,
        width: Dimensions.get('window').width
    },
    chipContainer: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chip: {
        margin: 2
    },
    img: {
        width: Dimensions.get('window').width/3.2, 
        height: Dimensions.get('window').width/3.5,
        borderWidth: 2, 
        margin: 2
    },
    imgConatiner: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: Dimensions.get('window').width
    },
    scrollView: {
        width: Dimensions.get('window').width
    },
    welcome: {
        fontSize: 25
    }
})
export default SearchScreen;

