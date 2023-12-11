function ListOfMovies ({ movies }) {
  return (
    <ul className='movies'>
      {
        movies.map(movie => (
          <li className='movie' key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={movie.title} />
          </li>
        ))
      }
    </ul>
  )
}

const NoMoviesResult = () => {
  return (<p>No se encontraron películas para esta busqueda</p>)
}

export function Movies ({ movies }) {
  const hasmovies = movies?.length > 0
  return (
    hasmovies
      ? <ListOfMovies movies={movies} />
      : <NoMoviesResult />)
}
