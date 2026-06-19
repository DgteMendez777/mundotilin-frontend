"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";
import { paymentService } from "@/services/payment.service";
import { uploadsService } from "@/services/uploads.service";

export default function ClientPaymentsPage() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const eventTitle = searchParams.get("event");

  const [payments, setPayments] = useState<any[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File | null>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { toast, showToast, hideToast } = useToast();

  async function loadPayments() {
    try {
      const data = await paymentService.getMyPayments();
      setPayments(data);
    } catch {
      setPayments([]);
    }
  }

  useEffect(() => {
    loadPayments();
  }, []);

  async function handleUploadProof(paymentId: string) {
    const file = selectedFiles[paymentId];
    if (!file) {
      showToast("error", "Selecciona una imagen del comprobante.");
      return;
    }

    try {
      setLoadingId(paymentId);
      const uploaded = await uploadsService.uploadPaymentProof(file);
      await paymentService.uploadProof(paymentId, uploaded.url);
      showToast("success", "Comprobante enviado para revisión.");
      loadPayments();
    } catch {
      showToast("error", "No se pudo subir el comprobante.");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Mis pagos</h1>
        <p className="mt-2 text-sm text-(--text-muted)">
          Escanea el QR, realiza el pago y sube tu comprobante.
        </p>
      </div>

      {amount && (
        <article className="max-w-xl rounded-(--radius-xl) border border-(--border) bg-(--surface) p-5">
          <h2 className="font-bold">{eventTitle || "Reserva creada"}</h2>

          <div className="mt-4 rounded-xl border border-(--border) bg-[#0a0e14] p-4">
            <p className="text-sm text-(--text-muted)">Monto a pagar</p>
            <p className="text-2xl font-black text-(--primary)">Bs {amount}</p>
            <p className="mt-2 text-sm text-(--text-muted)">Estado: PENDING</p>
          </div>

          <div className="mt-4 flex justify-center rounded-xl bg-white p-4">
            <Image
              src="/images/payments/qr-payment.png"
              alt="QR de pago MundoTilín"
              width={260}
              height={260}
              className="object-contain"
            />
          </div>

          <p className="mt-4 rounded-xl border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">
  Realiza el pago escaneando el QR. Luego conserva tu comprobante para confirmar la reserva.
</p>
        </article>
      )}

      {payments.length > 0 && (
        <div className="grid gap-5 lg:grid-cols-2">
          {payments.map((payment) => (
            <article
              key={payment.id}
              className="rounded-(--radius-xl) border border-(--border) bg-(--surface) p-5"
            >
              <h2 className="font-bold">{payment.event?.title}</h2>
              <p className="mt-1 text-sm text-(--text-muted)">
                {payment.event?.service?.name}
              </p>

              <div className="mt-4 rounded-xl border border-(--border) bg-[#0a0e14] p-4">
                <p className="text-sm text-(--text-muted)">Monto a pagar</p>
                <p className="text-2xl font-black text-(--primary)">Bs {payment.amount}</p>
                <p className="mt-2 text-sm text-(--text-muted)">Estado: {payment.status}</p>
              </div>

              <div className="mt-4 flex justify-center rounded-xl bg-white p-4">
                <Image
                  src="/images/payments/qr-payment.png"
                  alt="QR de pago MundoTilín"
                  width={260}
                  height={260}
                  className="object-contain"
                />
              </div>

              {payment.status !== "PAID" && (
                <div className="mt-4 space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setSelectedFiles({
                        ...selectedFiles,
                        [payment.id]: e.target.files?.[0] ?? null,
                      })
                    }
                    className="w-full rounded-xl border border-(--border) bg-[#0a0e14] px-4 py-3 text-sm text-(--text-muted)"
                  />

                  <Button
                    type="button"
                    className="w-full"
                    disabled={loadingId === payment.id}
                    onClick={() => handleUploadProof(payment.id)}
                  >
                    {loadingId === payment.id ? "Enviando..." : "Subir comprobante"}
                  </Button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      {!amount && payments.length === 0 && (
        <p className="rounded-xl border border-(--border) bg-(--surface) p-4 text-sm text-(--text-muted)">
          No tienes pagos pendientes todavía.
        </p>
      )}

      {toast && <Toast type={toast.type} message={toast.message} onClose={hideToast} />}
    </section>
  );
}