import { Suspense } from "react";
import { HeroSection } from "@/components/hero-section";
import { ProductExplorer } from "@/components/product-explorer";
import { ProductGridSkeleton } from "@/components/product-grid-skeleton";
import { fetchProducts } from "@/lib/api";
async function HomeProducts() {
  const products = await fetchProducts();
  return <ProductExplorer products={products} />;
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
