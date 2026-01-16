import { axiosInstance, axiosPublic } from './axios'
import type { AdminLoginDto, AdminRegisterDto, RefreshTokenDto, AuthResponse } from '../types/auth'
import { API_ENDPOINTS } from '../constants/api'

export const authApi = {
    me: () =>
        axiosInstance.get(API_ENDPOINTS.AUTH.ME),

    login: (data: AdminLoginDto) =>
        axiosPublic.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, data),

    register: (data: AdminRegisterDto) =>
        axiosPublic.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data),

    refresh: (data: RefreshTokenDto) =>
        axiosPublic.post<AuthResponse>(API_ENDPOINTS.AUTH.REFRESH, data),
}
