"use client";

import ServiceForm from "@/components/forms/ServiceForm";
import Toast from "@/components/ui/Toast";
import { routes } from "@/constants/routes";
import { useToast } from "@/hooks/useToast";
import { servicesService } from "@/services/services.service";
import { uploadsService } from "@/services/uploads.service";
import { useRouter } from "next/navigation";

export default function NewServicePage() {
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();

  return (
    <>
      <ServiceForm
        mode="create"
        onSubmit={async (values) => {
          let coverImage = values.coverImage ?? "";

          if (values.image) {
            const uploaded = await uploadsService.uploadServiceImage(values.image);
            coverImage = uploaded.url;
          }

          await servicesService.create({
            categoryId: values.categoryId,
            name: values.name,
            description: values.description,
            basePrice: values.basePrice,
            coverImage,
            isActive: values.isActive,
          });

          showToast("success", "Servicio creado correctamente.");

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