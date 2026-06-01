import { ProductCard } from "@/components/product-card";
import { fetchProducts } from "@/lib/api";

export async function ProductGrid() {
  let products;
  try {
    products = await fetchProducts();
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "No se pudieron cargar los productos.";
    return (
      <div className="rounded-2xl bg-white/10 px-6 py-10 text-center text-white">
        <p className="font-medium">No se pudieron cargar los productos</p>
        <p className="mt-2 text-sm text-white/70">{message}</p>
        <p className="mt-4 text-xs text-white/50">
          En local necesitas dos terminales:{" "}
          <code className="rounded bg-black/30 px-1">server → npm run dev</code>{" "}
          y{" "}
          <code className="rounded bg-black/30 px-1">
            minimarket-next → npm run dev
          </code>
        </p>
      </div>
    );
  }

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
