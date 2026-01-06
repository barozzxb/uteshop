import api from './axios';

export const loginAdmin = (email: string, password: string) => {
  return api.post('/auth/login', { email, password });
};
