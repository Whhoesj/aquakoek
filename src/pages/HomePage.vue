<template>
    <div class="row">
        <div class="col-3 user-list">
            <div class="d-flex flex-wrap">
                <div @click="selectUser(user)" v-for="(user, idx) in users" :key="idx"
                     class="p-2 card mb-3 mr-3 user-card" :class="{'bg-primary': selectedUserKey === user.id}">
                    <img class="card-img-top user-image" :src="user.image">
                </div>
            </div>
        </div>
        <div class="col">
            <div class="row">
                <div @click="selectKoek(koek)" v-for="(koek, idx) in koeken" :key="idx" class="col-sm-2 card mb-3 mr-4"
                     :class="{'bg-primary': selectedKoekKey === koek.id}">
                    <img class="card-img-top img-fluid" :src="koek.thumbnail">
                    <div class="card-body">
                        <h5 class="card-title koek-name">{{koek.name}}</h5>
                        <p class="card-text">{{koek.description}}</p>
                        <p class="card-text">
                            <small class="text-muted">
                                Prijs: €{{koek.price}}<br/>
                                Calorieën: {{koek.calories}} kcal
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-2">
            <button v-if="selectedUser !== null || selectedKoek !== null" @click="cancelAll()" type="button"
                    class="btn btn-danger btn-block mb-4">Annuleren
            </button>
            <div @click="test()" v-if="selectedUser === null || selectedKoek === null" class="card text-center mb-3">
                <div class="card-body">
                    <h4 v-if="selectedUser === null" class="card-title">Tik op je foto</h4>
                    <h4 v-if="selectedUser !== null" class="card-title">Tik op een koek</h4>
                </div>
            </div>
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
                    <div v-if="consumeState === STATE_BUSY" class="alert alert-info align-content-center" role="alert">
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
                        <!--Totaal calorieën: {{totalCalories}} kcal-->
                    </p>
                </div>
                <ul class="list-group list-group-flush">
                    <li v-for="(c, idx) in consumptions" :key="idx" class="list-group-item">
                        {{c.koekName}}
                    </li>
                </ul>
            </div>
            <div v-if="selectedUser === null" class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">Statistieken</h4>
                    <p class="card-text">
                        Totaal gegeten: {{totalConsumptions}}
                        <!--Totaal calorieën: {{totalCalories}} kcal-->
                    </p>
                    <h4 class="card-title">Recent gegeten</h4>
                </div>
                <ul class="list-group list-group-flush">
                    <li v-for="(c, idx) in consumptions" :key="idx" class="list-group-item">
                        {{c.userName}}, {{c.koekName}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import KoekCard from "../components/KoekCard.vue";
    import {db, getTimestamp} from '../firebase';
    import {mapState} from 'vuex';

    const STATE_IDLE = 'idle';
    const STATE_BUSY = 'busy';
    const STATE_SUCCESS = 'success';
    const STATE_FAILED = 'failed';

    export default {
        name: "home-page",
        components: {KoekCard},
        firestore() {
            return {
                users: db.collection('users').where('visible', '==', true).orderBy('name'),
                koeken: db.collection('koeken').where('visible', '==', true).orderBy('name'),
                consumptions: db.collection('consumptions').where('paid', '==', false).orderBy('date', 'desc').limit(10),
            }
        },
        data() {
            return {
                users: [],
                koeken: [],
                consumptions: [],
                selectedUser: null,
                selectedKoek: null,
                consumeState: STATE_IDLE,
                STATE_IDLE: 'idle',
                STATE_BUSY: 'busy',
                STATE_SUCCESS: 'success',
                STATE_FAILED: 'failed',
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
            totalCalories() {
                return 0;
            },
            ...mapState(['totalConsumptions', 'totalCalories', 'userConsumptions', 'userCalories'])
        },
        methods: {
            selectUser(user) {
                this.selectedUser = user;
                console.log("Rebinding consumptions");
                this.$bind('consumptions',
                    db.collection('consumptions')
                        .where('userId', '==', user.id)
                        .where('paid', '==', false)
                        .orderBy('date', 'desc')
                )
            },
            selectKoek(koek) {
                console.log(`Selecting koek ${koek.id}`);
                this.selectedKoek = koek;
                this.consumeState = STATE_IDLE;
            },
            cancelAll() {
                this.selectedKoek = null;
                this.selectedUser = null;
                this.consumeState = STATE_IDLE;
                this.$bind('consumptions',
                    db.collection('consumptions')
                        .where('paid', '==', false)
                        .orderBy('date', 'desc')
                        .limit(10)
                )
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
                    })
                    .catch(error => {
                        console.error("Failed to store consumption");
                        this.consumeState = STATE_FAILED;
                    });
            },
        }
    }
</script>

<style scoped>
    .user-list {
        max-height: 100vh;
    }

    .user-card {
        width: 40%;
    }

    .consumption-card {
        height: 16em;
    }

    .koek-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
