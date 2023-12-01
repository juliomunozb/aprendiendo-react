import { useState, useEffect } from 'react'
import { getRandomFact } from '../services/facts'
export function useCatFact () {
  const [fact, setFact] = useState()
  const [catFactError, setCatFactError] = useState()

  const refreshFact = () => {
    getRandomFact().then(newFact => setFact(newFact)).catch(err => {
      setCatFactError(err.message)
    })
  }
  // para recuperar la cita al cargar la página
  useEffect(refreshFact, [])

  return { fact, refreshFact, catFactError }
}
