import { Link } from "react-router-dom";
import type { Product } from "../types/Product";
import Badge from "./Badge";

type Props = {
  product: Product;
  onDelete?: (id: number) => void;
};

export default function ProductCard({ product, onDelete }: Props) {
  return (
    <div className="border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2 bg-white">
      <div className="flex justify-between items-start">
        <h2 className="text-base font-semibold text-gray-800">{product.name}</h2>
        <Badge label={product.category} />
      </div>
      <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
      <p className="text-lg font-bold text-indigo-600">{product.price} €</p>
      <div className="flex gap-2 mt-auto pt-2">
        <Link
          to={`/products/${product.id}`}
          className="flex-1 text-center text-sm bg-indigo-600 text-white rounded-lg py-1.5 hover:bg-indigo-700 transition-colors"
        >
          Ver detalle
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(product.id)}
            className="text-sm bg-red-100 text-red-600 rounded-lg px-3 py-1.5 hover:bg-red-200 transition-colors"
          >
            Eliminar
          </button>
        )}
        
      </div>

<Link
  to={`/edit/${product.id}`}
  className="text-sm bg-indigo-100 text-indigo-600 rounded-lg px-3 py-1.5 hover:bg-indigo-200 transition-colors"
>
  Editar
</Link>

    </div>
  );
}
