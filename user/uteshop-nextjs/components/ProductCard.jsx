import Link from "next/link";

<div className="border p-4 rounded">
  <Link href={`/products/${product._id}`}>
    <img
      src={product.avatar}
      className="w-full h-48 object-cover cursor-pointer hover:opacity-90"
    />
  </Link>

  <Link href={`/products/${product._id}`}>
    <h3 className="font-bold text-lg mt-2 hover:text-blue-600 cursor-pointer">
      {product.name}
    </h3>
  </Link>

  

  <p className="text-red-500">{product.price} đ</p>
</div>;
