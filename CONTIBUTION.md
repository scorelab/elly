# elly
### Contributing to Elly

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

1. Fork the [https://github.com/scorelab/elly.git].

2. Generate a debug.keystore using `keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000`. (Keystore name: “debug.keystore”, Keystore password: “android”,     Key alias: “androiddebugkey”, Key password: “android”, CN: “CN=Android Debug,O=Android,C=US”). (read guide: [https://rnavagamuwa.com/programming/android-programming/android-generate-release-debug-keystores/])

3. Place the copy of debug.keystore in MobileApp/android/app/.

4. Generate the key fingerprints using `keytool -list -v -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android`.

5. Create a firebase project, add an android app to project settings, add sha1 to the project, download the google-services.json file and place in the MobileApp/android/app/. (read guide: [https://invertase.io/oss/react-native-firebase/quick-start/create-firebase-project]).

6. Create a gradle.properties file in **MobileApp/android/** and paste the content in the MobileApp/android/app/samplegradle.properties.

7. Run `npx install`, `react-native run-android`, `react-native start`

### Pull Request Process
1. Ensure any install or build dependencies are removed.
2. Submit changes as a pull request.

#### NOTE: Do not change the .gitignore file.
