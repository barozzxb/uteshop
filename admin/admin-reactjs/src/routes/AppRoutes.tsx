import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/admin/Dashboard';
import Products from '../pages/admin/Products';
import Genres from '../pages/admin/Genres';
import Users from '../pages/admin/Users';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import AdminLayout from '../layout/AdminLayout';
import Orders from '@/pages/admin/Orders';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="genres" element={<Genres />} />
        <Route path="users" element={<Users />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
  );
}
