<template>
    <div class="row">
        <div class="col">
            <div class="row">
                <div class="col-2">
                    <ul class="list-group">
                        <li @click="openUser(user['.key'])" v-for="user in users"
                            class="list-group-item d-flex justify-content-between align-items-center">
                            {{user.name}}
                            <span class="badge badge-primary badge-pill">{{user.consumptions.length}}</span>
                        </li>
                    </ul>
                </div>
                <div class="col-1">

                </div>
                <div class="col">
                    <koek-grid></koek-grid>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {db} from '../firebase/index.js';
    import KoekGrid from "../components/KoekGrid.vue";

    export default {
        name: "home-page",
        components: {KoekGrid},
        firestore() {
            return {
                users: db.collection('users'),
                koeken: db.collection('koeken'),
            }
        },
        methods: {
            openUser(id) {
                console.log(`Going to user ${id}`);
                this.$router.push({name: 'user', params: {userId: id}})
            }
        }
    }
</script>

<style scoped>

</style>
