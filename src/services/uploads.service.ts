import { apiFetch } from "./api";

type UploadServiceResponse = {
  url: string;
  publicId: string;
};

type UploadGalleryResponse = {
  url: string;
  publicId: string;
  type: "IMAGE" | "VIDEO";
};

type UploadTestimonialResponse = {
  url: string;
  publicId: string;
};

export const uploadsService = {
  uploadServiceImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return apiFetch<UploadServiceResponse>("/uploads/service-image", {
      method: "POST",
      body: formData,
    });
  },

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