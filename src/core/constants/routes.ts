export const ROUTES = {
    HOME: '/',

    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
    },

    DASHBOARD: {
        HOME: '/dashboard',
    },

    USERS: {
        INDEX: '/users',
        DETAILS: (id: string) => `/users/${id}`,
    },

    WALLETS: {
        INDEX: '/wallets',
        DETAILS: (id: string) => `/wallets/${id}`,
    },

    TRANSACTIONS: {
        INDEX: '/transactions',
        DETAILS: (id: string) => `/transactions/${id}`,
    },

    PAYMENTS: {
        NEW: '/payments/new',
        ADD_CASH: '/payments/add-cash',
    },

    MOOD_REPORTS: {
        INDEX: '/mood-reports',
    },

    ACCOUNT: {
        INDEX: '/account',
    },

    ONBOARDING: {
        INDEX: '/onboarding',
    },
} as const
