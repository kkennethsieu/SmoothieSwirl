import { useQuery } from '@tanstack/react-query'
import { getMenuItem } from '../../../services/apiSmoothie'

export default function useGetMenuItem(id) {
  const { isLoading, data } = useQuery({
    queryKey: ['menu', id],
    queryFn: () => getMenuItem(id),
  })
  return { isLoading, data }
}
