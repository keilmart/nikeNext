import firebase from "firebase/app";
import "firebase/database";
import "@firebase/firestore";
import "@firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGzxpRe_oZWapTQqV64xw_9GCI3W0lSSI",
  authDomain: "react-firebase-6f404.firebaseapp.com",
  databaseURL: "https://react-firebase-6f404-default-rtdb.firebaseio.com",
  projectId: "react-firebase-6f404",
  storageBucket: "react-firebase-6f404.appspot.com",
  messagingSenderId: "377911875969",
  appId: "1:377911875969:web:372bf08910a990bb51b080",
  measurementId: "G-Q2WN4XE51F",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const dbRef = firebase.database().ref();
export const listOfPlants = dbRef.child("plants");
export const storage = firebase.storage();

export default dbRef;
