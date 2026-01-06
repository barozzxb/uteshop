import type { ProductPayload } from '../types/product';
import api from './axios';

export const getProducts = () => {
    return api.get('/admin/products');
};

export const getProductBySku = (sku: string) => {
    return api.get(`/admin/products/${sku}`);
};

export const createProduct = (data: ProductPayload) => {
    return api.post('/admin/products', data);
};

export const updateProduct = (id: string, data: ProductPayload) => {
    return api.put(`/admin/products/${id}`, data);
};

export const deleteProduct = (id: string) => {
    return api.delete(`/admin/products/${id}`);
};
