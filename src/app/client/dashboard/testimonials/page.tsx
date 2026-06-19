"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";
import { testimonialsService } from "@/services/testimonials.service";
import { uploadsService } from "@/services/uploads.service";

export default function ClientTestimonialsPage() {
  const [clientName, setClientName] = useState("");
  const [comment, setComment] = useState("");
  const [eventType, setEventType] = useState("");
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { toast, showToast, hideToast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = "";

      if (image) {
        const uploaded = await uploadsService.uploadTestimonialImage(image);
        imageUrl = uploaded.url;
      }

      await testimonialsService.create({
        clientName,
        comment,
        eventType,
        rating,
        imageUrl,
      });

  setClientName("");
  setComment("");
  setEventType("");
  setRating(5);
  setImage(null);
  setPreviewUrl(null);

  showToast("success", "Testimonio enviado correctamente.");
    } catch {
        showToast("error", "No se pudo enviar el testimonio.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Mis testimonios</h1>
        <p className="mt-2 text-sm text-(--text-muted)">
          Comparte tu experiencia con MundoTilín. El payaso podrá revisarla y
          destacarla en la landing.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-5 rounded-(--radius-xl) border border-(--border) bg-(--surface) p-6"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-(--text-soft)">
            Nombre visible
          </label>
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
            placeholder="Ej. María López"
            className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-(--text-soft)">
            Tipo de evento
          </label>
          <input
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            placeholder="Ej. Cumpleaños infantil"
            className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-(--text-soft)">
            Calificación
          </label>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className={`rounded-xl border px-3 py-2 transition ${
                  value <= rating
                    ? "border-(--warning) bg-yellow-500/10 text-(--warning)"
                    : "border-(--border) text-(--text-muted) hover:bg-(--surface-hover)"
                }`}
              >
                <Star size={18} fill={value <= rating ? "currentColor" : "none"} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-(--text-soft)">
            Comentario
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder="Cuéntanos cómo fue tu experiencia..."
            className="min-h-32 w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-(--text-soft)">
            Imagen opcional
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              setImage(file);
              if (file) {
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
              } else {
                setPreviewUrl(null);
              }
            }}
            className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm text-(--text-muted)"
          />

          {previewUrl && (
            <div className="mt-3">
              <img src={previewUrl} alt="Vista previa" className="h-28 w-28 rounded object-cover" />
            </div>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Enviando..." : "Enviar testimonio"}
        </Button>
      </form>

      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={hideToast} />
      )}
    </section>
  );
}