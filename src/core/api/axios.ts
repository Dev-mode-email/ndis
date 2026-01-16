import axios from 'axios'
import { useAuthStore } from '../stores/authStore'
import { API_ENDPOINTS } from '../constants/api'

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://bacend-pol-production.up.railway.app',
    withCredentials: false
})

export const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://bacend-pol-production.up.railway.app',
    withCredentials: false
})

axiosInstance.interceptors.request.use(
    (config) => {
        const user = useAuthStore.getState().user
        if (user?.access_token) {
            config.headers.Authorization = `Bearer ${user.access_token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

let isRefreshing = false
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: unknown) => void }[] = []

const processQueue = (error: Error | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })

    failedQueue = []
}

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 429) {
            return Promise.reject(error)
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            const user = useAuthStore.getState().user
            if (user?.access_token === 'temp_token') {
                return Promise.reject(error)
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                })
                    .then(token => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token
                        return axiosInstance(originalRequest)
                    })
                    .catch(err => {
                        return Promise.reject(err)
                    })
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                if (!user?.refresh_token) {
                    useAuthStore.getState().setSessionExpired(true)
                    return Promise.reject(error)
                }

                const { data } = await axiosPublic.post(API_ENDPOINTS.AUTH.REFRESH, {
                    refreshToken: user.refresh_token
                })

                const { access_token, refresh_token } = data
                const updatedUser = {
                    ...user,
                    access_token,
                    refresh_token,
                }
                useAuthStore.getState().setUser(updatedUser)

                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
                originalRequest.headers['Authorization'] = `Bearer ${access_token}`

                processQueue(null, access_token)
                return axiosInstance(originalRequest)
            } catch (refreshError: unknown) {
                processQueue(refreshError as Error, null)
                useAuthStore.getState().setSessionExpired(true)
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)
