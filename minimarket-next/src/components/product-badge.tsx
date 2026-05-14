type Props = { label: string };

const colors: Record<string, string> = {
  Electrónica: "bg-blue-100 text-blue-700",
  Ropa: "bg-pink-100 text-pink-700",
  Deporte: "bg-green-100 text-green-700",
  Hogar: "bg-orange-100 text-orange-700",
  Libros: "bg-yellow-100 text-yellow-700",
  General: "bg-gray-100 text-gray-600",
};

export function ProductBadge({ label }: Props) {
  const color = colors[label] ?? "bg-gray-100 text-gray-600";
  return (
    <span
      className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${color}`}
    >
      {label}
    </span>
  );
}
