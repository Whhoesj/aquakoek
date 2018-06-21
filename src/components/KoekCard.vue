<template>
    <div class="card mb-3 mr-4">
        <img class="card-img-top img-fluid" :src="koek.thumbnail">
        <div class="card-body">
            <h5 class="card-title">{{koek.name}}</h5>
            <p class="card-text">{{koek.description}}</p>
            <p class="card-text">
                <small class="text-muted">Prijs: {{koek.price}}</small>
            </p>
        </div>
    </div>

</template>

<script>
    export default {
        name: "koek-card",
        props: ['koek']
    }
</script>

<style scoped>
    img {
        max-width: 100%;
        height: 6em;
    }

    .card {
        max-width: 20em;
    }
</style>
