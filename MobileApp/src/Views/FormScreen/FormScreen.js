import * as React from 'react';
import { Button } from 'react-native-paper';
import {View, StyleSheet, Image, ScrollView, TouchableOpacity, Alert} from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";
import {RadioButtonGroupVertical, RadioButtonGroupHorizontal, TextInputGroupHorizontal, UneditableComponent} from  '../../components/FormComponents/FormComponents'
import Geolocation from '@react-native-community/geolocation';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import {generateUUID} from '../../components/UserDataHandling/UserDataHandling'

class FormScreen extends React.Component{

    static navigationOptions = ({navigation})=>{
        return {
            headerTitle: 'Observation',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
        }
    }

    constructor(props) {
        super(props);
        this.state = { 
            photos: "", 
            isAlive: 1, 
            isSingle: 0 , 
            cause: 0, 
            accidentKind: 0, 
            intentinalKind: 0, 
            sex: 0,
            noOfIndividuals: 0,
            noOfDeaths: '0',
            noOfTusks: '0',
            tusksStatus: 0,
            haveTusks: 0,
            howManyTuskers: 0,
            location: ['',''],
        };
        
    }

    componentDidMount(){
        this.findCoordinates()
        this.loadImageCaptured()
    }

    uploadData = async function() {
        // Get the users ID
        const uid = auth().currentUser.uid;
        console.log(uid)
        // Create a reference
        const ref = database().ref(`/users/${uid}`).child('observations');
        const randomID = generateUUID()
        console.log(randomID)
        const storageRef = storage().ref('/observations/'+randomID+'.jpeg')
        
        await storageRef.putFile(this.state.photos[0].node.image.uri)
        
        const url = await storageRef.getDownloadURL()
        console.log(url)
        await ref.push({
            photoURL: url,
            isAlive: this.state.isAlive, 
            isSingle: this.state.isSingle , 
            cause: this.state.cause, 
            accidentKind: this.state.accidentKind, 
            intentinalKind: this.state.intentinalKind, 
            sex: this.state.sex,
            noOfIndividuals: this.state.noOfIndividuals,
            noOfDeaths: this.state.noOfDeaths,
            noOfTusks: this.state.noOfTusks,
            tusksStatus: this.state.tusksStatus,
            haveTusks: this.state.haveTusks,
            howManyTuskers: this.state.howManyTuskers,
            location: this.state.location,
          });
          this.props.navigation.navigate('FeedScreen')
       
      }

