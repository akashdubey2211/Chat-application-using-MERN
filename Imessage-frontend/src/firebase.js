import firebase from "firebase";

const firebaseConfig = {
  // your firebase credentials go here
  apiKey: "AIzaSyCSuRQwYU9B2mvkm5YwI09doqsj9HDo2Mk",
  authDomain: "i-message-clone-6b0c8.firebaseapp.com",
  projectId: "i-message-clone-6b0c8",
  storageBucket: "i-message-clone-6b0c8.appspot.com",
  messagingSenderId: "940155022940",
  appId: "1:940155022940:web:e35dc8abb694ff98cf4099",
  measurementId: "G-09Q389TEQG"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
