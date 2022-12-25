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
import CameraViewScreen from '../screens/CameraViewScreen/CameraViewScreen';
import FormScreen from '../screens/FormScreen/FormScreen';
import ShowPhotoScreen from '../screens/ShowPhotoScreen/ShowPhotoScreen';

const Stack = createStackNavigator();

const CameraStack = () => (
  <Stack.Navigator screenOptions={{headerMode: 'none'}}>
    <Stack.Screen name="CameraViewScreen" component={CameraViewScreen} />
    <Stack.Screen name="FormScreenStack" component={FormScreen} />
    <Stack.Screen name="showPhoto" component={ShowPhotoScreen} />
  </Stack.Navigator>
);

export default withTheme(CameraStack);
