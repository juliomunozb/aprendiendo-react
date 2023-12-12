import { useRef, useState } from 'react'
import { searchMovies } from '../services/movies.js'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const previousSearch = useRef(search) // No se vuelve a renderizar

  // Se reacrea cada vez que se renderiza el cuerpo del componente o del customhook
  const getMovies = async () => {
    if (search === previousSearch.current) return
    try {
      previousSearch.current = search
      setLoading(true)
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (error) {
      setErrors(error.message)
    } finally {
      setLoading(false)
    }
  }

  const getSortedMovies = () => {
    console.log('getSortedMovies')
    const sortedMovies =
    sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies

    return sortedMovies
  }

  return { movies: getSortedMovies(movies), getMovies, loading, errors }
}
