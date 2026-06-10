import { apiFetch } from "./api";
import { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth.types";

export const authService = {
    login(payload: LoginPayload) {
        return apiFetch<AuthResponse>("/auth/login", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },

    register(payload: RegisterPayload) {
        return apiFetch<AuthResponse>("/auth/register", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },

    logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
    },

    saveSession(data: AuthResponse) {
        localStorage.setItem("accessToken", data.token);
    },
};