import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productsApi } from "../api/client";
import type { Product } from "../types/Product";
import { useCart } from "../context/CartContext";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import Badge from "../components/Badge";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    productsApi.getOne(Number(id))
      .then(setProduct)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (error || !product) return <ErrorMessage message={error ?? "Producto no encontrado"} />;

  const inCart = cart.some((p) => p.id === product.id);

  return (
    <main className="max-w-2xl mx-auto px-6 py-8">
      <button onClick={() => navigate(-1)}
        className="text-white/70 hover:text-white text-sm mb-6 flex items-center gap-1 transition-colors">
        ← Volver
      </button>
      <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col gap-5">
        <div className="flex justify-between items-start gap-3">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <Badge label={product.category} />
        </div>
        <p className="text-gray-500">{product.description}</p>
        <p className="text-3xl font-bold text-teal-700">{product.price} €</p>
        <button onClick={() => addToCart(product)} disabled={inCart}
          className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold py-3 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          {inCart ? "Ya en el carrito" : "Añadir al carrito"}
        </button>
      </div>
    </main>
  );
}
