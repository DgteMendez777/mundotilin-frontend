import { PartyPopper, WandSparkles, Music } from "lucide-react";

const services = [
	{
		id: "show-infantil",
		title: "Show infantil",
		description: "Juegos, dinámicas y animación para cumpleaños.",
		icon: PartyPopper,
	},
	{
		id: "magia-globos",
		title: "Magia y globos",
		description: "Momentos visuales y divertidos para sorprender a los niños.",
		icon: WandSparkles,
	},
	{
		id: "eventos-familiares",
		title: "Eventos familiares",
		description: "Animación adaptable para reuniones, colegios y celebraciones.",
		icon: Music,
	},
];

export default function ServicesPreview() {
	return (
		<section id="servicios" className="px-4 py-16 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div>
					<h2 className="text-3xl font-black">Servicios destacados</h2>
					<p className="mt-2 text-sm text-[var(--text-muted)]">Paquetes pensados para diferentes tipos de eventos.</p>
				</div>

				<div className="mt-8 grid gap-5 md:grid-cols-3">
					{services.map((s) => {
						const Icon = s.icon;

						return (
							<article key={s.id} className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6">
								<div className="mb-4 h-40 w-full rounded-md bg-white/6 flex items-center justify-center text-[var(--text-muted)]">
									{/* Placeholder for service image - connect to backend later */}
									<span>Imagen del servicio</span>
								</div>

								<div className="flex items-center gap-4">
									<Icon size={28} className="text-[var(--primary)]" />
									<h3 className="text-lg font-bold">{s.title}</h3>
								</div>

								<p className="mt-3 text-sm text-[var(--text-muted)]">{s.description}</p>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}

