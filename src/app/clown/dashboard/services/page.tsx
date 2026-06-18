import Link from "next/link";
import { routes } from "@/constants/routes";

export default function ServicesAdminPage() {
    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-3xl font-black">Catálogo</h2>
                <p className="mt-2 text-sm text-(--text-muted)">
                    Administra las categorías y servicios ofrecidos por Mundo Tilín.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <article className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-5">
                    <p className="text-sm text-(--text-muted)">Categorías</p>
                    <h3 className="mt-2 text-3xl font-black">0</h3>
                </article>

                <article className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-5">
                    <p className="text-sm text-(--text-muted)">Servicios activos</p>
                    <h3 className="mt-2 text-3xl font-black">0</h3>
                </article>

                <article className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-5">
                    <p className="text-sm text-(--text-muted)">Servicios inactivos</p>
                    <h3 className="mt-2 text-3xl font-black">0</h3>
                </article>
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
                <section className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-5">
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <div>
                            <h3 className="text-xl font-black">Categorías</h3>
                            <p className="text-sm text-(--text-muted)">
                                Tipos de eventos disponibles.
                            </p>
                        </div>

                        <button className="rounded-xl bg-(--primary) px-4 py-2 text-sm font-semibold hover:bg-(--primary-hover)">
                            + Categoría
                        </button>
                    </div>

                    <div className="space-y-3">
                        <div className="rounded-xl border border-(--border) bg-[#0a0e14] p-4">
                            <p className="font-semibold">Cumpleaños</p>
                            <p className="text-sm text-(--text-muted)">Servicios para fiestas infantiles.</p>
                        </div>

                        <div className="rounded-xl border border-(--border) bg-[#0a0e14] p-4">
                            <p className="font-semibold">Baby Shower</p>
                            <p className="text-sm text-(--text-muted)">Shows familiares y animación.</p>
                        </div>
                    </div>
                </section>

                <section className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-5">
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <div>
                            <h3 className="text-xl font-black">Servicios</h3>
                            <p className="text-sm text-(--text-muted)">
                                Paquetes y precios ofrecidos.
                            </p>
                        </div>

                        <Link
  href={routes.clown.newService}
  className="rounded-xl bg-(--primary) px-4 py-2 text-sm font-semibold hover:bg-(--primary-hover)"
>
  + Servicio
</Link>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-(--border)">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-(--surface-soft) text-(--text-muted)">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Servicio</th>
                                    <th className="px-4 py-3 font-medium">Categoría</th>
                                    <th className="px-4 py-3 font-medium">Precio</th>
                                    <th className="px-4 py-3 font-medium">Estado</th>
                                    <th className="px-4 py-3 font-medium">Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="border-t border-(--border)">
                                    <td className="px-4 py-4 font-medium">Show Premium</td>
                                    <td className="px-4 py-4 text-(--text-muted)">Cumpleaños</td>
                                    <td className="px-4 py-4 text-(--text-soft)">Bs. 500</td>
                                    <td className="px-4 py-4">
                                        <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-300">
                                            Activo
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <Link
  href={routes.clown.editService("1")}
  className="rounded-lg border border-(--border) px-3 py-2 text-xs font-semibold text-(--text-soft) hover:bg-(--surface-hover)"
>
  Editar
</Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </section>
    );
}