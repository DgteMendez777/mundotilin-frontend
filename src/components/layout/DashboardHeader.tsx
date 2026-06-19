"use client";

import { LogOut, Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardHeader() {
    const { logout } = useAuth();
    return (
        <header className="sticky top-0 z-30 border-b border-(--border) bg-(--background)/80 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-(--text-muted)">
                        Administración
                    </p>
                    <h3 className="text-xl font-black">Panel de control</h3>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="rounded-xl border border-(--border) p-2 text-(--text-muted) lg:hidden">
                        <Menu size={20} />
                    </button>

                    <button onClick={logout} className="flex items-center gap-2 rounded-xl border border-(--border) px-3 py-2 text-sm text-(--text-soft) transition hover:bg-(--surface-hover) hover:border-(--primary) hover:text-(--text-main)">
                        <LogOut size={16} />
                        <span className="hidden sm:inline">Salir</span>
                    </button>
                </div>
            </div>
        </header>
    );
}