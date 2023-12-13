import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import './App.css'
import { useEffect, useRef, useState } from 'react'
import { LoadingSpinner } from './components/LoadingSpinner'

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
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading, errors } = useMovies({ search, sort })

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleOnchange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    getMovies({ search: newSearch })
  }

  const handleSort = () => {
    setSort(!sort)
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
          <input type='checkbox' onChange={handleSort} />
          <button type='submit' disabled={loading}> Buscar</button>
        </form>
      </header>
      {(error || errors) && <p style={{ color: 'red' }}>{error} <br /> {errors}</p>}
      <main>
        {loading ? <LoadingSpinner /> : <Movies movies={movies} />}
      </main>
    </div>
  )
}

export default App
