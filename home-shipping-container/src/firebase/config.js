// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import 'firebase/storage';
import 'firebase/firestore';
import firebase from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWqxRsltzS5N52qA2pllHBQOucy-WUDBo",
    authDomain: "gallery-container.firebaseapp.com",
    projectId: "gallery-container",
    storageBucket: "gallery-container.appspot.com",
    messagingSenderId: "1096328667926",
    appId: "1:1096328667926:web:91acc4994d2dc0b943a637"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

export {projectStorage, projectFirestore};