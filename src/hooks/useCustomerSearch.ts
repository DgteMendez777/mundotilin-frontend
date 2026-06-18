"use client";

import { useState } from "react";
import { UsersService } from "@/services/users.service";
import { EventCustomer } from "@/types/event.types";

export function useCustomerSearch() {
    const [customer, setCustomer] = useState<EventCustomer | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState("");

    async function searchByCi(ci: string) {
        try {
            setIsSearching(true);
            setError("");
            setCustomer(null);

            const data = await UsersService.findByCi(ci);
            setCustomer(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Cliente no encontrado");
        } finally {
            setIsSearching(false);
        }
    }

    return {
        customer,
        isSearching,
        error,
        searchByCi,
    };
}