import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

export default function ProductGrid({
  products,
  columns = 4,
}: ProductGridProps) {
  const gridClass =
    columns === 2
      ? "grid-cols-2 sm:grid-cols-2"
      : columns === 3
        ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={`grid gap-3 sm:gap-6 ${gridClass}`}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
