import { axiosInstance } from './axios'
import { API_ENDPOINTS } from '../constants/api'

export interface CreateTransactionDto {
    type: 'INCOME' | 'EXPENSE'
    amount: number
    walletId: string
    userId: string
    description?: string
    categoryId?: string
    ppan?: string
    transactionPartner?: string
}

export interface UpdateTransactionDto {
    type?: 'INCOME' | 'EXPENSE'
    amount?: number
    walletId?: string
    userId?: string
    description?: string
    categoryId?: string
    ppan?: string
    transactionPartner?: string
}

export interface UpdateTransactionStatusDto {
    status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'FAILED'
}

export interface GetTransactionsParams {
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: 'ASC' | 'DESC'
    walletId?: string
    userId?: string
}

export const transactionsApi = {
    getAll: (params?: GetTransactionsParams) => {
        const cleanParams: Record<string, string | number> = {}
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== '') {
                    cleanParams[key] = value
                }
            })
        }
        return axiosInstance.get(API_ENDPOINTS.TRANSACTIONS.LIST, { params: cleanParams })
    },

    create: (data: CreateTransactionDto) =>
        axiosInstance.post(API_ENDPOINTS.TRANSACTIONS.CREATE, data),

    getById: (id: string) =>
        axiosInstance.get(API_ENDPOINTS.TRANSACTIONS.GET(id)),

    update: (id: string, data: UpdateTransactionDto) =>
        axiosInstance.patch(API_ENDPOINTS.TRANSACTIONS.UPDATE(id), data),

    delete: (id: string) =>
        axiosInstance.delete(API_ENDPOINTS.TRANSACTIONS.DELETE(id)),

    updateStatus: (id: string, data: UpdateTransactionStatusDto) =>
        axiosInstance.patch(API_ENDPOINTS.TRANSACTIONS.UPDATE_STATUS(id), data),
}

