import axios from 'axios';

const api = axios.create({
  baseURL: 'https://github.com/HaykInanc/telran_project_backend',
});

export default api;