import Vue from 'vue';
import Vuex from 'vuex';
import Firebase from 'firebase';
import {db} from '../firebase';

Vue.use(Vuex);


const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        signedIn: false,
        totalConsumptions: 0,
        totalCalories: 0,
        userConsumptions: [],
        userCalories: [],
    },
    mutations: {
        signOut(state) {
            state.signedIn = false;
        },
        signIn(state) {
            state.signedIn = true;
        },
        updateStats(state, payload) {
            console.log(`Stats: total: ${payload.total}, calories: ${payload.calories}`);
            state.totalConsumptions = payload.total;
            state.totalCalories = payload.calories;
            state.userConsumptions = payload.users;
            state.userCalories = payload.userCalories;
        },
    },
    getters: {},
    actions: {}
});
export default store;

Firebase.auth().onAuthStateChanged(user => {
    if (user === null) {
        store.commit('signOut');
    } else {
        store.commit('signIn');
    }
});

const consumptionsRef = db.collection('consumptions').where('paid', '==', true).orderBy('date', 'desc')
    .onSnapshot(snapshot => {
        const userConsumptions = {};
        const userCalories = {};
        let total = 0;
        let calories = 0;

        snapshot.forEach(doc => {
            const data = doc.data();
            total++;
            calories += data.calories;

            const userName = data.userName;
            if (typeof(userConsumptions[userName]) === 'undefined') userConsumptions[userName] = 0;
            userConsumptions[userName]++;
            if (typeof(userCalories[userName]) === 'undefined') userCalories[userName] = 0;
            userCalories[userName]++;
        });

        // userConsumptions.sort(function(a,b) {
        //     if (a < b) return -1;
        //     if (a > b) return 1;
        //     return 0;
        // });
        // userCalories.sort(function(a,b) {
        //     if (a < b) return -1;
        //     if (a > b) return 1;
        //     return 0;
        // });
        store.commit('updateStats', {
            total: total, calories: calories, userConsumptions: userConsumptions, userCalories: userCalories
        })
    });
