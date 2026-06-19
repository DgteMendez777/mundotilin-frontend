"use client";

import Button from "../ui/Button";
import { siteConfig } from "@/constants/site";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { routes } from "@/constants/routes";
import Image from "next/image";

export default function RegisterForm() {
    const { register, isLoading, error } = useAuth();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        await register({
            firstName: String(formData.get("firstName")),
            lastName: String(formData.get("lastName")),
            email: String(formData.get("email")),
            password: String(formData.get("password")),
            phone: String(formData.get("phone") || ""),
            role: "CLIENT"
        });
    }
    return (
        <section className="w-full max-w-lg rounded-(--radius-xl) border border-(--border) bg-(--surface)/90 p-6 shadow-2xl backdrop-blur">
            <div className="mb-8 text-center">
                <div className="mx-auto mb-0 flex justify-center">
    <Image
        src="/images/landing/og-image.png"
        alt="Mundo Tilín"
        width={150}
        height={150}
        className="object-contain"
    />
</div>

                <h1 className="text-3xl font-black">
                    Mundo
                    <span className="text-(--primary)">
                        Tilín
                    </span>
                </h1>

                <p className="mt-2 text-sm text-(--text-muted)">
                    Regístrate para conocer más de {siteConfig.name}.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-(--text-soft)">
                            Nombre
                        </label>
                        <input type="text" name="firstName" placeholder="Ej. Alex" required className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 focus:border-(--primary)" />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-(--text-soft)">
                            Apellido
                        </label>
                        <input type="text" name="lastName" placeholder="Ej. Méndez" required className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 focus:border-(--primary)" />
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-(--text-soft)">
                        Correo electrónico
                    </label>
                    <input type="email" name="email" placeholder={siteConfig.loginEmail} required className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 focus:border-(--primary)" />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-(--text-soft)">
                        Teléfono
                    </label>
                    <input type="tel" name="phone" placeholder="Ej. 70000000" className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 focus:border-(--primary)" />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-(--text-soft)">
                        Contraseña
                    </label>
                    <input type="password" name="password" placeholder="Mínimo 8 caracteres" minLength={8} required className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 focus:border-(--primary)" />
                </div>

                <input type="hidden" name="role" value="CLIENT" />

                {error && (
                    <p className="rounded-xl border border-(--danger) bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        {error}
                    </p>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creando cuenta..." : "Crear cuenta"}
                </Button>
            </form>

            <div className="mt-6 space-y-3 text-center text-xs text-(--text-muted)">
                <p>
                    ¿Ya tienes una cuenta?{" "}
                    <Link href={routes.login} className="font-semibold text-(--primary) hover:underline">
                        Inicia sesión
                    </Link>
                </p>

                <Link
                    href="/"
                    className="inline-flex rounded-xl border border-(--border) px-4 py-2 font-semibold text-(--text-soft) transition hover:bg-(--surface-hover) hover:text-(--primary)"
                >
                    Volver al inicio
                </Link>
            </div>
        </section>
    );
}