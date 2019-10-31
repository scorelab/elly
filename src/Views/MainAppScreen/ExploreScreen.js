import * as React from 'react';
import { FAB, Portal, Appbar } from 'react-native-paper';
import {View, StyleSheet} from 'react-native'
import getRandomColor from '../../components/RandomColorGenerator/RandomColorGenerator'

class ExploreScreen extends React.Component{
    state = {
        open: false,
      };
    _goBack = () => console.log('Went back');

    _handleSearch = () => console.log('Searching');

    _handleMore = () => console.log('Shown more');

    render() {
        return (
            <View style={styles.container}>
                <Appbar.Header style={styles.appBar}>
                    <Appbar.Action icon="view-headline" onPress={this._handleSearch} />
                    <Appbar.Content
                        title="Title"
                        subtitle="Subtitle"
                    />
                    <Appbar.Action icon="view-list" onPress={this._handleSearch} />
                    <Appbar.Action icon="search-web" onPress={this._handleSearch} />
                    <Appbar.Action icon="dots-vertical" onPress={this._handleMore} />
                </Appbar.Header>
                <View style={styles.bottom}>
                    
                <Portal>
                    <FAB.Group
                        style={styles.fab}
                        open={this.state.open}
                        icon={this.state.open ? 'camera' : 'camera'}
                        actions={[
                        { icon: 'note',label: 'Note', onPress: () => console.log('Pressed add') },
                        { icon: 'camera', label: 'Camera', onPress: () => console.log('Pressed star')},
                        { icon: 'camera-image', label: 'Choose', onPress: () => console.log('Pressed email') },
                        { icon: 'camcorder', label: 'Camcoder', onPress: () => console.log('Pressed notifications') },
                        ]}
                        onStateChange={({ open }) => this.setState({ open })}
                        onPress={() => {
                        if (this.state.open) {
                            // do something if the speed dial is open
                        }
                        }}
                    />
                    </Portal>
                </View>
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
    },
    swipeBtn: {
        width: "40%",
        height: 50,
        justifyContent: 'center',
        marginBottom: 10,
        alignItems: 'center',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: getRandomColor(),
        alignSelf: 'stretch',
        alignItems: 'center',
      },
      fab: {
          marginBottom: 53,
      },
      appBar: {
        width:"100%"
      }
})
export default ExploreScreen;

