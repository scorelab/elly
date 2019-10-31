import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import ExploreScreen from './ExploreScreen'

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

export default class MainAppScreen extends React.Component {
  state = {
    index: 1,
    routes: [
      { key: 'users', title: 'Community', icon: 'account-group' },
      { key: 'map', title: 'Explore', icon: 'map-search' },
      { key: 'info', title: 'Information', icon: 'information-outline' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    world: MusicRoute,
    map: ExploreScreen,
    info: RecentsRoute,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}