import React from "react";

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="mb-3 h-4 w-3/4 rounded bg-[var(--muted-bg)]"></div>
      <div className="mb-2 h-3 w-1/2 rounded bg-[var(--muted-bg)]"></div>
      <div className="flex items-center gap-2">
        <div className="h-8 w-20 rounded bg-[var(--muted-bg)]"></div>
        <div className="h-8 w-16 rounded bg-[var(--muted-bg)]"></div>
      </div>
    </div>
  );
}

export default function ReservationsPage() {
  // Placeholder until real data hook is connected
  const loading = true;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Reservas</h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">Aquí verás tus reservas próximas y pasadas.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <div className="col-span-full text-center text-[var(--text-muted)]">No hay reservas aún.</div>
        )}
      </div>
    </div>
  );
}