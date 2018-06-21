<template>
    <div class="row">
        <koek-card v-for="koek in koeken" :koek="koek" :key="koek.key" class="col-sm-2"></koek-card>
    </div>
</template>

<script>
    import {db} from '../firebase/index.js';
    import KoekCard from "../components/KoekCard.vue";

    export default {
        name: "KoekGrid",
        components: {KoekCard},
        props: ['user'],
        firestore() {
            return {
                koeken: db.collection('koeken'),
                users: db.collection('users'),
            }
        },
        methods: {
            koekClick(koek) {
                if (typeof(this.user) !== "undefined" && this.user.length !== 0) {
                    // this.$firestore.users.doc(this.user['.key']).consumptions.add({
                    //     date: new Date(),
                    //     koek: 
                    // });
                }
            }
        }
    }
</script>

<style scoped>

</style>
