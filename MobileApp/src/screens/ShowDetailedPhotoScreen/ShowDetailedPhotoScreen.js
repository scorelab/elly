import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {CardComponent} from '../../components/CardComponent/CardComponent';
import {ScrollView} from 'react-native-gesture-handler';
import {FeedDetails} from '../../components/FeedDetail/FeedDetails';
import {Appbar} from 'react-native-paper';

class ShowDetailedPhotoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {photos: []};
  }

  static navigationOptions = ({navigation}) => {
    const {params = []} = navigation.state;
    return {
      headerTitle: 'Observation',
      headerStyle: {
        backgroundColor: '#004c21',
      },
      headerTintColor: '#fff',
    };
  };

  render() {
    console.log(this.props.route.params);
    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Observation" />
        </Appbar.Header>
        <View style={styles.container}>
          <ScrollView>
            <FeedDetails
              title={this.props.route.params.title}
              subtitle={this.props.route.params.subtitle}
              user={this.props.route.params.user}
              image={this.props.route.params.img}
              content={this.props.route.params.content}
              isNavigate={false}
              showPhoto={this.props.navigation}
            />
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
    alignItems: 'center',
    alignSelf: 'stretch',
    width: Dimensions.get('window').width,
  },
});
export default ShowDetailedPhotoScreen;
