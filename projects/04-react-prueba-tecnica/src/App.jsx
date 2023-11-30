import { useEffect, useState } from 'react'
import './App.css'
const CAT_ENDPOINT_RANDOM_CAT = 'https://catfact.ninja/fact'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/'

export function App () {
  const [fact, setFact] = useState()
  const [image, setImage] = useState()
  const [factError, setFactError] = useState()

  const getRandomFact = async () => {
    try {
      const response = await fetch(CAT_ENDPOINT_RANDOM_CAT)
      if (!response.ok) {
        setFactError('Error feching fact')
        throw new Error('Error feching fact')
      }
      const data = await response.json()
      const { fact } = data
      setFact(fact)
    } catch (error) {
      setFactError('Error in: 1. response fact Or 2.  In the request')
      throw error
    }
  }

  // para recuperar la cita al cargar la página
  useEffect(() => {
    getRandomFact()
  }, [])

  // para recuperar la imagen cada vez que se tiene una cita nueva
  useEffect(() => {
    if (!fact) return
    const threeFirstWords = fact.split(' ', 3).join(' ')
    fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { _id } = response
        const url = `cat/${_id}/says/${threeFirstWords}`
        setImage(url)
      })
  }, [fact])

  const handleClick = () => {
    getRandomFact()
  }

  return (
    <main>
      <button onClick={handleClick}>Get new fact</button>
      <h1>App Gatos</h1>
      {fact && <p>{fact}</p>}
      {image && <p><img src={`${CAT_PREFIX_IMAGE_URL}${image}`} alt={`Image extracted using the first three words for ${fact}`} /></p>}
      <section>
        {factError && <p>{factError}</p>}
      </section>
    </main>

  )
}
