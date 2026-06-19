"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, MessageSquareHeart, User, CalendarDays } from "lucide-react";
import { routes } from "@/constants/routes";
import { LogOut, Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

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
  const { logout } = useAuth();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-[var(--border)] bg-[var(--surface)] px-5 py-6 lg:block">
      <div className="mb-8 flex items-center gap-3">
        <Image
          src="/images/landing/og-image.png"
          alt="Mundo Tilín"
          width={56}
          height={56}
          className="object-contain"
        />

        <div>
          <h2 className="font-black leading-tight">Mundo Tilín</h2>
          <p className="text-xs text-[var(--text-muted)]">Panel del cliente</p>
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
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-[var(--surface-hover)] border-l-4 border-[var(--primary)] text-white"
                  : "text-[var(--text-soft)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-main)]"
              }`}
            >
              <Icon size={18} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <button onClick={logout} className="flex items-center gap-2 rounded-xl border border-(--border) px-3 py-2 text-sm text-(--text-soft) transition hover:bg-(--surface-hover) hover:border-(--primary) hover:text-(--text-main)">
                        <LogOut size={16} />
                        <span className="hidden sm:inline">Salir</span>
                    </button>
    </aside>
  );
}