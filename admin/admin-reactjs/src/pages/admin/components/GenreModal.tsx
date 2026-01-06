import { useEffect, useState } from "react";
import Modal from "../../../components/ui/Modal";
import type { GenrePayload } from "../../../types/genre";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: GenrePayload) => void;
    initialData?: GenrePayload | null;
}

export default function GenreModal({
    open,
    onClose,
    onSubmit,
    initialData,
}: Props) {
    const [form, setForm] = useState<GenrePayload>({
        _id: "",
        name: "",
        description: "",
    });

    useEffect(() => {
        if (initialData) {
            setForm(initialData);
        } else {
            setForm({ _id: "", name: "", description: "" });
        }
    }, [initialData]);

    return (
        <Modal
            open={open}
            title={initialData ? "Edit Genre" : "Create Genre"}
            onClose={onClose}
        >
            <div className="space-y-4">
                <input
                    placeholder="Genre ID (ex: shoes, laptop...)"
                    value={form._id}
                    disabled={!!initialData}
                    onChange={(e) => setForm({ ...form, _id: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                />

                <input
                    placeholder="Genre name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                />

                <textarea
                    placeholder="Description"
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                />

                <button
                    onClick={() => onSubmit(form)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition"
                >
                    Save
                </button>
            </div>
        </Modal>
    );
}
