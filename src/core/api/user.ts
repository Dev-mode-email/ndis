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

    create: (data: CreateUserDto) =>
        axiosInstance.post(API_ENDPOINTS.USER.CREATE, data),

    getById: (id: string) =>
        axiosInstance.get(API_ENDPOINTS.USER.GET(id)),

    update: (id: string, data: UpdateUserDto) =>
        axiosInstance.patch(API_ENDPOINTS.USER.UPDATE(id), data),

    delete: (id: string) =>
        axiosInstance.delete(API_ENDPOINTS.USER.DELETE(id)),

    updateIndividualAddress: (id: string, data: UpdateIndividualAddressDto) =>
        axiosInstance.patch(API_ENDPOINTS.USER.UPDATE_INDIVIDUAL_ADDRESS(id), data),

    updateOrganizationAddress: (id: string, data: UpdateOrganizationAddressDto) =>
        axiosInstance.patch(API_ENDPOINTS.USER.UPDATE_ORGANIZATION_ADDRESS(id), data),

    updateNdisDetails: (id: string, data: UpdateNdisDetailsDto) =>
        axiosInstance.patch(API_ENDPOINTS.USER.UPDATE_NDIS_DETAILS(id), data),

    updateServiceProviderDetails: (id: string, data: UpdateServiceProviderDetailsDto) =>
        axiosInstance.patch(API_ENDPOINTS.USER.UPDATE_SERVICE_PROVIDER_DETAILS(id), data),

    getInvitationTree: () =>
        axiosInstance.get(API_ENDPOINTS.USER.INVITATIONS_TREE),

    getInvitedUsers: (id: string) =>
        axiosInstance.get(API_ENDPOINTS.USER.GET_INVITED_USERS(id)),

    getInvitationTreeForUser: (id: string) =>
        axiosInstance.get(API_ENDPOINTS.USER.GET_INVITATION_TREE(id)),

    getInvitationChain: (id: string) =>
        axiosInstance.get(API_ENDPOINTS.USER.GET_INVITATION_CHAIN(id)),

    updateOnboardingStatus: (data: UpdateOnboardingStatusDto) =>
        axiosInstance.patch(API_ENDPOINTS.USER.UPDATE_ONBOARDING_STATUS, data),
}

