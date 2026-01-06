import { useEffect, useState } from "react";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../../api/product.api";
import ProductModal from "./components/ProductModal";

export default function ProductPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<any>(null);

    const loadData = async () => {
        const res = await getProducts();
        setProducts(res.data.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = async (data: any) => {
        if (editing) {
            await updateProduct(editing._id, data);
        } else {
            await createProduct(data);
        }
        setOpen(false);
        setEditing(null);
        loadData();
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-indigo-600">Products</h1>
                <button
                    onClick={() => setOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md transition"
                >
                    + Add Product
                </button>
            </div>

            <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                SKU
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                Name
                            </th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                                Price
                            </th>
                            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((p) => (
                            <tr
                                key={p._id}
                                className="hover:bg-gray-50 transition text-gray-800 text-sm"
                            >
                                <td className="px-4 py-2">{p.sku}</td>
                                <td className="px-4 py-2">{p.name}</td>
                                <td className="px-4 py-2 text-right">{p.price}</td>
                                <td className="px-4 py-2 text-center space-x-2">
                                    <button
                                        onClick={() => {
                                            setEditing(p);
                                            setOpen(true);
                                        }}
                                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteProduct(p._id).then(loadData)}
                                        className="text-red-600 hover:text-red-800 font-medium"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ProductModal
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
