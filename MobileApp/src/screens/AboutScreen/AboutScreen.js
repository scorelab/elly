import * as React from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Linking,
} from 'react-native';
import {Appbar, Divider, Text} from 'react-native-paper';
import {SLOGO, COVER, TLOGO, LOGOB} from '../../images/index';
class AboutScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'About Ele Watch',
      headerStyle: {
        backgroundColor: '#004c21',
      },
      headerTintColor: '#fff',
    };
  };

  render() {
    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="About EleWatch" />
        </Appbar.Header>
        <View style={styles.container}>
          {/* <ImageBackground source={COVER} style={styles.imgContainer}> */}
          <Image style={styles.logo} source={LOGOB} />
          <Text style={styles.bigText}> Developed By </Text>
          <View style={styles.cmpLogoCntner}>
            <Image style={styles.companyLogos} source={SLOGO} />
            {/* <Text style={styles.bigText}> & </Text> */}
            <Image style={styles.companyLogos} source={TLOGO} />
          </View>
          <Divider />
          <View style={styles.info}>
            <Text style={styles.paragraph}>
              This app is developed by ScoreLab origanization with the
              collaboration of Trunks & Leaves organization for elephant
              conservation purposes.{'\n'}
              {'\n'}
              For more information contact us:
              <Text
                style={{fontStyle: 'italic'}}
                onPress={() => Linking.openURL('https://mail.google.com')}>
                {' '}
                elly@scorelab.org
              </Text>
              {'\n'}
              {'\n'}
              <Text onPress={() => Linking.openURL('http://www.scorelab.org/')}>
                Visits http://www.scorelab.org/
              </Text>
              {'\n'}
              <Text
                onPress={() =>
                  Linking.openURL('http://www.trunksnleaves.org/index.html')
                }>
                Visits http://www.trunksnleaves.org
              </Text>
              {'\n'}
              {'\n'}
            </Text>
          </View>
          {/* </ImageBackground> */}
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
    width: Dimensions.get('window').width,
    alignItems: 'center',
    height: Dimensions.get('window').height,
  },
  logo: {
    width: 80,
    height: 80,
    // margin: 10,
    resizeMode: 'stretch',
  },
  bigText: {
    textAlign: 'center',
    // color: 'black',
    // fontSize: 18,
  },
  companyLogos: {
    width: '40%',
    height: 100,
    resizeMode: 'stretch',
    // borderRadius: 20,
  },
  cmpLogoCntner: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    padding: 10,
  },
  paragraph: {
    textAlign: 'justify',
    // color: 'black',
    // fontSize: 17,
    margin: 5,
    // fontWeight: '100',
  },
  imgContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    height: Dimensions.get('window').height,
  },
});
export default AboutScreen;
