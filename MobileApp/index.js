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
      primary: '#4b8b3b',
      accent: '#f1c40f',
    },
    fonts: configureFonts(fontConfig),
};

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
};

export default function Main() {
    return (
      <PaperProvider theme={theme}>
        <StatusBar backgroundColor="#4b8b3b" barStyle="light-content" />
        <App />
      </PaperProvider>
    );
  }

AppRegistry.registerComponent(appName, () => Main);
