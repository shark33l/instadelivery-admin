import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDivYY9wtPwpIP6pdGXTtOZemkRqrlA5uk",
    authDomain: "order-tracking-faa26.firebaseapp.com",
    databaseURL: "https://order-tracking-faa26-default-rtdb.firebaseio.com",
    projectId: "order-tracking-faa26",
    storageBucket: "order-tracking-faa26.appspot.com",
    messagingSenderId: "875480724842",
    appId: "1:875480724842:web:4b2c5b979f4424acf3a113",
    measurementId: "G-81RRJR905P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;