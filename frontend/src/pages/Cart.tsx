import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <p className="text-white/70 text-lg mb-4">Tu carrito está vacío.</p>
        <Link to="/products" className="text-amber-400 hover:text-amber-300 text-sm transition-colors">
          Ver productos
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-bold text-white drop-shadow mb-6">Carrito</h1>
      <ul className="flex flex-col gap-3 mb-6">
        {cart.map((p) => (
          <li key={p.id}
            className="flex justify-between items-center bg-white rounded-xl px-4 py-3 shadow-sm">
            <div>
              <p className="font-medium text-gray-800 text-sm">{p.name}</p>
              <p className="text-sm text-teal-700 font-semibold">{p.price} €</p>
            </div>
            <button onClick={() => removeFromCart(p.id)}
              className="text-xs text-red-500 hover:text-red-700 transition-colors">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="bg-white rounded-2xl px-6 py-4 shadow-md flex justify-between items-center">
        <p className="text-lg font-bold text-gray-900">Total: {total} €</p>
        <button onClick={clearCart}
          className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
          Vaciar
        </button>
      </div>
    </main>
  );
}
