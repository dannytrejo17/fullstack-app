"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/cart-provider";
import type { Product } from "@/types/product";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, cart } = useCart();
  const [msg, setMsg] = useState<string | null>(null);
  const inCart = cart.some((p) => p.id === product.id);

  function handleClick() {
    addToCart(product);
    setMsg("Añadido al carrito");
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <Button
        type="button"
        onClick={handleClick}
        disabled={inCart}
        className="bg-amber-400 text-zinc-900 hover:bg-amber-500"
      >
        {inCart ? "Ya está en el carrito" : "Añadir al carrito"}
      </Button>
      {msg && !inCart && (
        <span className="text-sm text-teal-800">{msg}</span>
      )}
    </div>
  );
}
