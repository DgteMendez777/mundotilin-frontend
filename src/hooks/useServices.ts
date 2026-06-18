"use client";

import { useEffect, useState } from "react";
import { servicesService } from "@/services/services.service";
import {
  CreateServicePayload,
  Service,
  UpdateServicePayload,
} from "@/types/service.types";

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadServices() {
    try {
      setIsLoading(true);
      setError("");
      const data = await servicesService.getAll();
      setServices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar servicios");
    } finally {
      setIsLoading(false);
    }
  }

  async function createService(payload: CreateServicePayload) {
    const created = await servicesService.create(payload);
    setServices((prev) => [created, ...prev]);
  }

  async function updateService(id: string, payload: UpdateServicePayload) {
    const updated = await servicesService.update(id, payload);
    setServices((prev) =>
      prev.map((service) => (service.id === id ? updated : service))
    );
  }

  async function toggleServiceStatus(id: string, isActive: boolean) {
    const updated = await servicesService.toggleStatus(id, isActive);
    setServices((prev) =>
      prev.map((service) => (service.id === id ? updated : service))
    );
  }

  useEffect(() => {
    loadServices();
  }, []);

  return {
    services,
    isLoading,
    error,
    loadServices,
    createService,
    updateService,
    toggleServiceStatus,
  };
}