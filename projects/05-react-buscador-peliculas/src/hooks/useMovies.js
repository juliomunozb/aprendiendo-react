import { useState } from 'react'
import withResults from '../mocks/with-result.json'
import withoutResults from '../mocks/no-result.json'

export function useMovies ({ search }) {
  const [responseMovies, setResponseMovies] = useState([])
  const movies = responseMovies.Search
  const mappedMovies = movies?.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster
  }))

  const getMovies = () => {
    if (search) {
      setResponseMovies(withResults)
    } else {
      setResponseMovies(withoutResults)
    }
  }

  return { movies: mappedMovies, getMovies }
}
