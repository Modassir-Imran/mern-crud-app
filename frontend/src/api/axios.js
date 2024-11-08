import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000, // 5 second timeout
  withCredentials: true
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Request being sent:', config);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response);
    return response;
  },
  async (error) => {
    console.error('Response error:', error);
    
    if (error.code === 'ERR_NETWORK') {
      console.error('Network Error - Please check if the server is running on port 5000');
    }
    
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out');
    }

    return Promise.reject(error);
  }
);

export default api; 