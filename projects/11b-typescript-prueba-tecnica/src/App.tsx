import { useState, type ChangeEvent, useMemo } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UsersList'
import { useInfiniteQuery } from '@tanstack/react-query'
const fetchUsers = async ({ pageParam = 1 }: { pageParam: number }) => {
  return await fetch(
    `https://randomuser.me/api/?results=10&seed=users&page=${pageParam}`
  )
    .then(async res => {
      // Validar si ha fallado la peticion asíncrona
      if (!res.ok) throw new Error('Error en la petición')
      return await res.json()
    })
    .then(res => {
      const nextCursor = Number(res.info.page) + 1

      return {
        users: res.results,
        nextCursor,
      }
    })
}

function App() {
  const { isLoading, isError, data, refetch, fetchNextPage } =
    useInfiniteQuery<{
      nextCursor?: number
      users: User[]
    }>(
      ['users'], // <- la key de la información o de la query
      async ({ pageParam = 1 }) => await fetchUsers({ pageParam }),
      {
        getNextPageParam: lastPage => lastPage.nextCursor,
      }
    )
  console.log(data)

  // flatMap: mapea cada valor a un nuevo valor y el resultado es aplanado a una profundidad máxima de 1.
  const users: User[] = data?.pages?.flatMap(page => page.users) ?? []

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toogleColors = () => {
    setShowColors(!showColors)
  }
  const toogleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  // Usando useMemo para evitar el redenrizado cuando no es necesario
  const filteredUsers = useMemo(() => {
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter((user: { location: { country: string } }) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase())
        })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last,
    }

    return filteredUsers.toSorted((a: User, b: User) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  const handleDeleteUser = (email: string) => {
    // const filterUsers = users.filter(user => user.email !== email)
    // setUsers(filterUsers)
  }
  const handleReset = () => {
    void refetch()
  }
  const handleOnchage = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterCountry(e.target.value)
  }
  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }
  return (
    <>
      <h2>Prueba Técnica</h2>
      <header>
        <button onClick={toogleColors}>Colorear Filas</button>
        <button onClick={toogleSortByCountry}>
          {sorting === SortBy.COUNTRY
            ? 'No ordenar por país'
            : 'Ordenar por país'}
        </button>
        <button onClick={handleReset}>Reset</button>
        <input
          type='text'
          placeholder='Filtrar por país'
          onChange={handleOnchage}
        />
      </header>
      <main>
        {users.length > 0 && (
          <UsersList
            changeSorting={handleChangeSort}
            deleteUser={handleDeleteUser}
            showColors={showColors}
            users={sortedUsers}
          />
        )}
        {isLoading && <p>Cargando...</p>}
        {!isLoading && isError && <p>se presentó algún error</p>}
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}
        {!isLoading && !isError && (
          <button
            onClick={() => {
              void fetchNextPage()
            }}
          >
            Cargar más resultados
          </button>
        )}
      </main>
    </>
  )
}

export default App
