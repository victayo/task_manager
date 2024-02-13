<template>
    <div>
        <button class="btn btn-primary btn-sm" @click="logout">Logout</button>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$store.dispatch('logout');
            // Redirect to the home page
            this.$router.push('/');
        }
    }
}
</script>