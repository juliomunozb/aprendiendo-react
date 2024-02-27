import { useEffect, useState, useRef, type ChangeEvent, useMemo } from 'react'
import './App.css'
import { type User } from './types.d'
import { UsersList } from './components/UsersList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
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
    setSortByCountry(prevState => !prevState)
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

  // users.sort((a, b) -> Esta mal ya que el sort muta el array original [Error]
  // [...users].sort((a, b) -> se hace una copia del array original [OK] 7
  // structuredClone(users).sort((a, b) -> se hace una copia profunda del array original [OK] 5.5
  // users.toSorted((a, b) -> seria la mejor opción. Es una versión resiente, puede no estar soportada por todos los navegadores. [OK] 10
  const sortedUsers = useMemo(() => {
    console.log('sortedUsers')

    return sortByCountry
      ? filteredUsers.toSorted((a, b) => {
          return a.location.country.localeCompare(b.location.country)
        })
      : filteredUsers
  }, [filteredUsers, sortByCountry])

  const handleDeleteUser = (email: string) => {
    const filterUsers = users.filter(user => user.email !== email)
    setUsers(filterUsers)
  }
  const handleReset = () => {
    setUsers(originalUsers.current)
  }
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

  const handleOnchage = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterCountry(e.target.value)
  }
  return (
    <>
      <h2>Prueba Técnica</h2>
      <header>
        <button onClick={toogleColors}>Colorear Filas</button>
        <button onClick={toogleSortByCountry}>
          {sortByCountry ? 'No ordenar por país' : 'Ordenar por país'}
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
          deleteUser={handleDeleteUser}
          showColors={showColors}
          users={sortedUsers}
        />
      </main>
    </>
  )
}

export default App
