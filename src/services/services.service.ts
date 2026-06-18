import { apiFetch } from "./api";
import { Service } from "@/types/service.types";

export const ServicesService = {
    getAll() {
        return apiFetch<Service[]>("/services");
    }
}