import { axiosInstance, axiosPublic } from './axios'
import type { AdminLoginDto, AdminRegisterDto, RefreshTokenDto, AuthResponse } from '../types/auth'
import { API_ENDPOINTS } from '../constants/api'

export const authApi = {
    /**
     * Get current authenticated user
     */
    me: () =>
        axiosInstance.get(API_ENDPOINTS.AUTH.ME),

    /**
     * Login as admin
     */
    login: (data: AdminLoginDto) =>
        axiosPublic.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, data),

    /**
     * Register new admin user
     */
    register: (data: AdminRegisterDto) =>
        axiosPublic.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data),

    /**
     * Refresh access token
     */
    refresh: (data: RefreshTokenDto) =>
        axiosPublic.post<AuthResponse>(API_ENDPOINTS.AUTH.REFRESH, data),
}
