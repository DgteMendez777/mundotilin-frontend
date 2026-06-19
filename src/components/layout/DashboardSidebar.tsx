"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Home, ImageIcon, PartyPopper, User, MessageSquareHeart } from "lucide-react";
import { routes } from "@/constants/routes";
import Image from "next/image";

const navItems = [
    {
        label: "Inicio",
        href: routes.clown.dashboard,
        icon: Home,
    },
    {
        label: "Eventos",
        href: routes.clown.events,
        icon: CalendarDays,
    },
    {
        label: "Servicios",
        href: routes.clown.services,
        icon: PartyPopper,
    },
    {
    label: "Galería",
    href: routes.clown.gallery,
    icon: ImageIcon,
},
{
  label: "Testimonios",
  href: routes.clown.testimonials,
  icon: MessageSquareHeart,
},
    {
        label: "Perfil",
        href: routes.clown.profile,
        icon: User,
    },
    
]

export default function DashboardSidebar () {
    const pathname = usePathname();

    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-(--border) bg-(--surface) px-5 py-6 lg:block">
            <div className="mb-8 flex items-center">
                <Image
                        src="/images/landing/og-image.png"
                        alt="Mundo Tilín"
                        width={100}
                        height={100}
                        className="object-contain"
                    />
                <div>
                    <h2 className="font-black leading-tight">Mundo Tilín</h2>
                    <p className="text-xs text-(--text-muted)">Panel del payaso</p>
                </div>
            </div>

            <nav className="space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
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
    )
}