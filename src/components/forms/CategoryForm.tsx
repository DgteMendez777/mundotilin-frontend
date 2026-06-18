"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { CreateCategoryPayload } from "@/types/service.types";

type CategoryFormProps = {
  initialValues?: {
    name: string;
    description?: string | null;
  };
  submitLabel?: string;
  onSubmit: (values: CreateCategoryPayload) => Promise<void>;
  onCancel: () => void;
};

export default function CategoryForm({
  initialValues,
  submitLabel = "Crear categoría",
  onSubmit,
  onCancel,
}: CategoryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError("");

      const formData = new FormData(event.currentTarget);

      await onSubmit({
        name: String(formData.get("name")),
        description: String(formData.get("description") || ""),
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo guardar la categoría"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm text-(--text-soft)">Nombre</label>
        <input
          name="name"
          type="text"
          required
          defaultValue={initialValues?.name ?? ""}
          placeholder="Ej. Cumpleaños"
          className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-(--text-soft)">
          Descripción
        </label>
        <textarea
          name="description"
          rows={4}
          defaultValue={initialValues?.description ?? ""}
          placeholder="Ej. Servicios para fiestas infantiles."
          className="w-full resize-none rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
        />
      </div>

      {error && (
        <p className="rounded-xl border border-(--danger) bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-(--border) px-5 py-3 text-sm font-semibold text-(--text-soft) hover:bg-(--surface-hover)"
        >
          Cancelar
        </button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}