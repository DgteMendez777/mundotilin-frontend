"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { galleryService } from "@/services/gallery.service";
import { GalleryMedia } from "@/types/gallery.types";
import {
    getYouTubeEmbedUrl,
    getYouTubeThumbnailUrl,
    isYouTubeUrl,
} from "@/utils/youtube";

export default function YouTubeVideosSection() {
    const [videos, setVideos] = useState<GalleryMedia[]>([]);
    const [selected, setSelected] = useState<GalleryMedia | null>(null);

    useEffect(() => {
        async function loadVideos() {
            const data = await galleryService.getFeatured();
            setVideos(data.filter((item) => item.type === "VIDEO" && isYouTubeUrl(item.url)));
        }

        loadVideos();
    }, []);

    if (videos.length === 0) return null;

    return (
        <section id="videos" className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--primary)]">
                    Videos
                </p>

                <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                    Mira la experiencia en acción
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
                    Videos promocionales para conocer mejor el ambiente y la animación de MundoTilín.
                </p>

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                    {videos.map((video) => {
                        const thumbnail = getYouTubeThumbnailUrl(video.url);

                        return (
                            <button
                                key={video.id}
                                type="button"
                                onClick={() => setSelected(video)}
                                className="group overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] text-left transition hover:-translate-y-1 hover:border-[var(--primary)]"
                            >
                                <div className="relative aspect-video bg-black">
                                    {thumbnail && (
                                        <Image
                                            src={thumbnail}
                                            alt={video.title}
                                            fill
                                            className="object-cover transition group-hover:scale-105"
                                        />
                                    )}

                                    <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                                        <PlayCircle size={58} className="text-white" />
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="font-bold">{video.title}</h3>
                                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                                        {video.description || "Video promocional MundoTilín"}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-4xl overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)]">
                        <div className="aspect-video bg-black">
                            <iframe
                                src={getYouTubeEmbedUrl(selected.url)!}
                                title={selected.title}
                                className="h-full w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>

                        <button
                            onClick={() => setSelected(null)}
                            className="w-full border-t border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--text-soft)] transition hover:bg-[var(--surface-hover)]"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}