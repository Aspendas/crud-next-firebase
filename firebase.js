import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxXWV5xCLlIRXfo9uaZWBT5OvP0A2AN0E",
  authDomain: "crud-next-firebase-e8e79.firebaseapp.com",
  projectId: "crud-next-firebase-e8e79",
  storageBucket: "crud-next-firebase-e8e79.appspot.com",
  messagingSenderId: "599904479800",
  appId: "1:599904479800:web:46ec4b37524db34d1394cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
