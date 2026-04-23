import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold tracking-tight">
        MiniMarket
      </Link>
      <div className="flex gap-6 items-center text-sm">
        <Link to="/" className="hover:text-gray-300 transition-colors">
          Inicio
        </Link>
        <Link to="/products" className="hover:text-gray-300 transition-colors">
          Productos
        </Link>
        <Link to="/create" className="hover:text-gray-300 transition-colors">
          Publicar
        </Link>
        <Link
          to="/cart"
          className="relative hover:text-gray-300 transition-colors"
          aria-label="Carrito"
        >
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
