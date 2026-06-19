import { apiFetch } from "./api";

export type CreateReservationPayload = {
  serviceId: string;
  title: string;
  eventDate: string;
  startTime: string;
  address: string;
  googleMapsUrl?: string;
  childrenCount?: number;
  observations?: string;
  totalAmount: number;
  advanceAmount?: number;
};

export type ReservationResponse = {
  message: string;
  event: any;
  payment: any;
  qr: {
    imageUrl: string;
    amount: number;
  };
};

export const reservationService = {
  create(payload: CreateReservationPayload) {
    return apiFetch<ReservationResponse>("/reservations", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getMyReservations() {
    return apiFetch<any[]>("/reservations/my");
  },
};