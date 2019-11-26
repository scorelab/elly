'use strict';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid } from 'react-native';
import { IconButton, Colors, Avatar } from 'react-native-paper';
import CameraRoll from "@react-native-community/cameraroll";
import { RNCamera } from 'react-native-camera';
import { withNavigationFocus } from 'react-navigation' 

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

  constructor(props){
    super(props)
    this.state={
      flashOn: false,
      cameraPermission: false
    }
  }

  componentDidMount(){
    this.requestWriteStoragePermission()
    this.requestReadStoragePermission()
    this.requestCameraPermission()
  }

  sendData = () => {
    this.props.parentCallback([this.state.snaped, this.state.dataUri]);
  }

  requestWriteStoragePermission = async function () {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
        
      } else {
        return false
      }
    } catch (err) {
      return false
    }
  }

  requestCameraPermission = async function () {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
        
      } else {
        return false
      }
    } catch (err) {
      return false
    }
  }

  requestReadStoragePermission = async function () {
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
      return false
    }
  }

  render() {
    const { isFocused } = this.props
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (isFocused){
      return (
        <View style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={this.state.flashOn?RNCamera.Constants.FlashMode.on:RNCamera.Constants.FlashMode.off}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            // onGoogleVisionBarcodesDetected={({ barcodes }) => {
            //   console.log(barcodes);
            // }}
            // onFacesDetected={(face)=>{
            //   console.log(face);
            // }}
            // onTextRecognized={(text)=>{
            //   console.log(text);
            // }}
          >
            <TouchableOpacity 
              style={{justifyContent: 'flex-start', marginLeft: 20, marginTop: 20}}
              onPress={()=>this.setState({flashOn: !this.state.flashOn})}
            
            >
              <Avatar.Icon size={60} color='white' icon={this.state.flashOn?'flash':'flash-off'} /> 
            </TouchableOpacity>
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
    } else {
      return <View />;
    }
    }

    takePicture = async () => {
      if (this.camera) {
        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takePictureAsync(options);
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
    height: "70%",
    width: "100%"
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10
},
});

export default withNavigationFocus(Camera);