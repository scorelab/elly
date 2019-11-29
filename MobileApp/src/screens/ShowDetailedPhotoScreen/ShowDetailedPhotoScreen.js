import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'
import { CardComponent } from '../../components/CardComponent/CardComponent'
import { ScrollView } from 'react-native-gesture-handler';

class ShowDetailedPhotoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { photos: [] };
    }

    static navigationOptions = ({ navigation }) => {
        const { params = [] } = navigation.state
        return {
            headerTitle: 'Observation',
            headerStyle: {
                backgroundColor: '#4b8b3b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <CardComponent
                        title={this.props.navigation.getParam('title')}
                        subtitle={this.props.navigation.getParam('subtitle')}
                        user={this.props.navigation.getParam('user')}
                        image={this.props.navigation.getParam('img')}
                        content={this.props.navigation.getParam('content')}
                        isNavigate={false}
                        showPhoto={this.props.navigation}
                    />
                </ScrollView>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'stretch',
        width: Dimensions.get('window').width
    },
})
export default ShowDetailedPhotoScreen;