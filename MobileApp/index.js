/**
 * @format
 */
import * as React from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import App from './App';
import {configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {name as appName} from './app.json';

const theme = {
    ...DefaultTheme,
    roundness: 10,
    colors: {
      ...DefaultTheme.colors,
      primary: '#0b6623',
      accent: '#f1c40f',
    },
    fonts: configureFonts(fontConfig),
};

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

export default function Main() {
    return (
      <PaperProvider theme={theme}>
        <StatusBar backgroundColor="#006400" barStyle="light-content" />
        <App />
      </PaperProvider>
    );
  }

AppRegistry.registerComponent(appName, () => Main);
