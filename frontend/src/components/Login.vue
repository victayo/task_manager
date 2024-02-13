<template>
    <div class="mask d-flex align-items-center h-100">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-5 col-md-8">
                    <div class="alert alert-danger alert-dismissible fade show small" role="alert" v-if="showError">
                        <strong>Unable to login {{ message }}</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                            @click="hideAlert()"></button>
                    </div>
                    <form class="bg-white rounded shadow-5-strong p-5" @submit.prevent="login">
                        <!-- Email input -->
                        <div class="form-outline mb-4">
                            <label class="form-label" for="email">Email address</label>
                            <input type="email" id="email" class="form-control" v-model="email" />
                        </div>

                        <!-- Password input -->
                        <div class="form-outline mb-4">
                            <label class="form-label" for="password">Password</label>
                            <input type="password" id="password" class="form-control" v-model="password" />
                        </div>

                        <!-- Submit button -->
                        <button type="submit" class="btn btn-primary btn-sm btn-block" data-mdb-ripple-init>Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/axios';

export default {
    data() {
        return {
            email: '',
            password: '',
            message: '',
            showError: false
        }
    },
    methods: {
        login() {
            this.showError = false;
            axios.post('/api/login', {
                email: this.email,
                password: this.password
            }).then(response => {
                let data = response.data;
                if (data.token) {
                    let token = response.data.token;
                    this.$store.commit('setToken', token)
                    this.$store.commit('updateLoggedIn', true);
                    localStorage.setItem('auth_token', token);
                } else {
                    this.showError = true;
                    this.$store.commit('setToken', null);
                    this.$store.commit('updateLoggedIn', false);
                    if (data.message) {
                        this.message = data.message;
                    } else {
                        this.message = '';
                    }
                }
            }).catch(() => {
                this.showError = true;
                this.message = 'An error occurred';
            });
        },

        hideAlert(){
            this.showError = false;
        }
    }
}
</script>