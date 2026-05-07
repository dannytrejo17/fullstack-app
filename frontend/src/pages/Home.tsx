import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  const { products, loading, error, refetch, deleteProduct } = useProducts();
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
    <main className="max-w-5xl mx-auto px-6 py-8">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-white drop-shadow mb-3">
          Compra y vende<br />con facilidad
        </h1>
        <p className="text-white/70 text-lg mb-6">
          Descubre productos de segunda mano o publica el tuyo.
        </p>
        <Link to="/create"
          className="inline-block bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold px-6 py-3 rounded-xl transition-colors shadow">
          + Publicar producto
        </Link>
      </div>

      {/* Buscador */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-8">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-gray-800 placeholder-gray-400 text-sm focus:outline-none"
        />
      </div>

      {loading && <Spinner />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {!loading && !error && filtered.length === 0 && (
        <p className="text-white/60 text-center py-20">No se encontraron productos.</p>
      )}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onDelete={deleteProduct} />
          ))}
        </div>
      )}
    </main>
  );
}
