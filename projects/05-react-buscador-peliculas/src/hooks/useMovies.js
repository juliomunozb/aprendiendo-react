import { useRef, useState, useMemo } from 'react'
import { searchMovies } from '../services/movies.js'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const previousSearch = useRef(search) // No se vuelve a renderizar

  // Se recrea cada vez que se renderiza el cuerpo del componente o del customhook
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
  // se realizar el sort solo cuando haya cambio en el sort o en las peliculas
  const sortedMovies = useMemo(() => {
    console.log('getSortedMovies')
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading, errors }
}
