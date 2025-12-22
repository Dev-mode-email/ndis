export interface AdminLoginDto {
    email: string
    password: string
}

export interface AdminRegisterDto {
    firstName?: string
    lastName?: string
    email: string
    phone?: string
    password: string
}

export interface RefreshTokenDto {
    refreshToken: string
}

export interface AuthResponse {
    access_token: string
    refresh_token: string
    email: string
    userId: number
}
