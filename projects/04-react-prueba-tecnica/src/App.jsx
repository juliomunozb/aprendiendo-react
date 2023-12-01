import './App.css'
import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'
import { Otro } from './components/Otro'

export function App () {
  const { fact, refreshFact, catFactError } = useCatFact()
  const { imageUrl, catImageError } = useCatImage({ fact })
  const apiFactErrors = catFactError ? `API FACT: ${catFactError}` : ''
  const apiCatErrors = catImageError ? `API CAT: ${catImageError}` : ''

  const apiErrors = `${apiFactErrors}${apiCatErrors}`

  const handleClick = async () => {
    refreshFact()
  }

  return (
    <main>
      <button onClick={handleClick}>Get new fact</button>
      <h1>App Gatos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <p><img src={imageUrl} alt={`Image extracted using the first three words for ${fact}`} /></p>}
      <section>
        {apiErrors && <p>{apiErrors}</p>}
      </section>
      <section>
        <Otro />
      </section>
    </main>
  )
}
