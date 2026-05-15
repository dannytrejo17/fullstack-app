import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/page-header";
import { ProductGrid } from "@/components/product-grid";
import { ProductGridSkeleton } from "@/components/product-grid-skeleton";
import { pageMainClass } from "@/lib/page-layout";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Productos",
  description: "Catálogo de productos de segunda mano en MiniMarket.",
};

export default function ProductosPage() {
  return (
    <main className={pageMainClass}>
      <PageHeader title="Productos" />
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid />
      </Suspense>
    </main>
  );
}
