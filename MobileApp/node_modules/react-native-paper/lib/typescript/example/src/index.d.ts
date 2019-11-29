import * as React from 'react';
import { Theme } from 'react-native-paper';
declare type State = {
    theme: Theme;
};
export default class PaperExample extends React.Component<{}, State> {
    state: {
        theme: import("../../src/types").Theme;
    };
    componentDidMount(): Promise<void>;
    _savePreferences: () => Promise<void>;
    _toggleTheme: () => void;
    render(): JSX.Element;
}
export {};
