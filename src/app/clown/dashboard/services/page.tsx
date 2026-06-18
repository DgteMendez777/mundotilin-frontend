"use client"

import Link from "next/link";
import { routes } from "@/constants/routes";
import { useCategories } from "@/hooks/useCategories";
import { useServices } from "@/hooks/useServices";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import CategoryForm from "@/components/forms/CategoryForm";
import Toast from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";
import { Pencil, Trash2 } from "lucide-react";
import { EventCategory } from "@/types/service.types";

export default function ServicesAdminPage() {
    const {
        categories,
        isLoading: loadingCategories,
        error: categoriesError,
        createCategory,
        updateCategory,
        deleteCategory,
    } = useCategories();
    const { services, isLoading: loadingServices, error: servicesError, toggleServiceStatus } = useServices();

    const activeServices = services.filter((service) => service.isActive).length;
    const inactiveServices = services.filter((service) => !service.isActive).length;
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const { toast, showToast, hideToast } = useToast();
    const [editingCategory, setEditingCategory] = useState<EventCategory | null>(null);
    const [deletingCategory, setDeletingCategory] = useState<EventCategory | null>(null);

    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-3xl font-black">Catálogo</h2>
                <p className="mt-2 text-sm text-(--text-muted)">
                    Administra las categorías y servicios ofrecidos por Mundo Tilín.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <article className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-5">
                    <p className="text-sm text-(--text-muted)">Categorías</p>
                    <h3 className="mt-2 text-3xl font-black">{categories.length}</h3>
                </article>

                <article className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-5">
                    <p className="text-sm text-(--text-muted)">Servicios activos</p>
                    <h3 className="mt-2 text-3xl font-black">{activeServices}</h3>
                </article>

                <article className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-5">
                    <p className="text-sm text-(--text-muted)">Servicios inactivos</p>
                    <h3 className="mt-2 text-3xl font-black">{inactiveServices}</h3>
                </article>
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
                <section className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-5">
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <div>
                            <h3 className="text-xl font-black">Categorías</h3>
                            <p className="text-sm text-(--text-muted)">
                                Tipos de eventos disponibles.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsCategoryModalOpen(true)}
                            className="rounded-xl bg-(--primary) px-4 py-2 text-sm font-semibold hover:bg-(--primary-hover)"
                        >
                            + Categoría
                        </button>
                    </div>

                    {loadingCategories && (
                        <p className="text-sm text-(--text-muted)">Cargando categorías...</p>
                    )}

                    {categoriesError && (
                        <p className="text-sm text-red-300">{categoriesError}</p>
                    )}

                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="flex items-start justify-between gap-3 rounded-xl border border-(--border) bg-[#0a0e14] p-4"
                        >
                            <div>
                                <p className="font-semibold">{category.name}</p>
                                <p className="text-sm text-(--text-muted)">
                                    {category.description || "Sin descripción"}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 self-center">
                                <button
                                    type="button"
                                    onClick={() => setEditingCategory(category)}
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-(--border) text-(--text-muted) transition hover:bg-(--surface-hover) hover:text-(--text-main)"
                                >
                                    <Pencil size={15} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setDeletingCategory(category)}
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-red-500/30 text-red-300 transition hover:bg-red-500/10"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-5">
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <div>
                            <h3 className="text-xl font-black">Servicios</h3>
                            <p className="text-sm text-(--text-muted)">
                                Paquetes y precios ofrecidos.
                            </p>
                        </div>

                        <Link
                            href={routes.clown.newService}
                            className="rounded-xl bg-(--primary) px-4 py-2 text-sm font-semibold hover:bg-(--primary-hover)"
                        >
                            + Servicio
                        </Link>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
  {loadingServices && (
    <p className="text-sm text-(--text-muted)">Cargando servicios...</p>
  )}

  {servicesError && (
    <p className="text-sm text-red-300">{servicesError}</p>
  )}

  {services.map((service) => (
    <article
      key={service.id}
      className="overflow-hidden rounded-(--radius-xl) border border-(--border) bg-[#0a0e14]"
    >
      <div className="flex aspect-video items-center justify-center overflow-hidden bg-(--surface-soft)">
        {service.coverImage ? (
          <img
            src={service.coverImage}
            alt={service.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-center text-(--text-muted)">
            <p className="text-3xl font-black text-(--primary)">MT</p>
            <p className="mt-1 text-xs">Sin imagen</p>
          </div>
        )}
      </div>

      <div className="space-y-4 p-4">
        <div>
          <div className="mb-2 flex items-start justify-between gap-3">
            <div>
              <h4 className="font-bold">{service.name}</h4>
              <p className="text-xs text-(--text-muted)">
                {service.category?.name ?? "Sin categoría"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => toggleServiceStatus(service.id, !service.isActive)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                service.isActive
                  ? "border-green-500/30 bg-green-500/10 text-green-300"
                  : "border-red-500/30 bg-red-500/10 text-red-300"
              }`}
            >
              {service.isActive ? "Activo" : "Inactivo"}
            </button>
          </div>

          <p className="line-clamp-2 text-sm text-(--text-muted)">
            {service.description || "Sin descripción"}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-(--border) pt-4">
          <p className="text-lg font-black text-(--text-main)">
            Bs. {service.basePrice}
          </p>

          <Link
            href={routes.clown.editService(service.id)}
            className="rounded-lg border border-(--border) px-3 py-2 text-xs font-semibold text-(--text-soft) hover:bg-(--surface-hover)"
          >
            Editar
          </Link>
        </div>
      </div>
    </article>
  ))}
</div>
                </section>
            </div>
            <Modal
                isOpen={isCategoryModalOpen}
                title="Nueva categoría"
                onClose={() => setIsCategoryModalOpen(false)}
            >
                <CategoryForm
                    onCancel={() => setIsCategoryModalOpen(false)}
                    onSubmit={async (values) => {
                        await createCategory(values);
                        setIsCategoryModalOpen(false);
                        showToast("success", "Categoría creada correctamente.");
                    }}
                />
            </Modal>
            <Modal
                isOpen={!!editingCategory}
                title="Editar categoría"
                onClose={() => setEditingCategory(null)}
            >
                {editingCategory && (
                    <CategoryForm
                        initialValues={{
                            name: editingCategory.name,
                            description: editingCategory.description,
                        }}
                        submitLabel="Guardar cambios"
                        onCancel={() => setEditingCategory(null)}
                        onSubmit={async (values) => {
                            await updateCategory(editingCategory.id, values);
                            setEditingCategory(null);
                            showToast("success", "Categoría actualizada correctamente.");
                        }}
                    />
                )}
            </Modal>
            <Modal
                isOpen={!!deletingCategory}
                title="Eliminar categoría"
                onClose={() => setDeletingCategory(null)}
            >
                {deletingCategory && (
                    <div className="space-y-5">
                        <p className="text-sm text-(--text-muted)">
                            ¿Seguro que quieres eliminar la categoría{" "}
                            <span className="font-semibold text-(--text-main)">
                                {deletingCategory.name}
                            </span>
                            ?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setDeletingCategory(null)}
                                className="rounded-xl border border-(--border) px-5 py-3 text-sm font-semibold text-(--text-soft) hover:bg-(--surface-hover)"
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                onClick={async () => {
                                    await deleteCategory(deletingCategory.id);
                                    setDeletingCategory(null);
                                    showToast("success", "Categoría eliminada correctamente.");
                                }}
                                className="rounded-xl bg-(--danger) px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            {toast && (
                <Toast type={toast.type} message={toast.message} onClose={hideToast} />
            )}
        </section>
    );
}