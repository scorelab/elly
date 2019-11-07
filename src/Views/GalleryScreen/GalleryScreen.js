import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native'
import getRandomColor from '../../components/RandomColorGenerator/RandomColorGenerator'

class GalleryScreen extends React.Component{
    
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>Gallery</Text>
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
export default GalleryScreen;

