<template>
    <div class="d-flex flex-wrap">
        <div class="p-2 card koek-card mb-4 mr-4" @click="selectKoek(koek)" v-for="(koek, idx) in koeken"
             :key="idx"
             :class="{'bg-primary': selectedKoekKey === koek.id}">
            <img class="card-img-top img-fluid" :src="koek.thumbnail">
            <div class="card-body">
                <h5 class="card-title koek-name">{{koek.name}}</h5>
                <p class="card-text">{{koek.description}}</p>
                <p class="card-text">
                    <small class="text-muted">
                        Prijs: €{{koek.price.toFixed(2)}}<br/>
                        Calorieën: {{koek.calories}}
                    </small>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import {db} from '../firebase';

    export default {
        name: "KoekList",
        props: ['selected-koek-key'],
        firestore() {
            return {
                koeken: db.collection('koeken').where('visible', '==', true).orderBy('name'),
            }
        },
        data() {
            return {
                koeken: [],
            }
        },
        methods: {
            selectKoek(koek) {
                this.$emit('select-koek', koek)
            }
        }
    }
</script>

<style scoped>
    .koek-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .koek-card {
        width: 11em;
    }
</style>
