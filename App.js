/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import LoginScreen from './src/Views/LoginScreen/LoginScreen'
import Example from './src/Views/Example/Example'
import CameraViewScreen from './src/Views/CameraViewScreen/CameraViewScreen'
import LandingScreen from './src/Views/LandingScreen/LandingScreen'
import PhotoLandingScreen from './src/Views/PhotoLandingScreen/PhotoLandingScreen'
import FormScreen from './src/Views/FormScreen/FormScreen'
import GalleryScreen from './src/Views/GalleryScreen/GalleryScreen'
import FeedScreen from './src/Views/FeedScreen/FeedScreen'

import Icon from 'react-native-vector-icons/FontAwesome';

const AuthStack = createStackNavigator({
  Landing: {
    screen: Example,
    navigationOptions: {
      headerTitle: 'Landing',
    },
  },
  SignIn: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: 'Sign In',
    },
  },
});

const FeedStack = createStackNavigator({
  Feed: {
    screen: FeedScreen,
    navigationOptions: {
      headerTitle: 'Feed',
    },
  },
});

const GalleryStack = createStackNavigator({
  Gallery: {
    screen: GalleryScreen,
    navigationOptions: {
      headerTitle: 'Gallery',
    },
  },
});

const CameraStack = createStackNavigator({
  Search: {
    screen: CameraViewScreen,
    navigationOptions: {
      headerTitle: 'Search',
    },
  },
  Details: {
    screen: FormScreen,
    navigationOptions: {
      headerTitle: 'Details',
    },
  },
});

const DiscoverStack = createStackNavigator({
  Discover: {
    screen: Example,
    navigationOptions: {
      headerTitle: 'Discover',
    },
  },
});

const SearchStack = createStackNavigator({
  Search: {
    screen: Example,
    navigationOptions: {
      headerTitle: 'Search',
    },
  },
});

const ProfileStack = createStackNavigator({
  Discover: {
    screen: Example,
    navigationOptions: {
      headerTitle: 'Profile',
    },
  },
});

const MainTabs = createBottomTabNavigator({
  FeedStack: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="users" size={30} color="grey" />
      ),
    },
    tabBarOptions: { 
      showIcon: true ,
      showLabel: false
   },
  },
  SearchStack: {
    screen: SearchStack,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="search" size={30} color="grey" />
      ),
    },
    tabBarOptions: { 
      showIcon: true 
   },
  },
  PhotoLandingScreen: {
    screen: PhotoLandingScreen,
    navigationOptions: {
      tabBarLabel: 'Photo',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="camera" size={30} color="grey" />
      ),
    },
    tabBarOptions: { 
      showIcon: true 
   },
  },
  Discover: {
    screen: DiscoverStack,
    navigationOptions: {
      tabBarLabel: 'Discover',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="map-marker" size={30} color="grey" />
      ),
    },
    tabBarOptions: { 
      showIcon: true 
   },
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="user" size={30} color="grey" />
      ),
    },
    tabBarOptions: { 
      showIcon: true 
   },
  },
});

const PhotoTabs = createBottomTabNavigator({
  Gallery: {
    screen: GalleryStack,
    navigationOptions: {
      tabBarLabel: 'Gallery',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="image" size={30} color="grey" />
      ),
    },
    tabBarOptions: { 
      showIcon: true 
   },
  },
  Camera: {
    screen: CameraStack,
    navigationOptions: {
      tabBarLabel: 'Camera',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="camera" size={30} color="grey" />
      ),
    },
    tabBarOptions: { 
      showIcon: true 
   },
  },
});

const SettingsStack = createStackNavigator({
  SettingsList: {
    screen: Example,
    navigationOptions: {
      headerTitle: 'Settings List',
    },
  },
  Profile: {
    screen: Example,
    navigationOptions: {
      headerTitle: 'Profile',
    },
  },
});

const MainDrawer = createDrawerNavigator({
  MainTabs: MainTabs,
  Settings: SettingsStack,
});

const AppModalStack = createStackNavigator(
  {
    App: MainDrawer,
    PhotoScreen: {
      screen: PhotoTabs,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const App = createSwitchNavigator({
  Loading: {
    screen: LandingScreen,
  },
  Auth: {
    screen: AuthStack,
  },
  App: {
    screen: AppModalStack,
  },
});

export default createAppContainer(App);