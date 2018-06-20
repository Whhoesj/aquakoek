<template>
    <div id="app">
        <!--<nav-header></nav-header>-->
        <div class="container-fluid">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import NavHeader from "./components/NavHeader.vue";

    export default {
        components: {
            NavHeader
        },
        name: "app",
    }
</script>

<style>
    body {
        background: linear-gradient(to left top, #216572, #359b8b) no-repeat;
        height: 100vh;
        margin: 0;
    }

    .container-fluid {
        margin-top: 1em;
    }
</style>
