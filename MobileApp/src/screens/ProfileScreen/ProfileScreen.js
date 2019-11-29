import * as React from 'react';
import { View, StyleSheet, ImageBackground, RefreshControl, Text, Image, Dimensions, ScrollView } from 'react-native'
import { Button } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { generateResult } from '../../components/UserDataHandling/UserDataHandling'
import ActivityIndicator from '../../components/ActivityIndicator/ActivityIndicator'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class ProfileScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params = [] } = navigation.state
        return {
            headerTitle: 'My Profile',
            headerStyle: {
                backgroundColor: '#4b8b3b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerRight: () => <Button onPress={() => params.onPressMenu()} mode='contained' style={{ marginRight: 5 }}>ABOUT ELLY</Button>
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            userPhoto: '',
            userNick: '',
            userObservations: [],
            noObs: 0,
            activityIndicator: true,
            refreshing: false
        }
    }



    componentDidMount() {
        // database().ref('/users/').on("value", snapshot=>{

        // })
        this.getUserData()
        this.props.navigation.setParams({
            onPressMenu: () => {
                this.props.navigation.navigate("AboutScreen")
            },
        })
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.getUserData().then(() => {
            this.setState({ refreshing: false });
        });
    }

    getUserData = async function () {
        // Fetch the data snapshot
        const uid = auth().currentUser.uid;

        const refUser = database().ref(`/users/${uid}`).orderByChild('observations');
        const snapshot = await refUser.once('value');

        let val = snapshot.val()
        let observations = []
        let name = val.name
        let photo = val.photo
        let userNick = val.name.toLowerCase().replace(/ /g, '')
        let obs = val.observations
        await this.setState({
            userName: snapshot.val().name,
            userPhoto: snapshot.val().photo,
            userNick: snapshot.val().name.toLowerCase().replace(/ /g, ''),
        })
        if (obs !== undefined) {
            for (let j in obs) {
                let time = new Date(obs[j].time)
                let crntTime = new Date().getTime()
                let dif = crntTime - time
                if (dif <= 604800000) { continue }
                let photUrl = obs[j].photoURL
                let location = obs[j].location
                time = time.toString().split(" ")
                time = time.splice(0, time.length - 1)
                time = time.toString().replace(/,/g, ' ')
                let result = generateResult(obs[j])

                observations.push([name, photo, photUrl, location, time, userNick, result, true])
                await this.setState({
                    userObservations: observations,
                    noObs: observations.length,
                })
            }
        }

        await this.setState({
            activityIndicator: false
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.activityIndicator ?
                    <View style={{ width: "100%", backgroundColor: 'grey' }}>
                        <ActivityIndicator title={"Please wait..."} showIndicator={this.state.activityIndicator} />
                    </View>
                    :
                    <View>
                        <ImageBackground blurRadius={1} style={styles.profileConatiner} source={{ uri: this.state.userPhoto }}>
                            <Text style={styles.userNick}>{this.state.userNick}</Text>
                            <Image style={styles.userPhoto} source={{ uri: this.state.userPhoto }}></Image>
                            <Text style={styles.userName}>{this.state.userName}</Text>
                            <Text style={styles.userNick}>Observations</Text>
                            <Text style={styles.obCount}>{this.state.noObs}</Text>
                        </ImageBackground>

                        <ScrollView
                            style={styles.scrollView}
                            refreshControl={<RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                                colors={['#4b8b3b']}
                                title={'Fetching...'}
                            />}
                        >

                            <View style={styles.imgConatiner}>
                                {this.state.userObservations.length > 0
                                    ?
                                    this.state.userObservations.map((val, i) => {
                                        return (
                                            <TouchableOpacity
                                                key={i}
                                                onPress={() => this.props.navigation.navigate('showDetailedPhoto',
                                                    {
                                                        img: val[2],
                                                        title: this.state.userName,
                                                        subtitle: this.state.userNick,
                                                        user: this.state.userPhoto,
                                                        content: val[6],
                                                        showPhoto: this.props.navigation
                                                    }
                                                )}
                                            >
                                                <ImageBackground style={styles.img} source={{ uri: val[2] }}>
                                                    <View style={{ backgroundColor: '#4b8b3b', justifyContent: 'flex-start', width: "30%", alignItems: 'center' }}>
                                                        <Text style={{ margin: 10, color: 'white' }}>{i + 1}</Text>
                                                    </View>
                                                </ImageBackground>
                                            </TouchableOpacity>
                                        )

                                    })
                                    :
                                    <View>

                                        <Button
                                            style={{ margin: 5 }}
                                            icon="plus" mode="contained"
                                            onPress={() => this.props.navigation.navigate("PhotoLandingScreen")}>
                                            Add Observation
                                    </Button>
                                    </View>

                                }
                            </View>
                        </ScrollView>
                    </View>
                }
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
        width: '100%'
        //backgroundColor: getRandomColor(),
    },
    profileConatiner: {
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    observationConatiner: {
        width: '100%',
    },
    userNick: {
        color: 'white'
    },
    userName: {
        fontWeight: 'bold',
        color: 'white'
    },
    obCount: {
        color: 'white',
        fontSize: 30
    },
    userPhoto: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'white'
    },
    img: {
        width: Dimensions.get('window').width / 3.2,
        height: Dimensions.get('window').width / 3.5,
        margin: 2,
        flex: 1
    },
    imgConatiner: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        width: Dimensions.get('window').width
    },
    scrollView: {
        width: Dimensions.get('window').width,
        marginBottom: 10
    },
})
export default ProfileScreen;

