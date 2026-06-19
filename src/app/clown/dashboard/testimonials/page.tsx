"use client";

import { useEffect, useState } from "react";
import { MessageSquareHeart, Star, Trash2 } from "lucide-react";
import { testimonialsService } from "@/services/testimonials.service";
import { Testimonial } from "@/types/testimonial.types";
import Toast from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast, showToast, hideToast } = useToast();

  async function loadTestimonials() {
    try {
      const data = await testimonialsService.getAdmin();
      setItems(data);
    } catch {
      showToast("error", "No se pudieron cargar los testimonios.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function toggleFeatured(item: Testimonial) {
    try {
      await testimonialsService.update(item.id, {
        isFeatured: !item.isFeatured,
      });
      showToast("success", "Testimonio actualizado.");
      loadTestimonials();
    } catch {
      showToast("error", "No se pudo actualizar.");
    }
  }

  async function toggleActive(item: Testimonial) {
    try {
      await testimonialsService.update(item.id, {
        isActive: !item.isActive,
      });
      showToast("success", "Visibilidad actualizada.");
      loadTestimonials();
    } catch {
      showToast("error", "No se pudo actualizar.");
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm("¿Eliminar este testimonio?");
    if (!confirmDelete) return;

    try {
      await testimonialsService.remove(id);
      showToast("success", "Testimonio eliminado.");
      loadTestimonials();
    } catch {
      showToast("error", "No se pudo eliminar.");
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-black">Testimonios</h2>
        <p className="mt-2 text-sm text-(--text-muted)">
          Administra las opiniones de clientes y decide cuáles aparecerán en la landing.
        </p>
      </div>

      <div className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-4">
        {isLoading ? (
          <p className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm text-(--text-muted)">
            Cargando testimonios...
          </p>
        ) : items.length === 0 ? (
          <p className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm text-(--text-muted)">
            Todavía no hay testimonios registrados.
          </p>
        ) : (
          <div className="grid gap-5 xl:grid-cols-2">
            {items.map((item) => (
              <article
                key={item.id}
                className="rounded-(--radius-xl) border border-(--border) bg-[#0a0e14] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-(--primary-soft) text-(--primary)">
                      <MessageSquareHeart size={22} />
                    </div>

                    <div>
                      <h3 className="font-bold">{item.clientName}</h3>
                      <p className="text-xs text-(--text-muted)">
                        {item.eventType || "Cliente MundoTilín"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 text-(--warning)">
                    {Array.from({ length: item.rating }).map((_, index) => (
                      <Star key={index} size={15} fill="currentColor" />
                    ))}
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-(--text-muted)">
                  “{item.comment}”
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    onClick={() => toggleFeatured(item)}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                      item.isFeatured
                        ? "border-(--primary) bg-(--primary-soft) text-(--primary)"
                        : "border-(--border) text-(--text-muted) hover:bg-(--surface-hover)"
                    }`}
                  >
                    <Star size={14} />
                    {item.isFeatured ? "Destacado" : "Destacar"}
                  </button>

                  <button
                    onClick={() => toggleActive(item)}
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                      item.isActive
                        ? "border-green-500/40 bg-green-500/10 text-green-300"
                        : "border-(--border) text-(--text-muted)"
                    }`}
                  >
                    {item.isActive ? "Visible" : "Oculto"}
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded-xl border border-(--danger) px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/10"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={hideToast} />
      )}
    </section>
  );
}