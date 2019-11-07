import * as React from 'react';
import { Button } from 'react-native-paper';
import {View, StyleSheet} from 'react-native'
import getRandomColor from '../../components/RandomColorGenerator/RandomColorGenerator'

class FormScreen extends React.Component{
    
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View>
                    <Button mode="contained" onPress={() => navigate('FeedStack', {name: 'Jane'})}>Next</Button>
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
})
export default FormScreen;

