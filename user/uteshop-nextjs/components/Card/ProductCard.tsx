import { Product } from "@/types/types";
import { formatCurrency } from "@/utils/formatData";
import Link from "next/link";

const BACKEND_HOST = process.env.NEXT_PUBLIC_HOST_URL;

const ProductCard = (prod: Product) => {
    return (
        <div className="border border-gray-300 rounded-xl shadow-sm hover:shadow-lg transition flex flex-col bg-white h-full">
            {/* IMAGE */}
            <div className="relative w-full h-48 bg-gray-100 overflow-hidden rounded-t-xl">
                <Link href={`/products/${prod.sku}`}>
                    <img
                        src={
                            prod.images?.[0]?.url
                                ? `${BACKEND_HOST}${prod.images[0].url}`
                                : `${BACKEND_HOST}/uploads/products/placeholder.png`
                        }
                        alt={prod.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </Link>
            </div>

            {/* CONTENT */}
            <div className="px-5 py-4 flex flex-col justify-between flex-1">
                <div>
                    <Link
                        href={`/products/${prod.sku}`}
                        className="block text-base font-semibold text-gray-900 line-clamp-2 hover:text-orange-600 transition-colors"
                    >
                        {prod.name}
                    </Link>

                    <p className="mt-2 text-orange-600 font-bold text-lg">
                        {formatCurrency(prod.price)}
                    </p>
                </div>

                {/* ACTION - Nút nhỏ gọn, đồng bộ với trang chi tiết */}
                <div className="mt-4">
                    <button
                        className="w-full flex items-center justify-center gap-2
                                   px-4 py-2.5 text-sm font-medium
                                   bg-orange-500 hover:bg-orange-600
                                   text-white rounded-lg
                                   transition-all hover:scale-105
                                   shadow-sm"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;