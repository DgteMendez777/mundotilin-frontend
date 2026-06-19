"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, MessageSquareHeart, User, CalendarDays } from "lucide-react";
import { routes } from "@/constants/routes";

const navItems = [
  {
    label: "Inicio",
    href: routes.client.dashboard,
    icon: Home,
  },
  {
    label: "Reservas",
    href: routes.client.reservations,
    icon: CalendarDays,
  },
  {
    label: "Testimonios",
    href: routes.client.testimonials,
    icon: MessageSquareHeart,
  },
  {
    label: "Perfil",
    href: routes.client.profile,
    icon: User,
  },
];

export default function ClientSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-(--border) bg-(--surface) px-5 py-6 lg:block">
      <div className="mb-8 flex items-center gap-3">
        <Image
          src="/images/branding/logo-mundotilin.png"
          alt="Mundo Tilín"
          width={56}
          height={56}
          className="object-contain"
        />

        <div>
          <h2 className="font-black leading-tight">Mundo Tilín</h2>
          <p className="text-xs text-(--text-muted)">Panel del cliente</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-(--primary-soft) text-(--primary)"
                  : "text-(--text-muted) hover:bg-(--surface-hover) hover:text-(--text-main)"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}