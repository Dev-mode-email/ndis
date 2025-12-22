/**
 * API Configuration
 */
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || 'https://bacend-pol-production.up.railway.app',
    SWAGGER_URL: import.meta.env.VITE_API_SWAGGER || 'https://bacend-pol-production.up.railway.app/api',
} as const

/**
 * API Endpoints
 * Based on Swagger documentation: https://bacend-pol-production.up.railway.app/api
 */
export const API_ENDPOINTS = {
    // Health Check
    HEALTH: {
        CHECK: '/health-check',
        DB: '/health-check/db',
    },
    
    // Authentication
    AUTH: {
        ME: '/auth/me',
        LOGIN: '/auth/admin/login',
        REGISTER: '/auth/admin/register',
        REFRESH: '/auth/admin/refresh',
    },
    
    // User Management
    USER: {
        LIST: '/user',
        CREATE: '/user',
        GET: (id: string) => `/user/${id}`,
        UPDATE: (id: string) => `/user/${id}`,
        DELETE: (id: string) => `/user/${id}`,
        // User Address
        UPDATE_INDIVIDUAL_ADDRESS: (id: string) => `/user/${id}/address/individual`,
        UPDATE_ORGANIZATION_ADDRESS: (id: string) => `/user/${id}/address/organization`,
        // User Details
        UPDATE_NDIS_DETAILS: (id: string) => `/user/${id}/ndis-details`,
        UPDATE_SERVICE_PROVIDER_DETAILS: (id: string) => `/user/${id}/service-provider-details`,
        UPDATE_ONBOARDING_STATUS: '/user/onboarding/status',
        // Invitations
        INVITATIONS_TREE: '/user/invitations/tree',
        GET_INVITED_USERS: (id: string) => `/user/${id}/invited`,
        GET_INVITATION_TREE: (id: string) => `/user/${id}/invitations/tree`,
        GET_INVITATION_CHAIN: (id: string) => `/user/${id}/invitations/chain`,
    },
    
    // Wallet Management
    WALLET: {
        LIST: '/wallet',
        CREATE: '/wallet',
        GET: (id: string) => `/wallet/${id}`,
        UPDATE: (id: string) => `/wallet/${id}`,
        DELETE: (id: string) => `/wallet/${id}`,
        ADD_USERS: (id: string) => `/wallet/${id}/users`,
        REMOVE_USERS: (id: string) => `/wallet/${id}/users`,
    },
    
    // Subscription Management
    SUBSCRIPTION: {
        CREATE: '/subscription',
        GET_PLANS: '/subscription-plan',
        GET: (id: string) => `/subscription/${id}`,
        UPDATE: (id: string) => `/subscription/${id}`,
        DELETE: (id: string) => `/subscription/${id}`,
    },
    
    // Card Management
    CARD: {
        ORDER: '/card/order',
        LIST: '/card',
        GET: (id: string) => `/card/${id}`,
        UPDATE: (id: string) => `/card/${id}`,
        DELETE: (id: string) => `/card/${id}`,
    },
    
    // Transactions Management 
    TRANSACTIONS: {
        LIST: '/transactions',
        CREATE: '/transactions',
        GET: (id: string) => `/transactions/${id}`,
        UPDATE: (id: string) => `/transactions/${id}`,
        DELETE: (id: string) => `/transactions/${id}`,
        UPDATE_STATUS: (id: string) => `/transactions/${id}/status`,
    },
    
    // Categories Management 
    CATEGORIES: {
        LIST: '/categories',
        CREATE: '/categories',
        GET: (id: string) => `/categories/${id}`,
        UPDATE: (id: string) => `/categories/${id}`,
        DELETE: (id: string) => `/categories/${id}`,
    },
    
    // Image Management 
    IMAGE: {
        LIST: '/image',
        UPLOAD: '/image',
        GET: (id: string) => `/image/${id}`,
        UPDATE: (id: string) => `/image/${id}`,
        DELETE: (id: string) => `/image/${id}`,
        GET_SIGNED_URL: (id: string) => `/image/${id}/url`,
    },
    
    // Diary Management
    DIARY: {
        LIST: '/diary',
        CREATE: '/diary',
    },
} as const
