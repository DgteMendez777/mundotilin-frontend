import { UserRole } from "@/types/auth.types";

type JwtPayload = {
  sub?: string;
  email?: string;
  role?: UserRole;
  exp?: number;
  iat?: number;
};

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function getRoleFromToken(token: string): UserRole | null {
  const payload = decodeJwt(token);
  return payload?.role ?? null;
}