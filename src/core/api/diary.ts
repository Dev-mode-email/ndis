import { axiosInstance } from './axios'
import { API_ENDPOINTS } from '../constants/api'

export interface CreateCustomerDiaryNoteDto {
    mood: number
    notes: string
}

export const diaryApi = {
    /**
     * Get all diary notes
     */
    getNotes: () =>
        axiosInstance.get(API_ENDPOINTS.DIARY.LIST),

    /**
     * Create a new diary note
     */
    createNote: (data: CreateCustomerDiaryNoteDto) =>
        axiosInstance.post(API_ENDPOINTS.DIARY.CREATE, data),
}

