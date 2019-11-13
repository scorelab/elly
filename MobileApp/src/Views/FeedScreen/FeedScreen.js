import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class FeedScreen extends React.Component{
    
    getUserData = async function () {
        const uid = auth().currentUser.uid;
        console.log(uid)
        // Create a reference
        const ref = database().ref(`/users/${uid}`);
        
        // Fetch the data snapshot
        const snapshot = await ref.once('value');
        
        console.log('User data: ', snapshot.val());
    }

      componentDidMount(){
        this.getUserData()
      }

    render() {
        const {navigate} = this.props.navigation;
        console.log("Feed Screen")
        return (
            <View style={styles.container}>
                <View style={{width: "100%", backgroundColor: 'grey'}}>

                </View>
                <ScrollView style={{width: "100%"}}>
                    <View>
                        <Card>
                            <Card.Title title="Card Title" subtitle="Card Subtitle" left={(props) => <Avatar.Icon {...props} icon="image" />} right={(props) => <Avatar.Icon size={24}  {...props} icon="dots-vertical" />}/>
                            
                            <Card.Cover source={{ uri: 'https://monkeysandmountains.com/wp-content/uploads/2018/11/sri-lanka-5-l.jpg' }} />
                            <Card.Content>
                                <Title>Card title</Title>
                                <Paragraph>Card content</Paragraph>
                            </Card.Content>
                            <Card.Actions>
                                <Icon name="heart-o" size={30}/>
                            </Card.Actions>
                        </Card>
                    </View>
                    <Divider />
                    <View>
                        <Card>
                            <Card.Title title="Card Title" subtitle="Card Subtitle" left={(props) => <Avatar.Icon {...props} icon="image" />} right={(props) => <Avatar.Icon size={24}  {...props} icon="dots-vertical" />}/>
                            
                            <Card.Cover source={{ uri: 'http://static.dailymirror.lk/media/images/image_1486532032-5d22bf1cd7.jpg' }} />
                            <Card.Content>
                                <Title>Card title</Title>
                                <Paragraph>Card content</Paragraph>
                            </Card.Content>
                            <Card.Actions>
                                <Icon name="heart-o" size={30}/>
                            </Card.Actions>
                        </Card>
                    </View>
                    <Divider />
                    <View>
                        <Card>
                            <Card.Title title="Card Title" subtitle="Card Subtitle" left={(props) => <Avatar.Icon {...props} icon="image" />} right={(props) => <Avatar.Icon size={24}  {...props} icon="dots-vertical" />}/>
                            
                            <Card.Cover source={{ uri: 'https://ichef.bbci.co.uk/news/660/cpsprodpb/181B6/production/_109024789_hi056846157.jpg' }} />
                            <Card.Content>
                                <Title>Card title</Title>
                                <Paragraph>Card content</Paragraph>
                            </Card.Content>
                            <Card.Actions>
                                <Icon name="heart-o" size={30}/>
                            </Card.Actions>
                        </Card>
                    </View>
                    <Divider />
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

