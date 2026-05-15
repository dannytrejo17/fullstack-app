"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductBadge } from "@/components/product-badge";
import { IMAGE_BLUR_DATA_URL, productImageUrl } from "@/lib/image-url";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-shadow flex flex-col gap-3 overflow-hidden">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100 -mt-1">
        {productImageUrl(product) ? (
          <Image
            src={productImageUrl(product)!}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={IMAGE_BLUR_DATA_URL}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-xs">
            Sin imagen
          </div>
        )}
      </div>
      <div className="flex justify-between items-start gap-2">
        <h2 className="text-gray-900 font-semibold text-sm leading-snug">
          {product.name}
        </h2>
        <ProductBadge label={product.category} />
      </div>
      {(product.city || product.province) && (
        <p className="text-gray-400 text-xs">
          {[product.city, product.province].filter(Boolean).join(", ")}
        </p>
      )}
      <p className="text-gray-500 text-xs line-clamp-2 flex-1">
        {product.description}
      </p>
      <p className="text-teal-700 font-bold text-xl">{product.price} €</p>
      <Link
        href={`/productos/${product.id}`}
        className="text-center text-xs bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg py-2 transition-colors"
      >
        Ver detalle
      </Link>
    </div>
  );
}
