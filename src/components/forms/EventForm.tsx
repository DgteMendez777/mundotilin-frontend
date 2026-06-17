import Button from "../ui/Button";
import { Search } from "lucide-react";

type EventFormMode = "create" | "edit";

type EventFormProps = {
    mode: EventFormMode;
};

const customerMock = {
    firstName: "Alex",
    lastName: "Mendez",
    email: "alex@gmail.com",
    phone: "70000000",
    profileImage: "",
};

function getInitials(firstName: string, lastName: string) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export default function EventForm({ mode }: EventFormProps) {
    const isEdit = mode === "edit";

    return (
        <form className="space-y-6">
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
                            {customerMock.profileImage ? (
                                <img src={customerMock.profileImage} alt="Cliente" className="h-full w-full rounded-2xl object-cover"/>
                            ) : (
                                getInitials(customerMock.firstName, customerMock.lastName)
                            )}
                        </div>

                        <div>
                            <p className="font-bold">
                                {customerMock.firstName} {customerMock.lastName}
                            </p>
                            <p className="text-sm text-(--text-muted)">
                                Cliente encontrado
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm text-(--text-soft)">CI</label>
                            <div className="flex gap-2">
                                <input name="customerCi" type="text" placeholder="Ej. 12345678" required className="flex-1 rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)"/>
                                <button type="button" className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--primary) transition hover:bg-(--primary-hover)">
                                    <Search size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <input disabled value={customerMock.firstName} className="w-full rounded-xl border border-(--border) bg-(--surface-soft) px-4 py-3 text-sm text-(--text-muted)" />
                            <input disabled value={customerMock.lastName} className="w-full rounded-xl border border-(--border) bg-(--surface-soft) px-4 py-3 text-sm text-(--text-muted)" />
                        </div>

                        <input disabled value={customerMock.email} className="w-full rounded-xl border border-(--border) bg-(--surface-soft) px-4 py-3 text-sm text-(--text-muted)" />
                        <input disabled value={customerMock.phone} className="w-full rounded-xl border border-(--border) bg-(--surface-soft) px-4 py-3 text-sm text-(--text-muted)" />
                    </div>
                </section>

                <section className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-6">
                    <h3 className="mb-5 text-lg font-bold">Datos del evento</h3>

                    <div className="grid gap-5 md:grid-cols-2">
                        <select name="serviceId" required defaultValue="" className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)">
                            <option value="" disabled>Selecciona un servicio</option>
                            <option value="1">Show Básico</option>
                            <option value="2">Show Premium</option>
                            <option value="3">Show Temático</option>
                        </select>

                        <input name="title" type="text" required placeholder="Título del evento" className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)" />
                        <input name="eventDate" type="date" required className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)" />
                        <input name="startTime" type="time" required className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)" />
                        <input name="childrenCount" type="number" min={0} placeholder="Cantidad de niños" className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)" />
                        <input name="totalAmount" type="number" min={0} required placeholder="Total Bs." className="rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)" />
                        <input name="address" type="text" required placeholder="Dirección" className="md:col-span-2 rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)" />
                        <input name="googleMapsUrl" type="url" placeholder="URL de Google Maps opcional" className="md:col-span-2 rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)" />
                        <textarea name="observations" rows={5} placeholder="Observaciones" className="md:col-span-2 resize-none rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm outline-none focus:border-(--primary)" />
                    </div>
                </section>
            </div>

            <div className="flex justify-end gap-3">
                <Button type="submit">{isEdit ? "Guardar cambios" : "Crear evento"}</Button>
            </div>
        </form>
    );
}