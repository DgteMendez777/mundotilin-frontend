import { useState } from "react";
import Image from "next/image";

const gallery = [
	{ id: "g1", src: "/images/landing/placeholder-hero.svg", alt: "Galería 1" },
	{ id: "g2", src: "/images/landing/placeholder-hero.svg", alt: "Galería 2" },
	{ id: "g3", src: "/images/landing/placeholder-hero.svg", alt: "Galería 3" },
	{ id: "g4", src: "/images/landing/placeholder-hero.svg", alt: "Galería 4" },
	{ id: "g5", src: "/images/landing/placeholder-hero.svg", alt: "Galería 5" },
	{ id: "g6", src: "/images/landing/placeholder-hero.svg", alt: "Galería 6" },
];

export default function GallerySection() {
	const [open, setOpen] = useState<string | null>(null);

	return (
		<section id="galeria" className="px-4 py-16 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<h2 className="text-3xl font-black">Galería</h2>
				<p className="mt-2 text-sm text-[var(--text-muted)]">Algunos momentos y shows que hemos realizado.</p>

				<div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
					{gallery.map((item) => (
						<button key={item.id} onClick={() => setOpen(item.id)} className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
							<div className="h-44 w-full relative">
								<Image src={item.src} alt={item.alt} fill className="object-cover" />
							</div>
						</button>
					))}
				</div>

				{open && (
					<div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
						<div className="max-w-3xl w-full">
							<div className="rounded-lg overflow-hidden bg-[var(--surface)] p-4">
								<div className="relative h-80 w-full">
									<Image src={gallery.find((g) => g.id === open)!.src} alt={gallery.find((g) => g.id === open)!.alt} fill className="object-contain" />
								</div>
								<div className="mt-4 text-right">
									<button onClick={() => setOpen(null)} className="rounded bg-[var(--primary)] px-4 py-2 font-semibold">Cerrar</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

