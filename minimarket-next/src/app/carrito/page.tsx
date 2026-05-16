"use client";

import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/cart-provider";
import { pageMainClass, pageNarrowClass } from "@/lib/page-layout";

export default function CarritoPage() {
  const { cart, removeFromCart, clearCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <main className={pageMainClass}>
        <div className={`${pageNarrowClass} py-6 text-center text-white`}>
          <PageHeader
            title="Tu carrito está vacío"
            description="Explora productos y añade los que te interesen."
          />
          <Link
            href="/productos"
            className="inline-block rounded-xl bg-amber-400 px-5 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-amber-500"
          >
            Ver productos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={pageMainClass}>
      <div className={pageNarrowClass}>
        <PageHeader title="Carrito" />
        <div className="divide-y rounded-2xl bg-white shadow-md text-gray-900">
          {cart.map((p) => (
            <div
              key={p.id}
              className="flex flex-wrap items-center justify-between gap-3 p-4"
            >
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-500">{p.category}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-teal-700">{p.price} €</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeFromCart(p.id)}
                >
                  Quitar
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-white">
          <p className="text-lg font-semibold">Total: {total} €</p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={clearCart}
              className="bg-white/90"
            >
              Vaciar
            </Button>
            <Link
              href="/contacto"
              className="inline-flex h-8 items-center justify-center rounded-lg bg-amber-400 px-3 text-sm font-medium text-zinc-900 hover:bg-amber-500"
            >
              Contactar / reservar
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
