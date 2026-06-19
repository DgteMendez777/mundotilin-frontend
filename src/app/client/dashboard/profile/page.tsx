import React from "react";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function ClientProfilePage() {
  // We don't yet have a client-side user object in the hook.
  // Keep a safe placeholder UI until the app exposes the user model.
  const displayName = "Usuario";
  const email = "-";

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-black">Mi perfil</h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">Administra tu información personal.</p>

      <div className="mt-6 max-w-2xl rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-full bg-[var(--muted-bg)]">
            <div className="flex h-full w-full items-center justify-center text-xl font-bold text-[var(--text-muted)]">
              U
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold">{displayName}</h2>
            <p className="text-sm text-[var(--text-muted)]">{email}</p>
          </div>

          <div>
            <Button className="bg-transparent border border-[var(--border)] text-[var(--text-main)] px-3 py-2">Editar perfil</Button>
          </div>
        </div>
      </div>
    </section>
  );
}