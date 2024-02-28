import { useEffect, useState, useRef, type ChangeEvent, useMemo } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UsersList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  // useRef -> para guardar un valor
  // que queremos que no se comparta entre renderizados
  // pero que al cambiar, no vuelve a renderizar el componente
  const originalUsers = useRef<User[]>([])
  const [loagin, setLoadin] = useState(false)
  const [error, setError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setLoadin(true)
    setError(false)
    fetch(
      `https://randomuser.me/api/?results=10&seed=users&page=${currentPage}`
    )
      .then(async res => {
        // Validar si ha fallado la peticion asíncrona
        if (!res.ok) throw new Error('Error en la petición')
        return await res.json()
      })
      .then(res => {
        // <-- resuelve la promesa
        setUsers(prevUsers => {
          const newUSers = prevUsers.concat(res.results)
          originalUsers.current = newUSers
          return newUSers
        })
      })
      .catch(err => {
        // <-- captura los errores en el fetch: De conexiones, etc
        console.log(err)
        setError(error)
      })
      .finally(() => {
        // <- se ejecuta siempre
        setLoadin(false)
      })
  }, [currentPage])

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
      ? users.filter(user => {
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

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  const handleDeleteUser = (email: string) => {
    const filterUsers = users.filter(user => user.email !== email)
    setUsers(filterUsers)
  }
  const handleReset = () => {
    setUsers(originalUsers.current)
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
        {loagin && <p>Cargando...</p>}
        {!loagin && error && <p>se presentó algún error</p>}
        {!loagin && !error && users.length === 0 && <p>No hay usuarios</p>}
        {!loagin && !error && (
          <button
            onClick={() => {
              setCurrentPage(currentPage + 1)
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
