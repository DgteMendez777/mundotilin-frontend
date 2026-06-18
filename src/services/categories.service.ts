import { apiFetch } from "./api";
import {
  CreateCategoryPayload,
  EventCategory,
  UpdateCategoryPayload,
} from "@/types/service.types";

export const categoriesService = {
  getAll() {
    return apiFetch<EventCategory[]>("/event-categories");
  },

  create(payload: CreateCategoryPayload) {
    return apiFetch<EventCategory>("/event-categories", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  update(id: string, payload: UpdateCategoryPayload) {
    return apiFetch<EventCategory>(`/event-categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  toggleStatus(id: string, isActive: boolean) {
    return apiFetch<EventCategory>(`/event-categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isActive }),
    });
  },

  remove(id: string) {
  return apiFetch<void>(`/event-categories/${id}/remove`, {
    method: "DELETE",
  });
},
};