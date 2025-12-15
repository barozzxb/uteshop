'use client'

import { useState } from "react";

export default function HeroSection() {
    const [search, setSearch] = useState("");

    return (
        <section className="relative w-full bg-linear-to-br from-orange-700 to-orange-300 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center sm:py-32 lg:py-40">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                    Khám phá sản phẩm yêu thích của bạn
                </h1>
                <p className="text-lg sm:text-xl text-gray-700 mb-8">
                    Hàng mới & ưu đãi mỗi ngày - tìm món hàng lý tưởng ngay bây giờ
                </p>

                <div className="w-full max-w-lg flex flex-col sm:flex-row bg-white shadow rounded-full overflow-hidden">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm sản phẩm..."
                        className="flex-1 px-4 py-3 text-gray-900 focus:outline-none"
                    />
                    <button className="px-6 py-3 bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">
                        Tìm kiếm
                    </button>
                </div>
            </div>
        </section>
    );
}
