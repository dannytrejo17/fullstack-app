import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductBadge } from "@/components/product-badge";
import { fetchProduct, fetchProducts } from "@/lib/api";
import { IMAGE_BLUR_DATA_URL, productImageUrl } from "@/lib/image-url";

type Props = { params: Promise<{ id: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const products = await fetchProducts();
    return products.map((p) => ({ id: String(p.id) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const numId = Number(id);
  if (Number.isNaN(numId)) return { title: "Producto" };
  const product = await fetchProduct(numId);
  if (!product) return { title: "No encontrado" };
  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
    },
  };
}

export default async function ProductoDetallePage({ params }: Props) {
  const { id } = await params;
  const numId = Number(id);
  if (Number.isNaN(numId)) notFound();

  const product = await fetchProduct(numId);
  if (!product) notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-10 w-full">
      <Link
        href="/productos"
        className="text-white/80 hover:text-white text-sm mb-6 inline-block"
      >
        ← Volver a productos
      </Link>
      <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="relative aspect-video w-full bg-zinc-100">
          {productImageUrl(product) ? (
            <Image
              src={productImageUrl(product)!}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              placeholder="blur"
              blurDataURL={IMAGE_BLUR_DATA_URL}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
              Sin imagen
            </div>
          )}
        </div>
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <ProductBadge label={product.category} />
          </div>
          <p className="text-teal-700 font-bold text-3xl">{product.price} €</p>
          {(product.city || product.province) && (
            <p className="text-sm text-gray-500">
              Ubicación: {[product.city, product.province].filter(Boolean).join(", ")}
            </p>
          )}
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {product.description}
          </p>
          <div className="pt-4 border-t">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Detalles
            </p>
            <p className="text-sm text-gray-600">
              Categoría: {product.category}. Producto de segunda mano en MiniMarket.
            </p>
          </div>
          <AddToCartButton product={product} />
        </div>
      </article>
    </main>
  );
}
