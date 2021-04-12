import React, { Component } from "react";
import { View, Text, Button, Alert, NetInfo, Platform } from "react-native";
import { firebase } from '@react-native-firebase/ml-vision';

export default class InternetCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  CheckConnectivity = async(filePath) => {
    // For Android devices
    if (Platform.OS === "android") {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {   //Cloud image labeling
            const labels = await firebase.vision().cloudImageLabelerProcessImage(filePath, {
                confidenceThreshold: 0.8,   //Returns an array of results with the predicted name(text), entity ID(if available),confidence level
            });
            console.log(labels);  

          //Alert.alert("You are online!"); //imageLabel-Cloud
        } else {  //imageLabel-Local
            const labels = await firebase.vision().imageLabelerProcessImage(filePath, { 
                confidenceThreshold: 0.8,
            });
            console.log(labels);
         // Alert.alert("You are offline!");  
        }
      });
    } else {
      // For iOS devices
      NetInfo.isConnected.addEventListener(
        "connectionChange",
        this.handleFirstConnectivityChange
      );
    }
  };

  handleFirstConnectivityChange = isConnected => {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );

    if (isConnected === false) {
      Alert.alert("You are offline!");  //ImageLabel-Local
    } else {
      Alert.alert("You are online!");  //ImageLabel-Cloud
    }
  };

  /*render() {
    return (
      <View>
        <Button
          onPress={() => this.CheckConnectivity()}  //No need of this button
          title="Check Internet Connectivity"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }*/
}