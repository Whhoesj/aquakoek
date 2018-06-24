<template>
    <div class="row align-items-center justify-content-center login-row">
        <div class="col-auto">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Inloggen</h5>
                    <form @submit.prevent="login">
                        <div class="form-group">
                            <label for="email-input">Email adres</label>
                            <input v-model="email" type="email" class="form-control" id="email-input"
                                   placeholder="Email">
                        </div>
                        <div class="form-group">
                            <label for="password-input">Wachtwoord</label>
                            <input v-model="password" type="password" class="form-control" id="password-input"
                                   placeholder="Password">
                        </div>
                        <button type="submit" class="btn btn-primary">Inloggen</button>
                        <button @click="goBack" type="button" class="btn btn-secondary">Terug</button>
                    </form>
                    <div v-if="error" class="alert alert-danger mt-3" role="alert">
                        Error
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Firebase from 'firebase';

    export default {
        name: "LoginPage",
        data() {
            return {
                email: "",
                password: "",
                error: false,
            }
        },
        methods: {
            login() {
                Firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .then(user => {
                        this.error = false;
                        console.log(`Signed in as ${user.user.email}`);
                        this.$router.go(-1);
                    })
                    .catch(error => {
                        this.error = true;
                    });
            },
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    .login-row {
        height: 70vh;
    }
</style>
