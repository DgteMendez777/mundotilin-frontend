import React from "react";

interface Props {
    className?: string;
    width?: string;
    height?: string;
}

export default function Skeleton({ className = "", width = "100%", height = "1rem" }: Props) {
    return (
        <div
            className={`animate-pulse bg-white/6 rounded-md ${className}`}
            style={{ width, height }}
            aria-hidden="true"
        />
    );
}
