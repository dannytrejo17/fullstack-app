type Props = { message: string; onRetry?: () => void };

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <p className="text-white/80 text-sm">{message}</p>
      {onRetry && (
        <button onClick={onRetry}
          className="text-xs bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
          Reintentar
        </button>
      )}
    </div>
  );
}
