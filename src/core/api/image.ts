import { axiosInstance } from './axios'
import { API_ENDPOINTS } from '../constants/api'

export interface UploadImageDto {
    file: File
    folder?: string
}

export interface UpdateImageDto {
    file?: File
}

export interface GetSignedUrlParams {
    expiresIn: string
}

export const imageApi = {
    getAll: () =>
        axiosInstance.get(API_ENDPOINTS.IMAGE.LIST),

    upload: (data: UploadImageDto) => {
        const formData = new FormData()
        formData.append('file', data.file)
        if (data.folder) {
            formData.append('folder', data.folder)
        }
        return axiosInstance.post(API_ENDPOINTS.IMAGE.UPLOAD, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },

    getById: (id: string) =>
        axiosInstance.get(API_ENDPOINTS.IMAGE.GET(id)),

    update: (id: string, data: UpdateImageDto) => {
        const formData = new FormData()
        if (data.file) {
            formData.append('file', data.file)
        }
        return axiosInstance.patch(API_ENDPOINTS.IMAGE.UPDATE(id), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },

    delete: (id: string) =>
        axiosInstance.delete(API_ENDPOINTS.IMAGE.DELETE(id)),

    getSignedUrl: (id: string, params: GetSignedUrlParams) =>
        axiosInstance.get(API_ENDPOINTS.IMAGE.GET_SIGNED_URL(id), { params }),
}

