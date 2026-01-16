import { axiosInstance } from './axios'
import { API_ENDPOINTS } from '../constants/api'

export interface CreateCategoryDto {
    name: string
    description?: string
}

export interface UpdateCategoryDto {
    name?: string
    description?: string
}

export interface GetCategoriesParams {
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: 'ASC' | 'DESC'
}

export const categoriesApi = {
    getAll: (params?: GetCategoriesParams) => {
        const cleanParams: Record<string, string | number> = {}
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== '') {
                    cleanParams[key] = value
                }
            })
        }
        return axiosInstance.get(API_ENDPOINTS.CATEGORIES.LIST, { params: cleanParams })
    },

    create: (data: CreateCategoryDto) =>
        axiosInstance.post(API_ENDPOINTS.CATEGORIES.CREATE, data),

    getById: (id: string) =>
        axiosInstance.get(API_ENDPOINTS.CATEGORIES.GET(id)),

    update: (id: string, data: UpdateCategoryDto) =>
        axiosInstance.patch(API_ENDPOINTS.CATEGORIES.UPDATE(id), data),

    delete: (id: string) =>
        axiosInstance.delete(API_ENDPOINTS.CATEGORIES.DELETE(id)),
}

