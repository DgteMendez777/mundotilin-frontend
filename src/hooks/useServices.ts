"use client";

import { useEffect, useState } from "react";
import { ServicesService } from "@/services/services.service";
import { Service } from "@/types/service.types";

export function useServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function loadServices() {
        try {
            setIsLoading(true);
            setError("");

            const data = await ServicesService.getAll();
            setServices(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al cargar servicios");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadServices();
    }, []);

    return {
        services,
        isLoading,
        error,
        loadServices,
    };
}