<template>
    <div class="d-flex flex-row">
        <div class="card p-2 user-card" @click="selectUser(user)" v-for="(user, idx) in users"
             :key="idx" :class="{'bg-primary': selectedUserKey === user.id, 'ml-4': idx !== 0}">
            <img class="card-img-top user-image" :src="user.image">
        </div>
    </div>
</template>

<script>
    import {db} from '../firebase';

    export default {
        name: "UserList",
        props: ['selected-user-key'],
        firestore() {
            return {
                users: db.collection('users').where('visible', '==', true).orderBy('name'),
            }
        },
        data() {
            return {
                users: [],
            }
        },
        methods: {
            selectUser(user) {
                this.$emit('select-user', user);
            }
        }
    }
</script>

<style scoped>
    .user-card {
        width: 40%;
    }
</style>
