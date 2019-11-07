/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {name as appName} from './app.json';

const theme = {
    ...DefaultTheme,
    roundness: 15,
    colors: {
      ...DefaultTheme.colors,
      primary: '#4b8b3b',
      accent: '#f1c40f',
    },
};

export default function Main() {
    return (
      <PaperProvider>
        <App />
      </PaperProvider>
    );
  }

AppRegistry.registerComponent(appName, () => Main);
