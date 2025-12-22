import { axiosInstance } from './axios'
import { API_ENDPOINTS } from '../constants/api'

export interface GetUsersParams {
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: 'ASC' | 'DESC'
}

export interface CreateUserDto {
    userType: 'INDIVIDUAL' | 'ORGANIZATION'
    firstName?: string
    lastName?: string
    organizationName?: string
    email: string
    phone?: string
    password: string
    role?: string
    status: string
}

export interface UpdateUserDto {
    userType?: 'INDIVIDUAL' | 'ORGANIZATION'
    firstName?: string
    lastName?: string
    organizationName?: string
    email?: string
    password?: string
    role?: string
    status?: string
    refreshToken?: string
    phoneCountryCode?: string
    abn?: string
    companyType?: string
    referralCode?: string
}

export interface UpdateIndividualAddressDto {
    country?: string
    city?: string
    state?: string
    addressLine1?: string
    addressLine2?: string
    street?: string
    buildingNumber?: string
    apartmentNumber?: string
    postalCode?: string
    latitude?: number
    longitude?: number
    isPrimary?: boolean
}

export interface UpdateOrganizationAddressDto {
    country?: string
    city?: string
    state?: string
    addressLine1?: string
    addressLine2?: string
    street?: string
    buildingNumber?: string
    officeNumber?: string
    postalCode?: string
    latitude?: number
    longitude?: number
    isPrimary?: boolean
}

export interface UpdateNdisDetailsDto {
    participationType?: 'NDIS_PARTICIPANT' | 'STATE_TERRITORY_SCHEME'
    ndisNumber?: string
    planManagementType?: 'AGENCY_MANAGED' | 'PLAN_MANAGED' | 'SELF_MANAGED'
    planStartDate?: string
    planEndDate?: string
}

export interface UpdateServiceProviderDetailsDto {
    providerNumber?: string
    businessType?: string
    numberOfParticipantsManaged?: '1' | '1-10' | '11-50' | '51-200' | '200+'
}

export type OnboardingStatus = 
    | 'INITIAL'
    | 'NDIS_PROVIDER_DETAILS'
    | 'COMPANY_INFO'
    | 'SUBSCRIPTION'
    | 'ADD_PARTICIPANT'
    | 'ADD_WALLET'
    | 'ORDER_CARD'
    | 'COMPLETED'

export interface UpdateOnboardingStatusDto {
    onboardingStatus: OnboardingStatus
}

export const userApi = {
    /**
     * Get all users (optionally with pagination)
     */
    getAll: (params?: GetUsersParams) => {
        const cleanParams: Record<string, string | number> = {}
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== '') {
                    cleanParams[key] = value
                }
            })
        }
        return axiosInstance.get(API_ENDPOINTS.USER.LIST, { params: cleanParams })
    },

    /**
     * Create a new user
     */
    create: (data: CreateUserDto) =>
        axiosInstance.post(API_ENDPOINTS.USER.CREATE, data),

    /**
     * Get user by id
     */
    getById: (id: string) =>
        axiosInstance.get(API_ENDPOINTS.USER.GET(id)),

    /**
     * Update user by id
     */
    update: (id: string, data: UpdateUserDto) =>
        axiosInstance.patch(API_ENDPOINTS.USER.UPDATE(id), data),

    /**
     * Delete user by id
     */
    delete: (id: string) =>
        axiosInstance.delete(API_ENDPOINTS.USER.DELETE(id)),

    /**
     * Update individual address for a user
     */
    updateIndividualAddress: (id: string, data: UpdateIndividualAddressDto) =>
        axiosInstance.patch(API_ENDPOINTS.USER.UPDATE_INDIVIDUAL_ADDRESS(id), data),

    /**
     * Update organization address for a user
     */
    updateOrganizationAddress: (id: string, data: UpdateOrganizationAddressDto) =>
        axiosInstance.patch(API_ENDPOINTS.USER.UPDATE_ORGANIZATION_ADDRESS(id), data),

    /**
     * Update NDIS details for a user
     */
    updateNdisDetails: (id: string, data: UpdateNdisDetailsDto) =>
        axiosInstance.patch(API_ENDPOINTS.USER.UPDATE_NDIS_DETAILS(id), data),

    /**
     * Update service provider details for a user
     */
    updateServiceProviderDetails: (id: string, data: UpdateServiceProviderDetailsDto) =>
        axiosInstance.patch(API_ENDPOINTS.USER.UPDATE_SERVICE_PROVIDER_DETAILS(id), data),

    /**
     * Get invitation tree (who invited whom)
     */
    getInvitationTree: () =>
        axiosInstance.get(API_ENDPOINTS.USER.INVITATIONS_TREE),

    /**
     * Get all users invited by a specific user
     */
    getInvitedUsers: (id: string) =>
        axiosInstance.get(API_ENDPOINTS.USER.GET_INVITED_USERS(id)),

    /**
     * Get invitation tree for a specific user
     */
    getInvitationTreeForUser: (id: string) =>
        axiosInstance.get(API_ENDPOINTS.USER.GET_INVITATION_TREE(id)),

    /**
     * Get invitation chain (who invited this user and all ancestors)
     */
    getInvitationChain: (id: string) =>
        axiosInstance.get(API_ENDPOINTS.USER.GET_INVITATION_CHAIN(id)),

    /**
     * Update onboarding status for current user
     */
    updateOnboardingStatus: (data: UpdateOnboardingStatusDto) =>
        axiosInstance.patch(API_ENDPOINTS.USER.UPDATE_ONBOARDING_STATUS, data),
}

