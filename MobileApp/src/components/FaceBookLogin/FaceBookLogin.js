import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
// Calling the following function will open the FB login dialogue:
export async function facebookLogin(navigate) {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      // throw new Error('User cancelled the login process');
      return
    }

    console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

    // get the access token
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw new Error('Something went wrong obtaining access token');
    }

    // create a new firebase credential with the token
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

    // login with credential
    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

    const uid = firebaseUserCredential.user.toJSON().uid
    const name = firebaseUserCredential.user.toJSON().displayName
    const email = firebaseUserCredential.user.toJSON().email
    const photo = firebaseUserCredential.user.toJSON().photoURL

    const ref = database().ref('/users/').child(uid);
    const snapshot = await ref.once('value')

    if (snapshot.val() !== null) {
      navigate('App')
    } else {
      await ref.set({
        name: name,
        email: email,
        photo: photo
      });

      navigate('App')
    }
  } catch (e) {
    console.error(e);
  }
}