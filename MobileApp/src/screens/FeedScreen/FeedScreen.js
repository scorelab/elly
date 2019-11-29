import * as React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native'
import { Avatar, } from 'react-native-paper';
import ActivityIndicator from '../../components/ActivityIndicator/ActivityIndicator'
import { CardComponent } from '../../components/CardComponent/CardComponent'
import { generateResult } from '../../components/UserDataHandling/UserDataHandling'
import { googleMapAPIKey } from '../../config/config'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { ref } from '../../components/Database/Database'

class FeedScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params = [] } = navigation.state
        return {
            headerTitle: 'Home',
            headerStyle: {
                backgroundColor: '#4b8b3b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },

            headerLeft: () => <TouchableOpacity
                onPress={() => navigation.navigate("Profile")}
            >
                <Avatar.Image
                    style={{ marginLeft: 5, marginRight: 0, padding: 0 }}
                    size={35} source={{ uri: params.userPhoto }}
                />
            </TouchableOpacity>,
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            observations: [],
            activityIndicator: true,
            refreshing: false,
        }
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.getObservations().then(() => {
            this.setState({ refreshing: false });
        });
    }

    componentDidMount() {
        this.getUserData()
        // database().ref('/users/').on("value", snapshot=>{
        //     this.getObservations()
        // })
        this.getObservations()
    }

    getUserData = async function () {
        // Fetch the data snapshot
        const uid = auth().currentUser.uid;
        const refUser = database().ref(`/users/${uid}`);
        const snapshot = await refUser.once('value');

        await this.props.navigation.setParams({
            userPhoto: snapshot.val().photo
        })
    }

    getObservations = async function () {
        // Fetch the data snapshot
        const snapshot = await ref.once('value');

        const val = snapshot.val()

        let observations = []
        let users = []
        for (let i in val) {
            users.push(i)
        }
        for (let i = 0; i < users.length; i++) {
            let name = val[users[i]].name
            let photo = val[users[i]].photo
            let userNick = val[users[i]].name.toLowerCase().replace(/ /g, '')

            let obs = await ref.child(users[i]).child('observations').orderByKey().limitToLast(20).once('value')
            obs = obs.val()

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
                    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + location[1] + ',' + location[0] + '&key=' + googleMapAPIKey)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            //console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson.results[0].formatted_address));
                            let address = responseJson.results.length > 0 ? responseJson.results[0].formatted_address.split(",") : "Unnamed location"
                            observations.push([name, photo, photUrl, location, time, userNick, result, address])
                            this.setState({
                                observations: observations,
                            })
                        })
                }
                this.setState({
                    activityIndicator: false
                })
            }
        }

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

                        <View>
                            <ScrollView
                                style={{ width: "100%" }}
                                refreshControl={<RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                    colors={['#4b8b3b']}
                                    title={'Fetching...'}
                                />}
                            >
                                {this.state.observations.length > 0 ?
                                    this.state.observations.map((val, i) => {
                                        return (
                                            <CardComponent isNavigate={true} key={i} result={val[6]} showPhoto={this.props.navigation} title={val[7]} subtitle={val[5]} user={val[1]} image={val[2]} content={[['calendar-clock', "On " + val[4].toString()], ['map-marker', val[3].toString()]]} />

                                        )
                                    })
                                    :
                                    <View></View>
                                }
                            </ScrollView>
                        </View>

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
    },
    welcome: {
        fontSize: 25
    }
})
export default FeedScreen;

