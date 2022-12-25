/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {withTheme} from 'react-native-paper';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import ShowDetailedPhotoScreen from '../screens/ShowDetailedPhotoScreen/ShowDetailedPhotoScreen';
import ShowLocationScreen from '../screens/ShowLocationScreen/ShowLocationScreen';
import AboutScreen from '../screens/AboutScreen/AboutScreen';

const Stack = createStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{headerMode: 'none'}}>
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen
      name="showDetailedPhoto"
      component={ShowDetailedPhotoScreen}
    />
    <Stack.Screen name="showLocationScreen" component={ShowLocationScreen} />
    <Stack.Screen name="AboutScreen" component={AboutScreen} />
  </Stack.Navigator>
);

export default withTheme(ProfileStack);
