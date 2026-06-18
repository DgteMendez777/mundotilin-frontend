"use client";

import EventForm from "@/components/forms/EventForm";
import { routes } from "@/constants/routes";
import { eventsService } from "@/services/events.service";
import { useRouter } from "next/navigation";

export default function NewEventPage() {
  const router = useRouter();

  return (
    <EventForm
      mode="create"
      onSubmit={async (values) => {
        await eventsService.create(values);
        router.push(routes.clown.events);
      }}
    />
  );
}