import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userApi, type CreateUserDto, type GetUsersParams } from '@/core/api/user'
import { toastManager } from '@/core/components/ui/toast/toast'
import { handleApiError } from '@/core/utils/errorHandler'
import type { User } from '@/core/types/user'

interface UsersPaginationMeta {
  totalItems?: number
  totalPages?: number
  currentPage?: number
}

interface UsersQueryResult {
  items: User[]
  meta: UsersPaginationMeta
}

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await userApi.getAll()
      return response.data as User[]
    },
  })
}

export const useUsersPaginated = (params: GetUsersParams) => {
  return useQuery<UsersQueryResult, unknown>({
    queryKey: ['users', params],
    queryFn: async () => {
      const response = await userApi.getAll(params)
      const data = response.data as any

      if (Array.isArray(data)) {
        const page = params.page ?? 1
        const limit = (params.limit ?? data.length) || 1
        const totalItems = data.length

        return {
          items: data as User[],
          meta: {
            totalItems,
            currentPage: page,
            totalPages: Math.max(1, Math.ceil(totalItems / limit)),
          },
        }
      }

      if (data && typeof data === 'object') {
        const items = Array.isArray(data.data) ? (data.data as User[]) : []
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

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateUserDto) => userApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toastManager.success('User created successfully')
    },
    onError: (error) => {
      toastManager.error(handleApiError(error, 'Failed to create user'))
    },
  })
}

export const useSearchUserByEmail = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await userApi.getAll()
      const allUsers = Array.isArray(response.data) ? response.data : []
      const user = allUsers.find(
        (u: User) => u.email.toLowerCase() === email.toLowerCase()
      )
      return user || null
    },
  })
}

export const useConnectUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userId: string) => {
      return { success: true }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

