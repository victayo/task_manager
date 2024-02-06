import { createRouter, createWebHistory } from 'vue-router';
import TaskForm from '@/components/Task/TaskForm';
import Dashboard from '@/components/Dashboard';

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

export default router;