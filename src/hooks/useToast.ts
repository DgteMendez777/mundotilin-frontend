"use client";

import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";

export function useToast() {
    const [toast, setToast] = useState<{
        type: ToastType;
        message: string;
    } | null>(null);

    function showToast(type: ToastType, message: string) {
        setToast({ type, message });
    }

    function hideToast() {
        setToast(null);
    }

    useEffect(() => {
        if (!toast) return;

        const timeout = setTimeout(() => {
            hideToast();
        }, 3500);

        return () => clearTimeout(timeout);
    }, [toast]);

    return {
        toast,
        showToast,
        hideToast,
    };
}