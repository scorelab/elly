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
import LoginScreen from './src/Views/LoginScreen/LoginScreen'
import CameraViewScreen from './src/Views/CameraViewScreen/CameraViewScreen'
import LandingScreen from './src/Views/LandingScreen/LandingScreen'
import FormScreen from './src/Views/FormScreen/FormScreen'
import FeedScreen from './src/Views/FeedScreen/FeedScreen'
import ProfileScreen from './src/Views/ProfileScreen/ProfileScreen'
import SearchScreen from './src/Views/SearchScreen/SearchScreen'
import DiscoverScreen from './src/Views/DiscoverScreen/DiscoverScreen'
import ShowPhotoScreen from './src/Views/ShowPhotoScreen/ShowPhotoScreen'
import ShowDetailedPhotoScreen from './src/Views/ShowDetailedPhotoScreen/ShowDetailedPhotoScreen'

import {Avatar} from 'react-native-paper'

const AuthStack = createStackNavigator({
  SignIn: LoginScreen,
  
},
{
  mode: 'modal',
  headerMode: 'none',
}
);

const FeedStack = createStackNavigator({
  FeedScreen: FeedScreen,
  showDetailedPhoto: ShowDetailedPhotoScreen ,
});

const CameraStack = createStackNavigator({
  CameraViewScreen: CameraViewScreen,
  FormScreenStack: FormScreen,
  showPhoto:  ShowPhotoScreen,
});

const DiscoverStack = createStackNavigator({
  Discover: DiscoverScreen,
});

const SearchStack = createStackNavigator({
  Search:  SearchScreen,
});

const ProfileStack = createStackNavigator({
  ProfileScreen: ProfileScreen,
},
{
  mode: 'modal',
  headerMode: 'none',
});

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
},);

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