    requestWriteStoragePermission = async function () {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true
            
          } else {
            return false
          }
        } catch (err) {
          console.warn(err);
          return false
        }
      }

    findCoordinates = () => {
        if(this.requestWriteStoragePermission){
            Geolocation.getCurrentPosition(
                position => {
                  const initialPosition = position;
                  console.log(initialPosition['coords']['longitude'].toString(), initialPosition['coords']['latitude'].toString())
                  this.setState({location: [initialPosition['coords']['longitude'], initialPosition['coords']['latitude']]});
                },
                error => console.log('Error', JSON.stringify(error)),
                {enableHighAccuracy: false},
              );
        }
        
      };

    FormComponentCallbackFunction = (childData) => {
        switch(childData[1]) {
            case 'isAlive':
                this.setState({
                    isAlive: childData[0]
                })
              break;
            case 'isSingle':
                this.setState({
                    isSingle: childData[0]
                })
              break;
            case 'cause':
                this.setState({
                    cause: childData[0]
                })
                break;
            case 'accidentKind':
                this.setState({
                    accidentKind: childData[0]
                })
                break;
            case 'intentinalKind':
                this.setState({
                    intentinalKind: childData[0]
                })
                break;
            case 'sex':
                this.setState({
                    sex: childData[0]
                })
                break;
            case 'noOfIndividuals':
                this.setState({
                    noOfIndividuals: childData[0]
                })
                break;
            case 'noOfDeaths':
                this.setState({
                    noOfDeaths: childData[0]
                })
                break;
            case 'noOfTusks':
                this.setState({
                    noOfTusks: childData[0]
                })
                break;
            case 'tusksStatus':
                this.setState({
                    tusksStatus: childData[0]
                })
                break;
            case 'haveTusks':
                this.setState({
                    haveTusks: childData[0]
                })
                break;
            case 'howManyTuskers':
                this.setState({
                    howManyTuskers: childData[0]
                })
                break;
            case 'accidentOther':
                this.setState({
                    accidentOther: childData[0]
                })
                break;
            case 'intentionalOther':
                this.setState({
                    intentionalOther: childData[0]
                })
                break;
                
            
            default:
                console.log(childData[1]+": "+childData[0])
          } 
          console.log(childData[1]+": "+childData[0])
    }

    loadImageCaptured(){
        CameraRoll.getPhotos({
            first: 1,
            assetType: 'Photos',
          })
          .then(r => {
            this.setState({ photos: r.edges });
          })
          .catch((err) => {
             //Error Loading Images
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={{backgroundColor: 'lightgrey'}}>
                    {this.state.photos!==""?
                    <TouchableOpacity 
                        style={styles.imgHolder}
                        onPress={()=>navigate('showPhoto')}
                    >
                        {this.state.photos.map((p, i) => {
                        return (
                            <Image
                                key={i}
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 20,
                                }}
                                source={{ uri: p.node.image.uri }}
                            />
                        );
                        })}
                    </TouchableOpacity>
                :
                    <View></View>
                }
                </View>

                <View>
                    <Button mode="contained" onPress={()=>this.uploadData()}>Next</Button>
                </View>

                <ScrollView>
                    <UneditableComponent
                        title={'Location'}
                        icon={'map-marker'}
                        values={this.state.location}
                    />
                    <UneditableComponent
                        title={'Clock'}
                        icon={'clock-o'}
                        values={[new Date().getHours(), new Date().getMinutes(),new Date().getSeconds()]}
                    />

                    <RadioButtonGroupHorizontal 
                        parentCallback={this.FormComponentCallbackFunction} 
                        type={'isAlive'} 
                        title={'Is it Alive or Dead?'} 
                        values={['Alive','Dead']}
                    />
                    
                    {this.state.isAlive===1?
                        <RadioButtonGroupVertical 
                            parentCallback={this.FormComponentCallbackFunction} 
                            type={'isSingle'} 
                            title={'Group type?'} 
                            values={['Single individual','Group with calves','Group withutout calves']}
                        />
                
                        
                    :   
                        <RadioButtonGroupVertical 
                            parentCallback={this.FormComponentCallbackFunction} 
                            type={'cause'} 
                            title={'Cause?'} 
                            values={['Accident','Intentional','Dont\'t know']}
                        />
                    }

                    {this.state.isAlive===0 && this.state.cause===0?
                        <RadioButtonGroupVertical 
                            parentCallback={this.FormComponentCallbackFunction} 
                            type={'accidentKind'} 
                            title={'What kind of accident?'} 
                            values={['Vehicle strike','Train strike','Fell into well','Electrocution', 'Other (text note)']}
                        />
                    :
                        <View></View>
                    }
                    
                    {this.state.isAlive===0 && this.state.cause===0 && this.state.accidentKind===4?
                        <TextInputGroupHorizontal
                            title={'Briefly describe'}
                            type={'accidentOther'}
                            parentCallback={this.FormComponentCallbackFunction}
                            multiline={true}
                        /> 
                    :
                        <View></View>
                    }
                     
                    {this.state.isAlive===0 && this.state.cause===1?
                        <RadioButtonGroupVertical 
                            parentCallback={this.FormComponentCallbackFunction} 
                            type={'intentinalKind'} 
                            title={'How it happened intentionally?'} 
                            values={['Conflict-related','Hunting-related','Other (text note)','Don\’t know']}
                        />
                    :
                        <View></View>
                    }
                     
                    {this.state.isAlive===0 && this.state.cause===1 && this.state.intentinalKind===2 ?
                        <TextInputGroupHorizontal
                            title={'Briefly describe'}
                            type={'intentionalOther'}
                            parentCallback={this.FormComponentCallbackFunction}
                            multiline={true}
                        /> 
                    :
                        <View></View>
                    }
                     
                    {this.state.isAlive===1?
                        <View>
                            <RadioButtonGroupVertical 
                                parentCallback={this.FormComponentCallbackFunction} 
                                type={'sex'} 
                                title={'What is the sex of the elephant(s)?'} 
                                values={['Male','Female','Mixed','Don\’t know']}
                            />

                            <RadioButtonGroupVertical 
                                parentCallback={this.FormComponentCallbackFunction} 
                                type={'noOfIndividuals'} 
                                title={'How many individuals?'} 
                                values={['2 to 5 individuals','6 to 10 individuals','Mixed','More than 10']}
                            />
                        </View>
                    :
                        <View>
                            <TextInputGroupHorizontal
                                title={'How many animals have died? (numerical response)'}
                                type={'noOfDeaths'}
                                parentCallback={this.FormComponentCallbackFunction}
                                multiline={false}
                            /> 
                            <RadioButtonGroupVertical 
                                parentCallback={this.FormComponentCallbackFunction} 
                                type={'sex'} 
                                title={'What is the sex of the elephant(s)?'} 
                                values={['Male','Female','Mixed','Don\’t know']}
                            />
                             <TextInputGroupHorizontal
                                title={'How many have tusks? (numerical response)'}
                                type={'noOfTusks'}
                                parentCallback={this.FormComponentCallbackFunction}
                                multiline={false}
                            /> 
                             <RadioButtonGroupVertical 
                                parentCallback={this.FormComponentCallbackFunction} 
                                type={'tusksStatus'} 
                                title={'Status of tusks?'} 
                                values={['Tusks naturally absent','Tusks present','Tusks removed','Don\’t know']}
                            />
                        </View>
                    }

                    {this.state.isAlive===1 && this.state.isSingle===0?
                        <RadioButtonGroupVertical 
                            parentCallback={this.FormComponentCallbackFunction} 
                            type={'haveTusks'} 
                            title={'Does it have tusks?'} 
                            values={['Yes','No','Can\'t see']}
                        />
                    :
                        <View></View>
                    }

                    {this.state.isAlive===1 && this.state.isSingle!==0?
                        <RadioButtonGroupVertical 
                            parentCallback={this.FormComponentCallbackFunction} 
                            type={'haveTusks'} 
                            title={'How many have tusks?'} 
                            values={['None','1 to 5 individuals','6 to 10 individuals', 'More than 10']}
                        />
                    :
                        <View></View>
                    }
                </ScrollView>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignSelf: 'stretch'
        //backgroundColor: getRandomColor(),
    },
    welcome: {
        fontSize: 25
    },
    imgHolder: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10
        
    },
    bottom:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10,
        marginLeft: 0,
        alignItems: 'center'
    }
})
export default FormScreen;

