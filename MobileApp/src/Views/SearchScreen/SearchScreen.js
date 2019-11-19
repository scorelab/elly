import * as React from 'react';
import {View, StyleSheet,ScrollView, Text,Image, Dimensions} from 'react-native'
import { Searchbar, Chip } from 'react-native-paper';
import database from '@react-native-firebase/database';
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
        database().ref('/users/').on("value", snapshot=>{
            this.getObservations('all')
        })
    }

    onTextChangeHandler=(text)=>{
        this.setState({
            firstQuery: text
        })  
        this.getObservations(text.toLowerCase()===''?'all':text.toLowerCase())
        this.props.navigation.setParams({
            query: text
        });
    }

    getObservations = async function (type){
        const ref = database().ref('/users/');
        
        // Fetch the data snapshot
        const snapshot = await ref.once('value');

        const val = snapshot.val()

        let observations = []

        for(let i in val){
            let name = val[i].name
            let photo = val[i].photo
            //console.log(name)
            //console.log(photo)
            let userNick = val[i].name.toLowerCase().replace(/ /g, '')
            let obs = val[i].observations
            for(let j in obs){
                //console.log(obs[j])
                let photUrl = obs[j].photoURL
                let location = obs[j].location
                let time = obs[j].time
                let sex = obs[j].sex
                let single = obs[j].isSingle
                
                if(type==='all'){
                    observations.push([name, photo, photUrl, location, time, userNick])
                }else if(type==='male' && sex===0){
                    observations.push([name, photo, photUrl, location, time, userNick])
                }else if(type==='female' && sex===1){
                    observations.push([name, photo, photUrl, location, time, userNick])
                }else if(type==='single' && single===0){
                    observations.push([name, photo, photUrl, location, time, userNick])
                }else if(type==='group' && single!==0){
                    observations.push([name, photo, photUrl, location, time, userNick])
                }
                
            }
        }

        await this.setState({
            observations: observations
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.chipContainer}>
                    <Chip style={styles.chip} icon="information" onPress={() => this.getObservations('all')}>All</Chip>
                    <Chip style={styles.chip} icon="information" onPress={() => this.getObservations('male')}>Male</Chip>
                    <Chip style={styles.chip} icon="information" onPress={() => this.getObservations('female')}>Female</Chip>
                    <Chip style={styles.chip} icon="information" onPress={() => this.getObservations('tuskers')}>Tuskers</Chip>
                    <Chip style={styles.chip} icon="information" onPress={() => this.getObservations('dead')}>Dead</Chip>
                    <Chip style={styles.chip} icon="information" onPress={() => this.getObservations('group')}>Groups</Chip>
                    <Chip style={styles.chip} icon="information" onPress={() => this.getObservations('single')}>Single</Chip>
                    
                </View>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.imgConatiner}>
                        {this.state.observations.length>0?
                            this.state.observations.map((val,i)=>{
                                return(
                                    <View key={i}>
                                        <Image style={styles.img} source={{uri: val[2]}}/>
                                    </View>
                                )
                            
                            })
                            :
                            <Text style={{fontSize: 20}}>Nothing found</Text>
                        }
                    </View>
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

