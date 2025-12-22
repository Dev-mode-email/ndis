import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { subscriptionApi, type CreateSubscriptionDto, type UpdateSubscriptionDto, type SubscriptionPlan } from '@/core/api/subscription'
import { toastManager } from '@/core/components/ui/toast/toast'
import { handleApiError } from '@/core/utils/errorHandler'

export const useSubscriptionPlans = () => {
  return useQuery<SubscriptionPlan[]>({
    queryKey: ['subscription', 'plans'],
    queryFn: async () => {
      const response = await subscriptionApi.getPlans()
      return response.data
    },
  })
}

export const useCreateSubscription = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateSubscriptionDto) => subscriptionApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] })
      toastManager.success('Subscription created successfully')
    },
    onError: (error) => {
      toastManager.error(handleApiError(error, 'Failed to create subscription'))
    },
  })
}

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSubscriptionDto }) => 
      subscriptionApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] })
      toastManager.success('Subscription updated successfully')
    },
    onError: (error) => {
      toastManager.error(handleApiError(error, 'Failed to update subscription'))
    },
  })
}

