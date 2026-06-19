"use client";

type Variant = "fullscreen" | "inline";

interface Props {
    variant?: Variant;
    message?: string;
    size?: number;
}

export default function Loading({
    variant = "inline",
    message = "Cargando...",
    size = 40,
}: Props) {
    const spinner = (
        <svg
            className="animate-spin"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="4"
            />
            <path
                d="M22 12a10 10 0 00-10-10"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );

    if (variant === "fullscreen") {
        return (
            <div
                role="status"
                aria-live="polite"
                aria-busy="true"
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            >
                <div className="flex flex-col items-center gap-3">
                    <div className="text-primary text-2xl">{spinner}</div>
                    <p className="text-sm text-white/90">{message}</p>
                </div>
            </div>
        );
    }

    return (
        <span role="status" aria-live="polite" aria-busy="true" className="inline-flex items-center gap-2">
            <span className="text-primary">{spinner}</span>
            <span className="text-sm text-white/80">{message}</span>
        </span>
    );
}
