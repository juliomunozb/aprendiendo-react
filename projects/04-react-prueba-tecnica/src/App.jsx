import { useEffect, useState } from 'react'
import './App.css'
import { useCatImage } from './hooks/useCatImage'
import { getRandomFact } from './services/facts'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/'

export function App () {
  const [fact, setFact] = useState()
  const [apiErrors, setApiErrors] = useState()
  const { imageUrl } = useCatImage({ fact })

  // para recuperar la cita al cargar la página
  useEffect(() => {
    getRandomFact().then(res => {
      const fact = res
      setFact(fact)
    }).catch(err => {
      setApiErrors(err.message)
    })
  }, [])

  const handleClick = async () => {
    const newFact = await getRandomFact()
    setFact(newFact)
  }

  return (
    <main>
      <button onClick={handleClick}>Get new fact</button>
      <h1>App Gatos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <p><img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Image extracted using the first three words for ${fact}`} /></p>}
      <section>
        {apiErrors && <p>{apiErrors}</p>}
      </section>
    </main>

  )
}
