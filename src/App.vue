<template>
    <div id="app">
        <eaten-modal></eaten-modal>
        <div class="container-fluid">
            <div v-if="!signedIn" class="row">
                <div class="col">
                    <div @click="openLoginPage" class="alert alert-danger" role="alert">
                        Niet ingelogd. Tik hier om in te loggen.
                    </div>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import NavHeader from "./components/NavHeader.vue";
    import {mapState} from 'vuex';
    import EatenModal from "./components/modals/EatenModal.vue";

    export default {
        components: {
            EatenModal,
            NavHeader
        },
        name: "app",
        computed: mapState(['signedIn']),
        methods: {
            openLoginPage() {
                this.$router.push({name: 'login'});
            }
        }
    }
</script>

<style>
    body {
        background: linear-gradient(to left top, #216572, #359b8b) no-repeat;
        height: 100vh;
        margin: 0;
        overflow: hidden;

        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none;
        /* Non-prefixed version, currently
                                         supported by Chrome and Opera */
    }

    img {
        pointer-events: none;
    }

    .container-fluid {
        margin-top: 1em;
    }
</style>
