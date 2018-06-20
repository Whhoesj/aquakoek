import Firebase from '@firebase/app';
import '@firebase/firestore';
import {firebaseConfig} from './config.js';

const app = Firebase.initializeApp(firebaseConfig);

export const db = app.firestore();
