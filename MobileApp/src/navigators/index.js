/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {withTheme} from 'react-native-paper';

import MainTabs from './MainTabs';
import AuthStack from './AuthStack';
import ProfileStack from './ProfileStack';

const Stack = createStackNavigator();

const AppStack = ({theme}) => (
  <Stack.Navigator screenOptions={{headerMode: 'none'}}>
    <Stack.Screen name="Auth" component={AuthStack} />
    <Stack.Screen name="App" component={MainTabs} />
    <Stack.Screen name="Profile" component={ProfileStack} />
  </Stack.Navigator>
);

function App({theme}) {
  return (
    <NavigationContainer>
      <AppStack theme={theme} />
    </NavigationContainer>
  );
}

export default withTheme(App);
