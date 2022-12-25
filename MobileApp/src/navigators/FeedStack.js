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
import FeedScreen from '../screens/FeedScreen/FeedScreen';
import ShowDetailedPhotoScreen from '../screens/ShowDetailedPhotoScreen/ShowDetailedPhotoScreen';
import ShowLocationScreen from '../screens/ShowLocationScreen/ShowLocationScreen';
import SearchStack from './SearchStack';

const Stack = createStackNavigator();

const FeedStack = () => (
  <Stack.Navigator screenOptions={{headerMode: 'none'}}>
    <Stack.Screen name="FeedScreen" component={FeedScreen} />
    <Stack.Screen
      name="showDetailedPhoto"
      component={ShowDetailedPhotoScreen}
    />
    <Stack.Screen name="showLocationScreen" component={ShowLocationScreen} />
    <Stack.Screen name="SearchStack" component={SearchStack} />
  </Stack.Navigator>
);

export default withTheme(FeedStack);
