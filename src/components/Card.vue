<template>
    <div class="card mr-4 mb-4">
        <div class="card-body">
            <h4 class="card-title">{{title}}</h4>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Card",
        props: ['title'],
    }
</script>

<style scoped>

</style>
