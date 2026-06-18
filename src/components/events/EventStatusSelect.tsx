"use client";

import { EventStatus } from "@/types/event.types";

type EventStatusSelectProps = {
    status: EventStatus;
    onChange: (status: EventStatus) => void;
    disabled?: boolean;
};

export default function EventStatusSelect({
    status,
    onChange,
    disabled = false,
}: EventStatusSelectProps) {
    return (
        <select value={status} disabled={disabled} onChange={(event) => onChange(event.target.value as EventStatus)} className="rounded-xl border border-(--border) bg-[#0a0e14] px-3 py-2 text-xs font-semibold text-(--text-soft) outline-none transition focus:border-(--primary) disabled:opacity-60">
            <option value="PENDING">Pendiente</option>
            <option value="CONFIRMED">Confirmado</option>
            <option value="FINISHED">Finalizado</option>
        </select>
    );
}