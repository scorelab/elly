import * as React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native'
import { Searchbar, Chip } from 'react-native-paper';

class SearchScreen extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            firstQuery: '',
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

    componentDidUpdate(){
        
    }

    componentDidMount() {
        this.props.navigation.setParams({
            handleText: (text)=>this.onTextChangeHandler(text),
            query: this.state.firstQuery
        });
    }

    onTextChangeHandler=(text)=>{
        this.setState({
            firstQuery: text
        })  
        this.props.navigation.setParams({
            query: text
        });
    }


    render() {
        console.log(this.state.firstQuery)
        return (
            <View style={styles.container}>
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Chip icon="information" onPress={() => console.log('Pressed')}>Male</Chip>
                        <Chip icon="information" onPress={() => console.log('Pressed')}>Female</Chip>
                        <Chip icon="information" onPress={() => console.log('Pressed')}>Tuskers</Chip>
                        
                    </View>
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
        marginTop: 10
        //backgroundColor: getRandomColor(),
    },
    welcome: {
        fontSize: 25
    }
})
export default SearchScreen;

