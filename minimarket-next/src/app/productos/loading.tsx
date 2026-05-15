import { ProductGridSkeleton } from "@/components/product-grid-skeleton";
import { pageMainClass } from "@/lib/page-layout";

export default function ProductosLoading() {
  return (
    <main className={pageMainClass}>
      <header className="mb-8 w-full">
        <div className="h-9 w-40 animate-pulse rounded-lg bg-white/10" />
      </header>
      <ProductGridSkeleton />
    </main>
  );
}
