const TOKEN_KEY = 'accessToken';

type JwtPayload = {
    role: string;
    exp: number;
};

export const authService = {
    login(token: string) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    logout() {
        localStorage.removeItem(TOKEN_KEY);
        window.location.href = '/login';
    },

    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    },

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;

        try {
            const payload: JwtPayload = JSON.parse(
                atob(token.split('.')[1])
            );

            const isAdmin = payload.role === 'ADMIN';
            const isValid = payload.exp * 1000 > Date.now();

            return isAdmin && isValid;
        } catch {
            return false;
        }
    }
};
