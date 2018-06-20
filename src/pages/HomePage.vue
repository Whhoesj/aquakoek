<template>
    <div class="row">
        <div class="col">
            <div class="row">
                <div class="col-2">
                    <h4>User</h4>
                    <ul class="list-group">
                        <li v-for="user in users"
                            class="list-group-item d-flex justify-content-between align-items-center">
                            {{user.name}}
                            <span class="badge badge-primary badge-pill">{{user.consumptions.length}}</span>
                        </li>
                    </ul>
                </div>
                <div class="col-1">

                </div>
                <div class="col">
                    <h4>Koeken</h4>
                    <div class="row">
                        <card v-for="koek in koeken" :koek="koek" class="col-auto"></card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {db} from '../firebase/index.js';
    import Card from "../components/Card.vue";

    export default {
        name: "home-page",
        components: {Card},
        firestore() {
            return {
                users: db.collection('users'),
                koeken: db.collection('koeken'),
            }
        }
    }
</script>

<style scoped>

</style>
