"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageIcon, Play, X } from "lucide-react";
import { galleryService } from "@/services/gallery.service";
import { GalleryMedia } from "@/types/gallery.types";
import { getYouTubeEmbedUrl, isYouTubeUrl } from "@/utils/youtube";

export default function GallerySection() {
	const [items, setItems] = useState<GalleryMedia[]>([]);
	const [selected, setSelected] = useState<GalleryMedia | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function loadGallery() {
			try {
				const data = await galleryService.getFeatured();
				setItems(data.filter((item) => !isYouTubeUrl(item.url)));
			} catch (error) {
				console.error("Error cargando galería:", error);
			} finally {
				setIsLoading(false);
			}
		}

		loadGallery();
	}, []);

	return (
		<section id="galeria" className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div>
					<p className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--primary)]">
						Galería
					</p>

					<h2 className="mt-3 text-3xl font-black sm:text-4xl">
						Momentos que hablan por nosotros
					</h2>

					<p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
						Fotografías y videos de eventos realizados para que puedas conocer
						mejor la experiencia MundoTilín.
					</p>
				</div>

				{isLoading ? (
					<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{[1, 2, 3, 4].map((item) => (
							<div
								key={item}
								className="h-64 animate-pulse rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)]"
							/>
						))}
					</div>
				) : items.length === 0 ? (
					<div className="mt-8 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--text-muted)]">
						Aún no hay contenido destacado en la galería.
					</div>
				) : (
					<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{items.map((item) => (
							<button
								key={item.id}
								type="button"
								onClick={() => setSelected(item)}
								className="group overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] text-left transition hover:-translate-y-1 hover:border-[var(--primary)] hover:bg-[var(--surface-hover)]"
							>
								<div className="relative h-56 w-full overflow-hidden bg-[var(--surface-soft)]">
									{item.type === "IMAGE" ? (
										<Image
											src={item.url}
											alt={item.title}
											fill
											className="object-cover transition duration-300 group-hover:scale-105"
										/>
									) : isYouTubeUrl(item.url) ? (
										<div className="flex h-full w-full items-center justify-center bg-black text-white">
											<Play size={42} />
										</div>
									) : (
										<video
											src={item.url}
											className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
											muted
											playsInline
										/>
									)}

									<div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/35" />

									<div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/45 p-2 text-white backdrop-blur">
										{item.type === "IMAGE" ? (
											<ImageIcon size={18} />
										) : (
											<Play size={18} />
										)}
									</div>
								</div>

								<div className="p-4">
									<h3 className="line-clamp-1 font-bold text-[var(--text-main)]">
										{item.title}
									</h3>

									<p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--text-muted)]">
										{item.description || "Evento MundoTilín"}
									</p>
								</div>
							</button>
						))}
					</div>
				)}
			</div>

			{selected && (
				<div
					role="dialog"
					aria-modal="true"
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
				>
					<div className="w-full max-w-4xl overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)]">
						<div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
							<div>
								<h3 className="font-bold">{selected.title}</h3>

								{selected.description && (
									<p className="text-sm text-[var(--text-muted)]">
										{selected.description}
									</p>
								)}
							</div>

							<button
								type="button"
								onClick={() => setSelected(null)}
								className="rounded-xl p-2 text-[var(--text-muted)] transition hover:bg-[var(--surface-hover)] hover:text-white"
							>
								<X size={20} />
							</button>
						</div>

						<div className="relative h-[70vh] bg-black">
							{selected.type === "IMAGE" ? (
								<Image
									src={selected.url}
									alt={selected.title}
									fill
									className="object-contain"
								/>
							) : getYouTubeEmbedUrl(selected.url) ? (
								<iframe
									src={getYouTubeEmbedUrl(selected.url)!}
									title={selected.title}
									className="h-full w-full"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									allowFullScreen
								/>
							) : (
								<video
									src={selected.url}
									controls
									autoPlay
									className="h-full w-full object-contain"
								/>
							)}
						</div>
					</div>
				</div>
			)}
		</section>
	);
}