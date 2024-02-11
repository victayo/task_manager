import { createApp } from 'vue';
import App from './App.vue';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import axios from 'axios';
import router from './router';
import store from '@/store';


axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.baseURL = 'http://localhost:8880';

let token = localStorage.getItem("auth_token");

if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}



const app = createApp(App);

router.beforeEach((to, from, next) => {
    console.log(to);
    // Check if the route requires authentication
    if (to.meta.requiresAuth) {
        // Check if the user is authenticated
        const isAuthenticated = checkAuthentication();
        store.commit('updateLoggedIn', isAuthenticated);
        if (isAuthenticated) {
            // Continue with the navigation
            next();
        } else {
            // Redirect to the login page or another page
            // next('/login');
            store.commit('updateLoggedIn', false);
            next();
        }
    } else {
        store.commit('updateLoggedIn', true);
        // For routes that don't require authentication, proceed with the navigation
        next();
    }
});

app.use(router);
app.use(store);
app.mount('#app');

function checkAuthentication() {
    let token = localStorage.getItem("auth_token");
    console.log('check Auth', token);
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return token != null || token != undefined;
}
