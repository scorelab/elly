import * as React from 'react';
import { Button } from 'react-native-paper';
import {View, StyleSheet} from 'react-native'
import getRandomColor from '../../components/RandomColorGenerator/RandomColorGenerator'

class InfoScreen_1 extends React.Component{
    
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.bottom}>
                    <Button style={styles.swipeBtn} icon="arrow-right" mode="contained" onPress={() => navigate('Info_2', {name: 'Jane'})}>Swipe</Button>
                    
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
    },
    swipeBtn: {
        width: "33%",
        height: 50,
        justifyContent: 'center',
        marginBottom: 10,
        alignItems: 'center',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: getRandomColor(),
        alignSelf: 'stretch',
        alignItems: 'center',
      }
})
export default InfoScreen_1;

