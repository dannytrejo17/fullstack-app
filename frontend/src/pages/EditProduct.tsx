import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productsApi } from "../api/client";
import type { CreateProductInput } from "../types/Product";

const CATEGORIES = ["Electrónica", "Ropa", "Deporte", "Hogar", "Libros", "General"];

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<CreateProductInput>({ name: "", price: 0, description: "", category: "General" });
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    productsApi.getOne(Number(id)).then((product) => {
      setForm({ name: product.name, price: product.price, description: product.description, category: product.category });
    });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "price" ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await productsApi.update(Number(id), form);
      navigate("/");
    } catch (err) {
      setServerError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-lg mx-auto px-6 py-8">
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Editar producto</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Field label="Nombre">
            <input name="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="Ej: iPhone 13" />
          </Field>
          <Field label="Precio (€)">
            <input name="price" type="number" min={0} value={form.price || ""} onChange={handleChange} className={inputClass} placeholder="Ej: 250" />
          </Field>
          <Field label="Descripción">
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={inputClass} placeholder="Describe el producto..." />
          </Field>
          <Field label="Categoría">
            <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          {serverError && <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{serverError}</p>}
          <button type="submit" disabled={submitting}
            className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold py-3 rounded-xl transition-colors disabled:opacity-50">
            {submitting ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </div>
    </main>
  );
}

const inputClass = "w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  );
}
