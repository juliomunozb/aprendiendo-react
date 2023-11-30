import { useEffect, useState } from 'react'

const CAT_ENDPOINT_RANDOM_CAT = 'https://catfact.ninja/fact'

export function App () {
  const [fact, setFact] = useState()
  useEffect(() => {
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
  return (
    <>
      <h1>App Gatos</h1>
      {fact && <p>{fact}</p>}
    </>
  )
}
