import { Product } from "@/types/types";
import ProductCard from "@/components/Card/ProductCard";

interface ProductSectionProps {
  prods: Product[];
}

export default function ProductSection({ prods }: ProductSectionProps) {
  return (
    <div className="flex justify-center items-center gap-6 flex-wrap">
      {prods.map((prod) => (
        <ProductCard key={prod._id} {...prod} />
      ))}
    </div>
  );
}
