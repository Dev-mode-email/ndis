import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { walletApi, type CreateWalletDto, type UpdateWalletDto, type GetWalletsParams } from '@/core/api/wallet'
import { toastManager } from '@/core/components/ui/toast/toast'
import { handleApiError } from '@/core/utils/errorHandler'
import type { Wallet } from '@/core/types/wallet'

interface WalletsPaginationMeta {
  totalItems?: number
  totalPages?: number
  currentPage?: number
}

interface WalletsQueryResult {
  items: Wallet[]
  meta: WalletsPaginationMeta
}

export const useWallets = () => {
  return useQuery({
    queryKey: ['wallets'],
    queryFn: async () => {
      try {
        const response = await walletApi.getAll()
        const data = response.data
        if (Array.isArray(data)) {
          return data as Wallet[]
        }
        if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
          return data.data as Wallet[]
        }
        return [] as Wallet[]
      } catch (error: any) {
        const statusCode = error?.response?.status
        const errorMessage = error?.response?.data?.message || error?.message || 'Unknown error'
        
        console.error('Failed to fetch wallets:', {
          statusCode,
          message: errorMessage,
          url: error?.config?.url,
        })
        
        return [] as Wallet[]
      }
    },
    retry: (failureCount, error: any) => {
      const statusCode = error?.response?.status
      if (statusCode && [500, 502, 503, 504].includes(statusCode)) {
        return false
      }
      return failureCount < 1
    },
    retryOnMount: false,
  })
}

export const useWalletsPaginated = (params: GetWalletsParams) => {
  return useQuery<WalletsQueryResult, unknown>({
    queryKey: ['wallets', params],
    queryFn: async () => {
      try {
        const response = await walletApi.getAll(params)
        const data = response.data as any

        if (Array.isArray(data)) {
          const page = params.page ?? 1
          const limit = (params.limit ?? data.length) || 1
          const totalItems = data.length

          return {
            items: data as Wallet[],
            meta: {
              totalItems,
              currentPage: page,
              totalPages: Math.max(1, Math.ceil(totalItems / limit)),
            },
          }
        }

        if (data && typeof data === 'object') {
          const items = Array.isArray(data.data) ? (data.data as Wallet[]) : []
          const metaFromApi = data.meta ?? {}

          return {
            items,
            meta: {
              totalItems:
                metaFromApi.totalItems ??
                metaFromApi.total ??
                metaFromApi.itemCount,
              totalPages:
                metaFromApi.totalPages ??
                metaFromApi.pageCount,
              currentPage:
                metaFromApi.currentPage ??
                metaFromApi.page ??
                params.page ??
                1,
            },
          }
        }

        return {
          items: [],
          meta: {
            totalItems: 0,
            currentPage: params.page ?? 1,
            totalPages: 1,
          },
        }
      } catch (error: any) {
        const statusCode = error?.response?.status
        const errorMessage = error?.response?.data?.message || error?.message || 'Unknown error'

        console.error('Failed to fetch wallets (paginated):', {
          statusCode,
          message: errorMessage,
          url: error?.config?.url,
        })

        return {
          items: [],
          meta: {
            totalItems: 0,
            currentPage: params.page ?? 1,
            totalPages: 1,
          },
        }
      }
    },
    retry: (failureCount, error: any) => {
      const statusCode = error?.response?.status
      if (statusCode && [500, 502, 503, 504].includes(statusCode)) {
        return false
      }
      return failureCount < 1
    },
    retryOnMount: false,
  })
}

export const useWallet = (id: string) => {
  return useQuery({
    queryKey: ['wallet', id],
    queryFn: async () => {
      const response = await walletApi.getById(id)
      return response.data as Wallet
    },
    enabled: !!id,
  })
}

export const useCreateWallet = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateWalletDto) => walletApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] })
      toastManager.success('Wallet created successfully')
    },
    onError: (error) => {
      toastManager.error(handleApiError(error, 'Failed to create wallet'))
    },
  })
}

export const useUpdateWallet = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWalletDto }) => 
      walletApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] })
      toastManager.success('Wallet updated successfully')
    },
    onError: (error) => {
      toastManager.error(handleApiError(error, 'Failed to update wallet'))
    },
  })
}

export const useDeleteWallet = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => walletApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] })
      toastManager.success('Wallet deleted successfully')
    },
    onError: (error) => {
      toastManager.error(handleApiError(error, 'Failed to delete wallet'))
    },
  })
}

export const useAddUsersToWallet = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { userIds: string[] } }) => 
      walletApi.addUsers(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] })
      toastManager.success('Users added to wallet successfully')
    },
    onError: (error) => {
      toastManager.error(handleApiError(error, 'Failed to add users to wallet'))
    },
  })
}

