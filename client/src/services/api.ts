import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
});

instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] =
      'Bearer ' + window.localStorage.getItem('token');
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use(response => response.data);

export default instance;
