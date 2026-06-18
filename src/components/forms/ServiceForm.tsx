"use client";

import Button from "../ui/Button";
import { ImagePlus } from "lucide-react";
import { useState } from "react";

type ServiceFormMode = "create" | "edit";

type ServiceFormProps = {
    mode: ServiceFormMode;
};

export default function ServiceForm({ mode }: ServiceFormProps) {
    const isEdit = mode === "edit";
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) {
            setPreviewUrl(null);
            return;
        }

        setPreviewUrl(URL.createObjectURL(file));
    }

    return (
        <form className="space-y-6">
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
                            placeholder="Nombre del servicio"
                            className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
                        />

                        <select
                            name="categoryId"
                            required
                            defaultValue=""
                            className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
                        >
                            <option value="" disabled>
                                Selecciona una categoría
                            </option>
                            <option value="1">Cumpleaños</option>
                            <option value="2">Baby Shower</option>
                            <option value="3">Eventos escolares</option>
                        </select>

                        <input
                            name="price"
                            type="number"
                            min={0}
                            required
                            placeholder="Precio base Bs."
                            className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
                        />

                        <select
                            name="isActive"
                            defaultValue="true"
                            className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
                        >
                            <option value="true">Activo</option>
                            <option value="false">Inactivo</option>
                        </select>

                        <textarea
                            name="description"
                            rows={6}
                            required
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
      La imagen se mostrará como referencia visual del servicio en el panel y catálogo.
    </p>
  </div>
</section>
            </div>

            <div className="flex justify-end gap-3">
                <Button type="submit">
                    {isEdit ? "Guardar cambios" : "Crear servicio"}
                </Button>
            </div>
        </form>
    );
}