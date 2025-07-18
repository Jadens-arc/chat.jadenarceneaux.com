import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001', // replace with your backend URL
  withCredentials: true // optional, for cookie-based auth
});

export default api;