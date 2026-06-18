"use client";

import EventForm from "@/components/forms/EventForm";
import { routes } from "@/constants/routes";
import { eventsService } from "@/services/events.service";
import { Event } from "@/types/event.types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Toast from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";

function toDateInput(value: string) {
    return value ? value.slice(0, 10) : "";
}

function toTimeInput(value: string) {
    if (!value) return "";
    if (value.includes("T")) return value.slice(11, 16);
    return value.slice(0, 5);
}

export default function EditEventPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();

    const [event, setEvent] = useState<Event | null>(null);
    const { toast, showToast, hideToast } = useToast();

    useEffect(() => {
        async function loadEvent() {
            const data = await eventsService.getById(params.id);
            setEvent(data);
        }

        loadEvent();
    }, [params.id]);

    if (!event) {
        return <p className="text-sm text-(--text-muted)">Cargando evento...</p>;
    }

    return (
        <>
            <EventForm
                mode="edit"
                initialValues={{
                    customerId: event.customerId,
                    customerCi: event.customer?.ci,
                    customerFirstName: event.customer?.firstName,
                    customerLastName: event.customer?.lastName,
                    customerEmail: event.customer?.email,
                    customerPhone: event.customer?.phone,
                    customerProfileImage: event.customer?.profileImage,
                    serviceId: event.serviceId,
                    title: event.title,
                    eventDate: toDateInput(event.eventDate),
                    startTime: toTimeInput(event.startTime),
                    address: event.address,
                    googleMapsUrl: event.googleMapsUrl,
                    childrenCount: event.childrenCount,
                    observations: event.observations,
                    totalAmount: event.totalAmount,
                }}
                onSubmit={async (values) => {
                    try {
                        await eventsService.update(event.id, values);
                        showToast("success", "Evento actualizado correctamente.");

                        setTimeout(() => {
                            router.push(routes.clown.events);
                        }, 700);
                    } catch {
                        showToast("error", "No se pudo actualizar el evento.");
                    }
                }}
            />
            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={hideToast}
                />
            )}
        </>
    );
}