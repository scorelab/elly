import * as React from 'react';
import { View, StyleSheet,FlatList, ImageBackground, RefreshControl, Text, Image, Dimensions, ScrollView } from 'react-native'
import { Button, Menu, Avatar } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { generateResult } from '../../components/UserDataHandling/UserDataHandling'
import ActivityIndicator from '../../components/ActivityIndicator/ActivityIndicator'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
class ProfileScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params = [] } = navigation.state
        return {
            headerTitle: 'My Profile',
            headerStyle: {
                backgroundColor: '#0b6623',
            },
            headerTintColor: '#fff',
            headerRight: () => 
            <Menu
                visible={params.showMenu}
                onDismiss={()=>params.closeMenu()}
                anchor={
                    <TouchableOpacity onPress={()=>params.openMenu()}>
                        <Icon name="dots-vertical" size={30} color="white" />
                    </TouchableOpacity>
                }
            >
                <Menu.Item onPress={() => params.onPressMenuLogout()} title="LOGOUT" />
                <Menu.Item onPress={() => params.onPressMenuAbout()} title="ABOUT ELLY" />
            </Menu>
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            userPhoto: '',
            userNick: '',
            uid: '',
            userObservations: [],
            noObs: 0,
            activityIndicator: true,
            refreshing: false,
            showMenu: false
        }
    }

    componentDidMount() {
        // database().ref('/users/').on("value", snapshot=>{
        // })
        
        this.getUserProfile()
        this.props.navigation.setParams({
            onPressMenuAbout: () => {
                this.props.navigation.navigate("AboutScreen")
                this.closeMenu()
            },
            onPressMenuLogout: () => this.logutHandler(),
            showMenu: false,
            openMenu: ()=>this.openMenu(),
            closeMenu: ()=> this.closeMenu()

        })

        this.getUserData()
    }

    logutHandler = async () => {
        this.closeMenu()
        let result = await auth().signOut().then(
            ()=>this.props.navigation.navigate("SignIn")
        )
        console.log(result)
        
    }

    openMenu(){
        console.log("opened")
        this.props.navigation.setParams({
            showMenu: true
        })
    }

    closeMenu(){
        console.log("closed")
        this.props.navigation.setParams({
            showMenu: false
        })
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.getUserData().then(() => {
            this.setState({ refreshing: false });
        });
    }

    getUserProfile = async () =>{
        const user = auth().currentUser
        console.log(user)
        this.setState({
            userName: user.displayName,
            userNick: user.displayName.toLowerCase().replace(/ /g, ''),
            userPhoto: user.photoURL,
            uid: user.uid
        })
    }

    getUserData = async() =>{
        // Fetch the data snapshot
        const data = await database().ref(`/usersObservations/`).orderByValue('uid').limitToLast(10).once('value')
        
        const val = data.val()

        let userObservations = []
        let lastVisible = ''
        for (let i in val) {
            let time = new Date(val[i].time)
            let crntTime = new Date().getTime()
            let dif = crntTime - time
            if(val[i].uid!==this.state.uid){continue}
            if(dif <= 604800000){continue}
            let name = val[i].uname
            let photo = val[i].uimg
            let userNick = name.toLowerCase().replace(/ /g, '')
            
            let photUrl = val[i].photoURL
            let location = val[i].location
            time = time.toString().split(" ")
            time = time.splice(0, time.length - 1)
            time = time.toString().replace(/,/g, ' ')
            let result = generateResult(val[i])
            let address = val[i].address
            
            userObservations.push([name, photo, photUrl, location, time, userNick, result, address])
            this.setState({
                userObservations: userObservations,
                activityIndicator: false
            })
            
            lastVisible = i
        }
        if(userObservations.length>2){
            userObservations.pop()
        }
        console.log(userObservations)
        await this.setState({
            activityIndicator: false,
            lastVisible: lastVisible,
            noObs: userObservations.length
        })
        console.log("Get "+lastVisible)
    }

    getMoreUserData= async () => {
        console.log("hello")
        let lastVisible = this.state.lastVisible
        
        const data = await database().ref(`/usersObservations/`).orderByValue('uid').endAt(lastVisible).limitToLast(10).once('value')
        
        const val = data.val()
        // console.log(val)
        let userObservations = []
        for (let i in val) {
            console.log(val[i])
            let name = val[i].uname
            let photo = val[i].uimg
            let userNick = name.toLowerCase().replace(/ /g, '')
            let time = new Date(val[i].time)
            let crntTime = new Date().getTime()
            let dif = crntTime - time
            if(val[i].uid!==this.state.uid){continue}
            if(dif <= 604800000){continue}
            let photUrl = val[i].photoURL
            let location = val[i].location
            time = time.toString().split(" ")
            time = time.splice(0, time.length - 1)
            time = time.toString().replace(/,/g, ' ')
            let result = generateResult(val[i])
            let address = val[i].address
            userObservations.push([name, photo, photUrl, location, time, userNick, result, address])
            lastVisible = i
        }
        if(userObservations.length>2){
            userObservations.pop()
        }
        console.log(userObservations)
        await this.setState({
            userObservations: [...this.state.userObservations,...userObservations],
            activityIndicator: false,
            lastVisible: lastVisible,
            noObs: this.state.userObservations.length
        })
        console.log("Get more"+lastVisible)
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.activityIndicator ?
                    <View style={{ width: "100%", backgroundColor: 'grey' }}>
                        <ActivityIndicator title={"Please wait"} showIndicator={this.state.activityIndicator} />
                    </View>
                    :
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        {this.state.userPhoto!==null?
                            <ImageBackground blurRadius={1} style={styles.profileConatiner} source={{ uri: this.state.userPhoto }}>
                                <Text style={styles.userNick}>{this.state.userNick}</Text>
                                
                                <Avatar.Image
                                    style={{ marginLeft: 5, marginRight: 0, padding: 0 }}
                                    size={100} source={{ uri: this.state.userPhoto }}
                                />
                                <Text style={styles.userName}>{this.state.userName}</Text>
                                <Button mode='contained' style={styles.observationTxt}>Observations</Button>
                                <Text style={styles.obCount}>{this.state.noObs}</Text>
                            </ImageBackground>
                        :
                            <View style={styles.profileConatiner}>
                                <Text style={styles.userNick}>{this.state.userNick}</Text>
                                <Avatar.Text color={'white'} size={100} label={this.state.userName.substr(0,2).toUpperCase()} />
                                <Text style={styles.userName}>{this.state.userName}</Text>
                                <Button mode='contained' style={styles.observationTxt}>Observations</Button>
                                <Text style={styles.obCount}>{this.state.noObs}</Text>
                            </View>
                        }
                       
                        
                        {this.state.userObservations.length > 0
                            ?
                            <FlatList
                                // Data
                                style={styles.scrollView}
                                data={this.state.userObservations}
                                // Render Items
                                horizontal={false}
                                numColumns={3}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('showDetailedPhoto',
                                            {
                                                img: item[2],
                                                title: this.state.userName,
                                                subtitle: this.state.userNick,
                                                user: this.state.userPhoto,
                                                content: item[6],
                                                showPhoto: this.props.navigation
                                            }
                                        )}
                                        style={{justifyContent: 'center'}}
                                    >
                                        <Image style={styles.img} source={{ uri: item[2] }} />
                                    </TouchableOpacity>
                                )}
                                // Item Key
                                keyExtractor={(item, index) => String(index)}
                                // Header (Title)
                                // On End Reached (Takes a function)

                                // ListHeaderComponent={<Text>Hello</Text>}
                                // Footer (Activity Indicator)
                                ListFooterComponent={()=><ActivityIndicator title={"Loading"} showIndicator={this.state.activityIndicator} />}
                                onEndReached={this.getMoreUserData}
                                // How Close To The End Of List Until Next Data Request Is Made
                                onEndReachedThreshold={0.1}
                                // Refreshing (Set To True When End Reached)
                                refreshing={this.state.activityIndicator}
                            />
                            :
                            <Button
                                style={{ marginTop: 20,height:50,justifyContent: 'center', width: Dimensions.get('window').width-200  }}
                                icon="plus" mode="contained"
                                onPress={() => this.props.navigation.navigate("PhotoLandingScreen")}>
                                Add Observation
                            </Button>
                            }
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
        backgroundColor: 'green'
    },
    observationConatiner: {
        width: '100%',
    },
    userNick: {
        color: 'white'
    },
    observationTxt: {
        color: 'white',
        fontSize: 20
    },
    userName: {
        fontWeight: 'bold',
        color: 'white'
    },
    obCount: {
        color: 'white',
        fontSize: 35
    },
    userPhoto: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'white'
    },
    img: {
        width: Dimensions.get('window').width / 3.085,
        height: Dimensions.get('window').width / 3.5,
        margin: 2,
        justifyContent: 'center',
        borderRadius: 5
    },
    imgConatiner: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        width: Dimensions.get('window').width
    },
    scrollView: {
        width: Dimensions.get('window').width,
        marginBottom: 10,
        
    },
})
export default ProfileScreen;

