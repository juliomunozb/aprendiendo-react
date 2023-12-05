import './App.css'

function App () {
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
        Render peliculas
      </main>
    </div>
  )
}

export default App
