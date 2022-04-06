import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAthm0LIXqHE-uzU6KqhPwQVKDJNZF1okk",
    authDomain: "winter-23c28.firebaseapp.com",
    databaseURL: "https://winter-23c28-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "winter-23c28",
    storageBucket: "winter-23c28.appspot.com",
    messagingSenderId: "456741061056",
    appId: "1:456741061056:web:e15947d076f68cebc64825",
    measurementId: "G-RJRT44SV94"
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();