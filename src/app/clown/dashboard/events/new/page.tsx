"use client";

import EventForm from "@/components/forms/EventForm";
import { routes } from "@/constants/routes";
import { eventsService } from "@/services/events.service";
import { useRouter } from "next/navigation";
import Toast from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";

export default function NewEventPage() {
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();

  return (
    <>
      <EventForm
        mode="create"
        onSubmit={async (values) => {
          try {
            await eventsService.create(values);
            showToast("success", "Evento creado correctamente.");

            setTimeout(() => {
              router.push(routes.clown.events);
            }, 700);
          } catch {
            showToast("error", "No se pudo crear el evento.");
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