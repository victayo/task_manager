import axios from 'axios';
import store from '@/store';

const instance = axios.create({
    baseURL: 'http://localhost:8880', // Replace with your API base URL
    timeout: 5000, // Set a timeout
  });
  
  // Add a request interceptor to modify the request before it is sent
  instance.interceptors.request.use(
    (config) => {
      // Check if the user is authenticated and include the token in the headers
      const token = store.getters.getToken ? store.getters.getToken : null;
        
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
  );
  
export default instance;
