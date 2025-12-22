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
    /**
     * Get all transactions with pagination
     */
    getAll: (params?: GetTransactionsParams) => {
        // Remove undefined values from params
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

    /**
     * Create a new transaction
     */
    create: (data: CreateTransactionDto) =>
        axiosInstance.post(API_ENDPOINTS.TRANSACTIONS.CREATE, data),

    /**
     * Get transaction by id
     */
    getById: (id: string) =>
        axiosInstance.get(API_ENDPOINTS.TRANSACTIONS.GET(id)),

    /**
     * Update transaction
     */
    update: (id: string, data: UpdateTransactionDto) =>
        axiosInstance.patch(API_ENDPOINTS.TRANSACTIONS.UPDATE(id), data),

    /**
     * Delete transaction
     */
    delete: (id: string) =>
        axiosInstance.delete(API_ENDPOINTS.TRANSACTIONS.DELETE(id)),

    /**
     * Update transaction status
     */
    updateStatus: (id: string, data: UpdateTransactionStatusDto) =>
        axiosInstance.patch(API_ENDPOINTS.TRANSACTIONS.UPDATE_STATUS(id), data),
}

