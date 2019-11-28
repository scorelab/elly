import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { firebase } from '@react-native-firebase/auth';
import {webClientID, androidClientID, devAndroidClientID} from '../../config/config'
import database from '@react-native-firebase/database';
// Calling this function will open Google for login.
export async function googleLogin(navigate) {
  try {
    // add any configuration settings here:
    console.log("sign in...")
    await GoogleSignin.configure({
        //scopes: ['https://www.googleapis.com/auth/userinfo.profile'], // what API you want to access on behalf of the user, default is email and profile
        androidClientId: androidClientID,
        webClientId: webClientID, // client ID of type WEB for your server (needed to verify user ID and offline access)
        //offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        //hostedDomain: '', // specifies a hosted domain restriction
        //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
        //forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
        //accountName: '', // [Android] specifies an account name on the device that should be used
    });
    console.log("has play services")
    await GoogleSignin.hasPlayServices();
    const { accessToken, idToken } = await GoogleSignin.signIn();

    // create a new firebase credential with the token
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
    // login with credential
    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

    const uid = firebaseUserCredential.user.toJSON().uid
    const name = firebaseUserCredential.user.toJSON().displayName
    const email = firebaseUserCredential.user.toJSON().email
    const photo = firebaseUserCredential.user.toJSON().photoURL
    //console.warn(JSON.stringify(firebaseUserCredential.user.toJSON().uid));

    const ref = database().ref('/users/').child(uid);
    const snapshot = await ref.once('value')

    if(snapshot.val()!==null){
      navigate('App')
    }else{
      await ref.set({
        name: name,
        email: email,
        photo: photo
      });

      navigate('App')
    }
    
    
  } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(error.code+": "+error.message+"user cancelled the login flow")
        } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(error.code+": "+error.message+"operation (e.g. sign in) is in progress already")
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(error.code+": "+error.message+"play services not available or outdated")
        } else {
        // some other error happened
        console.log(error.code+": "+error.message+"some other error happened")
        }
  }
}