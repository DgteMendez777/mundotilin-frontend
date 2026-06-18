import { apiFetch } from "./api";
import { EventCustomer } from "@/types/event.types";

export const UsersService = {
    findByCi(ci: string) {
        return apiFetch<EventCustomer>(`/users/search/ci/${ci}`)
    },
};