"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/utils/whatsapp";

type WhatsAppButtonProps = {
  message?: string;
  label?: string;
  className?: string;
};

export default function WhatsAppButton({
  message,
  label = "Contactar por WhatsApp",
  className = "",
}: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 hover:shadow-lg hover:shadow-green-950/40 ${className}`}
    >
      <MessageCircle size={18} />
      {label}
    </a>
  );
}