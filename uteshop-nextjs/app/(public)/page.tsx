'use client';

import HeroSection from "@/components/Section/HeroSection";
import { useEffect, useState } from "react";
import { getNewProducts } from '@/services/productService';
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import ProductSection from "@/components/Section/HomeProductSection";

export default function Home() {

  const [loading, setLoading] = useState(false);

  const [newProds, setNewProds] = useState([]);

  const getNewProduct = async () => {
    try {
      const { success, body } = await getNewProducts();
      if (!success) {
        toast.error(body.data.message);
        return;
      }
      setNewProds(body.data)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getNewProduct();
      setLoading(false);
    }
    fetchData();
  },[]);

  if (loading) return <Loader />

  return (
    <div className="flex flex-col w-full justify-center bg-white font-sans dark:bg-black">
      <HeroSection />
      <br />
      <div className="px-3 flex flex-col items-center justify-center">
        <h1 className="text-center text-2xl font-bold mb-5">Các sản phẩm mới nhất</h1>
        <ProductSection prods={newProds} />
        <br />
        <h1 className="text-center text-2xl font-bold mb-5">Các sản phẩm bán chạy nhất</h1>
        <ProductSection prods={newProds} />
        <br />
        <h1 className="text-center text-2xl font-bold mb-5">Được xem nhiều nhất</h1>
        <ProductSection prods={newProds} />
        <br />
        <h1 className="text-center text-2xl font-bold mb-5">Khuyến mãi sập sàn</h1>
        <ProductSection prods={newProds} />
      </div>
    </div>

  );
}
