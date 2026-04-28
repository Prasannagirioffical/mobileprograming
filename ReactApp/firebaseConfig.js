// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyALmKx0OKpnxOFa-mUHOSV7mnoB--zY6W4",
  authDomain: "contact-form-7135d.firebaseapp.com",
  projectId: "contact-form-7135d",
  storageBucket: "contact-form-7135d.firebasestorage.app",
  messagingSenderId: "774872090466",
  appId: "1:774872090466:web:30b2d4421ec8a420c44e3b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
