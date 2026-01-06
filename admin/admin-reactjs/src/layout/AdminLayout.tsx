import { Link, Outlet, useLocation } from "react-router-dom";
import { authService } from "../services/auth.service";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function AdminLayout() {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const logout = () => {
        authService.logout();
    };

    const navLinks = [
        { name: "Dashboard", to: "/admin" },
        { name: "Products", to: "/admin/products" },
        { name: "Genres", to: "/admin/genres" },
        { name: "Users", to: "/admin/users" },
        { name: "Orders", to: "/admin/orders" },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside
                className={`${sidebarOpen ? "w-64" : "w-16"
                    } bg-indigo-900 text-white transition-width duration-300 flex flex-col`}
            >
                <div className="flex items-center justify-between px-4 py-5 border-b border-indigo-700">
                    {sidebarOpen && <h2 className="text-xl font-bold">ADMIN PANEL</h2>}
                    <button
                        className="p-1 hover:bg-indigo-800 rounded-md"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 px-2 py-4 space-y-1">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.to;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`block px-3 py-2 rounded-md text-sm font-medium transition ${isActive
                                        ? "bg-indigo-700 text-white"
                                        : "text-indigo-200 hover:bg-indigo-800 hover:text-white"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="px-4 py-4 border-t border-indigo-700">
                    {sidebarOpen && (
                        <button
                            onClick={logout}
                            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md transition"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="flex justify-between items-center bg-white px-6 py-4 shadow-md">
                    <h1 className="font-semibold text-lg text-gray-800">
                        Admin Dashboard
                    </h1>
                </header>

                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
