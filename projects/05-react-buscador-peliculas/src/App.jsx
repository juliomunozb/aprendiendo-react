import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import './App.css'
import { useState } from 'react'

function App () {
  const { movies } = useMovies()
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ query })
  }

  const handleOnchange = (event) => {
    // Asegurar que se esta utilizando el ultimo valor
    const newQuery = event.target.value
    setQuery(newQuery)
    if (newQuery === '') {
      setError('No se puede buscar una película vacía')
      return
    }
    if (newQuery.length < 3) {
      setError('La busqueda debe tener más de 3 caractéres')
      return
    }
    // Expresion regular para validar solo numeros
    // ^  : Coincide con el inicio de la cadena
    // \d : Busca cualquier dígito (número arábigo). Equivalente a [0-9]
    // +$ : Coincide con el inicio de la cadena
    if (newQuery.match(/^\d+$/)) {
      setError('No se permiten busquedas de solo numeros')
      return
    }
    setError(null)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleOnchange} type='text' placeholder='Avenger, Star Wars, The Matrix,..' />
          <button type='submit'> Buscar</button>
        </form>
      </header>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
