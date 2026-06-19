"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { routes } from "@/constants/routes";
import { Home, PartyPopper, BookImage, Phone, LogIn, UserPlus, Sparkles, Info } from "lucide-react";
import Image from "next/image";
import SocialLinks from "./SocialLinks";

const navItems = [
    { label: "Inicio", href: "#inicio", id: "inicio", icon: Home },
    { label: "Servicios", href: "#servicios", id: "servicios", icon: PartyPopper },
    { label: "Sobre nosotros", href: "#sobre-nosotros", id: "sobre-nosotros", icon: Info },
    { label: "Galería", href: "#galeria", id: "galeria", icon: BookImage },
    { label: "Contacto", href: "#contacto", id: "contacto", icon: Phone },
];

export default function LandingHeader() {
    const [activeSection, setActiveSection] = useState("inicio");

    useEffect(() => {
        const handleScroll = () => {
            let currentSection = "inicio";

            navItems.forEach((item) => {
                const section = document.getElementById(item.id);

                if (section) {
                    const sectionTop = section.offsetTop - 120;

                    if (window.scrollY >= sectionTop) {
                        currentSection = item.id;
                    }
                }
            });

            setActiveSection(currentSection);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    function handleNavClick(id: string) {
        setActiveSection(id);
    }

    return (
        <header className="sticky top-0 z-40 border-b border-(--border) bg-(--background)/85 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <Link
    href="/"
    className="flex items-center gap-3 font-black"
    onClick={() => setActiveSection("inicio")}
>
    <Image
        src="/images/landing/og-image.png"
        alt="Mundo Tilín"
        width={42}
        height={42}
        className="object-contain"
    />

    <span className="hidden text-xl sm:inline">
        Mundo<span className="text-(--primary)">Tilín</span>
    </span>
</Link>

                <nav className="flex items-center gap-3 text-(--text-muted) sm:gap-6">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;

                        return (
                            <a
                                key={item.id}
                                href={item.href}
                                onClick={() => handleNavClick(item.id)}
                                className={`relative flex rounded-xl p-2 text-sm font-semibold transition sm:rounded-none sm:p-0 ${isActive
                                        ? "text-(--primary)"
                                        : "text-(--text-muted) hover:text-(--primary)"
                                    }`}
                            >
                                <Icon size={18} className="mr-2 sm:hidden" />
                                <span className="hidden sm:inline">{item.label}</span>

                                {isActive && (
                                    <span className="absolute -bottom-2 left-0 hidden h-0.5 w-full rounded-full bg-(--primary) sm:block" />
                                )}
                            </a>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-2">
                    <div className="hidden sm:block">
                        <SocialLinks />
                    </div>
                    <Link
                        href={routes.login}
                        className="flex rounded-2xl border border-(--border) p-2 text-sm font-semibold text-(--text-soft) transition hover:bg-(--surface-hover) sm:px-4 sm:py-2"
                    >
                        <LogIn size={18} className="mr-2 sm:hidden" />
                        <span className="hidden sm:inline">Iniciar sesión</span>
                    </Link>

                    <Link
                        href={routes.register}
                        className="flex rounded-2xl border border-(--border) bg-(--primary) p-2 text-sm font-semibold text-white transition hover:bg-(--primary-hover) sm:px-4 sm:py-2"
                    >
                        <UserPlus size={18} className="mr-2 sm:hidden" />
                        <span className="hidden sm:inline">Registrarse</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}