export type Testimonial = {
  id: string;
  clientName: string;
  comment: string;
  rating: number;
  eventType?: string | null;
  imageUrl?: string | null;
  isFeatured: boolean;
  isActive: boolean;
  createdAt?: string | null;
};