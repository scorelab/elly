import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  RadioButtonGroupVertical,
  RadioButtonGroupHorizontal,
  TextInputGroupHorizontal,
  UneditableComponent,
} from '../../components/FormComponents/FormComponents';
import Geolocation from '@react-native-community/geolocation';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import {Appbar, Button} from 'react-native-paper';
import {generateUUID} from '../../components/UserDataHandling/UserDataHandling';
import ActivityIndicator from '../../components/ActivityIndicator/ActivityIndicator';
import {googleMapAPIKey} from '../../config/config';

class FormScreen extends React.Component {
  constructor(props) {
    super(props);

    let date = new Date();
    let time = date.getTime();
    date = date.toString().split(' ');
    date = date.splice(0, date.length - 2);
    this.state = {
      photos: this.props.route.params.dataUri,
      rphotos: this.props.route.params.ruri,
      isAlive: 1,
      isSingle: 0,
      cause: 0,
      accidentKind: 0,
      intentinalKind: 0,
      sex: 0,
      noOfIndividuals: 0,
      noOfDeaths: 0,
      noOfTusks: 0,
      tusksStatus: 0,
      haveTusks: 0,
      howManyTuskers: 0,
      location: ['', ''],
      activityIndicator: false,
      address: [],
      date: date,
      accidentOther: '',
      intentionalOther: '',
      verified: 'pending',
      notes: '',
      time: time,
    };
  }

  componentDidMount() {
    this.findCoordinates();
  }

  uploadData = async function () {
    // Get the users ID
    console.log('Pressed');
    this.setState({
      activityIndicator: true,
    });
    const uid = await auth().currentUser.uid;
    const user = await database().ref(`/users/${uid}`).once('value');
    const uname = user.val().name;
    const uimg = user.val().photo;

    console.log(uid);
    // Create a reference
    const ref = database().ref(`/usersObservations`);
    const randomID = generateUUID();
    // console.log(randomID)
    const storageRef = storage().ref('/observations/' + randomID + '.jpeg');

    await storageRef.putFile(this.state.photos);

    const url = await storageRef.getDownloadURL();

    const storageRef2 = storage().ref(
      '/observations/lowQal/' + randomID + 'L.jpeg',
    );

    await storageRef2.putFile(this.state.rphotos);

    const url2 = await storageRef2.getDownloadURL();
    console.log(url2);
    //let time = new Date().getTime();
    await ref.push({
      photoURL: url,
      rphotos: url2,
      isAlive: this.state.isAlive,
      isSingle: this.state.isSingle,
      cause: this.state.cause,
      accidentKind: this.state.accidentKind,
      intentinalKind: this.state.intentinalKind,
      sex: this.state.sex,
      noOfIndividuals: this.state.noOfIndividuals,
      noOfDeaths: this.state.noOfDeaths,
      noOfTusks: this.state.noOfTusks,
      tusksStatus: this.state.tusksStatus,
      haveTusks: this.state.haveTusks,
      howManyTuskers: this.state.howManyTuskers,
      location: this.state.location,
      time: this.state.time,
      accidentOther: this.state.accidentOther,
      intentionalOther: this.state.intentionalOther,
      verified: this.state.verified,
      notes: this.state.notes,
      uid: uid,
      uname: uname,
      uimg: uimg,
      address: this.state.address.toString(),
    });

    await this.setState({
      activityIndicator: false,
    });
    this.props.navigation.navigate('CameraViewScreen');
  };

