import { useRef } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import './App.css'

function App () {
  const { movies } = useMovies()
  const inputRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    const inputEl = inputRef.current
    const value = inputEl.value
    console.log(value)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input ref={inputRef} type='text' placeholder='Avenger, Star Wars, The Matrix,..' />
          <button type='submit'> Buscar</button>
        </form>
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
