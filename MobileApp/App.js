/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import {View} from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
// import { createBottomTabNavigator } from "react-navigation-tabs";
// import { createDrawerNavigator } from "react-navigation-drawer";

//Screens
import LoginScreen from './src/screens/LoginScreen/LoginScreen'
import CameraViewScreen from './src/screens/CameraViewScreen/CameraViewScreen'
import LandingScreen from './src/screens/LandingScreen/LandingScreen'
import FormScreen from './src/screens/FormScreen/FormScreen'
import FeedScreen from './src/screens/FeedScreen/FeedScreen'
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen'
import SearchScreen from './src/screens/SearchScreen/SearchScreen'
import DiscoverScreen from './src/screens/DiscoverScreen/DiscoverScreen'
import ShowPhotoScreen from './src/screens/ShowPhotoScreen/ShowPhotoScreen'
import ShowDetailedPhotoScreen from './src/screens/ShowDetailedPhotoScreen/ShowDetailedPhotoScreen'
import showLocationScreen from './src/screens/ShowLocationScreen/ShowLocationScreen'
import AboutScreen from './src/screens/AboutScreen/AboutScreen'
import {Avatar} from 'react-native-paper'

//SignIn stack
const AuthStack = createStackNavigator({
  SignIn: LoginScreen,
  
},
{
  mode: 'modal',
  headerMode: 'none',
}
);

//Home stack
const FeedStack = createStackNavigator({
  FeedScreen: FeedScreen,
  showDetailedPhoto: ShowDetailedPhotoScreen ,
  showLocationScreen: showLocationScreen,
});

const CameraStack = createStackNavigator({
  CameraViewScreen: CameraViewScreen,
  FormScreenStack: FormScreen,
  showPhoto:  ShowPhotoScreen,
});

const DiscoverStack = createStackNavigator({
  Discover: DiscoverScreen,
  showDetailedPhoto: ShowDetailedPhotoScreen,
  showLocationScreen: showLocationScreen
});

const SearchStack = createStackNavigator({
  Search:  SearchScreen,
  showDetailedPhoto: ShowDetailedPhotoScreen,
  showLocationScreen: showLocationScreen
});

const ProfileStack = createStackNavigator({
  ProfileScreen: ProfileScreen,
  showDetailedPhoto: ShowDetailedPhotoScreen,
  showLocationScreen: showLocationScreen,
  AboutScreen: AboutScreen
});

//Bottom navigator
const MainTabs = createMaterialBottomTabNavigator({
  FeedStack: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: [],
      tabBarIcon: ({ tintColor }) => (
        <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}><Avatar.Icon size={50} color='white' icon="home-variant" /></View>
      ),
    },
  },
  SearchStack: {
    screen: SearchStack,
    navigationOptions: {
      tabBarLabel: [],
      tabBarIcon: ({ tintColor }) => (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}><Avatar.Icon size={50} color='white' icon="image-search" /></View>
      ),
    },
  },
  PhotoLandingScreen: {
    screen: CameraStack,
    navigationOptions: {
      tabBarLabel: [],
      tabBarIcon: ({ tintColor }) => (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}><Avatar.Icon size={50} color='white' icon="camera-iris" /></View>
      ),
    },
  },
  Discover: {
    screen: DiscoverStack,
    navigationOptions: {
      tabBarLabel: [],
      tabBarIcon: ({ tintColor }) => (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}><Avatar.Icon size={50} color='white' icon="google-maps" /></View>
      ),
    },
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: [],
      tabBarIcon: ({ tintColor }) => (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}><Avatar.Icon size={50} color='white' icon="account-box" /></View>
      ),
    },
  },
});

const AppModalStack = createStackNavigator(
  {
    App: MainTabs,
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