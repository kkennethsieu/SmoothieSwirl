import { useQuery } from '@tanstack/react-query'
import { getMenu } from '../../../services/apiSmoothie'

export default function useGetMenu() {
  const { isLoading, data } = useQuery({
    queryKey: ['menu'],
    queryFn: () => getMenu(),
  })
  return { isLoading, data }
}
