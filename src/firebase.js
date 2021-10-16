// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA11Z-sQg-_xZVDMCjXmJgW36NZyYnSSqg",
  authDomain: "facebookmessenger-co.firebaseapp.com",
  projectId: "facebookmessenger-co",
  storageBucket: "facebookmessenger-co.appspot.com",
  messagingSenderId: "1005901691685",
  appId: "1:1005901691685:web:eb7cd5fbee3b10712b38cc"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db=getFirestore();
const auth=getAuth();

export {auth,db};
