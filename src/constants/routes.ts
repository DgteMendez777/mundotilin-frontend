export const routes = {
    home: "/",
    login: "/login",
    register: "/register",

    clown: {
        dashboard: "/clown/dashboard",
        events: "/clown/dashboard/events",
        newEvent: "/clown/dashboard/events/new",
        editEvent: (eventId: string) => `/clown/dashboard/events/${eventId}/edit`,
        calendar: "/clown/dashboard/calendar",
        services: "/clown/dashboard/services",
        newService: "/clown/dashboard/services/new",
        editService: (serviceId: string) => `/clown/dashboard/services/${serviceId}/edit`,
        categories: "/clown/dashboard/categories",
        newCategory: "/clown/dashboard/services/categories/new",
        editCategory: (categoryId: string) => `/clown/dashboard/services/categories/${categoryId}/edit`,
        profile: "/clown/dashboard/profile",
    },

    client: {
        dashboard: "/client/dashboard",
        reservations: "/client/dashboard/reservations",
        profile: "/client/dashboard/profile",
    },
};