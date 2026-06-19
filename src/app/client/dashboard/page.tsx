"use client";

import Link from "next/link";
import { CalendarDays, MessageSquare, User, ClipboardList } from "lucide-react";
import { routes } from "@/constants/routes";

const cards = [
  {
    id: "reservas",
    title: "Mis reservas",
    description: "Consulta tus eventos y solicitudes realizadas.",
    href: routes.client.reservations,
    icon: CalendarDays,
    color: "from-teal-500 to-cyan-500",
  },
  {
    id: "testimonios",
    title: "Mis testimonios",
    description: "Comparte tu experiencia con MundoTilín.",
    href: routes.client.testimonials,
    icon: MessageSquare,
    color: "from-sky-500 to-indigo-500",
  },
  {
    id: "perfil",
    title: "Mi perfil",
    description: "Revisa y actualiza tus datos personales.",
    href: routes.client.profile,
    icon: User,
    color: "from-emerald-500 to-lime-500",
  },
];

export default function ClientDashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Tu espacio — Cliente</h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)]">Aquí puedes revisar tus reservas, testimonios y tu perfil.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;

          return (
            <Link key={c.id} href={c.href} className="group relative block overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:shadow-lg">
              <div className={`absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br ${c.color} opacity-20 blur-2xl`} aria-hidden />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{c.title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)] max-w-sm">{c.description}</p>
                </div>

                <div className="ml-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/5 transition group-hover:scale-105">
                  <Icon size={20} className="text-[var(--primary)]" />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <ClipboardList size={14} />
                <span>Ver detalles</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}