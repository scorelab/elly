import * as React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {Button, Menu, Avatar, Appbar} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {generateResult} from '../../components/UserDataHandling/UserDataHandling';
import ActivityIndicator from '../../components/ActivityIndicator/ActivityIndicator';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userPhoto: '',
      userNick: '',
      uid: '',
      userObservations: [],
      noObs: 0,
      activityIndicator: true,
      refreshing: false,
      showMenu: false,
    };
  }

  aboutHandler = async () => {
    this.props.navigation.navigate('AboutScreen');
    this.closeMenu();
  };

  componentDidMount() {
    this.getUserProfile();
    database()
      .ref('/usersObservations/')
      .child(this.state.uid)
      .on('child_added', () => {
        this.getUserData();
      });
  }

  logutHandler = async () => {
    this.closeMenu();
    let result = await auth()
      .signOut()
      .then(() => console.log('Log out'));
  };

  openMenu() {
    console.log('opened');
    this.setState({showMenu: true});
  }

  closeMenu() {
    console.log('closed');
    this.setState({showMenu: false});
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.getUserData().then(() => {
      this.setState({refreshing: false});
    });
  }

  getUserProfile = async () => {
    const user = auth().currentUser;
    const uid = user.uid;
    const ref = await database().ref('/users/').child(uid).once('value');
    const data = ref.val();
    console.log(data);
    await this.setState({
      userName: data.name,
      userNick: data.name.toLowerCase().replace(/ /g, ''),
      userPhoto: data.photo,
      uid: uid,
    });
  };

  getUserData = async () => {
    // Fetch the data snapshot
    const data = await database()
      .ref(`/usersObservations/`)
      .orderByKey()
      .limitToLast(5)
      .once('value');

    const val = data.val();
    console.log(val.length);
    let userObservations = [];
    let lastVisible = '';
    for (let i in val) {
      let time = new Date(val[i].time);
      let crntTime = new Date().getTime();
      let dif = crntTime - time;

      if (val[i].uid !== auth().currentUser.uid) {
        continue;
      } else {
        console.log('Not mine');
      }
      // if (dif <= 604800000) {
      //   continue;
      // } else {
      //   console.log('Time');
      // }
      let name = val[i].uname;
      let photo = val[i].uimg;
      let userNick = name.toLowerCase().replace(/ /g, '');

      let photUrl = val[i].rphotos;
      let location = val[i].location;
      time = time.toString().split(' ');
      time = time.splice(0, time.length - 1);
      time = time.toString().replace(/,/g, ' ');
      let result = generateResult(val[i]);
      let address = val[i].address;
      let verifiedd = val[i].verified;
      userObservations.push([
        name,
        photo,
        photUrl,
        location,
        time,
        userNick,
        result,
        address,
        verifiedd,
      ]);
      this.setState({
        userObservations: userObservations,
        activityIndicator: false,
      });

      lastVisible = i;
    }
    if (userObservations.length > 2) {
      userObservations.pop();
    }
    // console.log(userObservations)
    await this.setState({
      activityIndicator: false,
      lastVisible: lastVisible,
      noObs: userObservations.length,
    });
  };

  getMoreUserData = async () => {
    let lastVisible = this.state.lastVisible;

    const data = await database()
      .ref(`/usersObservations/`)
      .orderByKey()
      .endAt(lastVisible)
      .limitToLast(5)
      .once('value');

    const val = data.val();
    // console.log(val)
    let userObservations = [];
    for (let i in val) {
      let name = val[i].uname;
      let photo = val[i].uimg;
      let userNick = name.toLowerCase().replace(/ /g, '');
      let time = new Date(val[i].time);
      let crntTime = new Date().getTime();
      let dif = crntTime - time;
      if (val[i].uid !== auth().currentUser.uid) {
        continue;
      } else {
        console.log('Not mine');
      }
      // if (dif <= 604800000) {
      //   continue;
      // } else {
      //   console.log('Time');
      // }
      let photUrl = val[i].rphotos;
      let location = val[i].location;
      time = time.toString().split(' ');
      time = time.splice(0, time.length - 1);
      time = time.toString().replace(/,/g, ' ');
      let result = generateResult(val[i]);
      let address = val[i].address;
      console.log(val[i].verified);
      let verifiedd = val[i].verified;
      userObservations.push([
        name,
        photo,
        photUrl,
        location,
        time,
        userNick,
        result,
        address,
        verifiedd,
      ]);
      lastVisible = i;
    }
    if (Object.keys(val).length <= 4) {
      lastVisible = '1';
    } else {
      observations.pop();
    }
    await this.setState({
      userObservations: [...this.state.userObservations, ...userObservations],
      activityIndicator: false,
      lastVisible: lastVisible,
      noObs: this.state.userObservations.length,
    });
  };

  render() {
    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Profile" />
          <Menu
            visible={this.state.showMenu}
            onDismiss={() => this.closeMenu()}
            anchor={
              <TouchableOpacity onPress={() => this.openMenu()}>
                <Icon name="dots-vertical" size={30} />
              </TouchableOpacity>
            }>
            <Menu.Item onPress={() => this.logutHandler()} title="Logout" />
            <Menu.Item onPress={() => this.aboutHandler()} title="About" />
          </Menu>
        </Appbar.Header>
        <View style={styles.container}>
          {this.state.activityIndicator ? (
            <View style={{width: '100%', backgroundColor: 'grey'}}>
              <ActivityIndicator
                title={'Please wait'}
                showIndicator={this.state.activityIndicator}
              />
            </View>
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {this.state.userPhoto !== '' ? (
                <ImageBackground
                  blurRadius={1}
                  style={styles.profileConatiner}
                  source={{uri: this.state.userPhoto}}>
                  {/* <Text style={styles.userNick}>{this.state.userNick}</Text> */}

                  <Avatar.Image
                    style={{marginLeft: 5, marginRight: 0, padding: 0}}
                    size={100}
                    source={{uri: this.state.userPhoto}}
                  />
                  <Text style={styles.userName}>
                    {this.state.userName.toUpperCase()}
                  </Text>
                  <Button mode="contained" style={styles.observationTxt}>
                    Observations
                  </Button>
                  <Text style={styles.obCount}>{this.state.noObs}</Text>
                </ImageBackground>
              ) : (
                <View style={styles.profileConatiner}>
                  {/* <Text style={styles.userNick}>{this.state.userNick}</Text> */}
                  <Avatar.Text
                    // color={'white'}
                    size={100}
                    label={this.state.userName.substr(0, 2).toUpperCase()}
                  />
                  <Text style={styles.userName}>{this.state.userName}</Text>
                  <Button mode="contained" style={styles.observationTxt}>
                    Observations
                  </Button>
                  <Text style={styles.obCount}>{this.state.noObs}</Text>
                </View>
              )}

              {this.state.userObservations.length > 0 ? (
                <FlatList
                  // Data
                  style={styles.scrollView}
                  data={this.state.userObservations}
                  // Render Items
                  horizontal={false}
                  numColumns={3}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('showDetailedPhoto', {
                          img: item[2],
                          title: this.state.userName,
                          subtitle: this.state.userNick,
                          user: this.state.userPhoto,
                          content: item[6],
                          showPhoto: this.props.navigation,
                        })
                      }
                      style={{justifyContent: 'center'}}>
                      <ImageBackground
                        style={styles.img}
                        source={{uri: item[2]}}>
                        <View
                          style={{
                            backgroundColor: '#004c21',
                            width: Dimensions.get('window').width / 3,
                            height: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{color: 'white'}}>
                            {item[8].toUpperCase()}
                          </Text>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  )}
                  // Item Key
                  keyExtractor={(item, index) => String(index)}
                  // Header (Title)
                  // On End Reached (Takes a function)

                  // ListHeaderComponent={<Text>Hello</Text>}
                  // Footer (Activity Indicator)
                  ListFooterComponent={() => (
                    <ActivityIndicator
                      title={'Loading'}
                      showIndicator={this.state.activityIndicator}
                    />
                  )}
                  onEndReached={this.getMoreUserData}
                  // How Close To The End Of List Until Next Data Request Is Made
                  onEndReachedThreshold={0.1}
                  // Refreshing (Set To True When End Reached)
                  refreshing={this.state.activityIndicator}
                />
              ) : (
                <Button
                  style={{
                    marginTop: 20,
                    height: 50,
                    justifyContent: 'center',
                    width: Dimensions.get('window').width - 200,
                  }}
                  icon="plus"
                  mode="contained"
                  onPress={() =>
                    this.props.navigation.navigate('PhotoLandingScreen')
                  }>
                  Add Observation
                </Button>
              )}
            </View>
          )}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    width: '100%',
  },
  profileConatiner: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    // backgroundColor: 'green',
  },
  observationConatiner: {
    width: '100%',
  },
  userNick: {
    color: 'white',
  },
  observationTxt: {
    fontSize: 20,
  },
  userName: {
    fontWeight: 'bold',
    // color: 'white',
    margin: 5,
  },
  obCount: {
    // color: 'white',
    fontSize: 35,
  },
  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white',
  },
  img: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    margin: 2,
    borderRadius: 5,
  },
  imgConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    width: Dimensions.get('window').width,
  },
  scrollView: {
    width: Dimensions.get('window').width,
    marginBottom: 10,
  },
});
export default ProfileScreen;
