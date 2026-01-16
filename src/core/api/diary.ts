import { axiosInstance } from './axios'
import { API_ENDPOINTS } from '../constants/api'

export interface CreateCustomerDiaryNoteDto {
    mood: number
    notes: string
}

export const diaryApi = {
    getNotes: () =>
        axiosInstance.get(API_ENDPOINTS.DIARY.LIST),

    createNote: (data: CreateCustomerDiaryNoteDto) =>
        axiosInstance.post(API_ENDPOINTS.DIARY.CREATE, data),
}

