import { Product } from "@/types/types";
import { formatCurrency } from "@/utils/formatData";
import Image from "next/image";
import Link from "next/link";
const BACKEND_HOST = process.env.NEXT_PUBLIC_HOST_URL;

const ProductCard = (prod: Product) => {
    return (
        <div
            key={prod.sku}
            className="border border-orange-200 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col"
        >
            <div className="relative w-full h-48 sm:h-40 bg-gray-100 overflow-hidden rounded-t-lg">
                <img
                    src={
                        prod.images?.[0]?.url
                            ? `${BACKEND_HOST}${prod.images[0].url}`
                            : `${BACKEND_HOST}/uploads/products/placeholder.png`
                    }
                    alt={prod.images?.[0]?.alt || prod.name || "product image"}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <Link
                        href={`/products/${prod.sku}`}
                        className="text-sm sm:text-base font-semibold text-gray-900 truncate block hover:text-orange-600 transition-colors"
                    >
                        {prod.name}
                    </Link>

                    <p className=" float-end text-gray-600 mt-1 text-sm sm:text-base">{formatCurrency(prod.price)}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                    <button className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>

    )
}

export default ProductCard;