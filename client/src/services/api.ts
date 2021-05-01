import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
});

instance.interceptors.response.use(response => response.data);

export default instance;
