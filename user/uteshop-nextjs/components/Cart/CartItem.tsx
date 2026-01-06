// @/components/Cart/CartItem.tsx

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
  onRemove,
}: Props) {
  const { _id, productId, quantity, price } = item;

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdate(productId._id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    onUpdate(productId._id, quantity + 1);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4 items-center hover:border-gray-300 transition">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(_id)}
        className="w-4 h-4 text-orange-500 rounded focus:ring-2 focus:ring-orange-400 cursor-pointer flex-shrink-0"
      />

      {/* Hình ảnh - Nhỏ hơn */}
      <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-50">
        <img
          src={
            productId.images?.[0]?.url
              ? `${BACKEND_HOST}${productId.images[0].url}`
              : `${BACKEND_HOST}/uploads/products/placeholder.png`
          }
          alt={productId.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 line-clamp-2 text-base">
          {productId.name}
        </h3>
        {productId.genre && (
          <p className="text-sm text-gray-500 mt-1">{productId.genre}</p>
        )}

        {/* Nút tăng/giảm - Nhỏ gọn hơn */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={handleDecrease}
            disabled={quantity <= 1}
            className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            aria-label="Giảm số lượng"
          >
            <span className="text-base font-medium text-gray-700">−</span>
          </button>

          <span className="w-10 text-center font-semibold text-gray-900">
            {quantity}
          </span>

          <button
            onClick={handleIncrease}
            className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
            aria-label="Tăng số lượng"
          >
            <span className="text-base font-medium text-gray-700">+</span>
          </button>
        </div>
      </div>

      {/* Giá tiền & Xóa */}
      <div className="text-right flex-shrink-0">
        <div className="font-bold text-orange-600 text-lg">
          {(price * quantity).toLocaleString("vi-VN")}₫
        </div>

        <button
          onClick={() => onRemove(productId._id)}
          className="text-sm text-red-500 hover:text-red-600 mt-2 underline transition"
        >
          Xóa
        </button>
      </div>
    </div>
  );
}