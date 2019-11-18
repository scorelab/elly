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
              backgroundColor: '#f4511e',
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

    static tabBarOptions = ({navigation})=> { 
        
        return {
            
            activeTintColor: '#6C1D7C',
            inactiveTintColor: 'rgba(0,0,0,0.6)',
            showLabel: false,
            style:{
                shadowColor: 'rgba(58,55,55,0.1)',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 15,
                elevation: 3,
                borderTopColor: 'transparent',
                backgroundColor:'#fff',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                height: 50
            },
            activeTabStyle: {
                backgroundColor: 'white',
                borderBottomWidth: 4,
                borderColor: '#6C1D7C'
            }
        }
         
    }

    componentDidMount() {
        this.props.navigation.setParams({
            handleText: (text)=>this.onTextChangeHandler(text),
            query: this.state.firstQuery
        });

        this.getObservations()
    }

    onTextChangeHandler=(text)=>{
        this.setState({
            firstQuery: text
        })  
        this.props.navigation.setParams({
            query: text
        });
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
            //console.log(name)
            //console.log(photo)
            let userNick = val[i].name.toLowerCase().replace(/ /g, '')
            let obs = val[i].observations
            for(let j in obs){
                //console.log(obs[j])
                let photUrl = obs[j].photoURL
                let location = obs[j].location
                let time = obs[j].time
                observations.push([name, photo, photUrl, location, time, userNick])
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
                    <Chip style={styles.chip} icon="information" onPress={() => console.log('Pressed')}>All</Chip>
                    <Chip style={styles.chip} icon="information" onPress={() => console.log('Pressed')}>Male</Chip>
                    <Chip style={styles.chip} icon="information" onPress={() => console.log('Pressed')}>Female</Chip>
                    <Chip style={styles.chip} icon="information" onPress={() => console.log('Pressed')}>Tuskers</Chip>
                    <Chip style={styles.chip} icon="information" onPress={() => console.log('Pressed')}>Dead</Chip>
                    <Chip style={styles.chip} icon="information" onPress={() => console.log('Pressed')}>Groups</Chip>
                    <Chip style={styles.chip} icon="information" onPress={() => console.log('Pressed')}>Singles</Chip>
                    
                </View>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.imgConatiner}>
                        {this.state.observations.map((val,i)=>{
                            return(
                                <View key={i}>
                                    <Image style={styles.img} source={{uri: val[2]}}/>
                                </View>
                            )
                            
                        })}
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
        //backgroundColor: getRandomColor(),
    },
    chipContainer: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chip: {
        margin: 5
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

