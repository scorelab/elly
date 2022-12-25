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
import DiscoverScreen from '../screens/DiscoverScreen/DiscoverScreen';
import ShowDetailedPhotoScreen from '../screens/ShowDetailedPhotoScreen/ShowDetailedPhotoScreen';
import ShowLocationScreen from '../screens/ShowLocationScreen/ShowLocationScreen';

const Stack = createStackNavigator();

const DiscoverStack = () => (
  <Stack.Navigator screenOptions={{headerMode: 'none'}}>
    <Stack.Screen name="DiscoverScreen" component={DiscoverScreen} />
    <Stack.Screen
      name="showDetailedPhoto"
      component={ShowDetailedPhotoScreen}
    />
    <Stack.Screen name="showLocationScreen" component={ShowLocationScreen} />
  </Stack.Navigator>
);

export default withTheme(DiscoverStack);
