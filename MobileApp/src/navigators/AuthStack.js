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
import LandingScreen from '../screens/LandingScreen/LandingScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import EmailAuthScreenSignIn from '../screens/EmailAuthScreen/EmailAuthSignInScreen';
import EmailAuthScreenSignUp from '../screens/EmailAuthScreen/EmailAuthSignUpScreen';

//Screens

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{headerMode: 'none'}}>
    <Stack.Screen name="Loading" component={LandingScreen} />
    <Stack.Screen name="SignIn" component={LoginScreen} />
    <Stack.Screen name="Email" component={EmailAuthScreenSignIn} />
    <Stack.Screen name="EmailSignUp" component={EmailAuthScreenSignUp} />
  </Stack.Navigator>
);

export default withTheme(AuthStack);
