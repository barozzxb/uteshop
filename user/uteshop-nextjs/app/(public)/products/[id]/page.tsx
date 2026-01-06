"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { toast } from "react-toastify";
import { addToCart } from "@/services/cartService";
import { getProductById } from "@/services/productService";
import { getProductRatingSummary } from "@/services/reviewService";
import ProductComments from "@/components/ProductComment";
import ProductCard from "@/components/Card/ProductCard";
import FavoriteButton from "@/components/FavoriteButton";
import { Product } from "@/types/types";

const BACKEND_HOST = process.env.NEXT_PUBLIC_HOST_URL;

interface ProductDetailResponse {
  product: Product;
  similarProducts: Product[];
}

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [productData, setProductData] = useState<ProductDetailResponse | null>(null);
  const [ratingData, setRatingData] = useState<{
    average: number;
    total: number;
    distribution: { stars: number; count: number; percentage: number }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { success, body } = await getProductById(id);
        if (success) {
          setProductData(body.data);
          const viewed: Product[] = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
          const updated = [body.data.product, ...viewed.filter((p) => p.sku !== body.data.product.sku)].slice(0, 10);
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

  useEffect(() => {
    if (!productData?.product?._id) return;
    const fetchRating = async () => {
      try {
        const res = await getProductRatingSummary(productData.product._id);
        if (res.success) setRatingData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRating();
  }, [productData]);

  const handleAddToCart = async (product: Product) => {
    try {
      const res = await addToCart(product._id, quantity);
      if (res.success) toast.success("Đã thêm sản phẩm vào giỏ hàng");
      else toast.error(res.message || "Thêm vào giỏ thất bại");
    } catch (err: any) {
      if (err?.response?.status === 401) {
        toast.warning("Vui lòng đăng nhập");
        router.push("/login");
        return;
      }
      toast.error("Có lỗi xảy ra");
    }
  };

  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Đang tải sản phẩm...</div>;
  if (!productData)
    return <div className="min-h-screen flex items-center justify-center text-red-600">Sản phẩm không tồn tại</div>;

  const { product, similarProducts } = productData;
  const slideImages: string[] = [...(product.avatar ? [product.avatar] : []), ...(product.images?.map((img) => img.url) || [])];
  const recentlyViewed: Product[] = JSON.parse(localStorage.getItem("recentlyViewed") || "[]").filter((p: Product) => p.sku !== product.sku);
  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);
  const handleIncrease = () => quantity < product.stock && setQuantity(quantity + 1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <nav className="mb-10 text-gray-600">
        <Link href="/">Trang chủ</Link> / <Link href={`/danh-muc/${product.genre}`}>{product.genre}</Link> / <b>{product.name}</b>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <div>
          <Swiper
            navigation
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[Navigation, Thumbs]}
          >
            {slideImages.map((url, i) => (
              <SwiperSlide key={i}>
                <img src={`${BACKEND_HOST}${url}`} className="w-full h-[450px] object-contain" />
              </SwiperSlide>
            ))}
          </Swiper>
          {slideImages.length > 1 && (
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={5}
              freeMode
              watchSlidesProgress
              modules={[FreeMode, Thumbs]}
              className="mt-4"
            >
              {slideImages.map((url, i) => (
                <SwiperSlide key={i}>
                  <img src={`${BACKEND_HOST}${url}`} className="h-24 object-cover border rounded" />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        <div>
          <div className="flex items-start justify-between">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <FavoriteButton product={product} />
          </div>

          <div className="flex items-end gap-4 mb-6">
            <span className="text-3xl text-red-600 font-bold">{product.price.toLocaleString("vi-VN")}₫</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xl text-gray-400 line-through">{product.originalPrice.toLocaleString("vi-VN")}₫</span>
            )}
          </div>

          <div className="mb-4 inline-block px-4 py-2 bg-green-100 text-green-800 font-medium border border-green-300 rounded-lg">
            Còn {product.stock} sản phẩm
          </div>

          <p className="mb-6 text-gray-700">{product.description || "Chưa có mô tả"}</p>

          {product.stock > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-base font-medium text-gray-700">Số lượng:</span>
                <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden">
                  <button onClick={handleDecrease} disabled={quantity === 1} className="w-12 h-12 flex items-center justify-center text-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition">−</button>
                  <span className="w-16 text-center text-lg font-semibold">{quantity}</span>
                  <button onClick={handleIncrease} disabled={quantity >= product.stock} className="w-12 h-12 flex items-center justify-center text-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition">+</button>
                </div>
              </div>

              <button onClick={() => handleAddToCart(product)} className="w-full py-4 px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-semibold rounded-xl shadow-md transition-all transform hover:scale-105 active:scale-100 flex items-center justify-center gap-3">
                Thêm vào giỏ hàng
              </button>
            </div>
          )}
        </div>
      </div>

      {similarProducts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-6">Sản phẩm tương tự</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {similarProducts.map((p) => (
              <ProductCard key={p._id} {...p} />
            ))}
          </div>
        </section>
      )}

      {recentlyViewed.length > 0 && (
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-6">Đã xem gần đây</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {recentlyViewed.map((p) => (
              <ProductCard key={p._id} {...p} />
            ))}
          </div>
        </section>
      )}

      {ratingData && (
        <section className="border-t pt-16">
          <h2 className="text-2xl font-bold mb-6">Đánh giá sản phẩm</h2>
          <p>⭐ {ratingData.average} / 5 ({ratingData.total} đánh giá)</p>
        </section>
      )}

      <section className="border-t pt-16">
        <ProductComments productId={product._id} />
      </section>
    </div>
  );
}