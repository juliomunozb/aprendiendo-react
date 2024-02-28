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

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

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
    console.log('Calculate FilteredUsers')
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter(user => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase())
        })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    console.log('calculate sortedUsers')

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

  /* Sin evitar el renderizado no requerido */
  // const filteredUsers = (() => {
  //   console.log('calculate filteredUsers')
  //   return filterCountry != null && filterCountry.length > 0
  //     ? users.filter(user => {
  //       return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
  //     })
  //     : users
  // })()

  // const sortedUsers = (() => {
  //   console.log('calculate sortedUsers')

  //   return sortByCountry
  //     ? filteredUsers.toSorted(
  //       (a, b) => a.location.country.localeCompare(b.location.country)
  //     )
  //     : filteredUsers
  // })()

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
        <UsersList
          changeSorting={handleChangeSort}
          deleteUser={handleDeleteUser}
          showColors={showColors}
          users={sortedUsers}
        />
      </main>
    </>
  )
}

export default App
