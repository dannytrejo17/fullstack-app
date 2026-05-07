import { useState, useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

const CATEGORIES = ["Todos", "Electrónica", "Ropa", "Deporte", "Hogar", "Libros", "General"];

export default function Products() {
  const { products, loading, error, refetch, deleteProduct } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        const matchSearch =
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === "Todos" || p.category === category;
        return matchSearch && matchCategory;
      }),
    [products, search, category]
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-white drop-shadow mb-6">Productos</h1>

      {/* Buscador y filtros */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-6 flex flex-col sm:flex-row gap-3 items-center">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 text-gray-800 placeholder-gray-400 text-sm focus:outline-none"
        />
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className={`text-xs px-3 py-1.5 rounded-lg transition-colors font-medium ${
                category === c
                  ? "bg-amber-400 text-zinc-900"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-white/60 text-center py-20">No se encontraron productos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onDelete={deleteProduct} />
          ))}
        </div>
      )}
    </main>
  );
}
