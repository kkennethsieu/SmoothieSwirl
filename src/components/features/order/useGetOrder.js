import { useQuery } from '@tanstack/react-query'
import { getOrder } from '../../../services/apiSmoothie'

export default function useGetOrder(id) {
  const { isLoading, data } = useQuery({
    queryKey: ['orders', id],
    queryFn: () => getOrder(id),
  })
  return { isLoading, data }
}
