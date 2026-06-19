import { CONTACT } from "@/constants/contact";

export function buildWhatsAppLink(message?: string) {
  const text = encodeURIComponent(
    message ??
      "Hola MundoTilín, me gustaría obtener información sobre sus servicios."
  );

  return `https://wa.me/${CONTACT.whatsapp}?text=${text}`;
}