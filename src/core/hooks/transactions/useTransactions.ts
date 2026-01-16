import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { transactionsApi, type CreateTransactionDto, type UpdateTransactionDto, type UpdateTransactionStatusDto } from '@/core/api/transactions'
import { toastManager } from '@/core/components/ui/toast/toast'
import { handleApiError } from '@/core/utils/errorHandler'
import type { Transaction, UseTransactionsParams } from '@/core/types/transaction'

interface TransactionsPaginationMeta {
  totalItems?: number
  totalPages?: number
  currentPage?: number
}

interface TransactionsQueryResult {
  items: Transaction[]
  meta: TransactionsPaginationMeta
}

export const useTransactions = (params?: UseTransactionsParams) => {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: async () => {
      const response = await transactionsApi.getAll({
        page: params?.page,
        limit: params?.limit,
        sortBy: params?.sortBy,
        sortOrder: params?.sortOrder,
        walletId: params?.walletId,
        userId: params?.userId,
      })
      const data = response.data
      if (Array.isArray(data)) {
        return data as Transaction[]
      }
      if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
        return data.data as Transaction[]
      }
      return [] as Transaction[]
    },
  })
}

export const useTransactionsPaginated = (params: UseTransactionsParams) => {
  return useQuery<TransactionsQueryResult, unknown>({
    queryKey: ['transactions', 'paginated', params],
    queryFn: async () => {
      const response = await transactionsApi.getAll({
        page: params.page,
        limit: params.limit,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
        walletId: params.walletId,
        userId: params.userId,
      })
      const data = response.data as any

      if (Array.isArray(data)) {
        const page = params.page ?? 1
        const limit = (params.limit ?? data.length) || 1
        const totalItems = data.length

        return {
          items: data as Transaction[],
          meta: {
            totalItems,
            currentPage: page,
            totalPages: Math.max(1, Math.ceil(totalItems / limit)),
          },
        }
      }

      if (data && typeof data === 'object') {
        const items = Array.isArray(data.data) ? (data.data as Transaction[]) : []
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
    },
  })
}

export const useAllTransactions = (params?: { page?: number; limit?: number; sortBy?: string; sortOrder?: 'ASC' | 'DESC' }) => {
  return useQuery({
    queryKey: ['transactions', 'all', params],
    queryFn: async () => {
      try {
        const response = await transactionsApi.getAll({
          page: params?.page || 1,
          limit: params?.limit || 10,
          sortBy: params?.sortBy || 'createdAt',
          sortOrder: params?.sortOrder || 'DESC',
        })
        const data = response.data
        
        if (Array.isArray(data)) {
          return data as Transaction[]
        }
        
        if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
          return data.data as Transaction[]
        }
        
        return [] as Transaction[]
      } catch (error) {
        return [] as Transaction[]
      }
    },
  })
}

export const useTransaction = (id: string) => {
  return useQuery({
    queryKey: ['transaction', id],
    queryFn: async () => {
      const response = await transactionsApi.getById(id)
      return response.data as Transaction
    },
    enabled: !!id,
  })
}

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateTransactionDto) => transactionsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      toastManager.success('Transaction created successfully')
    },
    onError: (error) => {
      toastManager.error(handleApiError(error, 'Failed to create transaction'))
    },
  })
}

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTransactionDto }) => 
      transactionsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      toastManager.success('Transaction updated successfully')
    },
    onError: (error) => {
      toastManager.error(handleApiError(error, 'Failed to update transaction'))
    },
  })
}

export const useUpdateTransactionStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTransactionStatusDto }) => 
      transactionsApi.updateStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      toastManager.success('Transaction status updated')
    },
    onError: (error) => {
      toastManager.error(handleApiError(error, 'Failed to update status'))
    },
  })
}

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => transactionsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      toastManager.success('Transaction deleted successfully')
    },
    onError: (error) => {
      toastManager.error(handleApiError(error, 'Failed to delete transaction'))
    },
  })
}

