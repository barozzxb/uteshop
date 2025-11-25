import Link from "next/link";

// ... trong vòng lặp map sản phẩm ...
<div className="border p-4 rounded">
  {/* Bấm vào ảnh -> Qua chi tiết */}
  <Link href={`/products/${product._id}`}>
    <img
      src={product.avatar}
      className="w-full h-48 object-cover cursor-pointer hover:opacity-90"
    />
  </Link>

  {/* Bấm vào tên -> Qua chi tiết */}
  <Link href={`/products/${product._id}`}>
    <h3 className="font-bold text-lg mt-2 hover:text-blue-600 cursor-pointer">
      {product.name}
    </h3>
  </Link>

  <p className="text-red-500">{product.price} đ</p>
</div>;
