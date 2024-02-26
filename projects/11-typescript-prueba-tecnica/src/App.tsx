import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types.d'
import { UsersList } from './components/UsersList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
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

  // users.sort((a, b) -> Esta mal ya que el sort muta el array original [Error]
  // [...users].sort((a, b) -> se hace una copia del array original [OK] 7
  // structuredClone(users).sort((a, b) -> se hace una copia profunda del array original [OK] 5.5
  // users.toSorted((a, b) -> seria la mejor opción. Es una versión resiente, puede no estar soportada por todos los navegadores. [OK] 10
  const sortedUsers = sortByCountry
    ? users.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country)
      })
    : users

  const handleDeleteUser = (email: string) => {
    const filterUsers = users.filter(user => user.email !== email)
    setUsers(filterUsers)
  }

  return (
    <>
      <h2>Prueba Técnica</h2>
      <header>
        <button onClick={toogleColors}>Colorear Filas</button>
        <button onClick={toogleSortByCountry}>
          {sortByCountry ? 'No ordenar por país' : 'Ordenar por país'}
        </button>
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
