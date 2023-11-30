import { useEffect, useState } from 'react'
import './App.css'
const CAT_ENDPOINT_RANDOM_CAT = 'https://catfact.ninja/fact'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/'

export function App () {
  const [fact, setFact] = useState()
  const [image, setImage] = useState()

  // para recuperar la cita al cargar la página
  useEffect(() => {
    console.log('useEffect Cita', { fact })
    const getRandomFact = async () => {
      try {
        const response = await fetch(CAT_ENDPOINT_RANDOM_CAT)
        const data = await response.json()
        const { fact } = data
        setFact(fact)
      } catch (error) {
        console.log('Error Invocando API', error.message)
      }
    }
    getRandomFact()
  }, [])

  // para recuperar la imagen cada vez que se tiene una cita nueva
  useEffect(() => {
    console.log('useEffect Imagen', { fact })
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

  return (
    <main>
      <h1>App Gatos</h1>
      {fact && <p>{fact}</p>}
      {image && <p><img src={`${CAT_PREFIX_IMAGE_URL}${image}`} alt={`Image extracted using the first three words for ${fact}`} /></p>}
    </main>
  )
}
