import api from '../api/axios';
import type { User, UserRole } from '../types/user';

export const userService = {
    getUsers(params?: any) {
        return api.get<User[]>('/admin/users', { params });
    },

    getUser(id: string) {
        return api.get<User>(`/admin/users/${id}`);
    },

    updateUser(id: string, data: Partial<User>) {
        return api.patch(`/admin/users/${id}`, data);
    },

    toggleStatus(id: string) {
        return api.patch(`/admin/users/${id}/status`);
    },

    changeRole(id: string, role: UserRole) {
        return api.patch(`/admin/users/${id}/role`, { role });
    },

    deleteUser(id: string) {
        return api.delete(`/admin/users/${id}`);
    },
};
