"use client";

import { useState, useEffect } from "react";
import { getAllProductPage } from "@/services/productService";
import { toast } from "react-toastify";

import { Product } from "@/types/types";
import ProductCard from "@/components/Card/ProductCard";

const ProductPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [genre, setGenre] = useState("");
    const [filters, setFilters] = useState({ priceRange: [0, 1000] });
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchProducts();
    }, [genre, page]);

    const fetchProducts = async () => {
        try {
            const { success, body } = await getAllProductPage({ genre, page, limit });
            if (!success) {
                toast.error(body.message);
                return;
            }
            setProducts(body.data.items);
            setTotalPages(body.data.totalPages);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    return (
        <div className="min-h-screen pt-14">
            <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-10">

                {/* ===== SIDEBAR FILTER ===== */}
                <aside className="w-full lg:w-72">
                    <div className="sticky top-20 rounded-2xl border border-gray-200 bg-white shadow-sm">

                        {/* Header */}
                        <div className="px-6 py-5 border-b">
                            <h3 className="text-lg font-bold text-gray-900">
                                Bộ lọc tìm kiếm
                            </h3>
                        </div>

                        {/* Content */}
                        <div className="px-6 py-6 space-y-8">

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Danh mục
                                </label>
                                <select
                                    value={genre}
                                    onChange={(e) => {
                                        setGenre(e.target.value);
                                        setPage(1);
                                    }}
                                    className="w-full px-3 py-2.5 text-sm
                                               border border-gray-300 rounded-lg
                                               focus:outline-none focus:ring-2 focus:ring-orange-400"
                                >
                                    <option value="">Tất cả</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="clothing">Clothing</option>
                                </select>
                            </div>

                            <div className="h-px bg-gray-200" />

                            {/* Price Range */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Khoảng giá
                                </label>

                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    value={filters.priceRange[1]}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            priceRange: [0, Number(e.target.value)],
                                        })
                                    }
                                    className="w-full accent-orange-500"
                                />

                                <div className="mt-3 flex justify-between text-sm font-medium text-gray-800">
                                    <span>{filters.priceRange[0]}</span>
                                    <span>{filters.priceRange[1]}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </aside>

                {/* ===== MAIN CONTENT ===== */}
                <main className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-14 items-stretch">
                        {products.map((product: Product) => (
                            <ProductCard key={product._id} {...product} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-6">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-5 py-2 rounded-lg font-semibold
                                       border border-gray-300 text-gray-700
                                       hover:bg-gray-100 transition
                                       disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Trang trước
                        </button>

                        <span className="text-gray-800 font-bold text-lg">
                            {page} / {totalPages}
                        </span>

                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-5 py-2 rounded-lg font-semibold
                                       bg-orange-500 text-white
                                       hover:bg-orange-600 transition
                                       disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Trang sau
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProductPage;
