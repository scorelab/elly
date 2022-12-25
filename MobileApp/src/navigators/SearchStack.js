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
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import ShowDetailedPhotoScreen from '../screens/ShowDetailedPhotoScreen/ShowDetailedPhotoScreen';
import ShowLocationScreen from '../screens/ShowLocationScreen/ShowLocationScreen';

const Stack = createStackNavigator();

const SearchStack = () => (
  <Stack.Navigator screenOptions={{headerMode: 'none'}}>
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen
      name="showDetailedPhoto"
      component={ShowDetailedPhotoScreen}
    />
    <Stack.Screen name="showLocationScreen" component={ShowLocationScreen} />
  </Stack.Navigator>
);

export default withTheme(SearchStack);
