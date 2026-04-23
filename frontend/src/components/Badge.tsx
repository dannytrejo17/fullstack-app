type Props = {
  label: string;
};

export default function Badge({ label }: Props) {
  return (
    <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-0.5 rounded-full">
      {label}
    </span>
  );
}
