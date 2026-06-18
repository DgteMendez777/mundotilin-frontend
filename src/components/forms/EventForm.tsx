"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { Search } from "lucide-react";
import { useCustomerSearch } from "@/hooks/useCustomerSearch";
import { useServices } from "@/hooks/useServices";
import { EventFormInitialValues, EventFormValues } from "@/types/event.types";

type EventFormMode = "create" | "edit";

type EventFormProps = {
    mode: EventFormMode;
    initialValues?: EventFormInitialValues;
    onSubmit: (values: EventFormValues) => Promise<void>;
};

function getInitials(firstName: string, lastName: string) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export default function EventForm({ mode, initialValues, onSubmit }: EventFormProps) {
    const isEdit = mode === "edit";    
    const { customer, isSearching, error, searchByCi } = useCustomerSearch();
    const { services, isLoading: isLoadingServices } = useServices();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const selectedCustomer =
        customer ??
            (initialValues
                ? {
                    id: initialValues.customerId,
                    ci: initialValues.customerCi ?? "",
                    firstName: initialValues.customerFirstName ?? "",
                    lastName: initialValues.customerLastName ?? "",
                    email: initialValues.customerEmail ?? "",
                    phone: initialValues.customerPhone ?? "",
                    profileImage: initialValues.customerProfileImage ?? "",
                }
            : null);

    function handleSearchCustomer() {
        const input = document.querySelector<HTMLInputElement>(
            "input[name='customerCi']"
        );
        const ci = input?.value.trim();

        if (!ci) return;

        searchByCi(ci);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!selectedCustomer) {
            setSubmitError("Primero debes buscar y seleccionar un cliente por CI.");
            return;
        }

        try {
            setIsSubmitting(true);
            setSubmitError("");

            const formData = new FormData(event.currentTarget);

            const values: EventFormValues = {
                customerId: selectedCustomer.id,
                serviceId: String(formData.get("serviceId")),
                title: String(formData.get("title")),
                eventDate: String(formData.get("eventDate")),
                startTime: String(formData.get("startTime")),
                address: String(formData.get("address")),
                googleMapsUrl: String(formData.get("googleMapsUrl") || ""),
                childrenCount: Number(formData.get("childrenCount") || 0),
                totalAmount: Number(formData.get("totalAmount") || 0),
                observations: String(formData.get("observations") || ""),
            };

            await onSubmit(values);
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : "Error al guardar el evento");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
        <h2 className="text-3xl font-black">
          {isEdit ? "Editar evento" : "Nuevo evento"}
        </h2>
        <p className="mt-2 text-sm text-(--text-muted)">
          Busca al cliente por CI y completa los datos del evento.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.4fr]">
        <section className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-6">
          <h3 className="mb-5 text-lg font-bold">Cliente</h3>

          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-(--primary-soft) text-xl font-black text-(--primary)">
              {selectedCustomer?.profileImage ? (
                <img
                  src={selectedCustomer.profileImage}
                  alt="Cliente"
                  className="h-full w-full rounded-2xl object-cover"
                />
              ) : selectedCustomer ? (
                getInitials(
                  selectedCustomer.firstName,
                  selectedCustomer.lastName
                )
              ) : (
                "?"
              )}
            </div>

            <div>
              <p className="font-bold">
                {selectedCustomer
                  ? `${selectedCustomer.firstName} ${selectedCustomer.lastName}`
                  : "Cliente no seleccionado"}
              </p>
              <p className="text-sm text-(--text-muted)">
                {selectedCustomer
                  ? "Cliente encontrado"
                  : "Busca un cliente por CI"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-(--text-soft)">
                CI
              </label>

              <div className="flex gap-2">
                <input
                  name="customerCi"
                  type="text"
                  defaultValue={initialValues?.customerCi ?? ""}
                  placeholder="Ej. 12345678"
                  required
                  className="flex-1 rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
                />

                <button
                  type="button"
                  onClick={handleSearchCustomer}
                  disabled={isSearching}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--primary) transition hover:bg-(--primary-hover) disabled:opacity-60"
                >
                  <Search size={18} />
                </button>
              </div>

              {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                disabled
                value={selectedCustomer?.firstName ?? ""}
                placeholder="Nombre"
                className="w-full rounded-xl border border-(--border) bg-(--surface-soft) px-4 py-3 text-sm text-(--text-muted)"
              />
              <input
                disabled
                value={selectedCustomer?.lastName ?? ""}
                placeholder="Apellido"
                className="w-full rounded-xl border border-(--border) bg-(--surface-soft) px-4 py-3 text-sm text-(--text-muted)"
              />
            </div>

            <input
              disabled
              value={selectedCustomer?.email ?? ""}
              placeholder="Correo"
              className="w-full rounded-xl border border-(--border) bg-(--surface-soft) px-4 py-3 text-sm text-(--text-muted)"
            />

            <input
              disabled
              value={selectedCustomer?.phone ?? ""}
              placeholder="Teléfono"
              className="w-full rounded-xl border border-(--border) bg-(--surface-soft) px-4 py-3 text-sm text-(--text-muted)"
            />
          </div>
        </section>

        <section className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-6">
          <h3 className="mb-5 text-lg font-bold">Datos del evento</h3>

          <div className="grid gap-5 md:grid-cols-2">
            <select
              name="serviceId"
              required
              defaultValue={initialValues?.serviceId ?? ""}
              disabled={isLoadingServices}
              className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary) disabled:opacity-60"
            >
              <option value="" disabled>
                {isLoadingServices
                  ? "Cargando servicios..."
                  : "Selecciona un servicio"}
              </option>

              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>

            <input
              name="title"
              type="text"
              required
              defaultValue={initialValues?.title ?? ""}
              placeholder="Título del evento"
              className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
            />

            <input
              name="eventDate"
              type="date"
              required
              defaultValue={initialValues?.eventDate ?? ""}
              className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
            />

            <input
              name="startTime"
              type="time"
              required
              defaultValue={initialValues?.startTime ?? ""}
              className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
            />

            <input
              name="childrenCount"
              type="number"
              min={0}
              defaultValue={initialValues?.childrenCount ?? ""}
              placeholder="Cantidad de niños"
              className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
            />

            <input
              name="totalAmount"
              type="number"
              min={0}
              required
              defaultValue={initialValues?.totalAmount ?? ""}
              placeholder="Total Bs."
              className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"
            />

            <input
              name="address"
              type="text"
              required
              defaultValue={initialValues?.address ?? ""}
              placeholder="Dirección"
              className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary) md:col-span-2"
            />

            <input
              name="googleMapsUrl"
              type="url"
              defaultValue={initialValues?.googleMapsUrl ?? ""}
              placeholder="URL de Google Maps opcional"
              className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary) md:col-span-2"
            />

            <textarea
              name="observations"
              rows={5}
              defaultValue={initialValues?.observations ?? ""}
              placeholder="Observaciones"
              className="resize-none rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary) md:col-span-2"
            />
          </div>
        </section>
      </div>

      {submitError && (
        <p className="rounded-xl border border-(--danger) bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {submitError}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? isEdit
              ? "Guardando..."
              : "Creando..."
            : isEdit
              ? "Guardar cambios"
              : "Crear evento"}
        </Button>
      </div>
    </form>
  );
}