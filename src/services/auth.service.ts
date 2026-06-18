import { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth.types";
import { apiFetch } from "./api";

type JwtPayload = {
    userId: string;
    role: "CLOWN" | "CLIENT";
    exp: number;
};

function getStorage() {
    if (typeof window === "undefined") return null;
    return sessionStorage;
}

function decodeToken(token: string): JwtPayload | null {
    try {
        const payload = token.split(".")[1];
        const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
        return JSON.parse(decoded);
    } catch {
        return null;
    }
}

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

    saveSession(data: AuthResponse) {
        getStorage()?.setItem("accessToken", data.token);
    },

    getToken() {
        return getStorage()?.getItem("accessToken") ?? null;
    },

    getRole() {
        const token = this.getToken();
        if (!token) return null;

        return decodeToken(token)?.role ?? null;
    },

    logout() {
        sessionStorage.removeItem("accessToken");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
    },
};