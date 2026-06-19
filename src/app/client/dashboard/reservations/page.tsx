"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, CreditCard, PartyPopper } from "lucide-react";
import { routes } from "@/constants/routes";
import { publicService } from "@/services/public.service";
import { reservationService } from "@/services/reservation.service";
import { Service } from "@/types/service.types";

export default function ClientReservationsPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("client_reservations") || "[]");
    setReservations(local);

    reservationService
      .getMyReservations()
      .then((data) => {
        if (data.length > 0) setReservations(data);
      })
      .catch(() => {});

    publicService.getFeaturedServices().then(setServices).catch(() => {});
  }, []);

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-black">Mis reservas</h1>
        <p className="mt-2 text-sm text-(--text-muted)">
          Revisa tus reservas o crea una nueva seleccionando un servicio.
        </p>
      </div>

      <div className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-5">
        <h2 className="text-xl font-bold">Nueva reserva</h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.id}
              href={routes.client.newReservation(service.id)}
              className="rounded-xl border border-(--border) bg-[#0a0e14] p-4 transition hover:border-(--primary) hover:bg-(--surface-hover)"
            >
              <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-(--primary-soft) text-(--primary)">
                <PartyPopper size={22} />
              </div>

              <h3 className="font-bold">{service.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-(--text-muted)">
                {service.description}
              </p>

              <p className="mt-4 font-black text-(--primary)">Bs {service.basePrice}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-5">
        <h2 className="text-xl font-bold">Reservas realizadas</h2>

        <div className="mt-5 space-y-3">
          {reservations.length === 0 ? (
            <p className="text-sm text-(--text-muted)">Aún no tienes reservas registradas.</p>
          ) : (
            reservations.map((item) => (
              <article key={item.id} className="rounded-xl border border-(--border) bg-[#0a0e14] p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-1 text-sm text-(--text-muted)">
                      {item.service?.name ?? "Servicio reservado"}
                    </p>

                    <p className="mt-3 flex items-center gap-2 text-sm text-(--text-muted)">
                      <CalendarDays size={16} />
                      {item.eventDate} · {item.startTime}
                    </p>

                    <p className="mt-2 text-sm">
                      Estado: <span className="font-semibold text-(--primary)">{item.status}</span>
                    </p>
                  </div>

                  <Link
                    href={`${routes.client.payments}?amount=${item.advanceAmount || item.totalAmount}&event=${encodeURIComponent(item.title)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-(--primary) px-4 py-3 text-sm font-semibold text-white transition hover:bg-(--primary-hover)"
                  >
                    <CreditCard size={16} />
                    Pagar QR
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}