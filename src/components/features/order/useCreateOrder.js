import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createOrder as createOrderApi } from '../../../services/apiSmoothie'
import { useNavigate } from 'react-router-dom'

export default function useCreateOrder() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { isLoading, mutate: createOrder } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      const orderId = data?.[0]?.orderId
      if (orderId) navigate(`/orders/${orderId}`)
    },
  })
  return { isLoading, createOrder }
}
