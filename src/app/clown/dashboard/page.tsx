export default function ClownDashboardPage() {
    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-3xl font-black">Bienvenido al panel</h2>
                <p className="mt-2 text-sm text-(--text-muted)">
                    Gestiona tus eventos, servicios, calendario y datos principales de Mundo Tilín.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <article className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-5">
                    <p className="text-sm text-(--text-muted)">Eventos próximos</p>
                    <h3 className="mt-3 text-3xl font-black">0</h3>
                </article>

                <article className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-5">
                    <p className="text-sm text-(--text-muted)">Servicios activos</p>
                    <h3 className="mt-3 text-3xl font-black">0</h3>
                </article>

                <article className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-5">
                    <p className="text-sm text-(--text-muted)">Reservas pendientes</p>
                    <h3 className="mt-3 text-3xl font-black">0</h3>
                </article>

                <article className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-5">
                    <p className="text-sm text-(--text-muted)">Pagos registrados</p>
                    <h3 className="mt-3 text-3xl font-black">0</h3>
                </article>
            </div>
        </section>
    );
}