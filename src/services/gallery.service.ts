import { apiFetch } from "./api";
import { GalleryMedia } from "@/types/gallery.types";

export type CreateGalleryMediaPayload = {
  title: string;
  description?: string;
  url: string;
  publicId?: string;
  type: "IMAGE" | "VIDEO";
  isFeatured?: boolean;
  isActive?: boolean;
};

export type UpdateGalleryMediaPayload = Partial<CreateGalleryMediaPayload>;

export const galleryService = {
  getPublic() {
    return apiFetch<GalleryMedia[]>("/gallery");
  },

  getFeatured() {
    return apiFetch<GalleryMedia[]>("/gallery/featured");
  },

  getAdmin() {
    return apiFetch<GalleryMedia[]>("/gallery/admin/list");
  },

  create(payload: CreateGalleryMediaPayload) {
    return apiFetch<GalleryMedia>("/gallery", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  update(id: string, payload: UpdateGalleryMediaPayload) {
    return apiFetch<GalleryMedia>(`/gallery/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  remove(id: string) {
    return apiFetch<GalleryMedia>(`/gallery/${id}`, {
      method: "DELETE",
    });
  },
};