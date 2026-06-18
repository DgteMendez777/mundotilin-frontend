"use client";

import { useEffect, useState } from "react";
import { eventsService } from "@/services/events.service";
import { CreateEventPayload, Event, EventStatus, UpdateEventPayload } from "@/types/event.types";

export function useEvents() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function loadEvents() {
        try {
            setIsLoading(true);
            setError("");

            const data = await eventsService.getAll();
            setEvents(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al cargar eventos");
        } finally {
            setIsLoading(false);
        }
    }

    async function createEvent(payload: CreateEventPayload) {
        const created = await eventsService.create(payload);
        setEvents((prev) => [created, ...prev]);
    }

    async function updateEvent(id: string, payload: UpdateEventPayload) {
        const updated = await eventsService.update(id, payload);
        setEvents((prev) =>
            prev.map((event) => (event.id === id ? updated : event))
        );
    }

    async function updateEventStatus(id: string, status: EventStatus) {
        const updated = await eventsService.updateStatus(id, status);
        setEvents((prev) =>
            prev.map((event) => (event.id === id ? updated : event))
        );
    }

    useEffect(() => {
        loadEvents();
    }, []);

    return {
        events,
        isLoading,
        error,
        loadEvents,
        createEvent,
        updateEvent,
        updateEventStatus,
    };
}