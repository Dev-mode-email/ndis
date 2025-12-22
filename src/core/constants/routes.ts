export const ROUTES = {
    HOME: '/',

    // Auth routes
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
    },

    // Dashboard
    DASHBOARD: {
        HOME: '/dashboard',
    },

    // Users Management
    USERS: {
        INDEX: '/users',
        DETAILS: (id: string) => `/users/${id}`,
    },

    // Wallets Management
    WALLETS: {
        INDEX: '/wallets',
        DETAILS: (id: string) => `/wallets/${id}`,
    },

    // Transactions
    TRANSACTIONS: {
        INDEX: '/transactions',
        DETAILS: (id: string) => `/transactions/${id}`,
    },

    // Payments
    PAYMENTS: {
        NEW: '/payments/new',
        ADD_CASH: '/payments/add-cash',
    },

    // Mood Reports
    MOOD_REPORTS: {
        INDEX: '/mood-reports',
    },

    // Account
    ACCOUNT: {
        INDEX: '/account',
    },

    // Onboarding
    ONBOARDING: {
        INDEX: '/onboarding',
    },
} as const
