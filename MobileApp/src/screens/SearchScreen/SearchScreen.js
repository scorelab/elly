import * as React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {Searchbar, Chip, Appbar} from 'react-native-paper';
import {generateResult} from '../../components/UserDataHandling/UserDataHandling';
import ActivityIndicator from '../../components/ActivityIndicator/ActivityIndicator';
import database from '@react-native-firebase/database';

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstQuery: '',
      observations: [],
      type: 'all',
    };
  }

  componentDidMount() {
    this.getObservations(this.state.type);
  }

  onTextChangeHandler = text => {
    this.setState({
      firstQuery: text,
      activityIndicator: true,
    });
    this.getObservations(text ? text.toLowerCase() : '');
  };

  getObservations = async type => {
    // Fetch the data snapshot
    const data = await database()
      .ref(`/usersObservations/`)
      // .orderByValue(type)
      .orderByKey()
      .limitToLast(5)
      .once('value');
    const val = data.val();
    console.log(val);
    let userObservations = [];
    let lastVisible = '';
    for (let i in val) {
      let time = new Date(val[i].time);
      let crntTime = new Date().getTime();
      let dif = crntTime - time;
      if (dif <= 604800000) {
        continue;
      } else if (val[i].verified !== 'verified') {
        continue;
      }
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
      type.split(' ').map(keywd => {
        let found = result.map(val => {
          return val[1].toLowerCase().includes(keywd);
        });
        if (found.includes(true)) {
          userObservations.push([
            name,
            photo,
            photUrl,
            location,
            time,
            userNick,
            result,
            address,
          ]);
          lastVisible = i;
        } else if (type === 'all') {
          userObservations.push([
            name,
            photo,
            photUrl,
            location,
            time,
            userNick,
            result,
            address,
          ]);
          lastVisible = i;
        }
      });
      this.setState({
        userObservations: userObservations,
        activityIndicator: false,
      });
    }
    if (Object.keys(val).length <= 4) {
      lastVisible = '1';
    } else {
      userObservations.pop();
    }

    this.setState({
      activityIndicator: false,
      lastVisible: lastVisible,
      noObs: userObservations.length,
    });
  };

  getMoreObservations = async type => {
    let lastVisible = this.state.lastVisible;

    const data = await database()
      .ref(`/usersObservations/`)
      .orderByKey()
      .endAt(lastVisible)
      .limitToLast(5)
      .once('value');

    const val = data.val();
    console.log(val);
    let userObservations = [];
    for (let i in val) {
      let name = val[i].uname;
      let photo = val[i].uimg;
      let userNick = name.toLowerCase().replace(/ /g, '');
      let time = new Date(val[i].time);
      let crntTime = new Date().getTime();
      let dif = crntTime - time;
      if (dif <= 604800000) {
        continue;
      } else if (val[i].verified !== 'verified') {
        continue;
      }
      let photUrl = val[i].rphotos;
      let location = val[i].location;
      time = time.toString().split(' ');
      time = time.splice(0, time.length - 1);
      time = time.toString().replace(/,/g, ' ');
      let result = generateResult(val[i]);
      let address = val[i].address;

      type.split(' ').map(keywd => {
        let found = result.map(val => {
          return val[1].toLowerCase().includes(keywd);
        });
        if (found.includes(true)) {
          userObservations.push([
            name,
            photo,
            photUrl,
            location,
            time,
            userNick,
            result,
            address,
          ]);
          lastVisible = i;
        } else if (type === 'all') {
          userObservations.push([
            name,
            photo,
            photUrl,
            location,
            time,
            userNick,
            result,
            address,
          ]);
          lastVisible = i;
        }
      });
    }
    if (Object.keys(val).length <= 4) {
      lastVisible = '1';
    } else {
      userObservations.pop();
    }
    await this.setState({
      userObservations: [...this.state.userObservations, ...userObservations],
      activityIndicator: false,
      lastVisible: lastVisible,
      noObs: this.state.userObservations.length,
    });
  };

  _onRefresh() {
    this.setState({refreshing: true});
    this.getObservations('all').then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
          <Searchbar
            placeholder="Search"
            // style={{width: Dimensions.get('window').width - 10, margin: 5}}
            onChangeText={query => this.onTextChangeHandler(query)}
            value={this.state.firstQuery}
          />
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
            <View>
              {/* <View style={styles.chipContainer}>
              <Chip
                style={styles.chip}
                icon="gender-male"
                onPress={() => this.getObservations('male')}>
                Male
              </Chip>
              <Chip
                style={styles.chip}
                icon="gender-female"
                onPress={() => this.getObservations('female')}>
                Female
              </Chip>
              <Chip
                style={styles.chip}
                icon="emoticon-dead"
                onPress={() => this.getObservations('die')}>
                Dead
              </Chip>
              <Chip
                style={styles.chip}
                icon="account-group"
                onPress={() => this.getObservations('group')}>
                Groups
              </Chip>
              <Chip
                style={styles.chip}
                icon="information"
                onPress={() => this.getObservations('single')}>
                Single
              </Chip>
            </View> */}
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
                        title: item[0],
                        subtitle: item[5],
                        user: item[1],
                        content: item[6],
                        showPhoto: this.props.navigation,
                      })
                    }
                    style={{justifyContent: 'center'}}>
                    <Image style={styles.img} source={{uri: item[2]}} />
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
                onEndReached={() => this.getMoreObservations('all')}
                // How Close To The End Of List Until Next Data Request Is Made
                onEndReachedThreshold={0.1}
                // Refreshing (Set To True When End Reached)
                refreshing={this.state.activityIndicator}
              />
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
    marginTop: 5,
    width: Dimensions.get('window').width,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chip: {
    margin: 2,
  },
  img: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    margin: 2,
    justifyContent: 'center',
    borderRadius: 2,
  },
  imgConatiner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: Dimensions.get('window').width,
  },
  scrollView: {
    width: Dimensions.get('window').width,
    marginTop: 0,
  },
  welcome: {
    fontSize: 25,
  },
});
export default SearchScreen;
