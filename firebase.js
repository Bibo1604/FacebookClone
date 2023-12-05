// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVPJsl0SxWhcuTa4umq9ulxg6IlVz07KM",
    authDomain: "facebook-b280d.firebaseapp.com",
    projectId: "facebook-b280d",
    storageBucket: "facebook-b280d.appspot.com",
    messagingSenderId: "375199627821",
    appId: "1:375199627821:web:40d197d75480d7ffce16a4"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
console.log(db);
const storage = getStorage(app);

export { db, storage }