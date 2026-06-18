import { apiFetch } from "./api";
import { CreateEventPayload, Event, EventStatus, UpdateEventPayload } from "@/types/event.types";

export const eventsService = {
    getAll() {
        return apiFetch<Event[]>("/events");
    },

    getById(id: string) {
        return apiFetch<Event>(`/events/${id}`);
    },

    create(payload: CreateEventPayload) {
        return apiFetch<Event>("/events", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    },

    update(id: string, payload: UpdateEventPayload) {
        return apiFetch<Event>(`/events/${id}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
        });
    },

    updateStatus(id: string, status: EventStatus) {
        return apiFetch<Event>(`/events/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status })
        })
    },
};