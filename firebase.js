import firebase from "firebase";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAJlJn5mBiv8JX3hlKzNDS4-4FJK6gZ2YQ",
  authDomain: "facebook-38723.firebaseapp.com",
  projectId: "facebook-38723",
  storageBucket: "facebook-38723.appspot.com",
  messagingSenderId: "603518379562",
  appId: "1:603518379562:web:5eba579e13531fc3974553",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app;

const db = firebase.firestore();

const storage = firebase.storage();

export { db, storage };
