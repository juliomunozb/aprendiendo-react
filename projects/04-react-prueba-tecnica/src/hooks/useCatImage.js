import { useState, useEffect } from 'react'
import { getUrlImage } from '../services/image'
export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState()
  const [catImageError, setCatImageError] = useState()
  // para recuperar la imagen cada vez que se tiene una cita nueva
  useEffect(() => {
    if (!fact) return
    const threeFirstWords = fact.split(' ', 3).join(' ')
    getUrlImage({ threeFirstWords }).then(urlImage => {
      setImageUrl(urlImage)
    }).catch(err => {
      setCatImageError(err.message)
    })
  }, [fact])

  return { imageUrl, catImageError }
}
