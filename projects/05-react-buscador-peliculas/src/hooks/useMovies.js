import { useRef, useState } from 'react'
import { searchMovies } from '../services/movies.js'

export function useMovies ({ search }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const previousSearch = useRef(search)

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
  return { movies, getMovies, loading, errors }
}
