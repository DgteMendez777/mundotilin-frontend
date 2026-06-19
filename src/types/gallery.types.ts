export type GalleryMediaType = "IMAGE" | "VIDEO";

export type GalleryMedia = {
  id: string;
  title: string;
  description?: string | null;
  url: string;
  publicId?: string | null;
  type: GalleryMediaType;
  isFeatured: boolean;
  isActive: boolean;
  createdAt?: string | null;
};

