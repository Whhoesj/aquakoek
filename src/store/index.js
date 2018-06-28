import Vue from 'vue';
import Vuex from 'vuex';
import Firebase from 'firebase';
import {db} from '../firebase';

Vue.use(Vuex);


const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        signedIn: false,
        statsTotal: {
            count: 0,
            calories: 0,
            ranksCount: [],
            ranksCalories: [],
        },
        statsWeek: {
            count: 0,
            calories: 0,
            ranksCount: [],
            ranksCalories: [],
        }
    },
    mutations: {
        signOut(state) {
            state.signedIn = false;
        },
        signIn(state) {
            state.signedIn = true;
        },
        updateStatsTotal(state, payload) {
            state.statsTotal.count = payload.count;
            state.statsTotal.calories = payload.calories;
            state.statsTotal.ranksCount = payload.ranksCount;
            state.statsTotal.ranksCalories = payload.ranksCalories;
        },
        updateStatsWeek(state, payload) {
            state.statsWeek.count = payload.count;
            state.statsWeek.calories = payload.calories;
            state.statsWeek.ranksCount = payload.ranksCount;
            state.statsWeek.ranksCalories = payload.ranksCalories; 
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

const refTotal = db.collection('consumptions').where('paid', '==', false).orderBy('date', 'desc')
    .onSnapshot(snapshot => {
        store.commit('updateStatsTotal', generateRanks(snapshot));
    });

const refWeek = db.collection('consumptions').where('paid', '==', false).where('date', '>', new Date('2018-06-25')).orderBy('date', 'desc')
    .onSnapshot(snapshot => {
        store.commit('updateStatsWeek', generateRanks(snapshot));
    });

function generateRanks(snapshot) {
    console.time('statistics');
    const ranksCount = {};
    const ranksCalories = {};
    let count = 0;
    let calories = 0;

    snapshot.forEach(doc => {
        const data = doc.data();
        count++;
        calories += data.calories;

        const userName = data.userName;
        if (typeof(ranksCount[userName]) === 'undefined') ranksCount[userName] = 0;
        ranksCount[userName]++;
        if (typeof(ranksCalories[userName]) === 'undefined') ranksCalories[userName] = 0;
        ranksCalories[userName] += data.calories;
    });

    const ranksCountArray = [];
    for (let key in ranksCount) {
        if (!ranksCount.hasOwnProperty(key)) continue;
        ranksCountArray.push({
            name: key,
            count: ranksCount[key]
        });
    }
    ranksCountArray.sort((a, b) => {
        if (a.count > b.count) return -1;
        if (a.count < b.count) return 1;
        return 0;
    });

    const ranksCaloriesArray = [];
    for (let key in ranksCalories) {
        if (!ranksCalories.hasOwnProperty(key)) continue;
        ranksCaloriesArray.push({
            name: key,
            calories: ranksCalories[key]
        });
    }
    ranksCaloriesArray.sort((a, b) => {
        if (a.calories > b.calories) return -1;
        if (a.calories < b.calories) return 1;
        return 0;
    });

    console.timeEnd('statistics');
    return {
        count: count, calories: calories, ranksCount: ranksCountArray, ranksCalories: ranksCaloriesArray
    };
}
