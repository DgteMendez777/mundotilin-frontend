"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authService } from "@/services/auth.service";
import { LoginPayload, RegisterPayload } from "@/types/auth.types";

export function useAuth() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function login(payload: LoginPayload) {
        try {
            setIsLoading(true);
            setError("");

            const data = await authService.login(payload);
            authService.saveSession(data);

            router.push("/");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al iniciar sesión");
        } finally {
            setIsLoading(false);
        }
    }

    async function register(payload: RegisterPayload) {
        try {
            setIsLoading(true);
            setError("");

            const data = await authService.register(payload);
            authService.saveSession(data);

            router.push("/");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al registrarse");
        } finally {
            setIsLoading(false);
        }
    }

    function logout() {
        authService.logout();
        router.push("/login");
    }

    return {
        login,
        register,
        logout,
        isLoading,
        error,
    };
}