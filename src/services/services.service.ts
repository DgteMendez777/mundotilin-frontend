import { apiFetch } from "./api";
import {
  CreateServicePayload,
  Service,
  UpdateServicePayload,
} from "@/types/service.types";

export const servicesService = {
  getAll() {
    return apiFetch<Service[]>("/services");
  },

  getById(id: string) {
    return apiFetch<Service>(`/services/${id}`);
  },

  create(payload: CreateServicePayload) {
    return apiFetch<Service>("/services", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  update(id: string, payload: UpdateServicePayload) {
    return apiFetch<Service>(`/services/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  toggleStatus(id: string, isActive: boolean) {
    return apiFetch<Service>(`/services/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isActive }),
    });
  },
};