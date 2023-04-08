// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCETTVXBo-JHOoWoGkr3Kixk-dNgDvODtc",
  authDomain: "react-firebase-app-35ad8.firebaseapp.com",
  projectId: "react-firebase-app-35ad8",
  storageBucket: "react-firebase-app-35ad8.appspot.com",
  messagingSenderId: "188140184439",
  appId: "1:188140184439:web:757d4fb4adf49846117772"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();