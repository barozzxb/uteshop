export interface AdminPayload {
    userId: string;
    email: string;
    role: 'ADMIN';
}

export interface AuthContextType {
    user: AdminPayload | null;
    login: (token: string) => void;
    logout: () => void;
}
