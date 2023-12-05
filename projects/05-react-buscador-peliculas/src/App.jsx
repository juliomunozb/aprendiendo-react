import { Movies } from './components/Movies'
import responseMovies from './mocks/with-result.json'
// import withoutResult from './mocks/no-result.json'
import './App.css'

function App () {
  const movies = responseMovies.Search

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form'>
          <input type='text' placeholder='Avenger, Star Wars, The Matrix,..' />
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
