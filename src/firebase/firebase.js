import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAZSseB2C_0gtjx2y0ypjC8jxvcOoYnn00',
    authDomain: 'stock-watcher-5f697.firebaseapp.com',
    projectId: 'stock-watcher-5f697',
    storageBucket: 'stock-watcher-5f697.appspot.com',
    messagingSenderId: '821777129814',
    appId: '1:821777129814:web:9e1c3c89c92990a9db36f7',
    measurementId: 'G-0YX3PC2HX6',
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth();

const usersCollection = db.collection('users');

export { db, auth, usersCollection };
