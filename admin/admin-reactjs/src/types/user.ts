export type UserRole = 'ADMIN' | 'USER';

export interface User {
    _id: string;
    email: string;
    role: UserRole;
    status: boolean;
    firstName: string;
    lastName: string;
    createdAt: string;
}
