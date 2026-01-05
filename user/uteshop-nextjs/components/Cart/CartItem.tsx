import { CartItem as CartItemType } from "@/types/types";

const BACKEND_HOST = process.env.NEXT_PUBLIC_HOST_URL;

interface Props {
    item: CartItemType;
    checked: boolean;
    onToggle: (itemId: string) => void;
    onUpdate: (productId: string, quantity: number) => void;
    onRemove: (productId: string) => void;
}

export default function CartItem({
    item,
    checked,
    onToggle,
    onUpdate,
    onRemove
}: Props) {
    const { _id, productId, quantity, price } = item;

    return (
        <div className="flex gap-4 border p-4 rounded items-center">
            <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(_id)}
            />

            <img
                src={
                    productId.images?.[0]?.url
                        ? `${BACKEND_HOST}${productId.images[0].url}`
                        : `${BACKEND_HOST}/uploads/products/placeholder.png`
                }
                className="w-24 h-24 object-cover rounded"
            />

            <div className="flex-1">
                <h3 className="font-semibold">{productId.name}</h3>
                <p className="text-sm text-gray-500">{productId.genre}</p>

                <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => onUpdate(productId._id, quantity - 1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => onUpdate(productId._id, quantity + 1)}>+</button>
                </div>
            </div>

            <div className="text-right">
                <div className="font-bold text-red-600">
                    {(price * quantity).toLocaleString("vi-VN")}₫
                </div>
                <button
                    onClick={() => onRemove(productId._id)}
                    className="text-sm text-red-500 mt-2"
                >
                    Xóa
                </button>
            </div>
        </div>
    );
}
