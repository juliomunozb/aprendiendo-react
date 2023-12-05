import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import './App.css'

function App () {
  const { movies } = useMovies()

  const handleSubmit = (event) => {
    event.preventDefault()
    // Captura la data de un solo input
    const field = new window.FormData(event.target)// target se refiere al evento, al propio formulario
    const query = field.get('query')
    console.log(query)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input name='query' type='text' placeholder='Avenger, Star Wars, The Matrix,..' />
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
