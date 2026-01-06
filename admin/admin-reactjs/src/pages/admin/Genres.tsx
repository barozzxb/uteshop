import { useEffect, useState } from "react";
import {
    getGenres,
    createGenre,
    updateGenre,
    deleteGenre,
} from "../../api/genre.api";
import GenreModal from "./components/GenreModal";
import type { GenrePayload } from "../../types/genre";

export default function GenrePage() {
    const [genres, setGenres] = useState<GenrePayload[]>([]);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<GenrePayload | null>(null);
    const [loading, setLoading] = useState(false);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await getGenres();
            setGenres(res.data.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = async (data: GenrePayload) => {
        if (editing) {
            await updateGenre(editing._id, data);
        } else {
            await createGenre(data);
        }
        setOpen(false);
        setEditing(null);
        loadData();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this genre?")) return;
        await deleteGenre(id);
        loadData();
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-indigo-600">Genres</h1>
                <button
                    onClick={() => setOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md transition"
                >
                    + Add Genre
                </button>
            </div>

            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                    ID
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                    Name
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                    Description
                                </th>
                                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700 w-36">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {genres.map((g) => (
                                <tr
                                    key={g._id}
                                    className="hover:bg-gray-50 transition text-gray-800 text-sm"
                                >
                                    <td className="px-4 py-2">{g._id}</td>
                                    <td className="px-4 py-2">{g.name}</td>
                                    <td className="px-4 py-2">{g.description}</td>
                                    <td className="px-4 py-2 text-center space-x-2">
                                        <button
                                            onClick={() => {
                                                setEditing(g);
                                                setOpen(true);
                                            }}
                                            className="text-indigo-600 hover:text-indigo-800 font-medium"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(g._id)}
                                            className="text-red-600 hover:text-red-800 font-medium"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {genres.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="text-center py-4 text-gray-500 text-sm"
                                    >
                                        No genres found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <GenreModal
                open={open}
                onClose={() => {
                    setOpen(false);
                    setEditing(null);
                }}
                initialData={editing}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
