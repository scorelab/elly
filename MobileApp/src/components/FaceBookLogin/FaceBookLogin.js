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
    await firebase.auth().signInWithCredential(credential).then((user)=>{
      console.log(JSON.stringify(user.user.toJSON().uid))
      const uid = user.user.toJSON().uid
      const name = user.user.toJSON().displayName
      const email = user.user.toJSON().email
      const photo = user.user.toJSON().photoURL
      const ref = database().ref('/users/').child(uid)
      ref.set({
        name: name,
        email: email,
        photo: photo,
        profile: 'user'
      });
    })
    .catch((err)=>{
      console.log(err.message)
    })

  } catch (e) {
    console.error(e);
  }
}