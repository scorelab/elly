'use strict';
import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';
import {IconButton, Colors, Avatar} from 'react-native-paper';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {RNCamera} from 'react-native-camera';
import {resize} from '../../Utils/ImageManipulator';

class Camera extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      flashOn: false,
      cameraPermission: false,
    };
  }

  componentDidMount() {
    this.checkPermission();
  }

  sendData = () => {
    this.props.parentCallback([
      this.state.snaped,
      this.state.dataUri,
      this.state.ruri,
    ]);
  };

  checkPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('CAMERA');
        this.setState({
          cameraPermission: true,
        });
      } else {
        console.log('no permission');
        this.setState({
          cameraPermission: false,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    const {isFocused} = this.props;
    if (this.state.cameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (isFocused) {
      return (
        <View style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={
              this.state.flashOn
                ? RNCamera.Constants.FlashMode.on
                : RNCamera.Constants.FlashMode.off
            }
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            captureAudio={false}
            playSoundOnCapture={true}
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
            {/* <TouchableOpacity
              style={{
                justifyContent: 'flex-start',
                marginLeft: 20,
                marginTop: 20,
              }}
              onPress={() => this.setState({flashOn: !this.state.flashOn})}>
              <Avatar.Icon
                size={60}
                icon={this.state.flashOn ? 'flash' : 'flash-off'}
              />
            </TouchableOpacity> */}
          </RNCamera>
          <View style={styles.bottom}>
            <IconButton
              icon="circle"
              color={Colors.white}
              size={80}
              onPress={() => this.takePicture()}
              animated={true}
              style={{backgroundColor: 'grey'}}
            />
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  }

  takePicture = async () => {
    if (this.camera.state.isAuthorized) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const originalUri = await CameraRoll.save(data.uri);
          console.log('1' + originalUri);
          // let ruri = await resize(data.uri, 400, 200);
          // console.log('2' + ruri);
          this.setState({
            snaped: true,
            dataUri: data.uri,
            ruri: data.uri,
          });
          this.sendData();
        } else {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          );
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  preview: {
    justifyContent: 'flex-start',
    height: '70%',
    width: '100%',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default Camera;
