import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const active = (path: string) => location.pathname === path;

  return (
    <nav className="px-4 sm:px-6 py-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl tracking-tight drop-shadow">
          Mini<span className="text-amber-400">Market</span>
        </Link>

        {/* Desktop pill */}
        <div className="hidden md:flex bg-zinc-900 rounded-2xl px-6 py-3 gap-8 items-center shadow-lg">
          {[
            { to: "/", label: "Inicio", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
            { to: "/products", label: "Productos", icon: "M4 6h16M4 10h16M4 14h16M4 18h16" },
            { to: "/create", label: "Publicar", icon: "M12 4v16m8-8H4" },
          ].map(({ to, label, icon }) => (
            <Link key={to} to={to}
              className={`flex flex-col items-center gap-1 transition-colors ${active(to) ? "text-amber-400" : "text-white hover:text-amber-400"}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
              <span className="text-xs">{label}</span>
            </Link>
          ))}
          <Link to="/cart" className="relative flex flex-col items-center gap-1 text-white hover:text-amber-400 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-xs">Carrito</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-zinc-900 text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

        <Link to="/create" className="hidden md:block bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold px-5 py-2 rounded-xl text-sm transition-colors shadow">
          + Publicar
        </Link>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-3 bg-zinc-900 rounded-2xl p-4 flex flex-col gap-3 shadow-lg">
          {[
            { to: "/", label: "Inicio" },
            { to: "/products", label: "Productos" },
            { to: "/create", label: "Publicar" },
            { to: "/cart", label: `Carrito ${cart.length > 0 ? `(${cart.length})` : ""}` },
          ].map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}
              className={`text-sm py-2 px-3 rounded-lg transition-colors ${active(to) ? "bg-amber-400 text-zinc-900 font-semibold" : "text-white hover:bg-zinc-800"}`}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
