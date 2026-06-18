"use client";

import ServiceForm from "@/components/forms/ServiceForm";
import Toast from "@/components/ui/Toast";
import { routes } from "@/constants/routes";
import { useToast } from "@/hooks/useToast";
import { servicesService } from "@/services/services.service";
import { uploadsService } from "@/services/uploads.service";
import { Service } from "@/types/service.types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditServicePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();

  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    async function loadService() {
      const data = await servicesService.getById(params.id);
      setService(data);
    }

    loadService();
  }, [params.id]);

  if (!service) {
    return <p className="text-sm text-(--text-muted)">Cargando servicio...</p>;
  }

  return (
    <>
      <ServiceForm
        mode="edit"
        initialValues={{
          categoryId: service.categoryId,
          name: service.name,
          description: service.description,
          basePrice: service.basePrice,
          coverImage: service.coverImage ?? "",
          isActive: service.isActive,
        }}
        onSubmit={async (values) => {
          let coverImage = values.coverImage ?? service.coverImage ?? "";

          if (values.image) {
            const uploaded = await uploadsService.uploadServiceImage(values.image);
            coverImage = uploaded.url;
          }

          await servicesService.update(service.id, {
            categoryId: values.categoryId,
            name: values.name,
            description: values.description,
            basePrice: values.basePrice,
            coverImage,
            isActive: values.isActive,
          });

          showToast("success", "Servicio actualizado correctamente.");

          setTimeout(() => {
            router.push(routes.clown.services);
          }, 700);
        }}
      />

      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={hideToast} />
      )}
    </>
  );
}