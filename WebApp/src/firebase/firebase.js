import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzZ0St9RVLUhRW9m6I9A-ULfWmjbycX5g",
  authDomain: "elly-fe124.firebaseapp.com",
  databaseURL: "https://elly-fe124.firebaseio.com",
  projectId: "elly-fe124",
  storageBucket: "elly-fe124.appspot.com",
  messagingSenderId: "228779869496",
  appId: "1:228779869496:web:42b4f78dd18f2c7aacadcd",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

// const storage = firebase.storage();

export { auth };
