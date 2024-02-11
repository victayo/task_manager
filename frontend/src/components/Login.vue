<template>
    <div class="mask d-flex align-items-center h-100">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-5 col-md-8">
                    <form class="bg-white rounded shadow-5-strong p-5" @submit.prevent="login">
                        <!-- Email input -->
                        <div class="form-outline mb-4">
                            <label class="form-label" for="form1Example1">Email address</label>
                            <input type="email" id="form1Example1" class="form-control"  v-model="email" />
                        </div>

                        <!-- Password input -->
                        <div class="form-outline mb-4">
                            <label class="form-label" for="form1Example2" >Password</label>
                            <input type="password" id="form1Example2" class="form-control" v-model="password"/>
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
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            axios.post('/api/login', {
                email: this.email,
                password: this.password
            }).then(resp => {
                console.log(resp.data);
                let token = resp.data.token;
                localStorage.setItem("auth_token", token);
                this.$store.commit('updateLoggedIn', true);
            })
        }
    }
}
</script>