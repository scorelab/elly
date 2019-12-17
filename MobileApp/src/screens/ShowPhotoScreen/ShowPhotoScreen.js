import * as React from 'react';
import { View, StyleSheet, PermissionsAndroid, Dimensions, Image } from 'react-native'

class ShowPhotoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { photos: [] };
    }

    static navigationOptions = ({ navigation }) => {
        const { params = [] } = navigation.state
        return {
            headerTitle: 'Snapshot',
            headerStyle: {
                backgroundColor: '#0b6623',
            },
            headerTintColor: '#fff',
        }
    }

    requestStoragePermission = async function () {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true

            } else {
                return false
            }
        } catch (err) {
            //console.warn(err);
            return false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.photos !== "" ?
                    <View style={{ flex: 1 }}>
                        <Image
                            style={{
                                flex: 1,
                                alignSelf: 'stretch',
                                width: Dimensions.get('window').width,
                            }}
                            resizeMode={'contain'}
                            source={{ uri: this.props.navigation.getParam('img') }}
                        />
                    </View>
                    :
                    <View></View>
                }
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        width: "100%"
    },
})
export default ShowPhotoScreen;