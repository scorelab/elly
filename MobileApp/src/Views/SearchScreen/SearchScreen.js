import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native'
import getRandomColor from '../../components/RandomColorGenerator/RandomColorGenerator'

class SearchScreen extends React.Component{
    
    render() {
        const {navigate} = this.props.navigation;
        console.log("Feed Screen")
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.welcome}>Search</Text>
                </View>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        //backgroundColor: getRandomColor(),
    },
    welcome: {
        fontSize: 25
    }
})
export default SearchScreen;

