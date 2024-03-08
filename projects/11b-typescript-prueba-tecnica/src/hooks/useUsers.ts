import { useInfiniteQuery } from '@tanstack/react-query'
import { type User } from '../types'
import { fetchUsers } from '../services/users'

export const useUsers = () => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<{
      nextCursor?: number
      users: User[]
    }>(
      ['users'], // <- la key de la información o de la query
      async ({ pageParam = 1 }) => await fetchUsers({ pageParam }),
      {
        getNextPageParam: lastPage => lastPage.nextCursor,
        refetchOnWindowFocus: false, // Desactivando el llamado a la API cada vez que se regresa al focus de la pagina
      }
    )

  return {
    refetch,
    fetchNextPage,
    isLoading,
    isError,
    users: data?.pages.flatMap(page => page.users) ?? [],
    hasNextPage,
  }
}
