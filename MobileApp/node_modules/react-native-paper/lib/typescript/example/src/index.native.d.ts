import * as React from 'react';
import { Theme } from 'react-native-paper';
declare type State = {
    theme: Theme;
    rtl: boolean;
};
export default class PaperExample extends React.Component<{}, State> {
    state: {
        theme: import("../../src/types").Theme;
        rtl: boolean;
    };
    componentDidMount(): Promise<void>;
    _savePreferences: () => Promise<void>;
    _toggleTheme: () => void;
    _toggleRTL: () => void;
    render(): JSX.Element;
}
export {};
