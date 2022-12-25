/**
 * @format
 */
import * as React from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import App from './src/navigators/index';
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {name as appName} from './app.json';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'ProximaNova-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Proxima Nova Alt Thin',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Proxima Nova Alt Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Proxima Nova Thin',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  roundness: 0,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EEF5DB',
    accent: '#FE5F55',
  },
  // fonts: configureFonts(fontConfig),
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar
        // backgroundColor="#004c21"
        barStyle="light-content"
      />
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
