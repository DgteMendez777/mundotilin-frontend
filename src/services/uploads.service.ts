import { apiFetch } from "./api";

type UploadImageResponse = {
  url: string;
  publicId: string;
};

export const uploadsService = {
  uploadServiceImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return apiFetch<UploadImageResponse>("/uploads/service-image", {
      method: "POST",
      body: formData,
    });
  },
};