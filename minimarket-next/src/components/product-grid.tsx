import { ProductCard } from "@/components/product-card";
import { fetchProducts } from "@/lib/api";

export async function ProductGrid() {
  const products = await fetchProducts();
  if (products.length === 0) {
    return (
      <p className="text-white/60 text-center py-20">No hay productos aún.</p>
    );
  }
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
