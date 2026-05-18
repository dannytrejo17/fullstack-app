"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/providers/cart-provider";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/publicar", label: "Publicar" },
  { href: "/sobre", label: "Sobre nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { cart } = useCart();
  const [open, setOpen] = useState(false);

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="py-4">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-white font-bold text-xl tracking-tight drop-shadow"
        >
          Mini<span className="text-amber-400">Market</span>
        </Link>

        <div className="hidden md:flex bg-zinc-900 rounded-2xl px-6 py-3 gap-8 items-center shadow-lg">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-xs font-medium transition-colors ${
                active(href)
                  ? "text-amber-400"
                  : "text-white hover:text-amber-400"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/carrito"
            className="relative text-xs font-medium text-white hover:text-amber-400 transition-colors"
          >
            Carrito
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-amber-400 text-zinc-900 text-[10px] rounded-full min-w-[1rem] h-4 px-1 flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

        <Link
          href="/publicar"
          className="hidden md:block bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold px-5 py-2 rounded-xl text-sm transition-colors shadow"
        >
          + Publicar
        </Link>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-white p-2"
          aria-label="Menú"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                open
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-3 w-full max-w-5xl px-4 sm:px-6 md:hidden">
          <div className="flex flex-col gap-2 rounded-2xl bg-zinc-900 p-4 shadow-lg">
          {[...nav, { href: "/carrito", label: "Carrito" }].map(
            ({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`text-sm py-2 px-3 rounded-lg transition-colors ${
                  active(href)
                    ? "bg-amber-400 text-zinc-900 font-semibold"
                    : "text-white hover:bg-zinc-800"
                }`}
              >
                {label}
                {href === "/carrito" && cart.length > 0
                  ? ` (${cart.length})`
                  : ""}
              </Link>
            )
          )}
          </div>
        </div>
      )}
    </nav>
  );
}
