import { Link } from "react-router-dom";
import type { Product } from "../types/Product";
import Badge from "./Badge";

type Props = {
  product: Product;
  onDelete?: (id: number) => void;
};

export default function ProductCard({ product, onDelete }: Props) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-shadow flex flex-col gap-3">
      <div className="flex justify-between items-start gap-2">
        <h2 className="text-gray-900 font-semibold text-sm leading-snug">{product.name}</h2>
        <Badge label={product.category} />
      </div>
      <p className="text-gray-500 text-xs line-clamp-2 flex-1">{product.description}</p>
      <p className="text-teal-700 font-bold text-xl">{product.price} €</p>
      <div className="flex gap-2 pt-1">
        <Link
          to={`/products/${product.id}`}
          className="flex-1 text-center text-xs bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg py-2 transition-colors"
        >
          Ver detalle
        </Link>
        <Link
          to={`/edit/${product.id}`}
          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg px-3 py-2 transition-colors"
        >
          Editar
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(product.id)}
            className="text-xs bg-red-50 hover:bg-red-100 text-red-500 rounded-lg px-3 py-2 transition-colors"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}
