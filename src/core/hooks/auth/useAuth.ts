import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/core/api/auth';
import { toastManager } from '@/core/components/ui/toast/toast';
import type { AdminLoginDto, AdminRegisterDto, RefreshTokenDto } from '@/core/types/auth';
import { handleApiError } from '@/core/utils/errorHandler';

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: AdminLoginDto) => authApi.login(data),
        onError: (error) => {
            toastManager.error(handleApiError(error, 'Login failed'));
        }
    })
}

export const useRegister = () => {
    return useMutation({
        mutationFn: (data: AdminRegisterDto) => authApi.register(data),
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || 
                                error?.response?.data?.error || 
                                handleApiError(error, 'Registration failed');
            const errorDetails = error?.response?.data?.details || error?.response?.data;
            console.error('Registration error details:', errorDetails);

            if (error?.response?.status === 400 && 
                (errorMessage?.toLowerCase().includes('already exists') || 
                 errorMessage?.toLowerCase().includes('email'))) {
                toastManager.error('Email already registered', {
                    description: 'This email is already in use. Please sign in or use a different email address.',
                    duration: 5000,
                });
            } else {
                toastManager.error(errorMessage, {
                    duration: 5000,
                });
            }
        }
    })
}

export const useRefreshToken = () => {
    return useMutation({
        mutationFn: (data: RefreshTokenDto) => authApi.refresh(data),
        onError: (error) => {
            toastManager.error(handleApiError(error, 'Token refresh failed'));
        }
    })
}
