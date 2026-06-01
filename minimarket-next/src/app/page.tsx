import { Suspense } from "react";
import { HeroSection } from "@/components/hero-section";
import { ProductExplorer } from "@/components/product-explorer";
import { ProductGridSkeleton } from "@/components/product-grid-skeleton";
import { fetchProducts } from "@/lib/api";
async function HomeProducts() {
  try {
    const products = await fetchProducts();
    return <ProductExplorer products={products} />;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "No se pudieron cargar los productos.";
    return (
      <div className="rounded-2xl bg-white/10 px-6 py-10 text-center text-white">
        <p className="font-medium">No se pudieron cargar los productos</p>
        <p className="mt-2 text-sm text-white/70">{message}</p>
      </div>
    );
  }
}

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <HeroSection />
      <Suspense fallback={<ProductGridSkeleton />}>
        <HomeProducts />
      </Suspense>
    </main>
  );
}
