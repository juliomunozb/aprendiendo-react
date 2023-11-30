import { useEffect, useState } from 'react'
import './App.css'
import { getRandomFact } from './services/facts'
import { getUrlImage } from './services/image'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/'

export function App () {
  const [fact, setFact] = useState()
  const [image, setImage] = useState()
  const [factError, setFactError] = useState()

  // para recuperar la cita al cargar la página
  useEffect(() => {
    getRandomFact().then(res => {
      const fact = res
      setFact(fact)
    }).catch(err => {
      setFactError(err.message)
    })
  }, [])

  // para recuperar la imagen cada vez que se tiene una cita nueva
  useEffect(() => {
    if (!fact) return
    const threeFirstWords = fact.split(' ', 3).join(' ')
    getUrlImage({ threeFirstWords }).then(urlImage => {
      setImage(urlImage)
    }).catch(err => {
      setFactError(err.message)
    })
  }, [fact])

  const handleClick = async () => {
    const newFact = await getRandomFact()
    setFact(newFact)
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
