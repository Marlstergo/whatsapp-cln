import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyBKZMxvBl2jLp4-q0s-t3ZUWdywLynhnwg",
  authDomain: "whatsapp-cln-94fcc.firebaseapp.com",
  projectId: "whatsapp-cln-94fcc",
  storageBucket: "whatsapp-cln-94fcc.appspot.com",
  messagingSenderId: "139497653406",
  appId: "1:139497653406:web:d2bd2acfa8580fffcca78f",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };

