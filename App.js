/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './src/Views/LoginScreen/LoginScreen'
import InfoScreen_1 from './src/Views/InfoScreen/InfoScreen_1'
import InfoScreen_2 from './src/Views/InfoScreen/InfoScreen_2'
import InfoScreen_3 from './src/Views/InfoScreen/InfoScreen_3'
import InfoScreen_4 from './src/Views/InfoScreen/InfoScreen_4'
import MainAppScreen from './src/Views/MainAppScreen/MainAppScreen'

const App = createSwitchNavigator({
  Info_1: {
    screen: InfoScreen_1,
  },
  Info_2: {
    screen: InfoScreen_2,
  },
  Info_3: {
    screen: InfoScreen_3,
  },
  Info_4: {
    screen: InfoScreen_4,
  },
  Auth: {
    screen: LoginScreen,
  },
  App: {
    screen: MainAppScreen,
  },
});

export default createAppContainer(App);
