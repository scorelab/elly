import * as React from 'react';
import {View,Image,Text,Dimensions,ImageBackground, StyleSheet} from 'react-native'
import { Divider } from 'react-native-paper';

class AboutScreen extends React.Component{
    
    constructor(props){
        super(props)
    }

    static navigationOptions = ({navigation})=>{
        return {
            headerTitle: "About",
            headerStyle: {
              backgroundColor: '#4b8b3b',
            },
            headerTintColor: '#fff',
            
        }
    }

    render() {
        return (
            <View style={styles.container}>
               
                <View style={{margin:10,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{width: 100, height: 100}} source={require('../../Assets/trunks.png')}/>
                    <Text>&  </Text>
                    <Image style={{width: 200, height: 100}} source={require('../../Assets/score.jpg')}/>
                </View>
                <Divider/>
                <View style={{marginTop: 20, padding: 5}}>
                    <Text style={{textAlign: 'center',color: 'black', fontSize: 20}}>This app is developed by ScoreLab origanization with the Trunks & Leaves
                         origanization for elephant conservation purposes.</Text>
                </View>
                <View style={{marginTop: 40,justifyContent: 'flex-end', alignItems: 'center', width: '100%', padding: 10}}>
                    <Text style={{fontSize: 20}}>
                        Address{'\n'}
                        Sustainable Computing Research Group,{'\n'}
                        University of Colombo School of Computing,{'\n'}
                        No. 35, Reid Avenue,{'\n'}
                        Colombo 7, Sri Lanka{'\n'}{'\n'}
                        Phone{'\n'}
                        +94-11-2158919{'\n'}
                    </Text>
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
        width: Dimensions.get('window').width
    },
})
export default AboutScreen;