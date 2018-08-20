<template>
    <div class="card mb-3">
        <div class="card-body">
            <h4 @click="test" class="card-title">Statistieken</h4>
            <p class="card-text">
                Totaal gegeten: {{statsTotal.count}}<br/>
                Totaal calorieën: {{statsTotal.calories}} kcal
            </p>
            <div class="row mb-3 justify-content-between">
                <div class="col-auto">
                    <button @click="previous" type="button" class="btn btn-sm btn-outline-secondary">&larr;</button>
                </div>
                <div class="col text-center align-items-center">
                    <h5 v-if="mode === MODE_RECENT" class="card-title">Recent gegeten</h5>
                    <h5 v-if="mode === MODE_RANK_TOTAL" class="card-title">Totaal gegeten</h5>
                    <h5 v-if="mode === MODE_RANK_WEEK" class="card-title">Totaal week</h5>
                </div>
                <div class="col-auto">
                    <button @click="next" type="button" class="btn btn-sm btn-outline-secondary">&rarr;</button>
                </div>
            </div>
            <div class="scrollable-table">
                <table v-if="mode === MODE_RECENT" class="table table-sm">
                    <tbody>
                    <tr v-for="(c, idx) in recentConsumptions" :key="idx">
                        <td>{{callTimestampToDay(c.date)}}</td>
                        <td>{{c.userName}}</td>
                        <td>{{c.koekName}}</td>
                    </tr>
                    </tbody>
                </table>
                <table v-if="mode === MODE_RANK_TOTAL" class="table table-sm">
                    <tbody>
                    <tr v-for="(item, idx) in statsTotal.ranks" :key="idx">
                        <td>{{idx + 1}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.count}}</td>
                        <td>{{item.calories}} kcal</td>
                    </tr>
                    </tbody>
                </table>
                <table v-if="mode === MODE_RANK_WEEK" class="table table-sm">
                    <tbody>
                    <tr v-for="(item, idx) in statsWeek.ranks" :key="idx">
                        <td>{{idx + 1}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.count}}</td>
                        <td>{{item.calories}} kcal</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</template>

<script>
    import {db, timestampToDay} from "../firebase";
    import {mapState} from 'vuex';

    export default {
        name: "StatisticsCardSmall",
        firestore() {
            return {
                recentConsumptions: db.collection('consumptions').where('paid', '==', false).orderBy('date', 'desc').limit(30),
            }
        },
        data() {
            return {
                recentConsumptions: [],
                mode: 0,
                MODE_RECENT: 0,
                MODE_RANK_TOTAL: 1,
                MODE_RANK_WEEK: 2,
            }
        },
        computed: mapState(['statsTotal', 'statsWeek']),
        methods: {
            callTimestampToDay(timestamp) {
                return timestampToDay(timestamp);
            },
            next() {
                this.mode++;
                if (this.mode > 2) this.mode = 0;
            },
            previous() {
                this.mode--;
                if (this.mode < 0) this.mode = 2;
            },
            test() {
            },
        }
    }
</script>

<style scoped>

</style>
