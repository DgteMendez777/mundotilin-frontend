import { apiFetch } from "./api";

export const paymentService = {
  getMyPayments() {
    return apiFetch<any[]>("/payments/my");
  },

  getAdminPayments() {
    return apiFetch<any[]>("/payments/admin");
  },

  uploadProof(id: string, proofImageUrl: string) {
    return apiFetch<any>(`/payments/${id}/proof`, {
      method: "PATCH",
      body: JSON.stringify({ proofImageUrl }),
    });
  },

  updateStatus(id: string, status: "PAID" | "REJECTED") {
    return apiFetch<any>(`/payments/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },
};