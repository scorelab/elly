import * as React from 'react';
import { View, StyleSheet } from 'react-native'
import { RadioButton, Text, Avatar, Divider, TextInput } from 'react-native-paper';

class RadioButtonGroupVertical extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            feild: 0,
        }
    }

    sendData = (value) => {
        this.props.parentCallback([value, this.props.type]);
    }

    radioButtonOnChangeHandler = (value) => {
        this.setState({
            feild: value
        })
        this.sendData(value)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar.Icon size={45} color='white' icon="comment-question" />
                    <Text style={styles.title}>{this.props.title} </Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                    <RadioButton.Group
                        onValueChange={value => this.radioButtonOnChangeHandler(value)}
                        value={this.state.feild}
                    >
                        {this.props.values.map((val, i) => {
                            return (
                                <View key={i} style={styles.buttonContainer}>
                                    <RadioButton value={i} />
                                    <Text>{val}</Text>
                                </View>
                            )
                        })}
                    </RadioButton.Group>
                </View>
                <Divider />
            </View>
        );
    }
}

class RadioButtonGroupHorizontal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            feild: 0,
            type: this.props.type
        }
    }

    sendData = () => {
        this.props.parentCallback([this.state.feild, this.state.type]);
    }

    radioButtonOnChangeHandler = (value) => {
        this.setState({ feild: value })
        this.sendData()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonGroup}>
                    <Avatar.Icon size={45} color='white' icon="comment-question" />
                    <Text style={styles.title}>{this.props.title} </Text>
                    <RadioButton.Group
                        onValueChange={value => this.radioButtonOnChangeHandler(value)}
                        value={this.state.feild}
                    >
                        {this.props.values.map((val, i) => {

                            return (
                                <View key={i} style={styles.buttonContainer}>
                                    <Text>{val}</Text>
                                    <RadioButton value={i} />
                                </View>
                            )
                        })}
                    </RadioButton.Group>
                </View>
                <Divider />
            </View>
        );
    }
}

class TextInputGroupHorizontal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            feild: '',
            type: this.props.type
        }
    }

    sendData = (value) => {
        this.props.parentCallback([value, this.props.type]);
    }

    textInputOnChangeHandler = (value) => {
        this.setState({ feild: value })
        this.sendData(value)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonGroup}>
                    <Avatar.Icon size={45} color='white' icon="comment-question" />
                    <Text style={styles.title}>{this.props.title} </Text>
                </View>
                <View style={styles.textInput}>
                    <TextInput
                        value={this.state.feild}
                        onChangeText={text => this.textInputOnChangeHandler(text)}
                        mode='outlined'
                        style={{ width: '100%' }}
                        multiline
                        keyboardType={this.props.isNumeric ? 'phone-pad' : 'default'}
                        placeholder={this.props.isNumeric ? 'Numerical response' : 'Write something'}
                    />
                </View>
                <Divider />
            </View>
        );
    }
}

class UneditableComponent extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return (
            <View>
                <View style={styles.uneditableComponent}>
                    <Avatar.Icon size={45} color='white' icon={this.props.icon} />
                    {/* <Text style={styles.title}>{this.props.title} </Text> */}
                    <Text style={styles.title}>{this.props.values.map((val, i) => { return <Text key={i}>{val.toString()} </Text> })}</Text>
                </View>
                <Divider />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginTop: 10,
        justifyContent: 'center'
    },
    buttonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        marginLeft: 5,
        fontSize: 15.8,
        flexShrink: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainerVert: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        marginRight: 10
    },
    uneditableComponent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 10,
    }
})

export { RadioButtonGroupVertical, RadioButtonGroupHorizontal, TextInputGroupHorizontal, UneditableComponent };

