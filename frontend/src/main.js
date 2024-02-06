import { createApp } from 'vue';
import mitt from 'mitt';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import axios from 'axios';

import TaskForm from '@/components/Task/TaskForm';
import Dashboard from '@/components/Dashboard';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.baseURL = 'http://localhost:8880';

async function getToken() {
    let response = await axios.post('/api/login', {
        "email": "test@example.com",
        "password": "password"
    });
    let token = response.data.token;
    // console.log(token);  
    return token;
}
let token = localStorage.getItem("auth_token");
if (!token) {
    token = await getToken();
    localStorage.setItem("auth_token", token);
}
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


const emitter = mitt()

const app = createApp(App);
app.config.globalProperties.emitter = emitter


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/create',
            name: 'create',
            component: TaskForm
        },
        {
            path: '/update/:task',
            name: 'update',
            component: TaskForm,
            props: true
        },
    ]
});

app.use(router);
app.mount('#app')
