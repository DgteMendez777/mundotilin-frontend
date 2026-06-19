import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, Sparkles, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="inicio" className="scroll-mt-24 relative overflow-hidden px-5 pt-28 pb-16 sm:px-8 lg:px-16 lg:pt-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.22),transparent_35%),radial-gradient(circle_at_top_left,rgba(168,85,247,0.14),transparent_30%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2 text-sm text-[var(--text-soft)]">
            <Star size={16} className="text-[var(--warning)]" />
            Shows profesionales para momentos especiales
          </div>

          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Convertimos cada evento en una experiencia{" "}
            <span className="text-[var(--primary)]">inolvidable</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
            MundoTilín lleva alegría, juegos, animación y momentos únicos a
            cumpleaños, baby showers, eventos familiares y celebraciones
            especiales.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#servicios"
              className="group inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--primary)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--primary-hover)] hover:shadow-lg hover:shadow-purple-950/40"
            >
              Ver servicios
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-6 py-3 font-semibold text-[var(--text-soft)] transition hover:border-[var(--primary)] hover:bg-[var(--surface-hover)]"
            >
              <CalendarDays size={18} />
              Cotizar evento
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="text-2xl font-black text-white">+100</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">eventos</p>
            </div>

            <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="text-2xl font-black text-white">+5</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">años</p>
            </div>

            <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="text-2xl font-black text-white">+300</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">clientes</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-[var(--primary-soft)] blur-3xl" />

          <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[linear-gradient(145deg,var(--surface),var(--surface-soft))] p-4 shadow-2xl shadow-purple-950/30">
            <div className="absolute right-5 top-5 z-10 rounded-full border border-[var(--border)] bg-black/30 px-4 py-2 text-sm text-[var(--text-soft)] backdrop-blur">
              Alegría garantizada
            </div>

            <Image
              src="/images/landing/placeholder-hero.svg"
              alt="Imagen de presentación - placeholder"
              width={700}
              height={760}
              priority
              className="h-auto w-full object-contain"
            />

            <div className="absolute bottom-5 left-5 right-5 rounded-[var(--radius-lg)] border border-white/10 bg-black/35 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-full bg-[var(--primary)]">
                  <Sparkles size={20} />
                </div>
                <div>
                  <p className="font-bold">Shows llenos de energía</p>
                  <p className="text-sm text-[var(--text-muted)]">
                    Juegos, música, dinámicas y animación familiar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}