"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/types/product";

export function ProductExplorer({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase())
      ),
    [products, search]
  );

  return (
    <>
      <div className="mb-8 w-full rounded-2xl bg-white p-4 shadow-md">
        <input
          type="search"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-gray-800 placeholder-gray-400 text-sm focus:outline-none bg-transparent"
        />
      </div>
      {filtered.length === 0 ? (
        <p className="text-white/60 text-center py-12">No se encontraron productos.</p>
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
