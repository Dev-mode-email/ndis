import { axiosInstance } from './axios'
import { API_ENDPOINTS } from '../constants/api'

export interface CreateSubscriptionDto {
    subscriptionPlanId: string
}

export interface UpdateSubscriptionDto {
    planType?: 'FREE' | 'PAID'
    planId?: string
    status?: 'ACTIVE' | 'CANCELLED' | 'EXPIRED'
}

export interface SubscriptionPlan {
    id: string
    name: string
    price: number
    period?: string
    features?: string[]
}

export const subscriptionApi = {
    /**
     * Get all subscription plans
     */
    getPlans: () =>
        axiosInstance.get<SubscriptionPlan[]>(API_ENDPOINTS.SUBSCRIPTION.GET_PLANS),

    /**
     * Create a new subscription
     */
    create: (data: CreateSubscriptionDto) =>
        axiosInstance.post(API_ENDPOINTS.SUBSCRIPTION.CREATE, data),

    /**
     * Get subscription by id
     */
    getById: (id: string) =>
        axiosInstance.get(API_ENDPOINTS.SUBSCRIPTION.GET(id)),

    /**
     * Update subscription
     */
    update: (id: string, data: UpdateSubscriptionDto) =>
        axiosInstance.patch(API_ENDPOINTS.SUBSCRIPTION.UPDATE(id), data),

    /**
     * Delete subscription
     */
    delete: (id: string) =>
        axiosInstance.delete(API_ENDPOINTS.SUBSCRIPTION.DELETE(id)),
}

