import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:2999/api",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem('adminToken');
  const authToken = localStorage.getItem('authToken');
  
  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  } else if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  
  return config;
});

export default api;