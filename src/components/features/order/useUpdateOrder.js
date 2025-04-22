import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateOrder as updateOrderApi } from '../../../services/apiSmoothie'

export default function useUpdateOrder() {
  const queryClient = useQueryClient()
  const { isLoading, mutate: updateOrder } = useMutation({
    mutationFn: updateOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
  return { isLoading, updateOrder }
}
