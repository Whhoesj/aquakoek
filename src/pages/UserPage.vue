<template>
    <div>
        <div class="row user-list">
            <div class="col">
                <user-list @select-user="selectUser" selected-user-key="selectedUserKey"></user-list>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">{{selectedUserName}}</h4>
                        <p class="card-text">
                            Count: {{stats.count}}<br/>
                            Total: € {{stats.priceAll}}<br/>
                            Unpaid: € {{stats.priceUnpaid}}
                        </p>
                    </div>

                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">History</h5>
                        <div class="scrolll">
                            <table class="table table-sm">
                                <thead>
                                <tr>
                                    <th scope="col">Day</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Paid</th>
                                    <th scope="col">Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(c, idx) in consumptions" :key="idx">
                                    <td>{{callTimestampToDay(c.date)}}</td>
                                    <td>{{c.koekName}}</td>
                                    <td>{{c.paid}}</td>
                                    <td>{{c.price}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {db, timestampToDay} from '../firebase';
    import UserList from "../components/UserList.vue";

    export default {
        name: "UserPage",
        components: {UserList},
        firestore() {
            return {
                consumptions: db.collection('consumptions').where('userId', '==', "").orderBy('date', 'desc').limit(15),
            }
        },
        data() {
            return {
                consumptions: [],
                selectedUser: null,
            }
        },
        computed: {
            stats() {
                let stats = {
                    count: 0,
                    priceAll: 0,
                    priceUnpaid: 0,
                };
                this.consumptions.forEach(c => {
                    stats.count++;
                    stats.priceAll += c.price;
                    if (c.paid === false) stats.priceUnpaid += c.price;
                });
                return stats;
            },
            selectedUserKey() {
                if (this.selectedUser === null) return "";
                return this.selectedUser.id;
            },
            selectedUserName() {
                if (this.selectedUser === null) return "Select user";
                return this.selectedUser.name;
            }
        },
        methods: {
            selectUser(user) {
                this.selectedUser = user;
                console.log(`Rebinding consumptions`);
                this.$bind('consumptions',
                    db.collection('consumptions')
                        .where('userId', '==', user.id)
                        .orderBy('date', 'desc')
                );
            },
            callTimestampToDay(timestamp) {
                return timestampToDay(timestamp);
            }
        }
    }
</script>

<style scoped>
    .user-list {
        height: 20%;
    }

    .scrolll {
        width: 100%;
        max-height: 34em;
        overflow-y: auto;
    }
</style>
