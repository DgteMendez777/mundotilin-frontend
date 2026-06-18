"use client";

import { authService } from "@/services/auth.service";
import { routes } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type RequireAuthProps = {
    children: React.ReactNode;
    allowedRole: "CLOWN" | "CLIENT";
};

export default function RequireAuth({ children, allowedRole }: RequireAuthProps) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const token = authService.getToken();
        const role = authService.getRole();

        if (!token) {
            router.replace(routes.login);
            return;
        }

        if (role !== allowedRole) {
            router.replace(routes.home);
            return;
        }

        setIsChecking(false);
    }, [allowedRole, router]);

    if (isChecking) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-(--background) text-(--text-muted)">
                Verificando sesión...
            </main>
        );
    }

    return <>{children}</>;
}