<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand">Page title</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
                <router-link tag="li" to="/" active-class="active" replace class="nav-item">
                    <a class="nav-link">Home</a>
                </router-link>
                <router-link tag="li" to="/page1" active-class="active" replace class="nav-item">
                    <a class="nav-link">Page 1</a>
                </router-link>
                <router-link tag="li" to="/page2" active-class="active" replace class="nav-item">
                    <a class="nav-link">Page 2</a>
                </router-link>
            </ul>
            <span class="navbar-text">
                Right label
            </span>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "nav-header",
    }
</script>