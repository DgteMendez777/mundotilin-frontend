"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { GalleryMedia } from "@/types/gallery.types";
import { galleryService } from "@/services/gallery.service";
import { uploadsService } from "@/services/uploads.service";

type GalleryFormProps = {
  initialValues?: GalleryMedia | null;
  onSuccess: () => void;
};

export default function GalleryForm({
  initialValues,
  onSuccess,
}: GalleryFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? ""
  );

  const [isFeatured, setIsFeatured] = useState(
    initialValues?.isFeatured ?? false
  );

  const [isActive, setIsActive] = useState(
    initialValues?.isActive ?? true
  );

  const [file, setFile] = useState<File | null>(null);

  const [mediaType, setMediaType] = useState<"IMAGE" | "VIDEO">(
    initialValues?.type ?? "IMAGE"
  );

  const [youtubeUrl, setYoutubeUrl] = useState(
    initialValues?.type === "VIDEO"
      ? initialValues.url
      : ""
  );

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsLoading(true);

    try {
      let url = initialValues?.url ?? "";
      let publicId = initialValues?.publicId ?? "";

      if (mediaType === "VIDEO" && youtubeUrl.trim()) {
        url = youtubeUrl.trim();
        publicId = "";
      } else if (file) {
        const uploaded =
          mediaType === "IMAGE"
            ? await uploadsService.uploadGalleryImage(file)
            : await uploadsService.uploadGalleryVideo(file);

        url = uploaded.url;
        publicId = uploaded.publicId;
      }

      const payload = {
        title,
        description,
        url,
        publicId,
        type: mediaType,
        isFeatured,
        isActive,
      };

      if (initialValues) {
        await galleryService.update(initialValues.id, payload);
      } else {
        await galleryService.create(payload);
      }

      onSuccess();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-(--text-soft)">
          Título
        </label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-(--text-soft)">
          Descripción
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-28 w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-(--text-soft)">
          Tipo
        </label>

        <select
          value={mediaType}
          onChange={(e) =>
            setMediaType(e.target.value as "IMAGE" | "VIDEO")
          }
          className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
        >
          <option value="IMAGE">Imagen</option>
          <option value="VIDEO">Video</option>
        </select>
      </div>

      {mediaType === "VIDEO" && (
        <div>
          <label className="mb-2 block text-sm font-medium text-(--text-soft)">
            Enlace de YouTube (Opcional)
          </label>

          <input
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
          />

          <p className="mt-2 text-xs text-(--text-muted)">
            Si ingresas un enlace de YouTube no será necesario subir un archivo.
          </p>
        </div>
      )}

      {!(mediaType === "VIDEO" && youtubeUrl.trim()) && (
        <div>
          <label className="mb-2 block text-sm font-medium text-(--text-soft)">
            Archivo {initialValues ? "(opcional para reemplazar)" : ""}
          </label>

          <input
            type="file"
            accept={mediaType === "IMAGE" ? "image/*" : "video/*"}
            required={!initialValues}
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm text-(--text-muted)"
          />
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-2 rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm text-(--text-muted)">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="accent-(--primary)"
          />
          Mostrar como destacado
        </label>

        <label className="flex items-center gap-2 rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm text-(--text-muted)">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="accent-(--primary)"
          />
          Visible públicamente
        </label>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading
          ? "Guardando..."
          : initialValues
            ? "Guardar cambios"
            : "Crear elemento"}
      </Button>
    </form>
  );
}