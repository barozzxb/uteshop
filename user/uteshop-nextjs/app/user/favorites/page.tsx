"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/types/types";
import { addToCart } from "@/services/cartService";
import { toast } from "react-toastify";
import FavoriteButton from "@/components/FavoriteButton";
import { ShoppingCart } from "lucide-react"; // thêm icon

const BACKEND_HOST = process.env.NEXT_PUBLIC_HOST_URL;

export default function TrangYeuThichPage() {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const favs: Product[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favs);
  }, []);

  const handleRemoveFavorite = (id: string) => {
    const updated = favorites.filter((p) => p._id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    toast.success("Đã xóa khỏi yêu thích");
  };

  const handleAddToCart = async (product: Product) => {
    try {
      const res = await addToCart(product._id, 1);
      if (res.success) toast.success("Đã thêm sản phẩm vào giỏ hàng");
      else toast.error(res.message || "Thêm vào giỏ thất bại");
    } catch (err) {
      toast.error("Có lỗi xảy ra");
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Chưa có sản phẩm yêu thích nào.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Sản phẩm yêu thích</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded relative flex flex-col gap-2"
          >
            <div className="absolute top-3 right-3">
              <FavoriteButton
                product={product}
                onRemove={() => handleRemoveFavorite(product._id)}
              />
            </div>

            <img
              src={`${BACKEND_HOST}${product.avatar}`}
              className="w-full h-48 object-cover rounded cursor-pointer hover:opacity-90"
            />

            <h3 className="font-bold text-lg mt-2 hover:text-blue-600 cursor-pointer">
              {product.name}
            </h3>

            <p className="text-red-500 font-bold">
              {product.price.toLocaleString("vi-VN")}₫
            </p>

            <button
              onClick={() => handleAddToCart(product)}
              className="mt-auto py-2 px-4 bg-gradient-to-r from-orange-500 to-orange-600 
                 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-semibold 
                 rounded-xl shadow-md transition-all transform hover:scale-105 active:scale-100 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Thêm vào giỏ hàng
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
