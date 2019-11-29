import database from '@react-native-firebase/database';

export const ref = database().ref('/users/');

// database().setPersistenceEnabled(true);
// database().setPersistenceCacheSizeBytes(2000000); // 2MB