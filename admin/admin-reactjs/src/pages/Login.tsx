import { useState } from "react";
import { loginAdmin } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await loginAdmin(email, password);
            const token = res.data?.data?.accessToken;
            if (!token) return;

            authService.login(token);
            navigate("/admin");
        } catch (err: any) {
            setError(err?.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
                    Admin Dashboard Login
                </h2>

                {error && (
                    <div className="mb-4 text-sm text-red-700 bg-red-50 px-4 py-2 rounded-lg border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white font-medium py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Your Company. All rights reserved.
                </p>
            </div>
        </div>
    );
}
