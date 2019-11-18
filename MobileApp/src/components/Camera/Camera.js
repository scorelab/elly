'use strict';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import CameraRoll from "@react-native-community/cameraroll";
import { RNCamera } from 'react-native-camera';
  const PendingView = () => (
      <View
        style={{
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Waiting</Text>
      </View>
    );

class Camera extends PureComponent{

  sendData = () => {
    this.props.parentCallback([this.state.snaped, this.state.dataUri]);
  }

  requestWriteStoragePermission = async function () {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
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
    console.log(this.props.path)
    return (
      <View style={styles.container}>
        <View></View>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          // flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />;
            // return (
            //   <View>
            //     <IconButton
            //       icon="camera"
            //       color={Colors.black}
            //       size={100}
            //       onPress={()=>this.takePicture(camera)}
            //     />
            //   </View>
            // );
            this.manageTakingPicture(camera)
          }}
        </RNCamera>
        <View style={styles.bottom}>
            <IconButton
              icon="circle"
              color={Colors.white}
              size={80}
              onPress={()=>this.takePicture()}
              animated={true}
              style={{backgroundColor: "grey"}}
            />
        </View>
      </View>
    );
    }

    manageTakingPicture = async function(camera){
      await this.setState({
        cameraOpen: camera
      })
    }

    takePicture = async function() {
      const camera = this.state.cameraOpen
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      //  eslint-disable-next-line
      console.log(data.uri);
      if(this.requestWriteStoragePermission()){
        console.log("Permision granted to write")
        CameraRoll.saveToCameraRoll(data.uri);
        this.setState({
          snaped: true,
          dataUri: data.uri
        })
        this.sendData()
      }
      
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: "100%",
    width: "100%"

  },
  preview: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: "70%",
    width: "100%"
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    // backgroundColor: getRandomColor(),
    alignItems: 'center',
    marginBottom: 10
},
});

export default Camera;