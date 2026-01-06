import axios from 'axios';
import { authService } from '../services/auth.service';

const baseUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      authService.logout();
    }
    return Promise.reject(err);
  }
);

export default api;
