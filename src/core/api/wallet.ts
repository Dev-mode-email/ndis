import { axiosInstance } from './axios'
import { API_ENDPOINTS } from '../constants/api'

export interface CreateWalletDto {
    name: string
    status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
    currency: 'USD' | 'EUR' | 'GBP'
    userIds?: string[]
}

export interface UpdateWalletDto {
    name?: string
    status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
    currency?: 'USD' | 'EUR' | 'GBP'
    userIds?: string[]
}

export interface AddUsersToWalletDto {
    userIds: string[]
}

export interface RemoveUsersFromWalletDto {
    userIds: string[]
}

export interface GetWalletsParams {
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: 'ASC' | 'DESC'
}

export const walletApi = {
    getAll: (params?: GetWalletsParams) => {
        const cleanParams: Record<string, string | number> = {}
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== '') {
                    cleanParams[key] = value
                }
            })
        }
        return axiosInstance.get(API_ENDPOINTS.WALLET.LIST, { params: cleanParams })
    },

    create: (data: CreateWalletDto) =>
        axiosInstance.post(API_ENDPOINTS.WALLET.CREATE, data),

    getById: (id: string) =>
        axiosInstance.get(API_ENDPOINTS.WALLET.GET(id)),

    update: (id: string, data: UpdateWalletDto) =>
        axiosInstance.patch(API_ENDPOINTS.WALLET.UPDATE(id), data),

    delete: (id: string) =>
        axiosInstance.delete(API_ENDPOINTS.WALLET.DELETE(id)),

    addUsers: (id: string, data: AddUsersToWalletDto) =>
        axiosInstance.post(API_ENDPOINTS.WALLET.ADD_USERS(id), data),

    removeUsers: (id: string, data: RemoveUsersFromWalletDto) =>
        axiosInstance.delete(API_ENDPOINTS.WALLET.REMOVE_USERS(id), { data }),
}

