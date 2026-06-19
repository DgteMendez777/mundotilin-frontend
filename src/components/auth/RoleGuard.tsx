"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/routes";
import { authService } from "@/services/auth.service";
import { UserRole } from "@/types/auth.types";
import { getRoleFromToken } from "@/utils/jwt";

type RoleGuardProps = {
  allowedRole: UserRole;
  children: React.ReactNode;
};

export default function RoleGuard({ allowedRole, children }: RoleGuardProps) {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const token = authService.getToken?.() ?? localStorage.getItem("token");

    if (!token) {
      router.replace(routes.login);
      return;
    }

    const role = getRoleFromToken(token);

    if (role !== allowedRole) {
      router.replace(role === "CLOWN" ? routes.clown.dashboard : routes.client.dashboard);
      return;
    }

    setIsAllowed(true);
  }, [allowedRole, router]);

  if (!isAllowed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-(--background) text-(--text-muted)">
        Validando acceso...
      </main>
    );
  }

  return children;
}