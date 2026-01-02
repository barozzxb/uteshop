"use client"

import { useState, useEffect } from "react";
import { getAllProductPage } from "@/services/productService";
import { toast } from "react-toastify";

import { Product } from '@/types/types';
import ProductCard from '@/components/Card/ProductCard';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [genre, setGenre] = useState('');
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
            console.log(body.message);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            <aside className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md mb-6 md:mb-0 md:mr-6">
                <h3 className="font-bold text-lg text-gray-800 mb-4">Filters</h3>
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                        value={genre}
                        onChange={(e) => { setGenre(e.target.value); setPage(1); }}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={filters.priceRange[1]}
                        onChange={(e) => setFilters({ ...filters, priceRange: [0, Number(e.target.value)] })}
                        className="w-full accent-orange-500"
                    />
                    <span className="text-sm text-gray-800">${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
                </div>
            </aside>

            <main className="flex-1 p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                    {products.map((product: Product) => (
                        <ProductCard key={product._id} {...product} />
                    ))}
                </div>

                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>

                    <span className="px-4 py-2 text-gray-800 font-bold">{page}</span>

                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </main>
        </div>

    );
}

export default ProductPage;