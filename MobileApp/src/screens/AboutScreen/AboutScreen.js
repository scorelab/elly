import * as React from 'react';
import { View, Image, Text, Dimensions, StyleSheet, Linking } from 'react-native'
import { Divider } from 'react-native-paper';
import {SLOGO, TLOGO, LOGOB} from '../../images/index'

class AboutScreen extends React.Component {

    constructor(props) {
        super(props)
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "About Elly",
            headerStyle: {
                backgroundColor: '#4b8b3b',
            },
            headerTintColor: '#fff',

        }
    }

    render() {
        return (
            <View style={styles.container}>

                <Image style={styles.logo} source={LOGOB} />
                <Text style={styles.bigText}> Developed By  </Text>
                <View style={styles.cmpLogoCntner}>
                    <Image style={styles.companyLogos} source={SLOGO} />
                    <Text style={styles.bigText}> & </Text>
                    <Image style={styles.companyLogos} source={TLOGO} />
                </View>
                <Divider />
                <View style={styles.info}>
                    <Text style={styles.paragraph}>This app is developed by
                        ScoreLab origanization with the collaboration of Trunks & Leaves organization for elephant conservation purposes.{'\n'}{'\n'}
                        For more information contact us:
                        <Text style={{ fontStyle: 'italic' }} onPress={() => Linking.openURL('https://mail.google.com')}> elly@scorelab.org</Text>{'\n'}{'\n'}
                        <Text onPress={() => Linking.openURL('http://www.scorelab.org/')}>Visits http://www.scorelab.org/
                        </Text>{'\n'}

                        <Text onPress={() => Linking.openURL('http://www.trunksnleaves.org/index.html')}>Visits http://www.trunksnleaves.org
                        </Text>{'\n'}{'\n'}


                    </Text>
                </View>
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
    logo: {
        width: 80,
        height: 60,
        margin: 10,
        resizeMode: 'stretch'
    },
    bigText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20
    },
    companyLogos: {
        width: 100,
        height: 100,
        resizeMode: 'stretch',
        borderRadius: 20
    },
    cmpLogoCntner: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    info: {
        marginTop: 20,
        padding: 0
    },
    paragraph: {
        textAlign: 'justify',
        color: 'black',
        fontSize: 17,
        margin: 5,
        fontWeight: '100'
    }
})
export default AboutScreen;