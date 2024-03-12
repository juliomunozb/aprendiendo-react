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
        // Tiempo en el que los datos son viejos, pasado el tiempo se hace un nuevo fetch para refrescada la data
        // Sive para aquellos casos en los datos sean muy criticos y deben caducar rapido o en su defecto que no caduden
        staleTime: 1000 * 3,
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
