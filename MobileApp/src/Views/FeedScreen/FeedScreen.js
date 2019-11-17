import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native'
import { Avatar, Card, Title, Paragraph, Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import {NavigationEvents} from 'react-navigation';
class FeedScreen extends React.Component{

    static navigationOptions = ({navigation})=>{
        return {
            headerTitle: 'Elly',
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
            observations: [['Please wait','https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg','https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg','','','']]
        }
    }

    componentDidMount(){
        this.getObservations()  
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
            let obs = val[i].observations
            for(let j in obs){
                //console.log(obs[j])
                let photUrl = obs[j].photoURL
                let location = obs[j].location
                let time = obs[j].time
                observations.push([name, photo, photUrl, location, time])
            }
        }

        await this.setState({
            observations: observations
        })
    }

    componentDidUpdate(){
        let observations =this.state.observations
        for(let i=0;i<observations.length;i++){
            console.log(observations[i])
        }
    }

    render() {
        
        return (
            
            <View style={styles.container}>
                <View style={{width: "100%", backgroundColor: 'grey'}}>
                {/* <NavigationEvents onDidFocus={() => this.render()} /> */}
                </View>
                <ScrollView style={{width: "100%"}}>
                    {this.state.observations.map((val,i)=>{
                        return (
                            <View key={i}>
                        <Card>
                            <Card.Title title={val[0]} subtitle={"Captured by "+val[0]} left={(props) => <Avatar.Image size={50} source={{ uri: val[1] }} />}/>
                            
                            <Card.Cover source={{ uri: val[2] }} />
                            <Card.Content>
                                <Title>Card title</Title>
                                <Paragraph>@Udawalawa National Park. (lat {val[3][0]}, lang {val[3][1]})</Paragraph>
                            </Card.Content>
                            <Card.Actions>
                            </Card.Actions>
                        </Card>
                        <Divider />
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
        //backgroundColor: getRandomColor(),
    },
    welcome: {
        fontSize: 25
    }
})
export default FeedScreen;

