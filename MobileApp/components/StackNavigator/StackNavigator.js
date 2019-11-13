import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../../Views/'


const AppNavigator = createStackNavigator({
    Home: {
      screen: HomeScreen,
    },
});

export default createAppContainer(AppNavigator);