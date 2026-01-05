import { Product } from "@/types/types";
import ProductCard from "@/components/Card/ProductCard";

interface ProductSectionProps {
  prods: Product[];
}

export default function ProductSection({ prods }: ProductSectionProps) {
  return (
    <div className="flex justify-center">
      <div className="inline-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {prods.map((prod) => (
          <div key={prod._id} className="w-full">
            <ProductCard {...prod} />
          </div>
        ))}

      </div>
    </div>
  );
}
