import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBtKADxwTRkYcahlqJRuiZYqMNMlwWP0P8",
    authDomain: "to-do-list-reactjs-dfba4.firebaseapp.com",
    databaseURL: "https://to-do-list-reactjs-dfba4-default-rtdb.firebaseio.com",
    projectId: "to-do-list-reactjs-dfba4",
    storageBucket: "to-do-list-reactjs-dfba4.appspot.com",
    messagingSenderId: "909701232205",
    appId: "1:909701232205:web:7da75aa172fbbb3d0a4e04",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
