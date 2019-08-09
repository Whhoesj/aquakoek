import Vue from 'vue';
import {firestorePlugin} from 'vuefire';
import Firebase from 'firebase';
import 'firebase/firestore';
import {firebaseConfig} from './config.js';

Vue.use(firestorePlugin);

const app = Firebase.initializeApp(firebaseConfig);
export const db = app.firestore();


export function getTimestamp() {
    return Firebase.firestore.FieldValue.serverTimestamp();
}

export function timestampToDay(firestoreTimestamp) {
    return firestoreTimestamp.toDate().toLocaleDateString('nl-NL', {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit'
    });
}
