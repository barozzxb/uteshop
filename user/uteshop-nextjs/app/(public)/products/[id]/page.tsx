"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { toast } from "react-toastify";
import { addToCart } from "@/services/cartService";
import { getProductById } from "@/services/productService";
import ProductComments from "@/components/ProductComment";
import ProductCard from "@/components/Card/ProductCard";
import { Product } from "@/types/types";

const BACKEND_HOST = process.env.NEXT_PUBLIC_HOST_URL;

interface ProductDetailResponse {
  product: Product;
  similarProducts: Product[];
}

export default function ProductDetailPage() {
  const router = useRouter();
  const {id} = useParams<{id: string}>();

  const [productData, setProductData] = useState<ProductDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { success, body } = await getProductById(id);
        if (success) {
          setProductData(body.data);

          const viewed: Product[] = JSON.parse(
            localStorage.getItem("recentlyViewed") || "[]"
          );

          const updated = [
            body.data.product,
            ...viewed.filter(p => p.sku !== body.data.product.sku),
          ].slice(0, 10);

          localStorage.setItem("recentlyViewed", JSON.stringify(updated));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async (product: Product) => {
    try {
      const res = await addToCart(product._id, quantity);

      if (res.success) {
        toast.success("Đã thêm sản phẩm vào giỏ hàng");
      } else {
        toast.error(res.message || "Thêm vào giỏ thất bại");
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.warning("Vui lòng đăng nhập");
        router.push("/login");
        return;
      }
      toast.error("Có lỗi xảy ra");
    }
  };

  if (loading) return <div className="p-10 text-center">Đang tải...</div>;
  if (!productData) return <div className="p-10 text-center text-red-500">Sản phẩm không tồn tại</div>;

  const { product, similarProducts } = productData;

  const slideImages: string[] = [
    ...(product.avatar ? [product.avatar] : []),
    ...(product.images?.map(img => img.url) || []),
  ];

  const recentlyViewed: Product[] = JSON.parse(
    localStorage.getItem("recentlyViewed") || "[]"
  ).filter((p: Product) => p.sku !== product.sku);

  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);
  const handleIncrease = () =>
    quantity < product.stock && setQuantity(quantity + 1);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/">Trang chủ</Link> / <span>{product.genre}</span> /{" "}
        <span className="text-black font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <Swiper
            spaceBetween={10}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs]}
            className="h-[400px]"
          >
            {slideImages.map((url, i) => (
              <SwiperSlide key={i}>
                <img
                  src={`${BACKEND_HOST}${url}`}
                  className="w-full h-full object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={(swiper) => setThumbsSwiper(swiper)}
            spaceBetween={10}
            slidesPerView={4}
            modules={[Thumbs]}
            className="h-24 mt-4"
          >
            {slideImages.map((url, i) => (
              <SwiperSlide key={i} className="cursor-pointer border rounded">
                <img
                  src={`${BACKEND_HOST}${url}`}
                  className="w-full h-full object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="text-2xl font-bold text-red-600 mb-4">
            {product.price.toLocaleString("vi-VN")}₫
          </div>

          <p className="mb-6">{product.description || "Chưa có mô tả"}</p>

          {product.stock > 0 && (
            <div className="flex items-center gap-2 mb-6">
              <button onClick={handleDecrease}>-</button>
              <span>{quantity}</span>
              <button onClick={handleIncrease}>+</button>
            </div>
          )}

          <button
            disabled={product.stock === 0}
            onClick={() => handleAddToCart(product)}
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Sản phẩm tương tự</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {similarProducts.map(p => (
              <ProductCard key={p._id} {...p} />
            ))}
          </div>
        </div>
      )}

      <ProductComments productId={product._id} />
    </div>
  );
}
