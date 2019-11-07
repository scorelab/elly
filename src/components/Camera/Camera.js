'use strict';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';

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

  render() {
    console.log(this.props.path)
    return (
      <View style={styles.container}>
        <View></View>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
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
      this.setState({
        cameraOpen: camera
      })
    }

    takePicture = async function() {
      const camera = this.state.cameraOpen
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      //  eslint-disable-next-line
      console.log(data.uri);
      this.setState({
        snaped: true,
        dataUri: data.uri
      })
      this.sendData()
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