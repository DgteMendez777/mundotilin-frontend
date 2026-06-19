import { apiFetch } from "./api";
import { Service } from "@/types/service.types";

export type PublicStats = {
  servicesCount: number;
  categoriesCount: number;
  completedEventsCount: number;
  totalEventsCount: number;
  experienceYears: number;
};

export const publicService = {
  getFeaturedServices() {
    return apiFetch<Service[]>("/public/featured-services");
  },

  getStats() {
    return apiFetch<PublicStats>("/public/stats");
  },
};