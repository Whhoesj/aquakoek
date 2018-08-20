<template>
    <div>
        <div class="row user-list">
            <div class="col">
                <user-list @select-user="selectUser" :selected-user-key="selectedUserKey"></user-list>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col">
                <koek-list @select-koek="selectKoek" :selected-koek-key="selectedKoekKey"></koek-list>
            </div>
            <div class="col-3">
                <button v-if="selectedUser !== null || selectedKoek !== null" @click="cancelAll()" type="button"
                        class="btn btn-danger btn-block mb-4">Annuleren
                </button>
                <div v-if="selectedUser !== null && selectedKoek !== null"
                     class="card text-center mb-3 consumption-card">
                    <div class="card-body">
                        <p class="card-text">Een</p>
                        <h5 class="card-title"><strong>{{selectedKoekName}}</strong></h5>
                        <p class="card-text">voor</p>
                        <h5 class="card-title mb-3"><strong>{{selectedUserName}}</strong></h5>
                        <button v-if="consumeState === STATE_IDLE" @click="consumeKoek()"
                                type="button" class="btn btn-primary btn-block btn-lg">Eet
                            koek
                        </button>
                        <div v-if="consumeState === STATE_BUSY" class="alert alert-info align-content-center"
                             role="alert">
                            Opslaan...
                        </div>
                        <div v-if="consumeState === STATE_SUCCESS" class="alert alert-success align-content-center"
                             role="alert">Opgeslagen
                        </div>
                        <div v-if="consumeState === STATE_FAILED" class="alert alert-danger align-content-center"
                             role="alert">Er ging iets fout
                        </div>
                    </div>
                </div>
                <div v-if="selectedUser !== null" class="card mb-3 user-details-card">
                    <div class="card-body">
                        <h4 class="card-title">{{selectedUserName}}</h4>
                        <p class="card-text">
                            Gegeten koeken: {{consumptions.length}}
                        </p>
                        <h5>Recent gegeten door {{selectedUserName}}</h5>
                        <div class="scrollable-table">
                            <table class="table table-sm">
                                <tbody>
                                <tr v-for="(c, idx) in consumptions" :key="idx">
                                    <td>{{callTimestampToDay(c.date)}}</td>
                                    <td>{{c.koekName}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                <statistics-card-small v-if="selectedUser === null"></statistics-card-small>
            </div>
        </div>
    </div>
</template>

<script>
    import {db, getTimestamp, timestampToDay} from '../firebase';
    import StatisticsCardSmall from "../components/StatisticsCardSmall.vue";
    import EventBus from '../events';
    import UserList from "../components/UserList.vue";
    import KoekList from "../components/KoekList.vue";

    const STATE_IDLE = 'idle';
    const STATE_BUSY = 'busy';
    const STATE_SUCCESS = 'success';
    const STATE_FAILED = 'failed';

    export default {
        name: "home-page",
        components: {KoekList, UserList, StatisticsCardSmall},
        firestore() {
            return {
                consumptions: db.collection('consumptions').where('paid', '==', false).orderBy('date', 'desc').limit(10),
            }
        },
        data() {
            return {
                consumptions: [],
                selectedUser: null,
                selectedKoek: null,
                consumeState: STATE_IDLE,
                STATE_IDLE: 'idle',
                STATE_BUSY: 'busy',
                STATE_SUCCESS: 'success',
                STATE_FAILED: 'failed',
                timerHandle: -1,
            }
        },
        computed: {
            selectedUserKey() {
                if (this.selectedUser === null) return "";
                return this.selectedUser.id;
            },
            selectedUserName() {
                if (this.selectedUser === null) return "";
                return this.selectedUser.name;
            },
            selectedKoekKey() {
                if (this.selectedKoek === null) return "";
                return this.selectedKoek.id;
            },
            selectedKoekName() {
                if (this.selectedKoek === null) return "";
                return this.selectedKoek.name;
            },
        },
        methods: {
            selectUser(user) {
                console.log("Received selectasdfasf");
                this.selectedUser = user;
                console.log("Rebinding consumptions");
                this.$bind('consumptions',
                    db.collection('consumptions')
                        .where('userId', '==', user.id)
                        .where('paid', '==', false)
                        .orderBy('date', 'desc')
                );
                this.setTimer();
            },
            selectKoek(koek) {
                console.log(`Selecting koek ${koek.id}`);
                this.selectedKoek = koek;
                this.consumeState = STATE_IDLE;
                this.setTimer();
            },
            cancelAll() {
                this.selectedKoek = null;
                this.selectedUser = null;
                this.consumeState = STATE_IDLE;
            },
            consumeKoek() {
                if (this.selectedKoek === null || this.selectedUser === null) {
                    console.error("Selected user or selected koek is null. Can't add consumption.");
                    return;
                }

                const newConsumption = {
                    userId: this.selectedUser.id,
                    userName: this.selectedUser.name,
                    koekId: this.selectedKoek.id,
                    koekName: this.selectedKoek.name,
                    calories: this.selectedKoek.calories,
                    price: this.selectedKoek.price,
                    paid: false,
                    date: getTimestamp(),
                };

                this.consumeState = STATE_BUSY;
                db.collection('consumptions').add(newConsumption)
                    .then(ref => {
                        console.log("Consumption written");
                        this.consumeState = STATE_SUCCESS;
                        EventBus.$emit('showeaten', newConsumption.koekName);
                        this.setTimer(true);
                    })
                    .catch(error => {
                        console.error("Failed to store consumption");
                        this.consumeState = STATE_FAILED;
                        this.setTimer();
                    });
            },
            setTimer(short) {
                window.clearTimeout(this.timerHandle);
                this.timerHandle = window.setTimeout(() => {
                    this.cancelAll();
                }, (short === true) ? 3000 : 30000);
            },
            callTimestampToDay(timestamp) {
                return timestampToDay(timestamp);
            }

        }
    }
</script>

<style scoped>
    .user-list {
        /*height: 20%;*/
    }

    .consumption-card {
        height: 16em;
    }
</style>
