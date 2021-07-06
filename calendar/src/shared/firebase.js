import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBe99nYYYOjM0YRz8aKPTQggCgyd_WDlv0",
  authDomain: "sparta-calendar-bcbb6.firebaseapp.com",
  projectId: "sparta-calendar-bcbb6",
  storageBucket: "sparta-calendar-bcbb6.appspot.com",
  messagingSenderId: "1005706958568",
  appId: "1:1005706958568:web:f1359c7bf0957b48f7db5d",
  measurementId: "G-YPETYKCSKV",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const apiKey = firebaseConfig.apiKey;
const storage = firebase.storage();
const realtime = firebase.database();

export { auth, apiKey, firestore, storage, realtime };
