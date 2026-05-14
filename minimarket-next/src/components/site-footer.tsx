export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/20 px-6 py-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-white font-bold text-lg">
          Mini<span className="text-amber-400">Market</span>
        </p>
        <p className="text-white/50 text-xs">
          © {new Date().getFullYear()} MiniMarket. Todos los derechos reservados.
        </p>
        <p className="text-white/50 text-xs">Marketplace de segunda mano</p>
      </div>
    </footer>
  );
}
