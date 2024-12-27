import axios from 'axios';
import { toast } from 'react-hot-toast';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token being sent:', `Bearer ${token}`);
    } else {
      console.log('No token found in localStorage');
    }
    console.log('Request:', config.method.toUpperCase(), config.url, config.headers);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
instance.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.config.url); // Debug log
    return response;
  },
  (error) => {
    console.error('Response Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.response?.data?.message || error.message
    });
    toast.error(error.response?.data?.message || 'An error occurred');
    return Promise.reject(error);
  }
);

export default instance; 