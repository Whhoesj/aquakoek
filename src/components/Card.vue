<template>
    <div class="card mr-4 mb-4">
        <div class="card-body">
            <h4 class="card-title">{{koek.name}} <span class="badge badge-primary">{{koek.calories}}</span></h4>
            <slot>{{koek.description}}</slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "card",
        props: ['koek']
    }
</script>

<style scoped>
</style>
