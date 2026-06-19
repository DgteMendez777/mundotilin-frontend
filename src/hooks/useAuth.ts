"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authService } from "@/services/auth.service";
import { LoginPayload, RegisterPayload, UserRole } from "@/types/auth.types";
import { routes } from "@/constants/routes";
import { getRoleFromToken } from "@/utils/jwt";

export function useAuth() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    function redirectByRole(role: UserRole | null) {
        if (role === "CLOWN") {
            router.push(routes.clown.dashboard);
            return;
        }

        if (role === "CLIENT") {
            router.push(routes.client.dashboard);
            return;
        }

        router.push(routes.home);
    }

    async function login(payload: LoginPayload) {
        try {
            setIsLoading(true);
            setError("");

            const data = await authService.login(payload);
            authService.saveSession(data);

            const role = getRoleFromToken(data.token);
            redirectByRole(role);
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

            const role = getRoleFromToken(data.token);
            redirectByRole(role);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al registrarse");
        } finally {
            setIsLoading(false);
        }
    }

    function logout() {
        authService.logout();
        router.push(routes.login);
    }

    return {
        login,
        register,
        logout,
        isLoading,
        error,
    };
}