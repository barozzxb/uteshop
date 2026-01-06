import { useEffect, useState } from "react";
import Modal from "../../../components/ui/Modal";
import type { ProductPayload } from "../../../types/product";
import { getGenres } from "../../../api/genre.api";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ProductPayload) => void;
    initialData?: ProductPayload;
}

export default function ProductModal({
    open,
    onClose,
    onSubmit,
    initialData,
}: Props) {
    const [form, setForm] = useState<ProductPayload>({
        sku: "",
        name: "",
        genre: "",
        price: 0,
    });

    const [genres, setGenres] = useState<any[]>([]);

    useEffect(() => {
        getGenres().then((res) => setGenres(res.data.data));
    }, []);

    useEffect(() => {
        if (initialData) setForm(initialData);
    }, [initialData]);

    return (
        <Modal open={open} title={initialData ? "Edit Product" : "Add Product"} onClose={onClose}>
            <div className="space-y-4">
                <input
                    placeholder="SKU"
                    value={form.sku}
                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                />

                <input
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                />

                <select
                    value={form.genre}
                    onChange={(e) => setForm({ ...form, genre: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                >
                    <option value="">-- Select Genre --</option>
                    {genres.map((g) => (
                        <option key={g._id} value={g._id}>
                            {g.name}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: +e.target.value })}
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
