<template>
    <div>
        <button class="btn btn-primary btn-sm" @click="logout">Logout</button>
    </div>
</template>

<script>
import axios from '@/axios';

export default {
    methods: {
        logout() {
            axios.post('/api/logout').then(response => {
                if(response.status == 200){
                    this.$store.dispatch('logout');
                    // Redirect to the home page
                    this.$router.push('/');
                }
            })
        }
    }
}
</script>