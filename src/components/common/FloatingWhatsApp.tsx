"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/utils/whatsapp";

export default function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-xl shadow-green-950/40 transition hover:scale-110 hover:bg-green-700"
    >
      <MessageCircle size={26} />
    </a>
  );
}