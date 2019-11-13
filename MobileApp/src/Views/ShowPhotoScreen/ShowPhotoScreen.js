import * as React from 'react';
import {View, StyleSheet, Text, ScrollView, PermissionsAndroid, Image} from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";
import getRandomColor from '../../components/RandomColorGenerator/RandomColorGenerator'

class ShowPhotoScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = { photos: "" };
    }

    componentDidMount(){
        this.loadGalleryImages()
    }
    
    loadGalleryImages = () => {
        if(this.requestStoragePermission()){
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
        
    };

    requestStoragePermission = async function () {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Cool Photo App Camera Permission',
              message:
                'Cool Photo App needs access to your camera ' +
                'so you can take awesome pictures.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
            return true
            
          } else {
            console.log('Camera permission denied');
            return false
          }
        } catch (err) {
          console.warn(err);
          return false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.photos!==""?
                    <View style={{flex: 1}}>
                        {this.state.photos.map((p, i) => {
                        return (
                            <Image
                                key={i}
                                style={{
                                    flex: 1,
                                    alignSelf: 'stretch',
                                    width: 600
                                }}
                                resizeMode={'contain'}
                                source={{ uri: p.node.image.uri }}
                            />
                        );
                        })}
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
        //backgroundColor: getRandomColor(),
    },
    welcome: {
        fontSize: 25
    }
})
export default ShowPhotoScreen;