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
        categories: "/clown/dashboard/categories",
        profile: "/clown/dashboard/profile",
    },

    client: {
        dashboard: "/client/dashboard",
        reservations: "/client/dashboard/reservations",
        profile: "/client/dashboard/profile",
    },
};