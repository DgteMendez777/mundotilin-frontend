"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { testimonialsService } from "@/services/testimonials.service";
import { Testimonial } from "@/types/testimonial.types";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await testimonialsService.getFeatured();
        setTestimonials(data);
      } catch (error) {
        console.error("Error cargando testimonios:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadTestimonials();
  }, []);

  return (
    <section id="testimonios" className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--primary)]">
          Testimonios
        </p>

        <h2 className="mt-3 text-3xl font-black sm:text-4xl">
          Opiniones de nuestros clientes
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
          Conoce la experiencia de familias que confiaron en MundoTilín para sus eventos.
        </p>

        {isLoading ? (
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)]"
              />
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <div className="mt-8 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--text-muted)]">
            Aún no hay testimonios destacados.
          </div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <article
                key={item.id}
                className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:-translate-y-1 hover:border-[var(--primary)] hover:bg-[var(--surface-hover)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex size-12 items-center justify-center overflow-hidden rounded-full bg-[var(--surface-soft)] text-[var(--primary)]">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.clientName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-sm font-black">
                          {item.clientName.slice(0, 1).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-bold">{item.clientName}</h3>
                      <p className="text-xs text-[var(--text-muted)]">
                        {item.eventType || "Cliente MundoTilín"}
                      </p>
                    </div>
                  </div>

                  <Quote size={22} className="text-[var(--primary)]" />
                </div>

                <div className="mt-5 flex gap-1 text-[var(--warning)]">
                  {Array.from({ length: item.rating }).map((_, index) => (
                    <Star key={index} size={16} fill="currentColor" />
                  ))}
                </div>

                <p className="mt-4 line-clamp-5 text-sm leading-7 text-[var(--text-muted)]">
                  “{item.comment}”
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}