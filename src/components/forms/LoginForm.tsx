import Button from "../ui/Button";
import { siteConfig } from "@/constants/site";
import { Lock } from "lucide-react";

export default function LoginForm() {
    return (
        <section className="w-full max-w-md rounded-(--radius-xl) border border-(--border) bg-(--surface)/90 p-6 shadow-2xl backdrop-blur">
            <div className="mb-8 text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-(--surface-soft) text-4xl">
                    🤡
                </div>

                <h1 className="text-3xl font-black">
                    Mundo 
                    <span className="text-(--primary)">
                        Tilín
                    </span>
                </h1>

                <p className="mt-2 text-sm text-(--text-muted)">
                    Inicia sesión para administrar tus eventos.
                </p>
            </div>

            <form className="space-y-5">
                <div>
                    <label className="mb-2 block text-sm font-medium text-(--text-soft)">
                        Correo electrónico
                    </label>
                    <input type="email" placeholder={siteConfig.loginEmail} className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 focus:border-(--primary)"/>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-(--text-soft)">
                        Contraseña
                    </label>
                    <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 focus:border-(--primary)"/>
                </div>

                <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 text-(--text-muted)">
                        <input type="checkbox" className="accent-(--primary)" />
                        Recordarme
                    </label>

                    <a href="#" className="text-(--primary) hover:underline">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>

                <Button type="submit" className="w-full">
                    Iniciar sesión
                </Button>
            </form>

            <p className="flex align-middle justify-center mt-6 text-center text-xs text-(--text-muted)">
                <Lock size={16} className="mr-2"/> Protegido con seguridad
            </p>
        </section>
    );
}