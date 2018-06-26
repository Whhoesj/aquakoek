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
            state.totalConsumptions = payload.total;
            state.totalCalories = payload.calories;
            state.userConsumptions = payload.userConsumptions;
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

const consumptionsRef = db.collection('consumptions').where('paid', '==', false).orderBy('date', 'desc')
    .onSnapshot(snapshot => {
        console.time('statistics');

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

        const userConsumptionsArray = [];
        for (let key in userConsumptions) {
            if (!userConsumptions.hasOwnProperty(key)) continue;
            userConsumptionsArray.push({
                name: key,
                count: userConsumptions[key]
            });
        }
        userConsumptionsArray.sort((a, b) => {
            if (a.count > b.count) return -1;
            if (a.count < b.count) return 1;
            return 0;
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
        console.log(`Calculated stats. Total: ${total} Calories: ${calories}.`);
        console.timeEnd('statistics');
        console.log(userConsumptionsArray);
        store.commit('updateStats', {
            total: total, calories: calories, userConsumptions: userConsumptionsArray, userCalories: userCalories
        })
    });
