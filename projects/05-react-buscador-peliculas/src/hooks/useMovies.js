import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies.js'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const previousSearch = useRef(search) // No se vuelve a renderizar

  // Se recrea(se genera)  la funciona solo una vez
  // al pasar el parametro {search} dentro de la funcion
  // Ya no se recrea cada vez que se actualiza el search
  const getMovies = useCallback(async ({ search }) => {
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
  }, [])
  // se realizar el sort solo cuando haya cambio en el sort o en las peliculas
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading, errors }
}
