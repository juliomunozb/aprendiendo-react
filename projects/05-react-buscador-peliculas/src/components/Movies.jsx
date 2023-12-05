function ListOfMovies ({ movies }) {
  return (
    <ul>
      {
        movies.map(movie => (
          <li key={movie.imdbID}>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt={movie.Title} />
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
