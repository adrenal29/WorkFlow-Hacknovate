
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyB0Y4TdnjjTNS_gu34LAZQoj4JkE6ANx7o",
  authDomain: "workflow-26c5a.firebaseapp.com",
  projectId: "workflow-26c5a",
  storageBucket: "workflow-26c5a.appspot.com",
  messagingSenderId: "285675162486",
  appId: "1:285675162486:web:ce29a8a366e3dd0b518857"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
export default db;