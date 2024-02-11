import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
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

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.getters.loggedIn) {
      // Redirect to the login page if authentication is required and no authentication token is available
      store.commit('updateLoggedIn', false);
      next();
    } else {
      // Continue with the navigation
      next();
    }
  });
  
  export default router;