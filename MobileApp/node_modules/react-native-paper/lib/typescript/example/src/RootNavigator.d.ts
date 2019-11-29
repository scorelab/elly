import * as React from 'react';
export default class App extends React.Component<{}, any> {
    state: {
        navigation: {
            navigate: import("@reach/router").NavigateFn;
            goBack: () => void;
            state: {
                params: {};
            };
            setParams: (params: any) => void;
        };
    };
    render(): JSX.Element;
}
