import * as React from 'react';
import {View,Image,Text,Dimensions,ImageBackground, StyleSheet, Linking} from 'react-native'
import { Divider } from 'react-native-paper';

class AboutScreen extends React.Component{
    
    constructor(props){
        super(props)
    }

    static navigationOptions = ({navigation})=>{
        return {
            headerTitle: "About Elly",
            headerStyle: {
              backgroundColor: '#4b8b3b',
            },
            headerTintColor: '#fff',
            
        }
    }

    render() {
        return (
            <View style={styles.container}>
                
                <Image style={{width: 80, height: 60, margin: 10,resizeMode: 'stretch'}} source={require('../../Assets/landing2.png')}/>
                <Text style={{textAlign: 'center',color: 'black', fontSize: 20}}> Developed By  </Text>
                <View style={{margin:10,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{width: 100, height: 100,resizeMode: 'stretch', borderRadius: 20}} source={require('../../Assets/score.jpg')}/>
                    <Text style={{textAlign: 'center',color: 'black', fontSize: 20}}> & </Text>
                    <Image style={{width: 100, height: 100,resizeMode: 'stretch', borderRadius: 20}} source={require('../../Assets/trunks2.png')}/>
                </View>
                <Divider/>
                <View style={{marginTop: 20, padding: 0}}>
                    <Text style={{textAlign: 'justify',color: 'black', fontSize: 17, margin: 5, fontWeight: '100'}}>This app is developed by 
                        ScoreLab origanization with the collaboration of Trunks & Leaves organization for elephant conservation purposes.{'\n'}{'\n'}
                        For more information contact us: 
                        <Text style={{fontStyle: 'italic'}} onPress={() => Linking.openURL('https://mail.google.com')}> elly@scorelab.org</Text>{'\n'}{'\n'}
                        <Text onPress={() => Linking.openURL('http://www.scorelab.org/')}>Visits http://www.scorelab.org/
                        </Text>{'\n'}
                        
                        <Text onPress={() => Linking.openURL('http://www.trunksnleaves.org/index.html')}>Visits http://www.trunksnleaves.org
                        </Text>{'\n'}{'\n'}
                        
                             
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