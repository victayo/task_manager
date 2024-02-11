import { createRouter, createWebHistory } from 'vue-router';
import TaskForm from '@/components/Task/TaskForm';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/Login';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard,
            meta: { 
                requiresAuth: true
             }
        },
        {
            path: '/login',
            name: 'login',
            component: Login 
        },
        {
            path: '/create',
            name: 'create',
            component: TaskForm,
            meta: { 
                requiresAuth: true
             }
        },
        {
            path: '/update/:task',
            name: 'update',
            component: TaskForm,
            props: true,
            meta: { 
                requiresAuth: true
             }
        },
    ]
});


  
  export default router;