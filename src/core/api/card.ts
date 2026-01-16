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
    order: (data: OrderCardDto) =>
        axiosInstance.post(API_ENDPOINTS.CARD.ORDER, data),

    getAll: () =>
        axiosInstance.get(API_ENDPOINTS.CARD.LIST),

    getById: (id: string) =>
        axiosInstance.get(API_ENDPOINTS.CARD.GET(id)),

    update: (id: string, data: UpdateCardDto) =>
        axiosInstance.patch(API_ENDPOINTS.CARD.UPDATE(id), data),

    delete: (id: string) =>
        axiosInstance.delete(API_ENDPOINTS.CARD.DELETE(id)),
}

