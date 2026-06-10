export type UserRole = "CLOWN" | "CLIENT";

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    profileImage?: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}

export type LoginPayload = {
    email: string;
    password: string;
}

export type RegisterPayload = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    role: "CLIENT";
}

export type AuthResponse = {
    message: string;
    token: string;
}