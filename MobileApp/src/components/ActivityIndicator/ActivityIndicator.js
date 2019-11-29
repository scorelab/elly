import React, { Component } from 'react'
import {
    ActivityIndicator,
    View,
    Text
} from 'react-native'
import { Dialog, Portal } from 'react-native-paper';
export default class App extends Component {
    state = {
        visible: false,
    };


    render() {
        return (
            <View>
                <Portal>
                    <Dialog
                        visible={this.props.showIndicator}>
                        <Dialog.Content>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color="#4b8b3b" /><Text style={{ marginLeft: 10 }}>{this.props.title}...</Text>
                            </View>

                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </View>
        );
    }
}