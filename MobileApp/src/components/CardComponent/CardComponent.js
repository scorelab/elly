import * as React from 'react';
import {View, StyleSheet,Dimensions, TouchableOpacity} from 'react-native'
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
                        title={this.props.subtitle} subtitle={"Captured By "+this.props.title} 
                        left={() => <Avatar.Image size={50} source={{ uri: this.props.user }} />}
                        right={() => <Avatar.Icon style={{backgroundColor: 'white'}} size={50} color='#4b8b3b' icon="check-decagram" />}
                    />
                    {this.props.isNavigate?
                        <TouchableOpacity
                            onPress={()=>this.props.showPhoto.navigate('showDetailedPhoto',
                                {
                                    img: this.props.image,
                                    title: this.props.title,
                                    subtitle:this.props.subtitle,
                                    user: this.props.user,
                                    content: this.props.result,
                                    showPhoto: this.props.navigation
                                }
                                )
                            }
                        >
                            <Card.Cover style={styles.cover} source={{ uri: this.props.image }} />
                        </TouchableOpacity>
                            :
                        <TouchableOpacity> 
                            <Card.Cover style={styles.cover} source={{ uri: this.props.image }} />
                        </TouchableOpacity>
                    }
    
                    <Card.Content>
                        {this.props.content.map((val,i)=>{
                            return(
                                <View key={i} style={styles.content}>
                                    <Avatar.Icon size={40} color='white' icon={val[0]} />
                                    <Text> {val[1]}</Text>
                                </View>
                            )
                            
                        })}
                            
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
        marginTop: 5,
        width: Dimensions.get('window').width
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

