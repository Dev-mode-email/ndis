import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { cardApi, type OrderCardDto, type UpdateCardDto } from '@/core/api/card'
import { toastManager } from '@/core/components/ui/toast/toast'
import { handleApiError } from '@/core/utils/errorHandler'

export const useOrderCard = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: OrderCardDto) => cardApi.order(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] })
      toastManager.success('Card ordered successfully')
    },
    onError: (error) => {
      toastManager.error(handleApiError(error, 'Failed to order card'))
    },
  })
}

export const useCards = () => {
  return useQuery({
    queryKey: ['cards'],
    queryFn: async () => {
      const response = await cardApi.getAll()
      return response.data
    },
  })
}

export const useCard = (id: string) => {
  return useQuery({
    queryKey: ['card', id],
    queryFn: async () => {
      const response = await cardApi.getById(id)
      return response.data
    },
    enabled: !!id,
  })
}

export const useUpdateCard = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCardDto }) => 
      cardApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] })
      toastManager.success('Card updated successfully')
    },
    onError: (error) => {
      toastManager.error(handleApiError(error, 'Failed to update card'))
    },
  })
}

