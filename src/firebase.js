// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCyZcstiNoQEW7tnFM0fjb9rDx1ql51CP4",
    authDomain: "facebook-clone-90780.firebaseapp.com",
    databaseURL: "https://facebook-clone-90780.firebaseio.com",
    projectId: "facebook-clone-90780",
    storageBucket: "facebook-clone-90780.appspot.com",
    messagingSenderId: "63418265199",
    appId: "1:63418265199:web:9bbf5f0cb1bc513ab1e79a",
    measurementId: "G-SKZ8M2C52E"
};

//initialise app
const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

//set up authentication
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider()
const storage = firebase.storage()

export { auth, provider ,storage}
export default db