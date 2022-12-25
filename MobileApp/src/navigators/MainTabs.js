/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {withTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import FeedStack from './FeedStack';
import SearchStack from './SearchStack';
import CameraStack from './CameraStack';
import DiscoverStack from './DiscoverStack';
// import ProfileStack from './ProfileStack';

const Tab = createMaterialBottomTabNavigator();

const MainTabs = ({theme}) => (
  <Tab.Navigator
    theme={theme}
    barStyle={{
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Tab.Screen
      name="FeedStack"
      component={FeedStack}
      options={{
        tabBarLabel: [],
        tabBarIcon: ({tintColor}) => <Icon name="home" size={26} />,
      }}
    />
    {/* <Tab.Screen
      name="SearchStack"
      component={SearchStack}
      options={{
        tabBarLabel: [],
        tabBarIcon: ({tintColor}) => <Icon name="image-outline" size={26} />,
      }}
    /> */}
    <Tab.Screen
      name="PhotoLandingScreen"
      component={CameraStack}
      options={{
        tabBarLabel: [],
        tabBarIcon: ({tintColor}) => <Icon name="camera-iris" size={26} />,
      }}
    />
    <Tab.Screen
      name="Discover"
      component={DiscoverStack}
      options={{
        tabBarLabel: [],
        tabBarIcon: ({tintColor}) => <Icon name="google-maps" size={26} />,
      }}
    />
    {/* <Tab.Screen
      name="Profile"
      component={ProfileStack}
      options={{
        tabBarLabel: [],
        tabBarIcon: ({tintColor}) => <Icon name="account" size={26} />,
      }}
    /> */}
  </Tab.Navigator>
);

export default withTheme(MainTabs);
