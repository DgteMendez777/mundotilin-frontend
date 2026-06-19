import { apiFetch } from "./api";
import { Testimonial } from "@/types/testimonial.types";

export type CreateTestimonialPayload = {
  clientName: string;
  comment: string;
  rating?: number;
  eventType?: string;
  imageUrl?: string;
  isFeatured?: boolean;
  isActive?: boolean;
};

export type UpdateTestimonialPayload = Partial<CreateTestimonialPayload>;

export const testimonialsService = {
  getPublic() {
    return apiFetch<Testimonial[]>("/testimonials");
  },

  getFeatured() {
    return apiFetch<Testimonial[]>("/testimonials/featured");
  },

  getAdmin() {
    return apiFetch<Testimonial[]>("/testimonials/admin/list");
  },

  create(payload: CreateTestimonialPayload) {
    return apiFetch<Testimonial>("/testimonials", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  update(id: string, payload: UpdateTestimonialPayload) {
    return apiFetch<Testimonial>(`/testimonials/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  remove(id: string) {
    return apiFetch<Testimonial>(`/testimonials/${id}`, {
      method: "DELETE",
    });
  },
};