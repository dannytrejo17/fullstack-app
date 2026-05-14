import Image from "next/image";
import Link from "next/link";
import { HERO_IMAGE_URL, IMAGE_BLUR_DATA_URL } from "@/lib/image-url";

export function HeroSection() {
  return (
    <section className="mb-10 w-full text-center">
      <div className="relative mx-auto mb-8 h-48 sm:h-64 max-w-3xl overflow-hidden rounded-3xl shadow-xl ring-1 ring-white/20">
        <Image
          src={HERO_IMAGE_URL}
          alt="MiniMarket — compra y vende de segunda mano"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover"
          placeholder="blur"
          blurDataURL={IMAGE_BLUR_DATA_URL}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 px-4">
          <p className="text-white/90 text-sm font-medium drop-shadow">
            Marketplace de segunda mano
          </p>
        </div>
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow mb-3">
        Compra y vende
        <br />
        con facilidad
      </h1>
      <p className="text-white/70 text-lg mb-6">
        Descubre productos de segunda mano o publica el tuyo.
      </p>
      <Link
        href="/publicar"
        className="inline-block bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold px-6 py-3 rounded-xl transition-colors shadow"
      >
        + Publicar producto
      </Link>
    </section>
  );
}
