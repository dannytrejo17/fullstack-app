import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productsApi } from "../api/client";
import type { CreateProductInput } from "../types/Product";

type FormErrors = Partial<Record<keyof CreateProductInput, string>>;

const CATEGORIES = ["Electrónica", "Ropa", "Deporte", "Hogar", "Libros", "General"];

const emptyForm: CreateProductInput = {
  name: "",
  price: 0,
  description: "",
  category: "General",
  image: "",
};

export default function CreateProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState<CreateProductInput>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (form.price <= 0) newErrors.price = "El precio debe ser mayor que 0";
    if (!form.description.trim()) newErrors.description = "La descripción es obligatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "price" ? Number(value) : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setServerError(null);
    try {
      await productsApi.create(form);
      navigate("/products");
    } catch (err) {
      setServerError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-lg mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Publicar producto</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Field label="Nombre" error={errors.name}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className={inputClass(!!errors.name)}
            placeholder="Ej: iPhone 13"
          />
        </Field>

        <Field label="Precio (€)" error={errors.price}>
          <input
            name="price"
            type="number"
            min={0}
            value={form.price || ""}
            onChange={handleChange}
            className={inputClass(!!errors.price)}
            placeholder="Ej: 250"
          />
        </Field>

        <Field label="Descripción" error={errors.description}>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className={inputClass(!!errors.description)}
            placeholder="Describe el producto..."
          />
        </Field>

        <Field label="Categoría">
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass(false)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        {serverError && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{serverError}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="bg-indigo-600 text-white py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {submitting ? "Publicando..." : "Publicar"}
        </button>
      </form>
    </main>
  );
}

function inputClass(hasError: boolean) {
  return `border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
    hasError ? "border-red-400 bg-red-50" : "border-gray-300"
  }`;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
