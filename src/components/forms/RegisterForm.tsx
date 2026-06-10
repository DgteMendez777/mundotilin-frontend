import Button from "../ui/Button";
import { siteConfig } from "@/constants/site";

export default function RegisterForm() {
    return (
        <section className="w-full max-w-lg rounded-(--radius-xl) border border-(--border) bg-(--surface)/90 p-6 shadow-2xl backdrop-blur">
            <div className="mb-8 text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-(--surface-soft)">
                    🤡
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

            <form className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-(--text-soft)">
                            Nombre
                        </label>
                        <input type="text" name="firstName" placeholder="Ej. Alex" required className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 focus:border-(--primary)"/>
                    </div>
                    
                    <div>
                        <label className="mb-2 block text-sm font-medium text-(--text-soft)">
                            Apellido
                        </label>
                        <input type="text" name="lastName" placeholder="Ej. Méndez" required className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 focus:border-(--primary)"/>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-(--text-soft)">
                        Correo electrónico
                    </label>
                    <input type="email" name="email" placeholder={siteConfig.loginEmail} required className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 focus:border-(--primary)"/>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-(--text-soft)">
                        Teléfono
                    </label>
                    <input type="tel" name="phone" placeholder="Ej. 70000000" className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 focus:border-(--primary)"/>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-(--text-soft)">
                        Contraseña
                    </label>
                    <input type="password" name="password" placeholder="Mínimo 8 caracteres" minLength={8} required className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 focus:border-(--primary)"/>
                </div>

                <input type="hidden" name="role" value="CLIENT" />
                <Button type="submit" className="w-full">
                    Crear cuenta
                </Button>
            </form>

            <p className="mt-6 text-center text-xs text-(--text-muted)">
                ¿Ya tienes una cuenta?{" "}
                <a href="/login" className="text-(--primary) hover:underline">
                    Inicia sesión
                </a>
            </p>
        </section>
    );
}