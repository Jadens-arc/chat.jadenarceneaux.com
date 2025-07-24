import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // replace with your backend URL
  withCredentials: true // optional, for cookie-based auth
});

export default api;