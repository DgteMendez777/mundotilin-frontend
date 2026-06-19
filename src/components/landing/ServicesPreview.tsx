"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PartyPopper } from "lucide-react";
import { publicService } from "@/services/public.service";
import { Service } from "@/types/service.types";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import Link from "next/link";
import { routes } from "@/constants/routes";

export default function ServicesPreview() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await publicService.getFeaturedServices();
        setServices(data.slice(0, 4));
      } catch (error) {
        console.error("Error cargando servicios:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadServices();
  }, []);

  return (
    <section
      id="servicios"
      className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div>
          <h2 className="text-3xl font-black">Servicios destacados</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Paquetes pensados para diferentes tipos de eventos.
          </p>
        </div>

        {isLoading ? (
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)]"
              />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="mt-8 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--text-muted)]">
            No hay servicios activos disponibles por el momento.
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article
                key={service.id}
                className="group overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] transition hover:-translate-y-1 hover:border-[var(--primary)] hover:bg-[var(--surface-hover)]"
              >
                <div className="relative h-44 w-full overflow-hidden bg-[var(--surface-soft)]">
                  {service.coverImage ? (
                    <Image
                      src={service.coverImage}
                      alt={service.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[var(--primary)]">
                      <PartyPopper size={42} />
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
                    {service.category?.name || "Servicio"}
                  </p>

                  <h3 className="mt-2 line-clamp-2 text-lg font-bold">
                    {service.name}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--text-muted)]">
                    {service.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm text-[var(--text-muted)]">
                      Desde
                    </span>
                    <span className="text-lg font-black text-[var(--primary)]">
                      Bs {service.basePrice}
                    </span>
                  </div>

                  <div className="mt-5">
                    
                    <WhatsAppButton
                      message={`Hola MundoTilín, estoy interesado en el servicio ${service.name}.`}
                      label="Consultar"
                      className="w-full"
                    />

                    <Link
  href={routes.client.newReservation(service.id)}
  className="mt-5 block rounded-xl bg-[var(--primary)] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
>
  Reservar servicio
</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}