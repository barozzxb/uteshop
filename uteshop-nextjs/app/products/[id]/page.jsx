"use client";
import React, { useState, useEffect, use } from "react";
import { getProductById } from "@/services/productService";
import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

export default function ProductDetailPage({ params }) {
  // Next.js 15: unwrap params bằng use()
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // State cho chức năng
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(productId);
        setProduct(res.data.data);
      } catch (error) {
        console.error("Lỗi lấy sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // Hàm tăng giảm số lượng
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  if (loading) return <div className="p-10 text-center">Đang tải...</div>;
  if (!product)
    return (
      <div className="p-10 text-center text-red-500">
        Sản phẩm không tồn tại
      </div>
    );

  // Mảng ảnh để chạy slide (gồm avatar + các ảnh phụ)
  const slideImages =
    product.images && product.images.length > 0
      ? [product.avatar, ...product.images]
      : [product.avatar || "https://via.placeholder.com/500"];

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Trang chủ
        </Link>{" "}
        /<span className="mx-1">{product.category}</span> /
        <span className="text-black font-medium ml-1">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* --- CỘT TRÁI: ẢNH SẢN PHẨM (SWIPER) --- */}
        <div className="space-y-4">
          {/* Slide Chính */}
          <div className="border rounded-lg overflow-hidden">
            <Swiper
              style={{
                "--swiper-navigation-color": "#000",
                "--swiper-pagination-color": "#000",
              }}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Navigation, Thumbs]}
              className="mySwiper2 h-[400px] w-full bg-white"
            >
              {slideImages.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt="Product"
                    className="w-full h-full object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Slide Thu nhỏ (Thumbs) */}
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
            className="mySwiper h-24"
          >
            {slideImages.map((img, index) => (
              <SwiperSlide
                key={index}
                className="cursor-pointer border rounded hover:border-blue-500"
              >
                <img
                  src={img}
                  alt="Thumb"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* --- CỘT PHẢI: THÔNG TIN --- */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>

          {/* Giá & Danh mục */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl font-bold text-red-600">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Danh mục */}
          <div className="mb-4">
            <span className="font-semibold">Danh mục: </span>
            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {product.category}
            </span>
          </div>

          {/* Tình trạng kho */}
          <div className="mb-6">
            <span className="font-semibold">Tình trạng: </span>
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">
                Còn hàng ({product.stock})
              </span>
            ) : (
              <span className="text-red-600 font-medium">Hết hàng</span>
            )}
          </div>

          {/* Mô tả ngắn */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description || "Chưa có mô tả cho sản phẩm này."}
          </p>

          <hr className="mb-6" />

          {/* Chọn số lượng */}
          {product.stock > 0 && (
            <div className="mb-6">
              <label className="block font-medium mb-2">Số lượng:</label>
              <div className="flex items-center border w-fit rounded">
                <button
                  onClick={handleDecrease}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 border-r"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center outline-none"
                />
                <button
                  onClick={handleIncrease}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 border-l"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Nút Mua Hàng */}
          <div className="flex gap-4">
            <button
              disabled={product.stock === 0}
              className={`flex-1 py-3 rounded font-bold text-white transition
                            ${
                              product.stock > 0
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-gray-400 cursor-not-allowed"
                            }
                        `}
              onClick={() => alert(`Đã thêm ${quantity} sản phẩm vào giỏ!`)}
            >
              {product.stock > 0 ? "THÊM VÀO GIỎ HÀNG" : "HẾT HÀNG"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
