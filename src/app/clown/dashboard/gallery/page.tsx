"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImageIcon, Play, Star, Trash2 } from "lucide-react";
import { routes } from "@/constants/routes";
import { galleryService } from "@/services/gallery.service";
import { GalleryMedia } from "@/types/gallery.types";
import Toast from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";
import Modal from "@/components/ui/Modal";
import GalleryForm from "@/components/forms/GalleryForm";

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryMedia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast, showToast, hideToast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
const [editingItem, setEditingItem] = useState<GalleryMedia | null>(null);

  async function loadGallery() {
    try {
      const data = await galleryService.getAdmin();
      setItems(data);
    } catch {
      showToast("error", "No se pudo cargar la galería.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadGallery();
  }, []);

  async function toggleFeatured(item: GalleryMedia) {
    try {
      await galleryService.update(item.id, {
        isFeatured: !item.isFeatured,
      });
      showToast("success", "Elemento actualizado.");
      loadGallery();
    } catch {
      showToast("error", "No se pudo actualizar.");
    }
  }

  async function toggleActive(item: GalleryMedia) {
    try {
      await galleryService.update(item.id, {
        isActive: !item.isActive,
      });
      showToast("success", "Visibilidad actualizada.");
      loadGallery();
    } catch {
      showToast("error", "No se pudo actualizar.");
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm("¿Eliminar este elemento de la galería?");
    if (!confirmDelete) return;

    try {
      await galleryService.remove(id);
      showToast("success", "Elemento eliminado.");
      loadGallery();
    } catch {
      showToast("error", "No se pudo eliminar.");
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-black">Galería</h2>
          <p className="mt-2 text-sm text-(--text-muted)">
            Administra fotos y videos que se mostrarán en la landing pública.
          </p>
        </div>

        <button
  onClick={() => {
    setEditingItem(null);
    setIsFormOpen(true);
  }}
  className="rounded-xl bg-(--primary) px-4 py-3 text-center text-sm font-semibold transition hover:bg-(--primary-hover)"
>
  + Nuevo elemento
</button>
      </div>

      <div className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-4">
        {isLoading ? (
          <p className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm text-(--text-muted)">
            Cargando galería...
          </p>
        ) : items.length === 0 ? (
          <p className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm text-(--text-muted)">
            Todavía no hay elementos en la galería.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-(--radius-xl) border border-(--border) bg-[#0a0e14]"
              >
                <div className="relative h-48 bg-(--surface-soft)">
                  {item.type === "IMAGE" ? (
                    <Image
                      src={item.url}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <video
                      src={item.url}
                      className="h-full w-full object-cover"
                      muted
                      playsInline
                    />
                  )}

                  <div className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white backdrop-blur">
                    {item.type === "IMAGE" ? <ImageIcon size={18} /> : <Play size={18} />}
                  </div>
                </div>

                <div className="space-y-4 p-4">
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-(--text-muted)">
                      {item.description || "Sin descripción"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
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
  onClick={() => {
    setEditingItem(item);
    setIsFormOpen(true);
  }}
  className="rounded-xl border border-(--border) px-3 py-2 text-xs font-semibold text-(--text-soft) transition hover:bg-(--surface-hover)"
>
  Editar
</button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-xl border border-(--danger) px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/10"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

<Modal
  isOpen={isFormOpen}
  title={editingItem ? "Editar elemento" : "Nuevo elemento"}
  onClose={() => setIsFormOpen(false)}
>
  <GalleryForm
    initialValues={editingItem}
    onSuccess={() => {
      setIsFormOpen(false);
      setEditingItem(null);
      showToast("success", editingItem ? "Elemento actualizado." : "Elemento creado.");
      loadGallery();
    }}
  />
</Modal>

      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={hideToast} />
      )}
    </section>
  );
}