// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAh3Cp_ImaIXXknHqPwFwuwfethxT-Wc0",
  authDomain: "recipeapp-4971c.firebaseapp.com",
  projectId: "recipeapp-4971c",
  storageBucket: "recipeapp-4971c.appspot.com",
  messagingSenderId: "227466426890",
  appId: "1:227466426890:web:fb2c582ef9fa799997fdf3",
  measurementId: "G-6KR08T6FS1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)