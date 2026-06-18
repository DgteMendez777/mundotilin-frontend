"use client"

import StatusBadge from "@/components/ui/StatusBadge";
import { CalendarDays, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { routes } from "@/constants/routes";
import { useEvents } from "@/hooks/useEvents";
import EventStatusSelect from "@/components/events/EventStatusSelect";
import { EventStatus } from "@/types/event.types";
import Toast from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";

export default function EventsPage() {
    const { events, isLoading, error, updateEventStatus } = useEvents();
    const { toast, showToast, hideToast } = useToast();

    async function handleStatusChange(eventId: string, status: EventStatus) {
        try {
            await updateEventStatus(eventId, status);
            showToast("success", "Estado del evento actualizado.");
        } catch {
            showToast("error", "No se pudo actualizar el estado.");
        }
    }

    return (
        <section className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-3xl font-black">Eventos</h2>
                    <p className="mt-2 text-sm text-(--text-muted)">
                        Visualiza los eventos registrados con sus datos principales.
                    </p>
                </div>

                <Link href={routes.clown.newEvent} className="rounded-xl bg-(--primary) px-4 py-3 text-center text-sm font-semibold transition hover:bg-(--primary-hover)">
                    + Nuevo evento
                </Link>
            </div>

            <div className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-4">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row">
                    <div className="flex flex-1 items-center gap-2 rounded-xl border border-(--border) bg-[#0a0e14] px-3">
                        <Search size={16} className="text-(--text-muted)" />
                        <input type="text" placeholder="Buscar evento..." className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-gray-500"/>
                    </div>

                    <select className="rounded-xl border border-(--border) bg-[#0a0e14] px-3 py-3 text-sm text-(--text-soft) outline-none">
                        <option>Todos los estados</option>
                        <option>Pendiente</option>
                        <option>Confirmado</option>
                        <option>Finalizado</option>
                    </select>
                </div>

                <div className="hidden overflow-hidden rounded-xl border border-(--border) lg:block">
                    
                    {isLoading && (
                        <p className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm text-(--text-muted)">
                            Cargando eventos...
                        </p>
                    )} {error && (
                        <p className="rounded-xl border border-(--danger) bg-red-500/10 px-4 py-3 text-sm text-red-300">
                            {error}
                        </p>
                    )}

                    <table className="w-full border-collapse text-left text-sm">
                        <thead className="bg-(--surface-soft) text-(--text-muted)">
                            <tr>
                                <th className="px-4 py-3 font-medium">Fecha</th>
                                <th className="px-4 py-3 font-medium">Hora</th>
                                <th className="px-4 py-3 font-medium">Cliente</th>
                                <th className="px-4 py-3 font-medium">Servicio</th>
                                <th className="px-4 py-3 font-medium">Ubicación</th>
                                <th className="px-4 py-3 font-medium">Estado</th>
                                <th className="px-4 py-3 font-medium">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {events.map((event) => (
                                <tr key={event.id} className="border-t border-(--border) transition hover:bg-(--surface-hover)">
                                    <td className="px-4 py-4">{event.eventDate}</td>
                                    <td className="px-4 py-4 text-(--text-soft)">{event.startTime}</td>
                                    <td className="px-4 py-4 font-medium">{event.customer
                                        ? `${event.customer.firstName} ${event.customer.lastName}`
                                        : "Cliente no asignado"
                                    }</td>
                                    <td className="px-4 py-4 text-(--text-soft)">{event.service?.name ?? "Servicio no asignado"}</td>
                                    <td className="px-4 py-4 text-(--text-muted)">{event.address}</td>
                                    <td className="px-4 py-4">
                                        <EventStatusSelect status={event.status} onChange={(status) => handleStatusChange(event.id, status)}/>
                                    </td>
                                    <td className="">
                                        <Link href={routes.clown.editEvent(event.id)} className="rounded-lg border border-(--border) px-3 py-2 text-xs font-semibold text-(--text-soft) transition hover:bg-(--surface-hover)">
                                            Editar
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="space-y-3 lg:hidden">

                    {isLoading && (
                        <p className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm text-(--text-muted)">
                            Cargando eventos...
                        </p>
                    )} {error && (
                        <p className="rounded-xl border border-(--danger) bg-red-500/10 px-4 py-3 text-sm text-red-300">
                            {error}
                        </p>
                    )}

                    {events.map((event) => (
                        <article key={event.id} className="rounded-xl border border-(--border) bg-[#0a0e14] p-4">
                            <div className="mb-3 flex items-center justify-between gap-3">
                                <div>
                                    <h3 className="font-semibold">{event.service?.name ?? "Servicio no asignado"}</h3>
                                    <p className="text-sm text-(--text-muted)">{event.customer
                                        ? `${event.customer.firstName} ${event.customer.lastName}`
                                        : "Cliente no asignado"
                                    }</p>
                                </div>

                                <EventStatusSelect status={event.status} onChange={(status) => handleStatusChange(event.id, status)}/>
                            </div>

                            <div className="space-y-2 text-sm text-(--text-muted)">
                                <p className="flex items-center gap-2">
                                    <CalendarDays size={16} />
                                    {event.eventDate} · {event.startTime}
                                </p>

                                <p className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    {event.address}
                                </p>
                            </div>
                            <Link href={routes.clown.editEvent(event.id)} className="mt-4 block w-full rounded-xl border border-(--border) px-3 py-2 text-center text-sm font-semibold text-(--text-soft) transition hover:bg-(--surface-hover)">
                                Editar
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
            {toast && (
  <Toast
    type={toast.type}
    message={toast.message}
    onClose={hideToast}
  />
)}
        </section>
    );
}