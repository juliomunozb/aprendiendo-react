import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import './App.css'
import { useEffect, useRef, useState } from 'react'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }
    if (search.length < 3) {
      setError('La busqueda debe tener más de 3 caractéres')
      return
    }
    // Expresion regular para validar solo numeros
    // ^  : Coincide con el inicio de la cadena
    // \d : Busca cualquier dígito (número arábigo). Equivalente a [0-9]
    // +$ : Coincide con el inicio de la cadena
    if (search.match(/^\d+$/)) {
      setError('No se permiten busquedas de solo numeros')
      return
    }
    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App () {
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies } = useMovies({ search })

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  }

  const handleOnchange = (event) => {
    updateSearch(event.target.value)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
            onChange={handleOnchange}
            value={search}
            type='text'
            placeholder='Avenger, Star Wars, The Matrix,..'
          />
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
