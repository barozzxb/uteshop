"use client";

import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { Product } from "@/types/types";

interface FavoriteButtonProps {
  product: Product;
  className?: string;
}

export default function FavoriteButton({ product, className }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs: Product[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favs.some((p) => p._id === product._id));
  }, [product._id]);

  const toggleFavorite = () => {
    const favs: Product[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updated: Product[];
    if (isFavorite) {
      updated = favs.filter((p) => p._id !== product._id);
      setIsFavorite(false);
    } else {
      updated = [product, ...favs];
      setIsFavorite(true);
    }
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <button onClick={toggleFavorite} className={`w-8 h-8 ${className}`}>
      {isFavorite ? (
        <HeartSolid className="w-6 h-6 text-red-500 transition-colors" />
      ) : (
        <HeartOutline className="w-6 h-6 text-gray-400 hover:text-red-500 transition-colors" />
      )}
    </button>
  );
}
