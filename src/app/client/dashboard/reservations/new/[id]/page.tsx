"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";
import { reservationService } from "@/services/reservation.service";
import { servicesService } from "@/services/services.service";
import { Service } from "@/types/service.types";
import { routes } from "@/constants/routes";

export default function NewReservationPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();

  const serviceId = params.id;

  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    eventDate: "",
    startTime: "",
    address: "",
    googleMapsUrl: "",
    childrenCount: "",
    observations: "",
    totalAmount: "",
    advanceAmount: "",
  });

  useEffect(() => {
    async function loadService() {
      const data = await servicesService.getById(serviceId);
      setService(data);

      setForm((prev) => ({
        ...prev,
        title: `Reserva - ${data.name}`,
        totalAmount: String(data.basePrice),
        advanceAmount: String(Math.ceil(data.basePrice * 0.3)),
      }));
    }

    if (serviceId) loadService();
  }, [serviceId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);

      await reservationService.create({
        serviceId,
        title: form.title,
        eventDate: form.eventDate,
        startTime: form.startTime,
        address: form.address,
        googleMapsUrl: form.googleMapsUrl || undefined,
        childrenCount: form.childrenCount ? Number(form.childrenCount) : undefined,
        observations: form.observations || undefined,
        totalAmount: Number(form.totalAmount),
        advanceAmount: form.advanceAmount ? Number(form.advanceAmount) : undefined,
      });

      const localReservation = {
        id: crypto.randomUUID(),
        title: form.title,
        eventDate: form.eventDate,
        startTime: form.startTime,
        address: form.address,
        status: "PENDING",
        totalAmount: Number(form.totalAmount),
        advanceAmount: Number(form.advanceAmount || form.totalAmount),
        service,
      };

      const current = JSON.parse(localStorage.getItem("client_reservations") || "[]");
      localStorage.setItem(
        "client_reservations",
        JSON.stringify([localReservation, ...current])
      );

      router.push(routes.client.reservations);
    } catch (error) {
      console.error(error);
      showToast("error", "No se pudo crear la reserva.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-black">Reservar servicio</h1>
        <p className="mt-2 text-sm text-(--text-muted)">
          Completa los datos del evento. El pago por QR se podrá realizar desde Mis reservas.
        </p>
      </div>

      {service && (
        <article className="overflow-hidden rounded-(--radius-xl) border border-(--border) bg-(--surface)">
          <div className="grid md:grid-cols-[260px_1fr]">
            <div className="relative h-52 bg-[#0a0e14]">
              {service.coverImage && (
                <Image src={service.coverImage} alt={service.name} fill className="object-cover" />
              )}
            </div>

            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-(--primary)">
                Servicio seleccionado
              </p>
              <h2 className="mt-2 text-2xl font-black">{service.name}</h2>
              <p className="mt-2 text-sm text-(--text-muted)">{service.description}</p>
              <p className="mt-4 text-xl font-black text-(--primary)">Bs {service.basePrice}</p>
            </div>
          </div>
        </article>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-(--radius-xl) border border-(--border) bg-(--surface) p-6">
        <input required placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)" />

        <div className="grid gap-4 sm:grid-cols-2">
          <input required type="date" value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })} className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)" />
          <input required type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)" />
        </div>

        <input required placeholder="Dirección" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)" />

        <div className="grid gap-4 sm:grid-cols-3">
          <input type="number" placeholder="Niños" value={form.childrenCount} onChange={(e) => setForm({ ...form, childrenCount: e.target.value })} className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)" />
          <input required type="number" placeholder="Total Bs" value={form.totalAmount} onChange={(e) => setForm({ ...form, totalAmount: e.target.value })} className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)" />
          <input type="number" placeholder="Anticipo Bs" value={form.advanceAmount} onChange={(e) => setForm({ ...form, advanceAmount: e.target.value })} className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)" />
        </div>

        <textarea placeholder="Observaciones" value={form.observations} onChange={(e) => setForm({ ...form, observations: e.target.value })} className="min-h-28 w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)" />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creando reserva..." : "Crear reserva"}
        </Button>
      </form>

      {toast && <Toast type={toast.type} message={toast.message} onClose={hideToast} />}
    </section>
  );
}