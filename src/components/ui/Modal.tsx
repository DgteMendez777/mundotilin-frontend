"use client";

import { X } from "lucide-react";

type ModalProps = {
    isOpen: boolean;
    title?: string;
    children: React.ReactNode;
    onClose: () => void;
};

export default function Modal({ isOpen, title, children, onClose }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
            <button type="button" aria-label="Cerrar modal" onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm"/>

            <div className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-(--radius-xl) border border-(--border) bg-(--surface) p-6 shadow-2xl">
                <div className="mb-5 flex items-center justify-between gap-4">
                    {title && <h2 className="text-xl font-black">{title}</h2>}
                    <button type="button" onClick={onClose} className="ml-auto rounded-xl border border-(--border) p-2 text-(--text-muted) transition hover:bg-(--surface-hover) hover:text-(--text-main)">
                        <X size={18} />
                    </button>
                </div>

                {children}

            </div>
        </div>
    );
}