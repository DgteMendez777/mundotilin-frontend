import Link from "next/link";
import { CalendarDays, MessageSquareHeart, User } from "lucide-react";
import { routes } from "@/constants/routes";

const cards = [
  {
    title: "Mis reservas",
    description: "Consulta tus eventos y solicitudes realizadas.",
    href: routes.client.reservations,
    icon: CalendarDays,
  },
  {
    title: "Mis testimonios",
    description: "Comparte tu experiencia con MundoTilín.",
    href: routes.client.testimonials,
    icon: MessageSquareHeart,
  },
  {
    title: "Mi perfil",
    description: "Revisa tus datos personales.",
    href: routes.client.profile,
    icon: User,
  },
];

export default function ClientDashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Panel del cliente</h1>
        <p className="mt-2 text-sm text-(--text-muted)">
          Bienvenido a tu espacio personal en MundoTilín.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-6 transition hover:-translate-y-1 hover:border-(--primary) hover:bg-(--surface-hover)"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-(--primary-soft) text-(--primary)">
                <Icon size={24} />
              </div>

              <h2 className="font-bold">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-(--text-muted)">
                {card.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}