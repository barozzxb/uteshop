"use client";
import { useState } from 'react';

const HeroSection = () => {
    const [query, setQuery] = useState('');
    return (
        <div className="flex-1 px-4 h-screen flex flex-col justify-center items-center bg-linear-to-b from-blue-100 to-white">
            <div className="max-w-lg">
                <label htmlFor="site-search" className="sr-only">Tìm sản phẩm</label>
                <div className="relative">
                    <input
                        id="site-search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Tìm kiếm sản phẩm, thương hiệu..."
                        className="w-full border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;