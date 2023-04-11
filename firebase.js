import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC2F0WSXgYeEwbs6-2pXEaNP4Rw_3SaDyQ",
    authDomain: "eyow-messenger.firebaseapp.com",
    projectId: "eyow-messenger",
    storageBucket: "eyow-messenger.appspot.com",
    messagingSenderId: "479649338259",
    appId: "1:479649338259:web:e636aa97a90a153e1a4e66"
  };

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };