"use client";

import { ImagePlus } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";
import { useCategories } from "@/hooks/useCategories";
import {
  ServiceFormInitialValues,
  ServiceFormValues,
} from "@/types/service.types";

type ServiceFormProps = {
  mode: "create" | "edit";
  initialValues?: ServiceFormInitialValues;
  onSubmit: (values: ServiceFormValues) => Promise<void>;
};

export default function ServiceForm({
  mode,
  initialValues,
  onSubmit,
}: ServiceFormProps) {
  const isEdit = mode === "edit";
  const { categories, isLoading: isLoadingCategories } = useCategories();

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialValues?.coverImage ?? null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setImageFile(null);
      setPreviewUrl(initialValues?.coverImage ?? null);
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError("");

      const formData = new FormData(event.currentTarget);

      await onSubmit({
        categoryId: String(formData.get("categoryId")),
        name: String(formData.get("name")),
        description: String(formData.get("description")),
        basePrice: Number(formData.get("basePrice")),
        image: imageFile,
        coverImage: initialValues?.coverImage ?? "",
        isActive: String(formData.get("isActive")) === "true",
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo guardar el servicio"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-3xl font-black">
          {isEdit ? "Editar servicio" : "Nuevo servicio"}
        </h2>
        <p className="mt-2 text-sm text-(--text-muted)">
          Registra o modifica los servicios ofrecidos por Mundo Tilín.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-6">
          <h3 className="mb-5 text-lg font-bold">Datos del servicio</h3>

          <div className="grid gap-5 md:grid-cols-2">
            <input
              name="name"
              type="text"
              required
              defaultValue={initialValues?.name ?? ""}
              placeholder="Nombre del servicio"
              className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
            />

            <select
              name="categoryId"
              required
              defaultValue={initialValues?.categoryId ?? ""}
              disabled={isLoadingCategories}
              className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary) disabled:opacity-60"
            >
              <option value="" disabled>
                {isLoadingCategories
                  ? "Cargando categorías..."
                  : "Selecciona una categoría"}
              </option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <input
              name="basePrice"
              type="number"
              min={0}
              required
              defaultValue={initialValues?.basePrice ?? ""}
              placeholder="Precio base Bs."
              className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
            />

            <select
              name="isActive"
              defaultValue={String(initialValues?.isActive ?? true)}
              className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>

            <textarea
              name="description"
              rows={6}
              required
              defaultValue={initialValues?.description ?? ""}
              placeholder="Descripción del servicio"
              className="resize-none rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary) md:col-span-2"
            />
          </div>
        </section>

        <section className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-6">
          <h3 className="mb-5 text-lg font-bold">Imagen representativa</h3>

          <div className="rounded-(--radius-xl) border border-dashed border-(--border) bg-[#0a0e14] p-4">
            <div className="mb-4 flex aspect-video items-center justify-center overflow-hidden rounded-(--radius-lg) bg-(--surface-soft)">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Previsualización del servicio"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-center text-(--text-muted)">
                  <ImagePlus className="mx-auto mb-3" size={36} />
                  <p className="text-sm font-medium">Sin imagen seleccionada</p>
                </div>
              )}
            </div>

            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-xl border border-(--border) bg-(--surface-soft) px-4 py-3 text-sm text-(--text-muted)"
            />

            <p className="mt-3 text-xs text-(--text-muted)">
              La imagen se subirá a Cloudinary y se mostrará en el catálogo.
            </p>
          </div>
        </section>
      </div>

      {error && (
        <p className="rounded-xl border border-(--danger) bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? isEdit
              ? "Guardando..."
              : "Creando..."
            : isEdit
              ? "Guardar cambios"
              : "Crear servicio"}
        </Button>
      </div>
    </form>
  );
}