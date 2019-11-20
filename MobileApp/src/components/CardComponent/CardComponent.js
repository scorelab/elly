import * as React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import { Card, Text,Avatar } from 'react-native-paper';


class CardComponent extends React.Component{

    constructor(props) {
        super(props);
    
    }

    render() {
        
        return (
            <View style={styles.container}>
                <Card>
                    <Card.Title 
                        title={this.props.title} subtitle={this.props.subtitle} 
                        left={() => <Avatar.Image size={50} source={{ uri: this.props.user }} />}
                        // right={() => <Avatar.Icon style={{backgroundColor: 'white'}} size={50} color='black' icon="dots-vertical" />}
                    />
                    <TouchableOpacity
                        onPress={()=>this.props.showPhoto.navigate('showPhoto',{img: this.props.image})}
                    >
                        <Card.Cover style={styles.cover} source={{ uri: this.props.image }} />
                    </TouchableOpacity>
                    <Card.Content>
                        {this.props.content.map((val,i)=>{
                            return(
                                <View key={i} style={styles.content}>
                                    <Avatar.Icon size={35} color='white' icon={val[0]} />
                                    <Text> {val[1]}</Text>
                                </View>
                            )
                            
                        })}
                        
                        {/* <View >
                            <Avatar.Icon size={25} color='white' icon="map-marker" />
                            <Text> {val[3].toString()}</Text>
                            
                        </View> */}
                            
                    </Card.Content>
                    <Card.Actions>
                    </Card.Actions>
                </Card>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5
    },
    cover: {
        borderRadius: 5, 
        margin: 10, 
        height: 300
    },
    content: {
        marginTop: 5, 
        flexDirection: 'row',
        flexWrap: 'wrap', 
        alignItems: 'center'
    },
})

export { CardComponent };

