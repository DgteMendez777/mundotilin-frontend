export type EventStatus = "PENDING" | "CONFIRMED" | "FINISHED"

export type EventCustomer = {
    id: string;
    ci: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profileImage?: string; 
};

export type EventService = {
    id: string;
    name: string;
    price: string;
};

export type Event = {
    id: string;
    clownId: string;
    customerId: string;
    serviceId: string;
    title: string;
    eventDate: string;
    startTime: string;
    address: string;
    googleMapsUrl?: string | null;
    childrenCount?: number | null;
    observations?: string | null;
    status: EventStatus;
    totalAmount: number;
    customer?: EventCustomer;
    service?: EventService;
};

export type CreateEventPayload = {
    customerId: string;
    serviceId: string;
    title: string;
    eventDate: string;
    startTime: string;
    address: string;
    googleMapsUrl?: string;
    childrenCount?: number;
    observations?: string;
    totalAmount: number;
};

export type UpdateEventPayload = Partial<CreateEventPayload>;

export type UpdateEventStatusPayload = {
    status: EventStatus;
};

export type EventFormValues = {
    customerId: string;
    serviceId: string;
    title: string;
    eventDate: string;
    startTime: string;
    address: string;
    googleMapsUrl?: string;
    childrenCount?: number;
    observations?: string;
    totalAmount: number;
};

export type EventFormInitialValues = {
    customerId: string;
    customerCi?: string;
    customerFirstName?: string;
    customerLastName?: string;
    customerEmail?: string;
    customerPhone?: string;
    customerProfileImage?: string;
    serviceId: string;
    title: string;
    eventDate: string;
    startTime: string;
    address: string;
    googleMapsUrl?: string | null;
    childrenCount?: number | null;
    observations?: string | null;
    totalAmount: number;
};