import React from 'react';
import {NavigationEvents} from 'react-navigation';

/**
 * Now, this onDidFocus event will be triggered every time when the page comes to focus despite coming from goBack() or navigate.
 */

class PhotoLandingScreen extends React.Component{
    shouldComponentUpdate(){
        this.forceUpdate()
    }
    render() {
        return (
            <NavigationEvents onDidFocus={() => this.props.navigation.navigate('PhotoScreen')} />
        );
    }
}

export default PhotoLandingScreen;

