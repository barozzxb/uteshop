import { Navigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import type { JSX } from 'react';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!authService.isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
