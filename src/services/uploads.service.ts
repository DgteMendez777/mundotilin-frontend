import { apiFetch } from "./api";
import { UploadTestimonialResponse } from "@/types/uploads.types";

type UploadGalleryResponse = {
  url: string;
  publicId: string;
  type: "IMAGE" | "VIDEO";
};

export const uploadsService = {
  uploadGalleryImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return apiFetch<UploadGalleryResponse>("/uploads/gallery-image", {
      method: "POST",
      body: formData,
    });
  },

  uploadGalleryVideo(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return apiFetch<UploadGalleryResponse>("/uploads/gallery-video", {
      method: "POST",
      body: formData,
    });
  },

  uploadTestimonialImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return apiFetch<UploadTestimonialResponse>("/uploads/testimonial-image", {
    method: "POST",
    body: formData,
  });
},
};