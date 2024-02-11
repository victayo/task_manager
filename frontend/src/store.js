import { createStore } from 'vuex';
// import axios from 'axios';
import axios from '@/axios';

const store = createStore({
    state() {
        return {
            loggedIn: false,
            token: null
        }
    },
    mutations: {
        updateLoggedIn(state, status) {
            state.loggedIn = status;
        },

        setToken(state, token){
            state.token = token;
        }
    },
    actions: {
        async authenticateCredentials({ commit }, credentials) {
            try {
                const response = await axios.post('/api/login', credentials);

                // Assuming your server returns a user object upon successful authentication
                const token = response.data.token;

                commit('setToken', token);
                commit('updateLoggedIn', true);

                // Save the user data in localStorage or cookies if needed
                localStorage.setItem('auth_token', token);
            } catch (error) {
                console.error('Authentication failed:', error);
                commit('setToken', null);
                commit('updateLoggedIn', false);
            }
        },

        logout({ commit }) {
            // Perform logout actions, e.g., clear user data and authentication status
            commit('setToken', null);
            commit('updateLoggedIn', false);

            // Remove user data from localStorage or cookies if needed
            localStorage.removeItem('auth_token');
        },
    },
    getters: {
        getToken: (state) => {
            if(state.token){
                return state.token;
            }
            let token = localStorage.getItem("auth_token");
            return token;
        },
        loggedIn: (state) => {
            let loggedIn = state.loggedIn || localStorage.getItem("auth_token") != null;
            return loggedIn;
        },
    },
});


export default store;