  requestLocationPermission = async function () {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  findCoordinates = () => {
    console.log(this.requestLocationPermission);
    if (this.requestLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          const initialPosition = position;
          // console.log(initialPosition)
          const lon = initialPosition['coords']['longitude'];
          const lat = initialPosition['coords']['latitude'];

          fetch(
            'https://maps.googleapis.com/maps/api/geocode/json?address=' +
              lat +
              ',' +
              lon +
              '&key=' +
              googleMapAPIKey,
          )
            .then(response => response.json())
            .then(responseJson => {
              this.setState({
                address:
                  responseJson.results.length > 0
                    ? responseJson.results[0].formatted_address.split(',')
                    : 'Unnamed location'.split(' '),
              });
              // console.log(
              //   'ADDRESS GEOCODE is !! => ' +
              //     JSON.stringify(responseJson.results[0].formatted_address),
              // );
            });
          this.setState({
            location: [
              initialPosition['coords']['longitude'],
              initialPosition['coords']['latitude'],
            ],
          });
        },
        error => console.log('Error', JSON.stringify(error)),
        {enableHighAccuracy: false},
      );
    }
  };

  FormComponentCallbackFunction = childData => {
    let type = childData[1];
    let obj = {};
    obj[type] = childData[0];
    this.setState(obj);
    // console.log(this.state)
    // console.log(childData[1] + ": " + childData[0])
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Observation" />
          <Button
            style={{margin: 5}}
            mode="contained"
            onPress={() => this.uploadData()}>
            Share
          </Button>
        </Appbar.Header>

        <View style={styles.container}>
          <ImageBackground
            blurRadius={2}
            style={{width: '100%'}}
            source={{uri: this.state.photos}}>
            <TouchableOpacity
              style={styles.imgHolder}
              onPress={() =>
                navigate('showPhoto', {img: this.state.photos.toString()})
              }>
              <Image
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 20,
                }}
                source={{uri: this.state.photos.toString()}}
              />
            </TouchableOpacity>
          </ImageBackground>

          <View>
            <ActivityIndicator
              title={'Uploading'}
              showIndicator={this.state.activityIndicator}
            />
          </View>

          <ScrollView>
            <UneditableComponent
              title={'Location'}
              icon={'map-marker'}
              values={this.state.address}
            />
            <UneditableComponent
              title={'Date'}
              icon={'calendar-clock'}
              values={this.state.date}
            />

            <TextInputGroupHorizontal
              title={'Notes'}
              type={'notes'}
              parentCallback={this.FormComponentCallbackFunction}
              multiline={true}
              isNumeric={false}
            />

            <RadioButtonGroupHorizontal
              parentCallback={this.FormComponentCallbackFunction}
              type={'isAlive'}
              title={'Is it Alive or Dead?'}
              values={['Alive', 'Dead']}
            />

            {this.state.isAlive === 1 ? (
              <RadioButtonGroupVertical
                parentCallback={this.FormComponentCallbackFunction}
                type={'isSingle'}
                title={'Group type?'}
                values={[
                  'Single individual',
                  'Group with calves',
                  'Group withutout calves',
                ]}
              />
            ) : (
              <RadioButtonGroupVertical
                parentCallback={this.FormComponentCallbackFunction}
                type={'cause'}
                title={'Cause?'}
                values={['Accident', 'Intentional', "Dont't know"]}
              />
            )}

            {this.state.isAlive === 0 && this.state.cause === 0 ? (
              <RadioButtonGroupVertical
                parentCallback={this.FormComponentCallbackFunction}
                type={'accidentKind'}
                title={'What kind of accident?'}
                values={[
                  'Vehicle strike',
                  'Train strike',
                  'Fell into well',
                  'Electrocution',
                  'Other (text note)',
                ]}
              />
            ) : (
              <View />
            )}

            {this.state.isAlive === 0 &&
            this.state.cause === 0 &&
            this.state.accidentKind === 4 ? (
              <TextInputGroupHorizontal
                title={'Briefly describe'}
                type={'accidentOther'}
                parentCallback={this.FormComponentCallbackFunction}
                multiline={true}
                isNumeric={false}
              />
            ) : (
              <View />
            )}

            {this.state.isAlive === 0 && this.state.cause === 1 ? (
              <RadioButtonGroupVertical
                parentCallback={this.FormComponentCallbackFunction}
                type={'intentinalKind'}
                title={'How it happened intentionally?'}
                values={[
                  'Conflict-related',
                  'Hunting-related',
                  'Other (text note)',
                  'Don’t know',
                ]}
              />
            ) : (
              <View />
            )}

            {this.state.isAlive === 0 &&
            this.state.cause === 1 &&
            this.state.intentinalKind === 2 ? (
              <TextInputGroupHorizontal
                title={'Briefly describe'}
                type={'intentionalOther'}
                parentCallback={this.FormComponentCallbackFunction}
                multiline={true}
                isNumeric={false}
              />
            ) : (
              <View />
            )}

            {this.state.isAlive === 1 ? (
              <View>
                <RadioButtonGroupVertical
                  parentCallback={this.FormComponentCallbackFunction}
                  type={'sex'}
                  title={'What is the sex of the elephant(s)?'}
                  values={['Male', 'Female', 'Mixed', 'Don’t know']}
                />
              </View>
            ) : (
              <View>
                <TextInputGroupHorizontal
                  title={'How many animals have died? (numerical responce)'}
                  type={'noOfDeaths'}
                  parentCallback={this.FormComponentCallbackFunction}
                  multiline={false}
                  isNumeric={true}
                />
                <RadioButtonGroupVertical
                  parentCallback={this.FormComponentCallbackFunction}
                  type={'sex'}
                  title={'What is the sex of the elephant(s)?'}
                  values={['Male', 'Female', 'Mixed', 'Don’t know']}
                />
                <TextInputGroupHorizontal
                  title={'How many have tusks? (numerical responce)'}
                  type={'noOfTusks'}
                  parentCallback={this.FormComponentCallbackFunction}
                  multiline={false}
                  isNumeric={true}
                />
                <RadioButtonGroupVertical
                  parentCallback={this.FormComponentCallbackFunction}
                  type={'tusksStatus'}
                  title={'Status of tusks?'}
                  values={[
                    'Tusks naturally absent',
                    'Tusks present',
                    'Tusks removed',
                    'Don’t know',
                  ]}
                />
              </View>
            )}

            {this.state.isAlive === 1 && this.state.isSingle === 0 ? (
              <RadioButtonGroupVertical
                parentCallback={this.FormComponentCallbackFunction}
                type={'haveTusks'}
                title={'Does it have tusks?'}
                values={['Yes', 'No', "Can't see"]}
              />
            ) : (
              <View />
            )}

            {this.state.isAlive === 1 && this.state.isSingle !== 0 ? (
              <View>
                <RadioButtonGroupVertical
                  parentCallback={this.FormComponentCallbackFunction}
                  type={'noOfIndividuals'}
                  title={'How many individuals?'}
                  values={[
                    '2 to 5 individuals',
                    '6 to 10 individuals',
                    'Mixed',
                    'More than 10',
                  ]}
                />
                <RadioButtonGroupVertical
                  parentCallback={this.FormComponentCallbackFunction}
                  type={'haveTusks'}
                  title={'How many have tusks?'}
                  values={[
                    'None',
                    '1 to 5 individuals',
                    '6 to 10 individuals',
                    'More than 10',
                  ]}
                />
              </View>
            ) : (
              <View />
            )}
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  welcome: {
    fontSize: 25,
  },
  imgHolder: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
    marginLeft: 0,
    alignItems: 'center',
  },
});
export default FormScreen;
