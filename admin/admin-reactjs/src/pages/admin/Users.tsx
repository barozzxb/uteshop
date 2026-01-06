import { useEffect, useState } from "react";
import { userService } from "@/services/user.service";
import type { User, UserRole } from "@/types/user";

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
        const res = await userService.getUsers();
        setUsers(res.data.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleToggleStatus = async (id: string) => {
        await userService.toggleStatus(id);
        fetchUsers();
    };

    const handleChangeRole = async (id: string, role: UserRole) => {
        await userService.changeRole(id, role);
        fetchUsers();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Khóa user này?")) return;
        await userService.deleteUser(id);
        fetchUsers();
    };

    if (loading)
        return <div className="text-gray-500 text-center py-4">Loading...</div>;

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-indigo-600">User Management</h1>

            <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Email
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Name
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Role
                            </th>
                            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                                Status
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Created
                            </th>
                            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((u) => (
                            <tr
                                key={u._id}
                                className="hover:bg-gray-50 transition text-gray-800 text-sm"
                            >
                                <td className="px-4 py-2">{u.email}</td>
                                <td className="px-4 py-2">{u.lastName} {u.firstName}</td>
                                <td className="px-4 py-2">
                                    <select
                                        value={u.role}
                                        onChange={(e) =>
                                            handleChangeRole(u._id, e.target.value as UserRole)
                                        }
                                        className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition text-sm"
                                    >
                                        <option value="USER">USER</option>
                                        <option value="ADMIN">ADMIN</option>
                                    </select>
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleToggleStatus(u._id)}
                                        className={`px-2 py-1 rounded-lg text-white font-medium text-sm transition ${u.status
                                                ? "bg-green-600 hover:bg-green-700"
                                                : "bg-red-500 hover:bg-red-600"
                                            }`}
                                    >
                                        {u.status ? "Active" : "Blocked"}
                                    </button>
                                </td>
                                <td className="px-4 py-2">
                                    {new Date(u.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2 text-center space-x-2">
                                    <button
                                        onClick={() => handleDelete(u._id)}
                                        className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="text-center py-4 text-gray-500 text-sm"
                                >
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
