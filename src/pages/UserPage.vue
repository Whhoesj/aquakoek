<template>
    <div class="row">
        <div class="col-md-2">
            <button @click="goBack()" type="button" class="btn btn-secondary btn-lg btn-block mb-3">Back</button>
            <div class="card mb-2">
                <img class="card-img-top img-fluid user-image" :src="user.image">
                <div class="card-body">
                    <h5 class="card-title">{{user.name}}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Totaal: {{user.consumptions.length}}</li>
                </ul>
                <div class="card-body">

                </div>
            </div>
            <div class="card mb-2">
                <div class="card-body">
                    <h6>Gegeten</h6>
                </div>
                <ul class="list-group list-group-flush">
                    <!--<li v-for="item in user.consumptions" class="list-group-item">-->
                    <!--{{item.koek}}<br/>-->
                    <!--{{item.date}}-->
                    <!--</li>-->
                </ul>
            </div>
        </div>
        <div class="col-1"></div>
        <div class="col">
            <koek-grid :user="user"></koek-grid>
        </div>
    </div>
</template>

<script>
    import {db} from '../firebase/index.js';
    import KoekGrid from "../components/KoekGrid.vue";

    export default {
        name: "UserPage",
        components: {KoekGrid},
        firestore() {
            console.log(`Loading user ${this.$route.params.userId}`);
            return {
                user: db.collection('users').doc(this.$route.params.userId)
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
        },
    }
</script>

<style scoped>
    .user-image {
        max-width: 100%;
        height: auto;
    }
</style>
