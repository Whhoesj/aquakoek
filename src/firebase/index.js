import Vue from 'vue';
import VueFire from 'vuefire';
import Firebase from 'firebase';
import 'firebase/firestore';
import {firebaseConfig} from './config.js';

Vue.use(VueFire);

const app = Firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
db.settings({
    timestampsInSnapshots: true
});


export function getTimestamp() {
    return Firebase.firestore.FieldValue.serverTimestamp();
}

export function timestampToDay(firestoreTimestamp) {
    return firestoreTimestamp.toDate().toLocaleDateString('nl-NL', {weekday: 'short'});
}
