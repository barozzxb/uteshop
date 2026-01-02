'use client';

import HeroSection from "@/components/Section/HeroSection";
import { useEffect, useState } from "react";
import { getNewProducts, getMostViewsProducts, getTopSalesProducts } from '@/services/productService';
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import ProductSection from "@/components/Section/HomeProductSection";

export default function Home() {

  const [loading, setLoading] = useState(false);

  const [newProds, setNewProds] = useState([]);
  const [topSalesProds, setTopSalesProds] = useState([]);
  const [mostViewsProds, setMostViewsProds] = useState([]);

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
  };

  const getTopSalesProduct = async () => {
    try {
      const { success, body } = await getTopSalesProducts();
      if (!success) {
        toast.error(body.data.message);
        return;
      }
      setTopSalesProds(body.data)
    } catch (error) {
      console.log(error);
    }
  };

  const getMostViewsProduct = async () => {
    try {
      const { success, body } = await getMostViewsProducts();
      if (!success) {
        toast.error(body.data.message);
        return;
      }
      setMostViewsProds(body.data)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getNewProduct();
      await getMostViewsProduct();
      await getTopSalesProduct();
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <Loader />

  return (
    <div className="flex flex-col w-full justify-center bg-white font-sans dark:bg-black">
      <HeroSection />
      <br />
      <div className="px-3 flex flex-col items-center justify-center">
        <h1 className="text-center text-2xl font-bold mb-5">Các sản phẩm mới nhất</h1>
        {(newProds.length === 0 || !newProds) ?
          <p className="text-gray-700 italic">No data here</p> :
          <ProductSection prods={newProds} />
        }

        <br />
        <h1 className="text-center text-2xl font-bold mb-5">Các sản phẩm bán chạy nhất</h1>
        {(topSalesProds.length === 0 || !topSalesProds) ?
          <p className="text-gray-700 italic">No data here</p> :
          <ProductSection prods={topSalesProds} />
        }
        <br />
        <h1 className="text-center text-2xl font-bold mb-5">Được xem nhiều nhất</h1>
        {(mostViewsProds.length === 0 || !mostViewsProds) ?
          <p className="text-gray-700 italic">No data here</p> :
          <ProductSection prods={mostViewsProds} />
        }
        <br />
        <h1 className="text-center text-2xl font-bold mb-5">Khuyến mãi sập sàn</h1>
        {(newProds.length === 0 || !newProds) ?
          <p className="text-gray-700 italic">No data here</p> :
          <ProductSection prods={newProds} />
        }
      </div>
    </div>

  );
}
