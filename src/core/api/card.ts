import { axiosInstance } from './axios'
import { API_ENDPOINTS } from '../constants/api'

export interface OrderCardDto {
    userId: string
    walletId: string
    deliveryAddress: {
        addressLine1: string
        addressLine2?: string
        city: string
        state: string
        postcode: string
        country: string
    }
}

export interface UpdateCardDto {
    status?: 'ACTIVE' | 'INACTIVE' | 'BLOCKED'
    deliveryAddress?: {
        addressLine1?: string
        addressLine2?: string
        city?: string
        state?: string
        postcode?: string
        country?: string
    }
}

export const cardApi = {
    /**
     * Order a new card
     */
    order: (data: OrderCardDto) =>
        axiosInstance.post(API_ENDPOINTS.CARD.ORDER, data),

    /**
     * Get all cards
     */
    getAll: () =>
        axiosInstance.get(API_ENDPOINTS.CARD.LIST),

    /**
     * Get card by id
     */
    getById: (id: string) =>
        axiosInstance.get(API_ENDPOINTS.CARD.GET(id)),

    /**
     * Update card
     */
    update: (id: string, data: UpdateCardDto) =>
        axiosInstance.patch(API_ENDPOINTS.CARD.UPDATE(id), data),

    /**
     * Delete card
     */
    delete: (id: string) =>
        axiosInstance.delete(API_ENDPOINTS.CARD.DELETE(id)),
}

