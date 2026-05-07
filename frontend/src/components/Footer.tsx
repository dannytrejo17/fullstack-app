export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/20 px-6 py-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-white font-bold text-lg">
          Mini<span className="text-amber-400">Market</span>
        </p>
        <p className="text-white/50 text-xs">
          © 2026 MiniMarket. Todos los derechos reservados.
        </p>
        <div className="flex gap-4 text-white/50 text-xs">
          <span>Marketplace de segunda mano</span>
        </div>
      </div>
    </footer>
  );
}
