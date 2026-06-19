"use client";

import { useState } from "react";
import SocialLinks from "./SocialLinks";

export default function ContactSection() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("sending");

        await new Promise((r) => setTimeout(r, 900));
        setStatus("sent");
    }

    return (
        <section id="contacto" className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <h2 className="text-3xl font-black">Contacto</h2>
                <p className="mt-2 text-sm text-[var(--text-muted)]">Escríbenos para cotizaciones, preguntas o reservas.</p>
                <div className="mt-6">
                    <SocialLinks variant="buttons" />
                </div>

                <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                    <label className="sr-only" htmlFor="name">Nombre</label>
                    <input id="name" placeholder="Tu nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-white" />

                    <label className="sr-only" htmlFor="email">Email</label>
                    <input id="email" placeholder="tu@correo.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-white" />

                    <label className="sr-only" htmlFor="message">Mensaje</label>
                    <textarea id="message" placeholder="Cuéntanos tu evento" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-white min-h-[120px]" />

                    <div className="mt-2 flex items-center gap-3">
                        <button type="submit" disabled={status === "sending"} className="rounded-[var(--radius-md)] bg-[var(--primary)] px-6 py-3 font-semibold">
                            {status === "sending" ? "Enviando..." : status === "sent" ? "Enviado" : "Enviar mensaje"}
                        </button>

                        {status === "sent" && <span className="text-sm text-[var(--text-muted)]">Gracias, te responderemos pronto.</span>}
                    </div>
                </form>
            </div>
        </section>
    );
}
